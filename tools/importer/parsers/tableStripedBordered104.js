/* global WebImporter */
export default function parse(element, { document }) {
  // Define the table header
  const headerRow = ['Table (striped, bordered, tableStripedBordered104)'];

  const rows = [];

  // Extract relevant navigation items and their links
  const navItems = element.querySelectorAll(':scope .o5-nav__wrapper > .o5-nav__item');

  const uniqueRows = new Set(); // Use a Set to eliminate duplicate rows

  navItems.forEach((item) => {
    const nameElement = item.querySelector('.o5-nav__btn-text');
    const linkElement = item.querySelector('a.o5-nav__link');

    if (nameElement && linkElement) {
      const name = nameElement.textContent.trim();
      const href = linkElement.href;

      // Create a unique key for each row to detect duplicates
      const uniqueKey = `${name}-${href}`;

      if (!uniqueRows.has(uniqueKey)) {
        uniqueRows.add(uniqueKey);

        const link = document.createElement('a');
        link.href = href;
        link.textContent = href;

        rows.push([name, link]);
      }
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original HTML element with the new table block
  element.replaceWith(table);
}