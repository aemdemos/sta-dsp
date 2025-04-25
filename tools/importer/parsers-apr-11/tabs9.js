/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Tabs'];
  const rows = [];

  // Extracting tab labels and contents dynamically from navigation items
  const navItems = element.querySelectorAll('.navigation-items li');
  navItems.forEach((item) => {
    const label = item.querySelector('a')?.textContent.trim() || '';
    const link = item.querySelector('a')?.href || '';

    // Handling edge case if label or link is missing
    if (label) {
      const content = document.createElement('div');
      const linkElement = document.createElement('a');
      linkElement.href = link;
      linkElement.textContent = label;
      content.appendChild(linkElement);

      rows.push([label, content]);
    }
  });

  // Ensure rows are created dynamically and header matches example
  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}