/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const columns = Array.from(element.querySelectorAll('.col')).map((col) => {
    const title = col.querySelector('h3')?.textContent || '';
    const paragraph = col.querySelector('p')?.textContent || '';
    const link = col.querySelector('a');

    const linkElement = document.createElement('a');
    linkElement.href = link?.href || '#';
    linkElement.textContent = link?.textContent || '';

    const contentContainer = document.createElement('div');
    const titleElement = document.createElement('h3');
    titleElement.textContent = title;
    const paragraphElement = document.createElement('p');
    paragraphElement.textContent = paragraph;

    contentContainer.appendChild(titleElement);
    contentContainer.appendChild(paragraphElement);
    contentContainer.appendChild(linkElement);

    return contentContainer;
  });

  const tableData = [
    headerRow,
    columns,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}