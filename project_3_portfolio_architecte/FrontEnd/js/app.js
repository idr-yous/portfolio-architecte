import { Works } from "./components/Works.js";
import { fetchJSON } from "./functions/api.js";
import { setError } from "./functions/dom.js";

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
