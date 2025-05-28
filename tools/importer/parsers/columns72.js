/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns72)'];

  // Extract immediate children divs of the section
  const rows = Array.from(element.querySelectorAll(':scope > div > section > div'));

  const cells = rows.map((row) => {
    const card = row.querySelector(':scope > div');
    const title = card.querySelector('h3');
    const body = card.querySelector('.o5-simple-card-grouping__bodycopy');
    const button = card.querySelector('.o5-simple-card-grouping__buttons a');

    const content = [];
    if (title) {
      // Ensure all placeholders are removed from titles
      const cleanedTitle = document.createElement('h3');
      cleanedTitle.textContent = title.textContent.trim();
      content.push(cleanedTitle);
    }
    if (body) content.push(body);
    if (button) content.push(button);

    return [content];
  });

  const tableData = [headerRow, ...cells];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}