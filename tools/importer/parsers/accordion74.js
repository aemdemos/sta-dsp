/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion (accordion74)'];
  const cells = [headerRow];

  // Query all immediate child divs of the element
  const rows = element.querySelectorAll(':scope > div');

  rows.forEach((row) => {
    // Extract title (mandatory clickable label)
    const title = row.querySelector('h2') || row.querySelector('label');
    const titleContent = title ? title.cloneNode(true) : document.createTextNode('');

    // Extract content (mandatory body text or media)
    const content = row.querySelector('.uie-sort__select') || row.querySelector('.uib-customselect') || document.createTextNode('');
    const contentElements = content ? content.cloneNode(true) : document.createTextNode('');

    // Push the row
    cells.push([titleContent, contentElements]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);

  return table;
}