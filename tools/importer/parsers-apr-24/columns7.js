/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the relevant content from the input element
  const columns = [];

  // Extract the left column content
  const leftColumn = document.createElement('div');
  const image = element.querySelector('img');
  const heading = element.querySelector('h2');
  const paragraph = element.querySelector('p');
  if (image) leftColumn.appendChild(image.cloneNode(true));
  if (heading) leftColumn.appendChild(heading.cloneNode(true));
  if (paragraph) leftColumn.appendChild(paragraph.cloneNode(true));
  columns.push(leftColumn);

  // Extract the right column content
  const rightColumn = document.createElement('div');
  const cardContent = element.querySelector('#questions-doctor .card-content__text');
  if (cardContent) rightColumn.appendChild(cardContent.cloneNode(true));
  columns.push(rightColumn);

  // Create the block table
  const cells = [
    ['Columns'],
    columns
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}