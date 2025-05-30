/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure all content is dynamically extracted
  const links = Array.from(element.querySelectorAll(':scope a')); // Extract only immediate child <a> elements

  if (links.length === 0) {
    console.warn('No links found in the provided element');
    return;
  }

  // Prepare the header row
  const headerRow = ['Table (striped, bordered, tableStripedBordered12)'];

  // Prepare the data rows dynamically based on links available in the element
  const dataRows = links.map(link => {
    const text = link.textContent.trim();
    const href = link.href;

    if (!text || !href) {
      console.warn('Missing text content or href for a link');
      return [text || 'N/A', href || 'N/A']; // Handle edge cases
    }

    // Reference existing elements directly
    const linkElement = document.createElement('a');
    linkElement.href = href;
    linkElement.textContent = text;

    return [text, linkElement];
  }).filter(row => row.length > 0); // Ensure rows are valid

  if (dataRows.length === 0) {
    console.warn('No valid rows extracted from the links');
    return;
  }

  // Combine header and data rows
  const tableData = [headerRow, ...dataRows];

  // Create the table using dynamic data
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the newly structured table
  element.replaceWith(table);

  return table; // Return the new structured element
}