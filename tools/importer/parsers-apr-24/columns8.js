/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // First row: Header row
  const headerRow = ['Columns'];
  cells.push(headerRow);

  // Content extraction
  const leftCol = document.createElement('div');
  const title = element.querySelector('h2');
  const description = element.querySelector('p');
  const sectionTitle = element.querySelector('h4');
  const list = element.querySelector('ul');

  if (title) leftCol.appendChild(title);
  if (description) leftCol.appendChild(description);
  if (sectionTitle) leftCol.appendChild(sectionTitle);
  if (list) leftCol.appendChild(list);

  const rightCol = document.createElement('div');
  const image = element.querySelector('img');

  if (image) rightCol.appendChild(image);

  // Second row: Content row
  const contentRow = [leftCol, rightCol];
  cells.push(contentRow);

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}