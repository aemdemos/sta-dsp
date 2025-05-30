/* global WebImporter */
export default function parse(element, { document }) {
  // Extract child elements from the provided element
  const childElements = Array.from(element.querySelectorAll(':scope > div > p'));

  // Prepare the header row
  const headerRow = ['Table (no header, tableNoHeader98)'];

  // Prepare content rows by mapping over child elements
  const contentRows = childElements.map((child) => [child]);

  // Combine header and content rows
  const cells = [headerRow, ...contentRows];

  // Create the table using WebImporter.DOMUtils.createTable
  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(tableBlock);
}