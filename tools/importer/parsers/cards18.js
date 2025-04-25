/* global WebImporter */
 export default function parse(element, { document }) {
  // Create header row for the Cards block
  const headerRow = ['Cards'];

  // Extract card data from the provided HTML
  const cards = Array.from(element.querySelectorAll('.col')).map((col) => {
    const image = col.querySelector('img');
    const title = col.querySelector('h3');
    const description = col.querySelector('ul');

    const imageElement = document.createElement('img');
    imageElement.src = image.src;
    imageElement.alt = image.alt;

    const titleElement = document.createElement('strong');
    titleElement.textContent = title.textContent;

    const descriptionElement = description.cloneNode(true);

    return [imageElement, [titleElement, descriptionElement]];
  });

  // Combine the header and card rows into a table array
  const tableData = [headerRow, ...cards];

  // Create the table block using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}