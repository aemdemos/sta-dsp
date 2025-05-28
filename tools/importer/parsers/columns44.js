/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns44)'];

  // Extract all child columns directly under the footer container
  const columns = Array.from(
    element.querySelectorAll(':scope > div > div > div > div')
  );

  // Create content rows with separate columns for each section
  const contentRow = columns.map((column) => {
    const heading = column.querySelector('p');
    const list = column.querySelector('ul');

    // Combine the heading and all links from the list into a cell
    const headingElement = heading ? heading.textContent : '';
    const items = Array.from(list?.children || []).map((li) => {
      const link = li.querySelector('a');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent;
      return a;
    });

    return [headingElement, items];
  });

  // Combine header and content rows into the table
  const tableCells = [headerRow, ...contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}