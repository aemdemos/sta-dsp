/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the title and paragraph from the original element
  const title = element.querySelector('.text-title');
  const paragraph = element.querySelector('p');

  // Safeguard against missing title or paragraph
  if (!title || !paragraph) {
    throw new Error('Missing required title or paragraph element in hero block');
  }

  // Create heading element for the title
  const heading = document.createElement('h1');
  heading.textContent = title.textContent;

  // Create paragraph element for the paragraph
  const text = document.createElement('p');
  text.textContent = paragraph.textContent;

  // Combine heading and text into a single cell
  const combinedCellContent = [heading, text];

  // Define the table structure
  const cells = [
    ['Hero'], // Header row matches the example exactly
    [combinedCellContent], // Content row with combined heading and paragraph
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}