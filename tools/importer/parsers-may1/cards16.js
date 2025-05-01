/* global WebImporter */

export default function parse(element, { document }) {
  const cards = [];

  // Extract card data
  const cardElements = element.querySelectorAll('.card');

  cardElements.forEach((card) => {
    const image = card.querySelector('.card-thumb__img');
    const title = card.querySelector('h2');
    const description = card.querySelector('p');
    const actionLink = card.querySelector('.card-action a');

    const imageElement = document.createElement('img');
    imageElement.src = image.src;
    imageElement.alt = image.alt;

    const cardContent = [];
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title.textContent;
      cardContent.push(titleElement);
    }

    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description.textContent;
      cardContent.push(descriptionElement);
    }

    if (actionLink) {
      const linkElement = document.createElement('a');
      linkElement.href = actionLink.href;
      linkElement.textContent = actionLink.textContent;
      cardContent.push(linkElement);
    }

    cards.push([imageElement, cardContent]);
  });

  // Create cards block table
  const cells = [
    ['Cards'],
    ...cards
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}