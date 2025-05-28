/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add header row
  const headerRow = ['Embed (embedVideo45)'];
  cells.push(headerRow);

  // Extract content for the second row
  const contentRow = [];

  // Extract text content
  const message = element.querySelector(':scope .o5-dynamic-alerts__message');
  if (message) {
    contentRow.push(message);
  }

  // Extract an image if available
  const image = element.querySelector(':scope img');
  if (image) {
    contentRow.push(image);
  }

  // Extract the link
  const link = element.querySelector(':scope a[href]');
  if (link) {
    const url = document.createElement('a');
    url.href = link.href;
    url.textContent = link.textContent.trim();
    contentRow.push(url);
  }

  // Add content row
  cells.push([contentRow]);

  // Create the table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}