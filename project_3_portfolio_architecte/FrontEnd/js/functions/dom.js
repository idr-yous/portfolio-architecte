/**
 * @param {string} tagName
 * @param {object} attributes
 * @param {string} text
 * @param {string} error
 * @param {string} method
 * @return {HTMLElement}
 */

export function createElement(tagName, attributes = {}) {
  const element = document.createElement(tagName);
  for (const [attribute, value] of Object.entries(attributes)) {
    element.setAttribute(attribute, value);
  }
  return element;
}

export function createElementWithText(tagName, text, attributes = {}) {
  const element = document.createElement(tagName);
  element.innerText = text;
  for (const [attribute, value] of Object.entries(attributes)) {
    element.setAttribute(attribute, value);
  }
  return element;
}

/**@param {HTMLElement} element */
export function removeMessage(element) {
  // Remove error & success message after closing model
  try {
    element.querySelector(".error-box").remove();
  } catch {}

  try {
    element.querySelector(".succes-box").remove();
  } catch {}
}

export function setError(tagName, error, method = "append") {
  // If there is an fetching error we can show an error message
  const element = document.querySelector(tagName);

  // Create errors box
  const errorElement = createElement("div", {
    class: "error-box",
  });
  errorElement.innerText = error;

  const oldErrorBox = element.querySelector(".error-box");

  // Verify if the error is already exist
  if (oldErrorBox === null) {
    // Show the error message
    if (method === "append") {
      element.append(errorElement);
    } else if (method === "prepend") {
      element.prepend(errorElement);
    }
  }
}

export function setSucces(tagName, error, method = "append") {
  const element = document.querySelector(tagName);

  // Create success box
  const errorElement = createElement("div", {
    class: "succes-box",
  });
  errorElement.innerText = error;

  // Delete the error box if exist
  try {
    element.querySelector(".error-box").remove();
  } catch (e) {}

  // Verify if the success box is already exist
  const oldSuccessBox = element.querySelector(".succes-box");
  if (oldSuccessBox === null) {
    // Show the succes message
    if (method === "append") {
      element.append(errorElement);
    } else if (method === "prepend") {
      element.prepend(errorElement);
    }
  }
}

/**
 * @return {HTMLButtonElement}
 * */
export function createEditWorkButton() {
  const img = createElement("img", {
    src: "./assets/icons/edit_icon.svg",
    alt: "Modifier le portfolio",
  });
  const span = createElementWithText("span", "Modifier");
  const button = createElement("button", {
    id: "edit_portfolio",
    class: "edit-portfolio",
  });
  button.append(img, span);

  return button;
}

export function setLogin() {
  // Change the auth link in header to logout
  const authLink = document.querySelector("#auth-link");
  authLink.innerText = "Logout";

  // Add edit button to our portfolio section
  const editButton = createEditWorkButton();
  document.querySelector(".portfolio-title").append(editButton);
}

export function setLogout() {
  // Change the auth link in header to Login
  const authLink = document.querySelector("#auth-link");
  authLink.innerText = "Login";

  // Remove edit button if existe from our portfolio section
  const editButton = document.querySelector(".edit-portfoli");
  if (editButton !== null) {
    editButton.remove;
  }
}
