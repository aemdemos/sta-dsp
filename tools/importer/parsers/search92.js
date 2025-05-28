/* global WebImporter */
 export default function parse(element, { document }) {
  // Extract the required URL from the provided HTML structure
  const queryIndexUrl = "https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json";

  // Create the header row
  const headerRow = ['Search (search92)'];

  // Create the content row with the extracted URL as a link
  const linkElement = document.createElement('a');
  linkElement.href = queryIndexUrl;
  linkElement.textContent = queryIndexUrl;
  const contentRow = [linkElement];

  // Create the table structure
  const tableData = [headerRow, contentRow];

  // Generate the table block using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}