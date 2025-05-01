/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row for the table
  const headerRow = ['Columns'];

  // Extract content for the first column
  const image = element.querySelector('img');
  const imgElement = document.createElement('img');
  imgElement.src = image.src;
  imgElement.alt = image.alt;

  const heading = element.querySelector('h2');
  const paragraph = element.querySelector('p');

  const firstColumnContent = [imgElement, heading, paragraph];

  // Extract content for the second column
  const cardContent = element.querySelector('.card-content');
  const cardHeading = cardContent.querySelector('h5');
  const cardList = cardContent.querySelector('ul');

  const secondColumnContent = [cardHeading, cardList];

  // Create rows for the table
  const tableRows = [
    headerRow,
    [firstColumnContent, secondColumnContent]
  ];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}