/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  // Extract all card elements
  const cards = [...element.querySelectorAll('.card')];

  // Create rows for each card
  const rows = cards.map((card) => {
    const image = card.querySelector('.card-thumb__img');
    const imgElement = document.createElement('img');
    imgElement.src = image.src;
    imgElement.alt = image.alt;

    const title = card.querySelector('h2');
    const titleElement = title ? document.createElement('strong') : null;
    if (titleElement) {
      titleElement.textContent = title.textContent;
    }

    const description = card.querySelector('p');
    const descriptionElement = description ? document.createElement('p') : null;
    if (descriptionElement) {
      descriptionElement.textContent = description.textContent;
    }

    const button = card.querySelector('a');
    const buttonElement = button ? document.createElement('a') : null;
    if (buttonElement) {
      buttonElement.href = button.href;
      buttonElement.textContent = button.textContent;
    }

    const contentArray = [titleElement, descriptionElement, buttonElement].filter(Boolean);

    return [imgElement, contentArray];
  });

  // Combine header and rows
  const tableData = [headerRow, ...rows];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with block table
  element.replaceWith(blockTable);
}