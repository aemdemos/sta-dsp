/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content dynamically from the element

  // Create the header row
  const headerRow = ['Columns'];

  // Prepare rows for the table
  const rows = [];

  // Extract cards with content
  const cards = element.querySelectorAll('.card');
  if (cards.length > 0) {
    const contentRow = Array.from(cards).map((card) => {
      const img = card.querySelector('img');
      const title = card.querySelector('h2');
      const description = card.querySelector('p');
      const link = card.querySelector('a');

      const imageElement = img ? document.createElement('img') : null;
      if (img) {
        imageElement.src = img.src;
        imageElement.alt = img.alt;
      }

      const titleText = title ? title.textContent.trim() : '';
      const descriptionText = description ? description.textContent.trim() : '';
      const linkElement = link ? document.createElement('a') : null;
      if (link) {
        linkElement.href = link.href;
        linkElement.textContent = link.textContent.trim();
      }

      const cellContent = [];
      if (imageElement) cellContent.push(imageElement);
      if (titleText) cellContent.push(titleText);
      if (descriptionText) cellContent.push(descriptionText);
      if (linkElement) cellContent.push(linkElement);

      return [cellContent];
    });

    rows.push(...contentRow);
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}