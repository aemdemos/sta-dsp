/* global WebImporter */
export default function parse(element, { document }) {
  // Extract cards from the input element
  const cards = Array.from(element.querySelectorAll('.card'));

  // Prepare the table rows
  const rows = [['Cards']]; // Header row

  cards.forEach((card) => {
    const img = card.querySelector('.card-thumb__img');
    const title = card.querySelector('h3');
    const description = card.querySelector('ul');

    // Create structured content for the cell
    const imageElement = img ? document.createElement('img') : null;
    if (imageElement) {
      imageElement.src = img.src;
      imageElement.alt = img.alt;
    }

    const content = [];
    if (title) {
      const titleElement = document.createElement('h3');
      titleElement.textContent = title.textContent;
      content.push(titleElement);
    }

    if (description) {
      const descriptionElement = document.createElement('ul');
      descriptionElement.innerHTML = description.innerHTML;
      content.push(descriptionElement);
    }

    rows.push([imageElement, content]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}