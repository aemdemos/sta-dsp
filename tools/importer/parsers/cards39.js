/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards39)'];

  const cards = Array.from(element.querySelectorAll('.o5-simple-card-grouping__card'));

  const rows = cards.map(card => {
    const title = card.querySelector('h3');
    const description = card.querySelector('p');
    const link = card.querySelector('a');

    const contentCell = [];
    if (title) contentCell.push(title);
    if (description) contentCell.push(description);
    if (link) contentCell.push(link);

    return ['Image Placeholder', contentCell];
  });

  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}