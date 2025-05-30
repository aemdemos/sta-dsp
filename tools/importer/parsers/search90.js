/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the relevant content from the element
  const searchBox = element.querySelector('.o5-search__box');
  const queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

  // Validate that the searchBox exists
  if (!searchBox) {
    console.error('Search box not found');
    return;
  }

  // Construct the table data
  const headerRow = ['Search (search90)'];

  // Create the query index link
  const queryIndexLink = document.createElement('a');
  queryIndexLink.href = queryIndexUrl;
  queryIndexLink.textContent = queryIndexUrl;

  const contentRow = [queryIndexLink];

  // Create the table
  const tableData = [headerRow, contentRow];
  const tableBlock = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(tableBlock);
}