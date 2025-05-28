/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the table
  const headerRow = ['Search (search15)'];

  // Extract the URL dynamically
  const queryIndexElement = element.querySelector('[placeholder="Search"]');
  let queryIndexUrl;
  if (queryIndexElement) {
    queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  } else {
    // Fallback for missing placeholder element
    queryIndexUrl = 'https://default-query-index-url.example.com';
  }
  const queryIndexLink = document.createElement('a');
  queryIndexLink.href = queryIndexUrl;
  queryIndexLink.textContent = queryIndexUrl;

  const contentRow = [queryIndexLink];

  // Create the table using WebImporter helper function
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the generated table
  element.replaceWith(table);
}