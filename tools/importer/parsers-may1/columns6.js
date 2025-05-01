/* global WebImporter */
export default function parse(element, { document }) {
  // Extract column elements from the container
  const rows = element.querySelectorAll('.row');
  const tableData = [];

  // Header row for the Columns block
  tableData.push(['Columns']);

  rows.forEach((row) => {
    const cells = [];

    // Extract columns within the row
    row.querySelectorAll('.col').forEach((col) => {
      const cellContent = [];

      // Extract text content and images
      col.childNodes.forEach((child) => {
        if (child.nodeName === 'IMG') {
          const img = document.createElement('img');
          img.setAttribute('src', child.getAttribute('src'));
          img.setAttribute('srcset', child.getAttribute('srcset'));
          img.setAttribute('alt', child.getAttribute('alt'));
          img.setAttribute('width', child.getAttribute('width'));
          img.setAttribute('height', child.getAttribute('height'));
          cellContent.push(img);
        } else {
          const text = child.textContent.trim();
          if (text) {
            cellContent.push(document.createTextNode(text));
          }
        }
      });

      cells.push(cellContent);
    });

    tableData.push(cells);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the new block
  element.replaceWith(block);
}