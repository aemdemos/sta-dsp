/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table']; // Correct header row as per example

  // Extract heading (e.g., Insights (21))
  const heading = element.querySelector('.videos h2');

  // Extract sorting container with label and dropdown
  const sortContainer = element.querySelector('.uie-sort');

  // Consolidate dropdown sorting options into the sortContainer cell
  if (sortContainer) {
    const dropdownButton = sortContainer.querySelector('.uib-customselect__btn');
    const dropdownMenu = sortContainer.querySelector('.uib-customselect__menu');

    if (dropdownButton && dropdownMenu) {
      const consolidatedDropdown = document.createElement('div');
      consolidatedDropdown.appendChild(dropdownButton);
      consolidatedDropdown.appendChild(dropdownMenu);

      sortContainer.innerHTML = '';
      sortContainer.appendChild(consolidatedDropdown);
    }
  }

  const cells = [
    headerRow,
    [heading, sortContainer],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}