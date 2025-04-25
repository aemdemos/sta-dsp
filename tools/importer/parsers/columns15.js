/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract content from the left column (text content)
  const leftColumn = document.createElement('div');
  const heading = element.querySelector('h2');
  const paragraphs = element.querySelectorAll('p');

  if (heading) {
    leftColumn.appendChild(heading.cloneNode(true));
  }

  paragraphs.forEach((p) => {
    leftColumn.appendChild(p.cloneNode(true));
  });

  // Extract content from the right column (image content)
  const rightColumn = document.createElement('div');
  const image = element.querySelector('img');

  if (image) {
    rightColumn.appendChild(image.cloneNode(true));
  }

  // Create the table structure
  const cells = [
    headerRow, // Header row with block name
    [leftColumn, rightColumn], // Columns with content
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}