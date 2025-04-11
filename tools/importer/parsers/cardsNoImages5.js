/* global WebImporter */
export default function parse(element, { document }) {
  // Define the table header row
  const headerRow = ['Cards (no images)'];

  // Initialize rows array
  const rows = [];

  // Extract content from the HTML element dynamically
  const title = element.querySelector('h2')?.textContent.trim();
  const description = element.querySelector('p')?.textContent.trim();
  const buttons = Array.from(element.querySelectorAll('.button-group a')).map((button) => {
    const link = document.createElement('a');
    link.href = button.href;
    link.textContent = button.textContent.trim();
    return link;
  });

  // Handling title, adding it as a strong element dynamically
  if (title) {
    const heading = document.createElement('strong');
    heading.textContent = title;
    rows.push([heading]);
  }

  // Handling description and buttons dynamically
  if (description || buttons.length > 0) {
    const content = document.createElement('div');

    if (description) {
      const para = document.createElement('p');
      para.textContent = description;
      content.appendChild(para);
    }

    if (buttons.length > 0) {
      const buttonContainer = document.createElement('div');
      buttons.forEach((button) => buttonContainer.appendChild(button));
      content.appendChild(buttonContainer);
    }

    rows.push([content]);
  }

  // Combine header row and dynamically generated rows
  const tableData = [headerRow, ...rows];

  // Create the block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the newly created block table
  element.replaceWith(block);
}