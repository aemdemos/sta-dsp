/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the table
  const headerRow = ['Cards'];

  // Extract all cards within the element
  const cards = Array.from(element.querySelectorAll('.card')).map((card) => {
    // Extract the title, description, and action link from each card
    const titleElement = card.querySelector('h3');
    const descriptionElement = card.querySelector('p');
    const actionLinkElement = card.querySelector('a');

    const title = titleElement ? document.createElement('h3') : null;
    if (titleElement) {
      title.textContent = titleElement.textContent.trim();
    }

    const description = descriptionElement ? document.createElement('p') : null;
    if (descriptionElement) {
      description.textContent = descriptionElement.textContent.trim();
    }

    const actionLink = actionLinkElement ? document.createElement('a') : null;
    if (actionLinkElement) {
      actionLink.href = actionLinkElement.href;
      actionLink.textContent = actionLinkElement.textContent.trim();
    }

    // Combine the extracted content into a single cell
    const textCellContent = [title, description, actionLink].filter(Boolean);
    return [textCellContent];
  });

  // Combine the header row and the card rows into the table structure
  const cells = [headerRow, ...cards];

  // Create the table block using the helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table block
  element.replaceWith(block);
}