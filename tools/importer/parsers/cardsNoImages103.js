/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row with exact text structure (no markdown formatting)
  const headerRow = ['Cards (cardsNoImages103)'];

  // Get immediate child elements, accounting for edge cases like missing cards
  const cards = element.querySelectorAll(':scope > div > div > section > div');

  if (cards.length === 0) {
    console.warn('No cards found in the provided element.');
    return;
  }

  // Process each card
  const rows = Array.from(cards).map((card) => {
    const cellContent = [];

    // Extract heading (if available)
    const heading = card.querySelector('h2, h3');
    if (heading) {
      cellContent.push(heading);
    }

    // Extract body copy (if available)
    const bodyCopy = card.querySelector('.o5-simple-card-grouping__bodycopy');
    if (bodyCopy) {
      cellContent.push(bodyCopy);
    }

    // Extract elements with 'src' attributes and convert them to links (if applicable)
    const srcElements = card.querySelectorAll('[src]:not(img)');
    if (srcElements.length > 0) {
      srcElements.forEach((srcElement) => {
        const link = document.createElement('a');
        link.href = srcElement.src;
        link.textContent = srcElement.src;
        cellContent.push(link);
      });
    }

    // Ensure the row is not empty
    if (cellContent.length === 0) {
      console.warn('Empty card content encountered.');
      return null; // Skip empty rows
    }

    return [cellContent];
  }).filter(Boolean); // Remove null rows

  // Create the table
  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}