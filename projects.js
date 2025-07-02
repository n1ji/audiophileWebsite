window.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    const overlay = document.getElementById("loading-overlay");
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    setTimeout(() => (overlay.style.display = "none"), 500);
  }, 2300);
});

document.addEventListener("DOMContentLoaded", function () {
  const projectsContainer = document.getElementById("projects-container");

  const projectsData = [
    {
      name: "IT115 Software Dev Tools",
      path: "it115",
      url: "#",
      submodules: [
        {
          name: "Discord Bot",
          path: "discord-bot",
          url: "https://audiophile.website/portal/discord-bot",
        },
      ],
    },
    {
      name: "IT116 Programming & Web",
      path: "portal",
      url: "https://audiophile.website/portal",
      submodules: [
        {
          name: "Creatures",
          path: "creatures",
          url: "https://audiophile.website/portal/creatures",
        },
        {
          name: "HTML Elements",
          path: "html-elements",
          url: "https://audiophile.website/portal/html-elements",
        },
        {
          name: "Stylin with CSS",
          path: "stylin-with-css",
          url: "https://audiophile.website/portal/stylin-with-css",
        },
        {
          name: "Selectors",
          path: "selectors",
          url: "https://audiophile.website/portal/selectors",
        },
        {
          name: "CSS Positioning",
          path: "positioning",
          url: "https://audiophile.website/portal/css-positioning",
        },
        {
          name: "Time of Day",
          path: "time-of-day",
          url: "https://audiophile.website/portal/time-of-day",
        },
        {
          name: "Daily Grind",
          path: "daily-grind",
          url: "https://audiophile.website/portal/daily-grind",
        },
        {
          name: "Form Processing",
          path: "form-processing",
          url: "https://audiophile.website/portal/form-processing",
        },
        {
          name: "GitHub Page",
          path: "github-page",
          url: "https://audiophile.website/portal/github-page",
        },
      ],
    },
    {
      name: "IT121 Javascript 1",
      path: "it121",
      url: "https://audiophile.website/it121-w25",
      submodules: [
        {
          name: "Story Game",
          path: "it121-storyGame",
          url: "https://audiophile.website/it121-w25/it121-storyGame",
        },
        {
          name: "Inventory Manager",
          path: "it121-inventoryManager",
          url: "https://audiophile.website/it121-w25/it121-inventoryManager",
        },
        {
          name: "Weather App",
          path: "it121-weatherApp",
          url: "https://audiophile.website/it121-w25/it121-weatherApp",
        },
        {
          name: "Fetch Display",
          path: "it121-fetchDisplay",
          url: "https://audiophile.website/it121-w25/it121-fetchDisplay",
        },
      ],
    },
    {
      name: "IT122 JavaScript 2",
      path: "it122-s25",
      url: "https://audiophile.website/it122-s25",
      submodules: [
        {
          name: "Staging Area",
          path: "staging-area",
          url: "https://audiophile.website/it122-s25/staging-area.html",
        },
        {
          name: "DOM Play",
          path: "dom-play",
          url: "https://audiophile.website/it122-s25/it122-domPlay",
        },
        {
          name: "Seasonal Styles",
          path: "it122-seasonal-styles",
          url: "https://audiophile.website/it122-s25/it122-seasonal-styles",
        },
      ],
    },
    {
      name: "IT211 OOP Java",
      path: "it211",
      url: "#",
      submodules: [
        {
          name: "IT211 Staging Area",
          path: "it211-staging-area",
          url: "https://audiophile.website/it211-staging-area",
        },
        {
          name: "Number Guess",
          path: "numguess",
          url: "https://github.com/n1ji/it211-numguess",
        },
        {
          name: "Creature Feature",
          path: "creatureFeature",
          url: "https://github.com/n1ji/it211-creatureFeature",
        },
        {
          name: "Calculator",
          path: "calc_ulator",
          url: "https://github.com/n1ji/calc_ulator",
        },
      ],
    },
    {
      name: "BTM260 Project Management",
      path: "btm260",
      url: "#",
      submodules: [
        {
          name: "Dealers Pact",
          path: "dealersPact",
          url: "https://audiophile.website/dealersPact",
        },
      ],
    },
  ];

  renderProjects(projectsData);

  function renderProjects(projects) {
    projectsContainer.innerHTML = "";

    projects.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.className = "project-card";

      const projectHeader = document.createElement("div");
      projectHeader.className = "project-header";

      const titleLink = document.createElement("a");
      titleLink.className = "project-title";
      titleLink.href = project.url;
      titleLink.textContent = project.name;
      titleLink.target = "_blank";

      projectHeader.appendChild(titleLink);

      if (project.submodules.length > 0) {
        const toggle = document.createElement("span");
        toggle.className = "project-toggle collapsed"; // Start collapsed (pointing right)
        toggle.textContent = "🞂"; // Right arrow character
        projectHeader.appendChild(toggle);

        projectHeader.addEventListener("click", function (e) {
          // Don't toggle if clicking on the link
          if (e.target.tagName === "A") return;

          const subprojects = this.parentElement.querySelector(".subprojects");
          subprojects.classList.toggle("show");
          toggle.classList.toggle("collapsed");

          // Update arrow character
          toggle.textContent = toggle.classList.contains("collapsed")
            ? "🞂"
            : "🞃";
        });
      }

      projectCard.appendChild(projectHeader);

      if (project.submodules.length > 0) {
        const subprojects = document.createElement("div");
        subprojects.className = "subprojects";

        project.submodules.forEach((submodule) => {
          const link = document.createElement("a");
          link.className = "project-link";
          link.href = submodule.url;
          link.textContent = submodule.name;
          link.target = "_blank";
          subprojects.appendChild(link);
        });

        projectCard.appendChild(subprojects);
      }

      projectsContainer.appendChild(projectCard);
    });
  }
});
