/* global WebImporter */
export default function parse(element, { document }) {

  // Define Header Row
  const headerRow = ['Cards (cards32)'];

  // Extract all cards from the block
  const cards = Array.from(element.querySelectorAll(':scope ul.o5-quick-links__row > li'));

  // Parse each card into a row representation
  const rows = cards.map((card) => {
    const img = card.querySelector('img.o5-quick-links__icon');
    const span = card.querySelector('span.o5-quick-links__links');
    const link = card.querySelector('a.o5-quick-links__card');

    // Handle missing image or text dynamically
    const imageElement = img ? img : document.createTextNode('');
    const textContent = [];

    if (span) {
      const title = document.createElement('strong');
      title.textContent = span.textContent;
      textContent.push(title);
    }

    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.href;
      textContent.push(linkElement);
    }

    return [imageElement, textContent];
  });

  // Construct table structure
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table
  element.replaceWith(table);
}