document.addEventListener('DOMContentLoaded', function() {
    const projectsContainer = document.getElementById('projects-container');
    
    const projectsData = [
        {
            name: "IT115 Projects",
            path: "it115",
            url: "#",
            submodules: [
                { name: "Discord Bot", path: "discord-bot", url: "https://github.com/n1ji/discord-bot" }
            ]
        },
        {
            name: "IT116 Portal",
            path: "portal",
            url: "https://audiophile.website/portal",
            submodules: [
                { name: "Creatures", path: "creatures", url: "https://github.com/n1ji/creatures" },
                { name: "HTML Elements", path: "html-elements", url: "https://github.com/n1ji/html-elements" },
                { name: "Stylin with CSS", path: "stylin-with-css", url: "https://github.com/n1ji/stylin-with-css" },
                { name: "Selectors", path: "selectors", url: "https://github.com/n1ji/selectors" },
                { name: "CSS Positioning", path: "positioning", url: "https://github.com/n1ji/css-positioning" },
                { name: "Time of Day", path: "time-of-day", url: "https://github.com/n1ji/time-of-day" },
                { name: "Daily Grind", path: "daily-grind", url: "https://github.com/n1ji/daily-grind" },
                { name: "Form Processing", path: "form-processing", url: "https://github.com/n1ji/form-processing" },
                { name: "GitHub Page", path: "github-page", url: "https://github.com/n1ji/github-page" }
            ]
        },
        {
            name: "IT121 Projects",
            path: "it121",
            url: "https://audiophile.website/it121-w25",
            submodules: [
                { name: "Story Game", path: "it121-storyGame", url: "https://github.com/n1ji/it121-storyGame" },
                { name: "Inventory Manager", path: "it121-inventoryManager", url: "https://github.com/n1ji/it121-inventoryManager" },
                { name: "Weather App", path: "it121-weatherApp", url: "https://github.com/n1ji/it121-weatherApp" },
                { name: "Fetch Display", path: "it121-fetchDisplay", url: "https://github.com/n1ji/it121-fetchDisplay" }
            ]
        },
        {
            name: "IT122 Projects",
            path: "it122-s25",
            url: "https://github.com/n1ji/it122-s25",
            submodules: []
        },
        {
            name: "IT211 Staging Area",
            path: "it211-staging-area",
            url: "https://github.com/n1ji/it211-staging-area",
            submodules: []
        },
        {
            name: "Dealers Pact",
            path: "dealersPact",
            url: "https://github.com/n1ji/dealersPact",
            submodules: []
        },
        
        
    ];

    renderProjects(projectsData);
    
    function renderProjects(projects) {
        projectsContainer.innerHTML = '';
        
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            const projectHeader = document.createElement('div');
            projectHeader.className = 'project-header';
            
            const titleLink = document.createElement('a');
            titleLink.className = 'project-title';
            titleLink.href = project.url;
            titleLink.textContent = project.name;
            titleLink.target = '_blank';
            
            projectHeader.appendChild(titleLink);
            
            if (project.submodules.length > 0) {
                const toggle = document.createElement('span');
                toggle.className = 'project-toggle collapsed'; // Start collapsed (pointing right)
                toggle.textContent = '🞂'; // Right arrow character
                projectHeader.appendChild(toggle);
                
                projectHeader.addEventListener('click', function(e) {
                    // Don't toggle if clicking on the link
                    if (e.target.tagName === 'A') return;
                    
                    const subprojects = this.parentElement.querySelector('.subprojects');
                    subprojects.classList.toggle('show');
                    toggle.classList.toggle('collapsed');
                    
                    // Update arrow character
                    toggle.textContent = toggle.classList.contains('collapsed') ? '🞂' : '🞃';
                });
            }
            
            projectCard.appendChild(projectHeader);
            
            if (project.submodules.length > 0) {
                const subprojects = document.createElement('div');
                subprojects.className = 'subprojects';
                
                project.submodules.forEach(submodule => {
                    const link = document.createElement('a');
                    link.className = 'project-link';
                    link.href = submodule.url;
                    link.textContent = submodule.name;
                    link.target = '_blank';
                    subprojects.appendChild(link);
                });
                
                projectCard.appendChild(subprojects);
            }
            
            projectsContainer.appendChild(projectCard);
        });
    }
});