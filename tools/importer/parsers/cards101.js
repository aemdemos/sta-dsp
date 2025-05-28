/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add header row
  rows.push(['Cards (cards101)']);

  // Get all immediate child divs of the main element
  const ul = element.querySelector(':scope ul');
  const items = ul ? ul.querySelectorAll(':scope > li') : [];

  // Process each card
  items.forEach((item) => {
    const link = item.querySelector(':scope > a');
    const img = link ? link.querySelector(':scope > img') : null;
    const span = link ? link.querySelector(':scope > span') : null;

    // Only if both image and text content is present
    if (link && img && span) {
      rows.push([
        img,
        span,
      ]);
    }
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}