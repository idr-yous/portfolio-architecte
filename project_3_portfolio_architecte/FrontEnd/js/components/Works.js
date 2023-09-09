import { createElement, createElementWithText } from "../functions/dom.js"

/**
 * @typedef {object} Work
 * @property {number} id
 * @property {number} categoryId
 * @property {string} title
 * @property {string} imageUrl
 */

export class Works {

    /**@type {Work[]} */
    #works = []

    /**@param {Work[]} works */
    constructor(works = {}) {
        this.#works = works
    }

    /**@param {HTMLElement} element */
    appendTo(element) {
        // We d'ont want to show filter boxes if tehere is a fetching error
        // So We create filters after fetching
        const potfolioFilters = createElement('div', { class: 'filter' })
        const btn_1 = createElementWithText('button', 'Tous', {
            class: 'filter-btn active',
            "data-category-parent": "all"
        })
        const btn_2 = createElementWithText('button', 'Objets', {
            class: 'filter-btn',
            "data-category-parent": "1"
        })
        const btn_3 = createElementWithText('button', 'Appartements', {
            class: 'filter-btn',
            "data-category-parent": "2"
        })
        const btn_4 = createElementWithText('button', 'Hôtels & restaurants', {
            class: 'filter-btn',
            "data-category-parent": "3"
        })

        // Adding filter buttons to our filter box
        potfolioFilters.append(btn_1, btn_2, btn_3, btn_4)

        // Create our gallery box
        const potfolioGallery = createElement('div', { id: 'gallery', class: 'gallery' })

        // Adding all projects to our gallery
        for (let work of this.#works) {
            const item = new WorkItem(work)
            item.appendTo(potfolioGallery)
        }

        // Adding our elements to portfolio
        element.append(potfolioFilters, potfolioGallery)
    }

    /**@param {HTMLElement} element */
    appendNewElementTo(element) {
        // Adding the new project to our gallery
        const item = new WorkItem(this.#works)
        item.appendTo(element)
    }

    /**@param {HTMLElement} element */
    filterGallery(element) {
        // Replacing our projects with new filtred projects
        element.innerHTML = ''

        for (let work of this.#works) {
            const item = new WorkItem(work)
            item.appendTo(element)
        }
    }
}

class WorkItem {

    #element

    /**@type {Work} */
    constructor(Work) {
        // Create elements of our Works item
        const figure = createElement('figure', {
            id: `project_id_${Work.id}`,
            class: 'work show',
            'data-category-id': Work.categoryId
        })
        const image = createElement('img', {
            src: Work.imageUrl,
            alt: Work.title
        })
        const figcaption = createElement('figcaption')
        figcaption.innerText = Work.title

        // Add img & figcaption to figure
        figure.append(image, figcaption)
        this.#element = figure
    }

    /**@param {HTMLElement} element */
    appendTo(element) {
        element.append(this.#element)
    }
}