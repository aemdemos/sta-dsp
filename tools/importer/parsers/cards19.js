/* global WebImporter */

export default function parse(element, { document }) {
  // Helper function to extract content from a card
  const extractCardData = (cardElement) => {
    const title = cardElement.querySelector('h3')?.textContent.trim() || '';
    const description = cardElement.querySelector('p')?.textContent.trim() || '';
    const linkElement = cardElement.querySelector('a');
    const link = linkElement ? linkElement.cloneNode(true) : null;

    // Combine title, description, and link into one cell
    const cardContent = [];
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title;
      cardContent.push(titleElement);
    }
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;
      cardContent.push(descriptionElement);
    }
    if (link) {
      cardContent.push(link);
    }

    return cardContent;
  };

  // Extract cards
  const cards = Array.from(element.querySelectorAll('.card'));

  // Process cards into rows
  const rows = cards.map((card) => [extractCardData(card)]);

  // Create the table structure
  const tableData = [
    ['Cards'],
    ...rows
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}