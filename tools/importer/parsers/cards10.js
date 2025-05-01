/* global WebImporter */
export default function parse(element, { document }) {
  const cards = [];

  // Extracting card elements
  const cardElements = element.querySelectorAll('.card');

  cardElements.forEach((card) => {
    const imageElement = card.querySelector('img');
    const titleElement = card.querySelector('h3');
    const listElement = card.querySelector('ul');

    const image = document.createElement('img');
    image.src = imageElement.src;
    image.alt = imageElement.alt;

    const title = document.createElement('h3');
    title.textContent = titleElement.textContent;

    const list = document.createElement('ul');
    const listItems = listElement.querySelectorAll('li');
    listItems.forEach((li) => {
      const listItem = document.createElement('li');
      listItem.textContent = li.textContent;
      list.appendChild(listItem);
    });

    cards.push([image, [title, list]]);
  });

  const headerRow = ['Cards'];
  const tableData = [headerRow, ...cards];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(table);
}