/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the title
  const titleElement = element.querySelector('h1.text-title');
  const title = document.createElement('h1');
  title.textContent = titleElement ? titleElement.textContent : '';

  // Extract the subheading
  const subheadingElement = element.querySelector('p');
  const subheading = document.createElement('p');
  subheading.textContent = subheadingElement ? subheadingElement.textContent : '';

  // Create the table cells
  const cells = [
    ['Hero'],
    [[title, subheading]] // Consolidate contents into a single cell in the second row
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}