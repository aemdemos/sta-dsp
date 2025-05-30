/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns']; // Correcting header row to match example

  // Extract individual sections from the HTML
  const rows = [];

  element.querySelectorAll(':scope > div').forEach(section => {
    const columns = section.querySelectorAll(':scope > div > div > div > div');

    // Handle each column in a section
    const cellContents = [];
    columns.forEach(column => {
      const content = document.createElement('div');
      Array.from(column.childNodes).forEach(child => {
        // Check if the child element has a 'src' attribute (e.g., iframe)
        if (child.src && child.tagName !== 'IMG') {
          const link = document.createElement('a');
          link.href = child.src;
          link.textContent = 'Link';
          content.appendChild(link);
        } else {
          content.appendChild(child.cloneNode(true));
        }
      });
      cellContents.push(content);
    });

    // Skip empty rows
    if (cellContents.length > 0) {
      rows.push(cellContents);
    }
  });

  // Create the table
  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the generated block table
  element.replaceWith(blockTable);
}