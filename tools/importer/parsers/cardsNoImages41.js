/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row based on the example provided
  const headerRow = ['Cards (cardsNoImages41)'];

  const rows = [];

  // Extract relevant content from the provided HTML element
  const childElements = element.querySelectorAll(':scope > ul, :scope > div');

  childElements.forEach((child) => {
    if (child.tagName === 'UL') {
      // Process the UL for date, time, location, and combine all related information into one cell
      const combinedContent = document.createElement('div');

      const dateItem = child.querySelector('.calendar-sf-results__date');
      const timeItem = child.querySelector('.calendar-sf-results__display-time');
      const addressItem = child.querySelector('a.address-link');

      if (dateItem) {
        combinedContent.appendChild(dateItem);
      }

      if (timeItem) {
        combinedContent.appendChild(timeItem);
      }

      if (addressItem) {
        combinedContent.appendChild(addressItem);
      }

      rows.push([combinedContent]);
    }

    if (child.tagName === 'DIV' && child.classList.contains('calendar-sf-results__description')) {
      // Process the description div and combine meaningful content into one cell
      const descriptionContent = document.createElement('div');

      const paragraphs = child.querySelectorAll('p');
      paragraphs.forEach((p) => {
        if (p.textContent.trim()) {
          descriptionContent.appendChild(p);
        }
      });

      rows.push([descriptionContent]);
    }
  });

  // Combine header and rows into cells array
  const cells = [headerRow, ...rows];

  // Create the block table based on the extracted content
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}