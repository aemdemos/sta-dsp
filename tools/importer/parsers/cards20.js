/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Initialize an array to hold card data
  const cards = [];

  // Step 2: Extract all card elements dynamically
  const cardElements = element.querySelectorAll('.card');

  cardElements.forEach((card) => {
    // Extract title, description, and link dynamically
    const title = card.querySelector('h3')?.textContent || '';
    const description = card.querySelector('p')?.textContent || '';
    const link = card.querySelector('a');

    // Create link element dynamically
    const linkElement = link
      ? Object.assign(document.createElement('a'), {
          href: link.href,
          textContent: link.textContent,
        })
      : '';

    // Combine content into a single cell
    const cardContent = document.createElement('div');
    if (title) {
      const titleElement = document.createElement('h3');
      titleElement.textContent = title;
      cardContent.appendChild(titleElement);
    }
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;
      cardContent.appendChild(descriptionElement);
    }
    if (linkElement) {
      cardContent.appendChild(linkElement);
    }

    // Add the card content to the cards array
    cards.push([cardContent]);
  });

  // Table Header: Ensure it matches the example exactly
  const tableData = [
    ['Cards'],
    ...cards,
  ];

  // Generate the table dynamically
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}