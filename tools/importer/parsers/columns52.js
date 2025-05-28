/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row with <strong> formatting as specified
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns (columns52)';

  // Initialize content rows array
  const contentRows = [];

  // Get all immediate child divs of the block
  const childDivs = element.querySelectorAll(':scope > div');

  // Iterate over child divs to extract content for rows
  childDivs.forEach((div) => {
    const rowContent = [];

    div.querySelectorAll(':scope > div').forEach((child) => {
      // Handle elements with 'src' attribute (e.g., iframes) by converting them to links
      if (child.hasAttribute('src') && child.tagName.toLowerCase() !== 'img') {
        const link = document.createElement('a');
        link.href = child.getAttribute('src');
        link.textContent = child.getAttribute('src');
        rowContent.push(link);
      } else if (child.textContent.trim() || child.querySelectorAll('*').length > 0) {
        // Ensure empty elements are skipped
        rowContent.push(child);
      }
    });

    if (rowContent.length > 0) {
      contentRows.push(rowContent);
    }
  });

  // Construct the table data ensuring header format and content rows
  const tableData = [headerRow, ...contentRows];

  // Create the table block using WebImporter utility
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the created table block
  element.replaceWith(table);
}