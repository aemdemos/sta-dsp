/* global WebImporter */
export default function parse(element, { document }) {
  // Extract header row for Tabs block
  const headerRow = ['Tabs'];

  // Extract tab labels and associated links dynamically
  const tabRows = [];

  const buttons = element.querySelectorAll('.button-group a');

  if (buttons.length === 0) {
    console.warn('No buttons found in the element.');
  }

  buttons.forEach((button) => {
    const label = button.textContent.trim(); // Extract tab label dynamically
    const link = document.createElement('a');
    link.href = button.href;
    link.textContent = label;
    tabRows.push([label, link]);
  });

  if (tabRows.length === 0) {
    console.warn('No tab rows created. Ensure buttons have correct structure.');
  }

  // Combine header row and tab rows into table structure
  const tableData = [headerRow, ...tabRows];

  // Create the table block using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}