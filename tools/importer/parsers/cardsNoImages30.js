/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract card content
  const extractCardContent = (card) => {
    const header = card.querySelector('h2, h3');
    const description = card.querySelector('.o5-simple-card-grouping__bodycopy');
    const buttons = card.querySelectorAll('.o5-simple-card-grouping__buttons a');

    const content = [];

    if (header) {
      content.push(header);
    }

    if (description) {
      content.push(description);
    }

    if (buttons.length > 0) {
      buttons.forEach((button) => {
        const link = document.createElement('a');
        link.href = button.href;
        link.textContent = button.textContent;
        content.push(link);
      });
    }

    return content;
  };

  // Extract cards
  const cards = element.querySelectorAll('.o5-simple-card-grouping__card');

  const rows = [
    ['Cards (cardsNoImages30)'], // Header row
  ];

  cards.forEach((card) => {
    const content = extractCardContent(card);
    rows.push([content]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}