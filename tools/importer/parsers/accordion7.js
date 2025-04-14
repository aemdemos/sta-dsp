/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  const cells = [headerRow];

  const leftColumn = element.querySelector('.col-lg-6:first-child');
  const rightColumn = element.querySelector('.col-lg-6:last-child');

  // Left column content
  const image = leftColumn.querySelector('img');
  const heading = leftColumn.querySelector('h2');
  const paragraph = leftColumn.querySelector('p');

  const leftContent = [];
  if (image) leftContent.push(image);
  if (heading) leftContent.push(heading);
  if (paragraph) leftContent.push(paragraph);

  // Right column content
  const card = rightColumn.querySelector('.card-content__text');
  const cardHeading = card?.querySelector('h5');
  const list = card?.querySelector('ul');

  const rightContent = [];
  if (cardHeading) rightContent.push(cardHeading);
  if (list) rightContent.push(list);

  cells.push([leftContent, rightContent]);

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}