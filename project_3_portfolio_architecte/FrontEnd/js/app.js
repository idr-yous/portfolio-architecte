import { Works } from "./components/Works.js";
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
