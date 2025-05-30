/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row using provided block name
  const headerRow = ['Accordion (accordion87)'];

  // Initialize rows for the table
  const rows = [];

  // Extract all accordion sections dynamically
  const titleElement = element.querySelector('h3 .o5-accordion__basic-question');
  const contentElement = element.querySelector('.o5-accordion__basic-answer');

  // Handle edge cases: missing title or content
  if (titleElement && contentElement) {
    rows.push([titleElement, contentElement]);
  }

  // Combine header and accordion rows into table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the newly created block table
  element.replaceWith(blockTable);
}