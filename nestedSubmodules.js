const loadingElement = document.getElementById('loading');
const submoduleList = document.getElementById('submodule-list');

// Show the loading icon
loadingElement.style.display = 'flex';
submoduleList.style.display = 'none';

const username = 'n1ji';
const repo = 'audiophileWebsite';

const customDomain = 'https://audiophile.website';

// GitHub API URL to fetch the .gitmodules file
const apiUrl = `https://api.github.com/repos/${username}/${repo}/contents/.gitmodules`;

// Function to check if a repository has an index.html file
async function hasIndexHtml(repoName, branch = 'main') {
    const indexHtmlUrl = `https://api.github.com/repos/${username}/${repoName}/contents/index.html?ref=${branch}`;
    try {
        const response = await fetchWithTimeout(indexHtmlUrl);
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Function to fetch with a timeout
async function fetchWithTimeout(resource, options = {}, timeout = 10000) { // 10 seconds timeout
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(resource, { ...options, signal: controller.signal });
        return response;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error(`Request timed out: ${resource}`);
            throw new Error('Request timed out');
        } else {
            throw error;
        }
    } finally {
        clearTimeout(id);
    }
}

async function getBranches(repoName) {
    const branchesUrl = `https://api.github.com/repos/${username}/${repoName}/branches`;
    try {
        const response = await fetchWithTimeout(branchesUrl);
        if (response.ok) {
            const branches = await response.json();
            return branches.map(b => b.name); // Return array of branch names
        }
        return ['main']; // Default fallback
    } catch (error) {
        console.error(`Error fetching branches for ${repoName}:`, error);
        return ['main']; // Default fallback
    }
}

async function fetchSubmodules(parentRepoUrl, parentPath = '', parentList, branch = 'main') {
    const minLoadingTime = 1000;
    const startTime = Date.now();
    const response = await fetchWithTimeout(`${parentRepoUrl}?ref=${branch}`);
    try {
        const response = await fetchWithTimeout(parentRepoUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.content) {
            console.error('No .gitmodules file found in the repository.');
            throw new Error('No .gitmodules file found.');
        }

        let gitmodulesContent;
        try {
            gitmodulesContent = atob(data.content.replace(/\s/g, ''));
        } catch (error) {
            console.error('Error decoding .gitmodules file:', error);
            throw new Error('Error decoding .gitmodules file');
        }

        const submodules = parseGitmodules(gitmodulesContent);

        for (const submodule of submodules) {
            const repoName = extractRepoName(submodule.url);
            const availableBranches = await getBranches(repoName);
            const targetBranch = availableBranches.includes('site') ? 'site' : availableBranches.includes('main') ? 'main' : availableBranches.includes('main') ? 'main' : availableBranches[0] || 'main';
            
            try {
                const hasIndex = await hasIndexHtml(repoName, targetBranch);
                if (!hasIndex) {
                    console.log(`Skipping ${repoName} (no index.html in ${targetBranch})`);
                    continue;
                }
            } catch (error) {
                console.error(`Error checking index.html for ${repoName}:`, error);
                continue;
            }

            const submoduleUrl = `${customDomain}/${parentPath}${repoName}/`;

            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = submoduleUrl;
            link.textContent = submodule.path;
            link.target = '_blank';

            listItem.appendChild(link);

            const submoduleApiUrl = `https://api.github.com/repos/${username}/${repoName}/contents/.gitmodules?ref=${targetBranch}`;
            
            try {
                const submoduleResponse = await fetchWithTimeout(submoduleApiUrl);
                if (submoduleResponse.ok) {
                    const nestedList = document.createElement('ul');
                    listItem.appendChild(nestedList);
                    await fetchSubmodules(submoduleApiUrl, `${parentPath}${repoName}/`, nestedList, targetBranch);
                }
            } catch (error) {
                console.error(`Error fetching submodules for ${repoName}:`, error);
            }

            parentList.appendChild(listItem);
        }

    } catch (error) {
        console.error('Error fetching submodules:', error);
        submoduleList.textContent = 'Error loading submodules. Please try again later or from another IP address.';
    } finally {
        // Ensure loading element stays visible for at least minLoadingTime
        const elapsedTime = Date.now() - startTime;
        const remainingTime = minLoadingTime - elapsedTime;

        setTimeout(() => {
            loadingElement.style.display = 'none';
            submoduleList.style.display = 'flex';
        }, Math.max(remainingTime, 0)); // Prevents negative values
    }
}

// Function to parse the .gitmodules file
function parseGitmodules(content) {
    const submodules = [];
    const lines = content.split('\n');

    let currentSubmodule = {};

    lines.forEach(line => {
        if (line.startsWith('[submodule ')) {
            // Start of a new submodule
            if (currentSubmodule.path) {
                submodules.push(currentSubmodule);
            }
            currentSubmodule = {};
        } else if (line.trim().startsWith('path = ')) {
            currentSubmodule.path = line.split('=')[1].trim();
        } else if (line.trim().startsWith('url = ')) {
            currentSubmodule.url = line.split('=')[1].trim();
        }
    });

    // Push the last submodule
    if (currentSubmodule.path) {
        submodules.push(currentSubmodule);
    }

    return submodules;
}

// Function to extract the repository name from the Git URL
function extractRepoName(gitUrl) {
    // Example Git URL: https://github.com/username/repo.git
    // Extract the part after the last '/' and remove '.git'
    const repoName = gitUrl.split('/').pop().replace('.git', '');
    return repoName;
}

// Call the function to fetch and display submodules
fetchSubmodules(apiUrl, '', submoduleList);