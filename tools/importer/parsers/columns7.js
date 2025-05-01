/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting the first column content
  const firstColumn = document.createElement('div');

  const img = element.querySelector('img');
  if (img) {
    firstColumn.append(img);
  }

  const heading = element.querySelector('h2');
  if (heading) {
    firstColumn.append(heading);
  }

  const paragraph = element.querySelector('p');
  if (paragraph) {
    firstColumn.append(paragraph);
  }

  // Extracting the second column content
  const secondColumn = document.createElement('div');

  const card = element.querySelector('.card-content');
  if (card) {
    secondColumn.append(card);
  }

  const blockData = [
    ['Columns'],
    [firstColumn, secondColumn],
  ];

  const table = WebImporter.DOMUtils.createTable(blockData, document);

  // Replacing the original element with the generated table
  element.replaceWith(table);
}