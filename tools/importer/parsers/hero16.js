/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row, exactly as specified in the example
  const headerRow = ['Hero'];

  // Dynamically extract the title and subheading from the HTML
  const title = element.querySelector('h1.text-title');
  const subheading = element.querySelector('p');

  // Combine all content into a single cell (single column) for the content row
  const contentRow = [];
  if (title) contentRow.push(title);
  if (subheading) contentRow.push(subheading);

  const tableData = [
    headerRow,
    [contentRow], // Ensure all content is combined into one column
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block structure
  element.replaceWith(blockTable);
}