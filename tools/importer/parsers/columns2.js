/* global WebImporter */
 export default function parse(element, { document }) {
  const rows = [];

  // Add header row
  rows.push(['Columns']);

  // Extract columns content
  const columns = [...element.querySelectorAll('.col')];
  const columnData = columns.map((col) => {
    const cardContent = col.querySelector('.card-content');
    const cardAction = col.querySelector('.card-action');

    const title = cardContent.querySelector('h3')?.textContent.trim() || '';
    const paragraph = cardContent.querySelector('p')?.textContent.trim() || '';

    // Extract link from the card action
    const link = cardAction.querySelector('a');
    const linkElement = link ? document.createElement('a') : null;
    if (linkElement) {
      linkElement.href = link.href;
      linkElement.textContent = link.textContent.trim();
    }

    const contentElements = [];
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title;
      contentElements.push(titleElement);
    }
    if (paragraph) {
      const paragraphElement = document.createElement('p');
      paragraphElement.textContent = paragraph;
      contentElements.push(paragraphElement);
    }
    if (linkElement) {
      contentElements.push(linkElement);
    }

    return contentElements;
  });

  rows.push(columnData);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}