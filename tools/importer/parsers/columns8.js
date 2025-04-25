/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Create section break (hr) element
  const hr = document.createElement('hr');

  // There is NO "section metadata" block defined in the Example Markdown Structure.
  // Hence, section metadata table will not be added.

  // Step 2: Initialize rows for the "Columns" block table.
  const rows = [];
  // Add header row matching the example (block name)
  rows.push(['Columns']);

  // Step 3: Extract columns from the element dynamically
  const columns = element.querySelectorAll('.col');
  const contentCells = Array.from(columns).map((col) => {
    const content = [];

    col.childNodes.forEach((child) => {
      if (child.nodeType === 1) { // Fix: Use numeric constant for ELEMENT_NODE
        if (child.tagName === 'IMG') {
          // Dynamically handle image elements
          const img = document.createElement('img');
          img.src = child.src;
          img.alt = child.alt;
          content.push(img);
        } else {
          // Handle all other elements directly
          content.push(child);
        }
      }
    });

    return content;
  });

  rows.push(contentCells); // Add extracted content to rows

  // Step 4: Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Step 5: Replace original element with the new table
  element.replaceWith(hr, table);
}