/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns100)'];

  // Extract items from the list
  const linksContainer = element.querySelector('.o5-quick-links__row');
  const links = Array.from(linksContainer.querySelectorAll('li')).map((li) => {
    const anchor = li.querySelector('a');
    return anchor ? anchor : '';
  });

  const cells = [
    headerRow,
    links // Create separate cells for each link
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}