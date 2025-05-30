/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Search (search13)'];

  // Extract key content dynamically from the provided element
  const pillsContainer = element.querySelector('#calendar-sf-filter-pills');
  const filterButtons = pillsContainer ? Array.from(pillsContainer.querySelectorAll('button')) : [];

  // Handle edge case when no filters are available
  const filtersText = filterButtons.map(btn => btn.textContent.trim()).join(', ') || 'No filters available';

  // Create second row dynamically
  const url = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = url;
  link.textContent = url;

  const rows = [
    headerRow,
    [link],
  ];

  // Create the table block using WebImporter.DOMUtils.createTable
  const tableBlock = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the created table block
  element.replaceWith(tableBlock);
}