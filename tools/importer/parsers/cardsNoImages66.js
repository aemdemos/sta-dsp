/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cardsNoImages66)'];

  // Extract cards from the HTML
  const items = Array.from(element.querySelectorAll(':scope > div ul > li'));

  const rows = items.map((item) => {
    const link = item.querySelector('a');

    const span = link.querySelector('span');

    const linkElement = document.createElement('a');
    linkElement.href = link.href;
    linkElement.textContent = span.textContent.trim();

    return [linkElement];
  });

  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  element.replaceWith(table);
}