/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // First row: block name
  rows.push(['Cards']);

  const cards = element.querySelectorAll('.card');

  cards.forEach((card) => {
    const image = card.querySelector('.card-thumb__img');
    const cardText = card.querySelector('.card-content__text');

    const imageElement = document.createElement('img');
    imageElement.src = image.src;
    imageElement.alt = image.alt;

    const title = cardText.querySelector('h2')?.textContent || '';
    const description = cardText.querySelector('p')?.innerHTML || '';
    const linkElement = cardText.querySelector('a');

    const content = [];

    if (title) {
      const headingElement = document.createElement('h2');
      headingElement.textContent = title;
      content.push(headingElement);
    }

    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.innerHTML = description;
      content.push(descriptionElement);
    }

    if (linkElement) {
      const link = document.createElement('a');
      link.href = linkElement.href;
      link.target = '_blank';
      link.textContent = linkElement.textContent;
      content.push(link);
    }

    rows.push([imageElement, content]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}