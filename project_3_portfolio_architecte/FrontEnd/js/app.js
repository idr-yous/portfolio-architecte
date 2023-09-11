import { Works } from "./components/Works.js";
import { Modal } from "./components/Modal.js";
import { fetchJSON } from "./functions/api.js";
import { getCookie } from "./functions/cookies.js";
import { setError, setLogin, setLogout } from "./functions/dom.js";

// Check user auth status
const UID = getCookie("UID");
const TOKEN = getCookie("TOKEN");

// Check if token existe in the cookies
if (UID !== null && TOKEN !== null) {
    // the user is connected (log in user)
    setLogin();
} else {
    // the user is not connected (logout user)
    setLogout();
}

// Fetching projects from our API
try {
    const projects = await fetchJSON("http://localhost:5678/api/works");

    // Add works to our gallery
    const works = new Works(projects);
    works.appendTo(document.querySelector("#portfolio"));
} catch (e) {
    // If there is an fetching error we can show an error message
    setError("#portfolio", "Impossible de charger les Projets");
}

// Change active button for cuurent filter
function changeActiveButton(button) {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
}

// Add show class
function addShowClass(element) {
    if (!element.classList.contains("show")) {
        element.classList.add("show");
    }
}

// Filter projects function
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
        const category = btn.getAttribute("data-category-parent");
        const projects = document.querySelectorAll(".work");

        projects.forEach((project) => {
            project.classList.remove("show");

            if (category == "all") {
                addShowClass(project);
            } else {
                if (project.dataset.categoryId === category) {
                    addShowClass(project);
                }
            }
        });

        // Change active button for cuurent filter
        changeActiveButton(btn);
    });
});

// Modal fonction
const editWorksBtn = document.querySelector("#edit_portfolio");
editWorksBtn.addEventListener("click", async function () {
    const modalElement = document.querySelector("#modal");
    let modalProjects;

    // We refetching projects list to chech if there an new projects
    try {
        modalProjects = await fetchJSON("http://localhost:5678/api/works");

        const modal = new Modal(modalElement, modalProjects);
        modal.openModal();
    } catch (e) {
        // If there is an fetching error we can show an error message
        setError(
            ".portfolio-error",
            "Erreur server, Impossible de modifier les Projets"
        );
    }
});
