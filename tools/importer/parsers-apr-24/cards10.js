/* global WebImporter */
export default function parse(element, { document }) {
  // Correcting the header row issue - ensuring it matches the example
  const rows = [
    ['Cards'], // Header row
  ];

  // Extract information from the cards
  const cards = [...element.querySelectorAll('.col')];

  cards.forEach((card) => {
    const titleElement = card.querySelector('h3');
    const paragraphs = [...card.querySelectorAll('p')];

    // Extract title content dynamically
    const title = titleElement ? titleElement.textContent.trim() : '';

    // Create content dynamically from paragraph elements
    const content = paragraphs.map((p) => {
      const div = document.createElement('div');
      div.append(p);
      return div;
    });

    // Add row to the table
    rows.push([
      title, // Title as plain text
      content, // Array of content elements
    ]);
  });

  // Use createTable to generate the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}