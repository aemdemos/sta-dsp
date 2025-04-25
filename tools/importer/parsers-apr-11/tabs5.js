/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create table rows
  const createTabRow = (label, content) => [
    label,
    content,
  ];

  // Extract content from the provided element
  const headerRow = ['Tabs']; // Block type header row
  const contentRows = [];

  const title = element.querySelector('h2')?.textContent.trim();
  const description = element.querySelector('p')?.textContent.trim();

  const buttons = Array.from(element.querySelectorAll('.button-group > a')).map((button) => {
    const label = button.textContent.trim();
    const link = document.createElement('a');
    link.href = button.href;
    link.textContent = button.href;

    const content = document.createElement('div');
    content.append(label, document.createElement('br'), link);

    contentRows.push(createTabRow(label, content));
  });

  const tableData = [headerRow, ...contentRows];

  // Create block table
  const tableBlock = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the new block table
  element.replaceWith(tableBlock);
}