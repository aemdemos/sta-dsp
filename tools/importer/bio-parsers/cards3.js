/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the cards container
  const cards = Array.from(element.querySelectorAll('.col')); 

  // Prepare the table rows
  const rows = [
    ['Cards'], // Header row matching the example exactly
  ];

  cards.forEach((card) => {
    const img = card.querySelector('.card-thumb__img');
    const title = card.querySelector('h2');
    const description = card.querySelector('p');
    const link = card.querySelector('a');

    // Image element
    const imageElement = document.createElement('img');
    imageElement.src = img ? img.src : '';
    imageElement.alt = img ? img.alt : '';

    // Text content
    const textContent = [];
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title.textContent;
      textContent.push(titleElement);
    }
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description.textContent;
      textContent.push(descriptionElement);
    }
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent;
      textContent.push(linkElement);
    }

    rows.push([imageElement, textContent]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the element
  element.replaceWith(table);
}