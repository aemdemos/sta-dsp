/* global WebImporter */
export default function parse(element, { document }) {
  // Validate the input elements and ensure proper extraction
  const headerRow = ['Search (search69)'];

  // Extract the relevant URL from the anchor tag
  const link = element.querySelector('a[href]');
  // Handle a missing anchor tag scenario gracefully
  const urlCell = link ? link.cloneNode(true) : document.createTextNode('No URL found');

  // Construct the table data dynamically
  const tableData = [
    headerRow,
    [urlCell]
  ];

  // Create the table using the helper function
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}