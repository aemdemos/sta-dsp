/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion (accordion27)'];
  const rows = [];

  // Extract the accordion drawer and its content
  const accordionDrawer = element.querySelector(':scope > div.ui-b-accordion__drawer');
  if (accordionDrawer) {
    const contentDiv = accordionDrawer.querySelector(':scope > div.uie-filter-tray__content');
    if (contentDiv) {
      const topics = contentDiv.querySelectorAll(':scope > div.uie-filter-tray__topic-0 > div');
      topics.forEach((topic) => {
        // Extract title for each topic dynamically
        const titleElement = topic.querySelector(':scope > div.ui-b-form-checkbox__label span');
        const title = titleElement ? titleElement.textContent.trim() : 'Title Not Found';
        const titleCell = document.createElement('span');
        titleCell.textContent = title;

        // Extract content dynamically
        const contentElement = topic.querySelector(':scope > div.ui-b-form-checkbox__label');
        const contentCell = contentElement ? contentElement.cloneNode(true) : document.createElement('span');
        contentCell.textContent = contentElement ? contentElement.textContent.trim() : 'Content Not Found';

        rows.push([titleCell, contentCell]);
      });
    }
  }

  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}