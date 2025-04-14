/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all cards within the provided element
  const cards = Array.from(element.querySelectorAll('.col'));

  // Map each card to rows of table data
  const rows = cards.map((card) => {
    const titleElement = card.querySelector('h3');
    const title = titleElement ? titleElement.textContent.trim() : '';

    // Extract the descriptions (p tags)
    const descriptionElements = Array.from(card.querySelectorAll('p')).map((p) => {
      const clonedDesc = p.cloneNode(true); // Clone to avoid mutation
      return clonedDesc;
    });

    // Create a wrapper div for text content
    const textWrapper = document.createElement('div');

    if (title) {
      const titleNode = document.createElement('h3');
      titleNode.textContent = title;
      textWrapper.appendChild(titleNode);
    }

    descriptionElements.forEach((desc) => textWrapper.appendChild(desc));

    // Return an array where the first column is the text wrapper
    return [textWrapper];
  });

  // Add the header row at the beginning
  const headerRow = ['Cards'];
  rows.unshift(headerRow);

  // Create a table using WebImporter
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}