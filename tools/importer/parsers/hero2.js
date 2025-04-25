/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting content from the given element
  const title = element.querySelector('.hero-text__title')?.textContent.trim();
  const eyebrowText = element.querySelector('.hero-text__eyebrow-1')?.textContent.trim();
  const image = element.querySelector('img');

  // Creating elements for title and eyebrow
  const headingElement = title ? document.createElement('h1') : null;
  if (headingElement) headingElement.textContent = title;

  const eyebrowElement = eyebrowText ? document.createElement('p') : null;
  if (eyebrowElement) eyebrowElement.textContent = eyebrowText;

  // Ensuring the image element is properly created
  const imageElement = image ? document.createElement('img') : null;
  if (imageElement && image.src) {
    imageElement.src = image.src;
    imageElement.alt = image.alt || '';
  }

  // Combining all content into a single cell
  const contentCell = document.createElement('div');
  if (eyebrowElement) contentCell.appendChild(eyebrowElement);
  if (headingElement) contentCell.appendChild(headingElement);
  if (imageElement) contentCell.appendChild(imageElement);

  // Creating the table cells
  const cells = [
    ['Hero'], // Header row with exactly one column
    [contentCell], // Single cell containing all combined content
  ];

  // Creating the table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the new block
  element.replaceWith(block);
}