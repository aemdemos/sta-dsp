/* global WebImporter */
export default function parse(element, { document }) {
  // Extract header row
  const headerRow = ['Columns (columns46)'];

  // Extract child sections that represent individual columns
  const columns = Array.from(
    element.querySelectorAll(':scope > div > section > div > div')
  ).map((column) => {
    return Array.from(column.children).map((child) => {
      // Handle images properly
      if (child.tagName === 'IMG') {
        return child; // Keep images as they are
      } else if (child.hasAttribute('src')) {
        const link = document.createElement('a');
        link.href = child.src;
        link.textContent = child.alt || 'Link';
        return link;
      }
      return child; // Include other elements directly
    });
  });

  // Ensure table rows match example structure
  const cells = [
    headerRow,
    ...columns.map((col) => col) // Each column as its own cell
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block table
  element.replaceWith(block);
}