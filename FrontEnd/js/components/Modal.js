import {
    createElement,
    createElementWithText,
    createModalFormGroup,
    removeMessage,
    setError,
    setSucces
} from "../functions/dom.js"
import { getCookie } from "../functions/cookies.js";
import { fetchJSON, deleteWork } from "../functions/api.js";
import { Works } from "./Works.js";

/**
 * @typedef {object} Work
 * @property {HTMLElement} modal
 * @property {number} UID
 * @property {string} TOKEN
 * @property {string} imageType
 */

export class Modal {

    /**@type {Work[]} */
    #works = []
    #modal
    #UID
    #TOKEN

    #inputsValues = {
        image: "",
        title: "",
        category: ""
    }

    constructor(modal, works) {
        this.#modal = modal
        this.#works = works
        this.#UID = getCookie('UID')
        this.#TOKEN = getCookie('TOKEN')
    }

    /**@param {HTMLElement} element */
    loadModalWorks() {
        // Select ou modal gallery box
        const modalGallery = document.querySelector('.modal-gallery')
        // Clean our gallery
        modalGallery.innerHTML = ''

        // Get works only for current user 
        const userWorks = this.#works.filter(
            (project) => project.userId == this.#UID
        );

        // Add projects list to our modal
        for (let work of userWorks) {
            const itemModal = new WorkItemModal(work)
            itemModal.appendTo(modalGallery)
        }
    }

    openModal() {
        // Load projects in modal
        this.loadModalWorks()

        // Show modal
        this.#modal.style.display = null
        document.body.classList.add('modal-open')

        // Change modal attributes
        this.#modal.removeAttribute('aria-hidden')
        this.#modal.setAttribute('aria-modal', 'true')

        // Switch from gallery to form in modal
        document.querySelector('#add_work').addEventListener('click', () => this.switchModalForm())

        // On submit we call handle form function
        document.querySelector('.modal-form').addEventListener('submit', (e) => this.handleFormSubmit(e))

        // Add close function
        this.#modal.addEventListener('click', () => this.closeModal())
        this.#modal.querySelector('#close_modal').addEventListener('click', () => this.closeModal())
        this.#modal.querySelector('.modal-wrapper').addEventListener('click', (e) => this.stopPropagation(e))

        // we can also close modal using keybaord
        window.addEventListener('keydown', (e) => this.closeByKeyboard(e))
    }

    closeModal() {
        // Hide modal
        this.#modal.style.display = 'none'
        document.body.classList.remove('modal-open')

        // Change modal attributes
        this.#modal.setAttribute('aria-hidden', 'true')
        this.#modal.removeAttribute('aria-modal')

        // Reset Form
        this.resetModal()

        // Swith modal to default
        this.swithDefaultModal()

        // Remove error & success message after closing model
        removeMessage(this.#modal)

        // Remove all event listners for modal
        this.#modal.replaceWith(this.#modal.cloneNode(true))
        window.removeEventListener('keydown', () => this.closeByKeyboard())
    }

    async switchModalForm() {
        const modalFirstBox = document.querySelector('.modal-content.first')
        const modalLastBox = document.querySelector('.modal-content.last')

        // Get all categories exists
        try {
            const categories = await fetchJSON('http://localhost:5678/api/categories')

            // Create form groupe
            createModalFormGroup(this.#modal, categories)

            // Check form if isn't empty we enable submit button
            const modalForm = document.querySelector('.modal-form')
            const modalFormInputs = modalForm.querySelectorAll('.modal-input')
            modalFormInputs.forEach(input => {
                input.addEventListener('change', e => this.checkFormSubmitButton(e))
            })

        } catch (e) {
            setError(".modal-form-group", "Erreur serveur, Imposible d'importer les catégories")
        }

        // Hide the gallery box and show the form box
        modalFirstBox.classList.add('closed')
        modalLastBox.classList.remove('closed')

        // Remove error & success when writing
        removeMessage(this.#modal)

        document.querySelector('#switch_modal').addEventListener('click', () => this.swithDefaultModal())
    }

    swithDefaultModal() {
        const modalFirstBox = document.querySelector('.modal-content.first')
        const modalLastBox = document.querySelector('.modal-content.last')
        if (modalFirstBox.classList.contains('closed')) {
            modalFirstBox.classList.remove('closed')
        }
        if (!modalLastBox.classList.contains('closed')) {
            modalLastBox.classList.add('closed')
        }

        // Remove error & success
        removeMessage(this.#modal)
    }

    /**@param {PointerEvent} e */
    closeByKeyboard(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            this.closeModal()
        }
    }

    /**@param {PointerEvent} e */
    stopPropagation(e) {
        e.stopPropagation()
    }

    previewImage() {
        const file = this.#inputsValues.image

        if (file.type.startsWith("image/")) {
            const imgThumb = createElement('img', {
                class: 'img-thumb',
                src: URL.createObjectURL(file),
                alt: "Apercu de l'image à telecharger "
            })

            imgThumb.onload = () => {
                URL.revokeObjectURL(imgThumb.src);
            };

            // Show image preview
            document.querySelector('.image-preview').replaceChildren(imgThumb)
        }
    }

    resetPreviewImage() {
        document.querySelector('.image-preview').innerHTML = `
            <img class="img-icon" src="./assets/icons/img_thumb.png" alt="Ajouter une photo">
            <button class="btn primary-btn gray">Ajouter photo</button>
            <p>jpg, png : 4mo max</p>`
    }

    checkFormSubmitButton(e) {
        e.preventDefault()

        if (e.target.name === 'image') {
            this.#inputsValues.image = e.target.files[0]
            this.previewImage()
        } else {
            this.#inputsValues[e.target.name] = e.target.value
        }

        // Enable submit button if all inputs are not empty 
        const formSubmitBtn = document.querySelector('#modal_submit')
        if (!Object.values(this.#inputsValues).some(x => x === "")) {
            if (formSubmitBtn.classList.contains('disabled')) {
                formSubmitBtn.classList.remove('disabled')
                formSubmitBtn.removeAttribute('disabled')
            }
        } else {
            if (!formSubmitBtn.classList.contains('disabled')) {
                formSubmitBtn.classList.add('disabled')
                formSubmitBtn.setAttribute('disabled', '')
            }
        }

        // Remove error & success
        removeMessage(this.#modal)
    }

    resetModal() {
        // Reset form
        document.querySelector('.modal-form').reset()
        this.resetPreviewImage()

        // Reset inputs values 
        Object.keys(this.#inputsValues).forEach(key => {
            this.#inputsValues[key] = '';
        });

        // Disable submit button
        const formSubmitBtn = document.querySelector('#modal_submit')
        if (!formSubmitBtn.classList.contains('disabled')) {
            formSubmitBtn.classList.add('disabled')
            formSubmitBtn.setAttribute('disabled', '')
        }
    }

    /**@param {PointerEvent} e */
    async handleFormSubmit(e) {
        e.preventDefault()

        // If any input is empty we show a error message
        if (Object.values(this.#inputsValues).some(x => x === "")) {
            setError(".modal-action.last", "Veuillez vérifier les informations remplies", "prepend")

        } else {
            const formData = new FormData()

            for (let key in this.#inputsValues) {
                formData.append(key, this.#inputsValues[key]);
            }

            try {
                // Fetch the new work
                const res = await fetchJSON("http://localhost:5678/api/works", {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${this.#TOKEN}`
                    },
                    body: formData
                })

                // Add the new project to our portfolio gallery
                const newWork = new Works(res);
                newWork.appendNewElementTo(document.querySelector('#gallery'))

                // Add the new project to our modal gallery
                const newModalItem = new WorkItemModal(res)
                newModalItem.appendTo(document.querySelector('.modal-gallery'))

                // Reset modal form
                this.resetModal()

                // Show a success message
                setSucces(".modal-action.last", "Votre projet est ajouté avec succès", "prepend")

            } catch (e) {
                // If there is an fetching error we can show an error message
                setError(".modal-action.last", "Erreur serveur, Impossible d'ajouter le projet", "prepend")
            }

        }
    }
}

class WorkItemModal {

    #element

    /**@type {Work} */
    constructor(Work) {

        // Create elements of our modal works items
        const imgBox = createElement('div', { class: 'img-box' })
        const img = createElement('img', {
            class: 'img',
            src: Work.imageUrl,
            alt: Work.title
        })

        const deleteBtn = createElement('button', {
            class: 'btn delete-btn',
            'data-parent-id': Work.id
        })
        const deleteBtnImg = createElement('img', {
            src: './assets/icons/delete_icon.svg',
            alt: 'Supprimer le projet'
        })
        deleteBtn.append(deleteBtnImg)

        const editBtn = createElementWithText('button', 'éditer', {
            class: 'btn edit-btn',
            'data-parent-id': Work.id
        })

        imgBox.append(img, deleteBtn, editBtn)

        // Delete work 
        deleteBtn.addEventListener('click', e => this.removeWork(e))


        this.#element = imgBox
    }

    /**@param {HTMLElement} element */
    appendTo(element) {
        element.append(this.#element)
    }

    /**@param {PointerEvent} e */
    async removeWork(e) {
        e.preventDefault()

        const work_id = e.currentTarget.getAttribute('data-parent-id')

        // Remove selected project
        try {
            await deleteWork(work_id, getCookie('TOKEN'))

            // Remove project from our modal works items
            this.#element.remove()

            // Remove work from our portfolio gallery
            document.querySelector(`#project_id_${work_id}`).remove()

            // Show a success message
            setSucces(".modal-action.first", "Votre projet à été supprimé avec succès", "prepend")

        } catch (e) {
            // If there is an fetching error we can show an error message
            setError(".modal-action.first", "Erreur serveur, Impossible de supprimer le projet", "prepend")
        }

    }
}