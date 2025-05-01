/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Validate if the section needs Section Metadata
  // No Section Metadata is described in the example Markdown structure, so we skip adding it.

  // Create section break
  const hr = document.createElement('hr');

  // Define header row for Accordion block
  const headerRow = ['Accordion'];

  // Extract FAQ items from the accordion
  const rows = [...element.querySelectorAll('.accordion > h3')].map((header) => {
    const title = header.querySelector('button');
    const content = header.nextElementSibling;

    // Handle edge case: Verify if title and content exist
    if (!title || !content) {
      return [];
    }

    // Title cell (mandatory)
    const titleCell = document.createElement('div');
    titleCell.textContent = title.textContent.trim();

    // Content cell (mandatory)
    const contentCell = document.createElement('div');
    contentCell.innerHTML = content.innerHTML.trim();

    return [titleCell, contentCell];
  }).filter(row => row.length > 0); // Filter out invalid rows

  // Combine header row and content rows into table structure
  const tableData = [headerRow, ...rows];

  // Create the Accordion block table
  const accordionBlock = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with Accordion block table
  element.replaceWith(hr, accordionBlock);
}