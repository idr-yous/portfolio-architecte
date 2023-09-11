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

/**
 * @param {Object} categories
 * @param {HTMLElement} modal
 * @return {HTMLElement}
 * */
export function createModalFormGroup(modal, categories) {
  const modalFormGroup = modal.querySelector(".modal-form-group");
  const titleLabel = createElementWithText("label", "Titre", {
    class: "form-label",
    for: "title_field",
  });
  const titleInput = createElement("input", {
    type: "text",
    name: "title",
    class: "modal-input form-input",
    id: "title_field",
    required: "",
  });
  const categoryLabel = createElementWithText("label", "Catégorie", {
    class: "form-label",
    for: "category_field",
  });
  const categorySelect = createElement("select", {
    name: "category",
    class: "modal-input form-select",
    id: "category_field",
    required: "",
  });
  categorySelect.append(
    createElementWithText("option", "- Select Catégorie -", { value: "" })
  );

  categories.map((cat) => {
    categorySelect.append(
      createElementWithText("option", cat.name, { value: cat.id })
    );
  });

  modalFormGroup.innerHTML = "";
  modalFormGroup.append(titleLabel, titleInput, categoryLabel, categorySelect);
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
