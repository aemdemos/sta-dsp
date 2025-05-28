/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting the title
  const titleElement = element.querySelector(':scope > div > div > div > div > nav > ul > .o5-l2-nav__title > .o5-l2-nav__title-text');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extracting unique links
  const linksSet = new Set();
  const links = Array.from(element.querySelectorAll('a.o5-l2-nav__link, a.dmp-btn')).map((link) => {
    const text = link.textContent.trim();
    const href = link.getAttribute('href');
    const key = `${text}||${href}`; // Creating a unique key for deduplication
    if (!linksSet.has(key)) {
      linksSet.add(key);
      const anchor = document.createElement('a');
      anchor.href = href;
      anchor.textContent = text;
      return anchor;
    }
    return null;
  }).filter(Boolean); // Remove null values after deduplication

  const headerRow = ['Columns (columns33)'];
  const contentRow = [title, links];

  const cells = [
    headerRow,
    contentRow,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}