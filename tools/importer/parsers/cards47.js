/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all immediate child elements from the provided block
  const childElements = element.querySelectorAll(':scope > section > div');

  const headerRow = ['Cards (cards47)'];

  const rows = Array.from(childElements).map((child) => {
    const card = child.querySelector(':scope > div');

    const title = card.querySelector('h2');
    const description = card.querySelector('.o5-simple-card-grouping__bodycopy');
    const buttons = Array.from(card.querySelectorAll('.o5-simple-card-grouping__buttons a')).map(button => {
      const link = document.createElement('a');
      link.href = button.href;
      link.innerHTML = button.textContent.trim();
      return link;
    });

    const textContent = [];
    if (title) {
      textContent.push(title);
    }
    if (description) {
      textContent.push(description);
    }
    if (buttons.length) {
      textContent.push(...buttons);
    }

    return [textContent];
  });

  const tableData = [headerRow, ...rows];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}