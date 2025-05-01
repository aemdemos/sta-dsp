/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row for the block
  rows.push(['Cards']);

  // Process each card
  const cards = element.querySelectorAll('.card-content__text');
  cards.forEach((card) => {
    const title = card.querySelector('h3')?.textContent.trim() || '';
    const paragraphs = Array.from(card.querySelectorAll('p'))
      .map((p) => {
        const para = document.createElement('p');
        para.textContent = p.textContent.trim();
        return para;
      });

    const content = document.createElement('div');
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title;
      content.appendChild(titleElement);
    }
    paragraphs.forEach((para) => content.appendChild(para));

    rows.push([content]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}