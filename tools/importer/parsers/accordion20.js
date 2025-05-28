/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion (accordion20)'];

  // Initialize rows array to store title and content pairs
  const rows = [];

  // Extract the "Previous page" section
  const backElement = element.querySelector(':scope > .o5-plu-sharebar__back');
  if (backElement) {
    const title = backElement.querySelector('a');
    const content = document.createTextNode('No additional content provided');
    rows.push([title, content]);
  }

  // Extract the "Share bar" section
  const ctasElement = element.querySelector(':scope > .o5-plu-sharebar__ctas');
  if (ctasElement) {
    const title = ctasElement.querySelector('.o5-plu-sharebar__mobile');
    const content = ctasElement.querySelector('.o5-plu-sharebar__nav');

    // Ensure both title and content exist before adding to rows
    if (title && content) {
      rows.push([title, content]);
    }
  }

  // Combine header and rows into the table structure
  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the created block table
  element.replaceWith(blockTable);
}