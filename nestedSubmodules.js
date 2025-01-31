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
async function hasIndexHtml(repoName) {
    const indexHtmlUrl = `https://api.github.com/repos/${username}/${repoName}/contents/index.html`;
    try {
        const response = await fetch(indexHtmlUrl);
        return response.ok; // Returns true if index.html exists
    } catch (error) {
        return false; // Returns false if index.html does not exist or there's an error
    }
}

// Function to fetch and parse the .gitmodules file
async function fetchSubmodules(parentRepoUrl, parentPath = '', parentList) {
    try {
        const response = await fetch(parentRepoUrl);
        const data = await response.json();

        // Check if the .gitmodules file exists
        if (!data.content) {
            console.error('No .gitmodules file found in the repository.');
            return;
        }

        // Decode the .gitmodules file content (base64 encoded)
        let gitmodulesContent;
        try {
            gitmodulesContent = atob(data.content.replace(/\s/g, '')); // Remove whitespace and decode
        } catch (error) {
            console.error('Error decoding .gitmodules file:', error);
            return;
        }

        // Parse the .gitmodules file to extract submodule information
        const submodules = parseGitmodules(gitmodulesContent);

        for (const submodule of submodules) {
            // Extract the repository name from the submodule URL
            const repoName = extractRepoName(submodule.url);

            // Check if the repository has an index.html file
            const hasIndex = await hasIndexHtml(repoName);
            if (!hasIndex) {
                console.log(`Skipping ${repoName} (no index.html)`);
                continue; // Skip this submodule
            }

            // Construct the GitHub Pages URL using the custom domain
            const submoduleUrl = `${customDomain}/${parentPath}${repoName}/`;

            // Create a list item for the submodule
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = submoduleUrl;
            link.textContent = submodule.path;

            listItem.appendChild(link);

            // Check if this submodule has its own .gitmodules file
            const submoduleApiUrl = `https://api.github.com/repos/${username}/${repoName}/contents/.gitmodules`;
            try {
                const submoduleResponse = await fetch(submoduleApiUrl);
                if (submoduleResponse.ok) {
                    // If the submodule has a .gitmodules file, recursively fetch its submodules
                    const nestedList = document.createElement('ul');
                    listItem.appendChild(nestedList);
                    await fetchSubmodules(submoduleApiUrl, `${parentPath}${repoName}/`, nestedList);
                }
            } catch (error) {
                console.error(`Error fetching submodules for ${repoName}:`, error);
            }

            parentList.appendChild(listItem);
        }

        // Hide the loading icon and show the submodule list
        loadingElement.style.display = 'none';
        submoduleList.style.display = 'flex';

    } catch (error) {
        console.error('Error fetching submodules:', error);
        // Hide the loading icon in case of error
        loadingElement.style.display = 'none';
        submoduleList.style.display = 'flex';
        loadingElement.textContent = 'Error fetching submodules.';
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