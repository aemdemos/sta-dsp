/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant information from the provided element
  const label = element.querySelector('label');
  const selectWrapper = element.querySelector('.uib-customselect__wrapper');

  // Ensure dynamic content extraction and proper structure
  if (!label || !selectWrapper) {
    console.warn('Missing required elements in parse function');
    return;
  }

  // Create the header with strong formatting
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Table (no header, tableNoHeader7)';

  // Combine label and selectWrapper into a single cell for the content row
  const contentRow = [[label, selectWrapper]];

  const tableData = [headerRow, contentRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}