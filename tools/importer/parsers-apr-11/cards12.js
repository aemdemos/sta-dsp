/* global WebImporter */
export default function parse(element, { document }) {
  const tableData = [];

  // Add the header row
  tableData.push(['Cards']);

  // Select all card elements
  const cards = element.querySelectorAll('.card');
  cards.forEach((card) => {
    const image = card.querySelector('.card-thumb img');
    const title = card.querySelector('h2');
    const description = card.querySelector('p');
    const cta = card.querySelector('a');

    // Ensure image element is dynamically created
    const imageElement = document.createElement('img');
    imageElement.src = image ? image.src : '';
    imageElement.alt = image ? image.alt : '';

    const content = [];

    // Dynamically handle title
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title.textContent;
      content.push(titleElement);
      content.push(document.createElement('br'));
    }

    // Dynamically handle description
    if (description) {
      const descriptionElement = document.createElement('span');
      descriptionElement.textContent = description.textContent;
      content.push(descriptionElement);
      content.push(document.createElement('br'));
    }

    // Dynamically handle call-to-action
    if (cta) {
      const ctaElement = document.createElement('a');
      ctaElement.href = cta.href;
      ctaElement.target = cta.target;
      ctaElement.textContent = cta.textContent;
      content.push(ctaElement);
    }

    tableData.push([imageElement, content]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}