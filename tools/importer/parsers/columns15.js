/* global WebImporter */
export default function parse(element, { document }) {
  // Check for any section metadata requirements (none exist in this case)
  // Extract the content from the given element dynamically
  const title = element.querySelector('h2')?.textContent.trim() || '';
  const paragraphs = Array.from(element.querySelectorAll('p')).map((p) => p.cloneNode(true));
  const image = element.querySelector('img')?.cloneNode(true);

  // Ensure the table header matches the Example Markdown Structure exactly
  const headerRow = ['Columns'];

  // Construct the content row dynamically from the extracted elements
  const contentRow = [
    [title, ...paragraphs],
    image
  ];

  const cells = [headerRow, contentRow];

  // Use WebImporter.DOMUtils.createTable() to create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}