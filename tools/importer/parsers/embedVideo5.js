/* global WebImporter */
export default function parse(element, { document }) {
  // Define the table header row with the exact block name
  const headerRow = ['Embed (embedVideo5)'];

  // Initialize the table rows
  const cells = [headerRow];

  // Extract image and link dynamically from the element
  const img = element.querySelector('img');
  const link = element.querySelector('a[href]');

  // Ensure proper handling for missing image or link
  if (link) {
    const url = document.createElement('a');
    url.href = link.href;
    url.textContent = link.href;

    if (img) {
      // Include both image and link in a single cell
      cells.push([[img, url]]);
    } else {
      // Include only the link if the image is missing
      cells.push([url]);
    }
  } else {
    // Handle edge case where neither image nor link exists
    cells.push(['No content available']);
  }

  // Create the table block using WebImporter helper
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created block
  element.replaceWith(block);
}