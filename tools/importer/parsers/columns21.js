/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract content dynamically from the element
  const title = element.querySelector('h2')?.textContent || '';
  const description = element.querySelector('p')?.textContent || '';

  const buttons = [...element.querySelectorAll('a')].map((button) => {
    if (button.href && button.textContent) {
      const link = document.createElement('a');
      link.href = button.href;
      link.textContent = button.textContent.trim();
      return link;
    }
    return null;
  }).filter((link) => link !== null); // Filter out null values

  const contentRow = [
    `${title}\n\n${description}`,
    buttons.length > 0 ? buttons : '' // Ensure buttons are handled correctly
  ];

  const cells = [
    headerRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}