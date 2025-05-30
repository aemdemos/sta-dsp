/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards56)'];

  // Extract cards
  const cards = Array.from(element.querySelectorAll(':scope > section > div'));
  const rows = cards.map((card) => {
    const image = card.querySelector('img');
    const title = card.querySelector('h2');
    const description = card.querySelector('.o5-simple-card-grouping__bodycopy');
    const button = card.querySelector('a');

    const textContent = [];
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title.textContent.trim();
      textContent.push(titleElement);
    }
    if (description) {
      textContent.push(document.createElement('br'), description);
    }
    if (button) {
      textContent.push(document.createElement('br'), button);
    }

    return [image, textContent];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}