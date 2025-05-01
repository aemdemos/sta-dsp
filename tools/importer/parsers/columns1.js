/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row with block name
  const headerRow = ['Columns'];
  rows.push(headerRow);

  // Extract content from the HTML and create columns
  const columns = Array.from(element.querySelectorAll('.col')).map((col) => {
    const content = [];

    // Extract title
    const title = col.querySelector('h3');
    if (title) {
      content.push(title.textContent.trim());
    }

    // Extract description
    const description = col.querySelector('p');
    if (description) {
      content.push(description.textContent.trim());
    }

    // Extract link
    const link = col.querySelector('a');
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent.trim();
      content.push(linkElement);
    }

    return content;
  });

  // Add columns to the table
  rows.push(columns);

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}