/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly matching the example
  const headerRow = ['Search (search63)'];

  // Dynamically extract content from the provided HTML
  const input = element.querySelector(':scope input[type="text"]');
  const inputValue = input ? input.value : '';

  // Constructing the query URL dynamically
  const queryURL = document.createElement('a');
  queryURL.href = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  queryURL.textContent = queryURL.href;

  // Define the content row
  const contentRow = [queryURL];

  // Create the table structure
  const cells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}