/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cardsNoImages91)'];
  const rows = [];

  // Select all immediate children of the element to evaluate content blocks
  const children = element.querySelectorAll(':scope > div');

  children.forEach((child) => {
    const content = child.querySelector('.o5-promo-bar__body');

    if (content) {
      const title = content.querySelector('span');
      const link = content.querySelector('a');

      const rowContent = [];

      if (title) {
        const boldTitle = document.createElement('strong');
        boldTitle.textContent = title.textContent;
        rowContent.push(boldTitle);
      }

      if (link) {
        const linkWrapper = document.createElement('div');
        linkWrapper.append(link);
        rowContent.push(linkWrapper);
      }

      rows.push([rowContent]);
    }
  });

  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}