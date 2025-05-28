/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (striped, bordered)'];

  const dataRows = [];

  // Extract heading dynamically
  const heading = element.querySelector(':scope > div.calendar-sf-filter-tray__container > h2');
  if (heading) {
    dataRows.push([heading]);
  }

  // Extract close button text dynamically
  const closeButton = element.querySelector(':scope > div.calendar-sf-filter-tray__container > div > button > span');
  if (closeButton) {
    dataRows.push([closeButton]);
  }

  // Extract pills content dynamically
  const pillsGroup = element.querySelector(':scope > div.calendar-sf-pills');
  if (pillsGroup) {
    const pillsContent = pillsGroup.querySelectorAll(':scope > div');
    pillsContent.forEach((pill) => {
      if (pill.textContent.trim()) {
        dataRows.push([pill]);
      } else {
        const placeholder = document.createElement('div');
        placeholder.textContent = 'No data available';
        dataRows.push([placeholder]);
      }
    });
  }

  const cells = [headerRow, ...dataRows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}