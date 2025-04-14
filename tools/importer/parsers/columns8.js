/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content from the left column
  const leftColumn = element.querySelector('.col.col-lg-6:first-child');
  const heading = leftColumn.querySelector('h2');
  const paragraph = leftColumn.querySelector('p');
  const subheading = leftColumn.querySelector('h4');
  const list = leftColumn.querySelector('ul');

  // Extract content from the right column
  const rightColumn = element.querySelector('.col.col-lg-6:last-child');
  const image = rightColumn.querySelector('img');

  // Create structured content for the block table
  const headerRow = ['Columns'];
  const contentRow = [
    [heading, paragraph, subheading, list], // Left column content
    [image], // Right column content
  ];

  const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}