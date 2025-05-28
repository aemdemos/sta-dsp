/* global WebImporter */
export default function parse(element, { document }) {
  // Define header row
  const headerRow = ['Table (striped, bordered, tableStripedBordered61)'];

  // Extract heading dynamically
  const filterHeading = element.querySelector('#search-heading');

  // Extract button dynamically and keep full semantic context
  const closeButton = element.querySelector('#filters-popover-close-btn');

  // Handle edge cases for missing elements
  const rows = [
    headerRow,
  ];
  if (filterHeading) {
    rows.push([filterHeading]);
  }
  if (closeButton) {
    rows.push([closeButton]);
  }

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}