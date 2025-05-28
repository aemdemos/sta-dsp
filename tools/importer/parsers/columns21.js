/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns21)'];

  // Extracting relevant content
  const columnDivs = element.querySelectorAll(':scope > div > div > div > div');

  // Get the left column image
  const leftColumn = columnDivs[0];
  const pictureElement = leftColumn.querySelector('picture');
  const imgElement = pictureElement ? pictureElement.querySelector('img') : null;

  // Get the right column text and links
  const rightColumn = columnDivs[1];
  const textComponent = rightColumn.querySelector('.text-component');
  const heading = textComponent ? textComponent.querySelector('h2') : null;
  const paragraph = textComponent ? textComponent.querySelector('p') : null;
  const list = textComponent ? textComponent.querySelector('ul') : null;

  // Create table data rows
  const cells = [
    headerRow,
    [imgElement, [heading, paragraph, list].filter(Boolean)],
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with new block table
  element.replaceWith(block);
}