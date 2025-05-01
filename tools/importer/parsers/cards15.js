/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Block header row
  rows.push(['Cards']);

  // Processing each card within the element
  const cards = element.querySelectorAll('.card');
  cards.forEach((card) => {
    const image = card.querySelector('.card-thumb__img');
    const title = card.querySelector('h2');
    const description = card.querySelector('p');
    const actionLink = card.querySelector('.card-action a');

    const imageElement = image ? document.createElement('img') : null;
    if (imageElement) {
      imageElement.src = image.src;
      imageElement.alt = image.alt;
      imageElement.width = image.width;
      imageElement.height = image.height;
    }

    const contentElements = [];
    if (title) {
      const titleElement = document.createElement('h2');
      titleElement.textContent = title.textContent;
      contentElements.push(titleElement);
    }

    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.innerHTML = description.innerHTML;
      contentElements.push(descriptionElement);
    }

    if (actionLink) {
      const linkElement = document.createElement('a');
      linkElement.href = actionLink.href;
      linkElement.textContent = actionLink.textContent;
      contentElements.push(linkElement);
    }

    rows.push([imageElement, contentElements]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}