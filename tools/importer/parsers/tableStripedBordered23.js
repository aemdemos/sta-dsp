/* global WebImporter */
export default function parse(element, { document }) {
  // Define header row matching the example EXACTLY
  const headerRow = ['Table (striped, bordered, tableStripedBordered23)'];

  // Locate relevant sections within the element
  const firstDiv = element.querySelector('.o5back-top.fixed.hidden');
  const secondDiv = element.querySelector('.o5back-top.static');

  // Validate and extract content dynamically
  const rows = [];
  if (firstDiv) rows.push([firstDiv]);
  if (secondDiv) rows.push([secondDiv]);

  // Ensure at least one row exists beyond the header
  if (rows.length === 0) rows.push(['No data available']);

  // Create table structure matching example markdown structure
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}