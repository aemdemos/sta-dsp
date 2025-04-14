/* global WebImporter */

export default function parse(element, { document }) {
  // Header row containing block name
  const headerRow = ['Columns'];

  // Extracting content from the left column
  const leftColumn = element.querySelector('.col-lg-6:nth-child(1)');
  const titleElement = leftColumn.querySelector('h2');
  const title = titleElement ? titleElement.innerText : '';

  const paragraphs = leftColumn.querySelectorAll('p');
  const contentItems = [
    title ? document.createElement('p').appendChild(document.createTextNode(title)) : null,
    ...Array.from(paragraphs).map(p => {
      const paragraph = document.createElement('p');
      paragraph.innerHTML = p.innerHTML;
      return paragraph;
    })
  ].filter(Boolean); // Filter out null values

  // Extracting content from the right column
  const rightColumn = element.querySelector('.col-lg-6:nth-child(2)');
  const imgElement = rightColumn.querySelector('img');

  const image = document.createElement('img');
  if (imgElement) {
    image.setAttribute('src', imgElement.getAttribute('src'));
    image.setAttribute('alt', imgElement.getAttribute('alt'));
  }

  // Constructing table cells
  const cells = [
    headerRow,
    [contentItems, imgElement ? image : null],
  ];

  // Creating the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(cells.filter(row => row.some(cell => cell !== null)), document);

  // Replacing the original element with the new block table
  element.replaceWith(table);
}