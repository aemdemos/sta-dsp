/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the HTML
  const eyebrowText = element.querySelector('.hero-text__eyebrow-1')?.textContent?.trim() || '';
  const titleText = element.querySelector('.hero-text__title')?.textContent?.trim() || '';
  const imgElement = element.querySelector('img');
  const img = imgElement ? document.createElement('img') : null;
  if (img) {
    img.src = imgElement.src;
    img.alt = imgElement.alt || '';
  }
  const descriptionText = element.querySelector('.hero-text__patient-portrayal')?.textContent?.trim() || '';

  // Combine content dynamically into a single cell for the second row
  const contentCell = document.createElement('div');
  if (eyebrowText) {
    const eyebrowElement = document.createElement('p');
    eyebrowElement.textContent = eyebrowText;
    contentCell.appendChild(eyebrowElement);
  }
  if (titleText) {
    const titleElement = document.createElement('h1');
    titleElement.textContent = titleText;
    contentCell.appendChild(titleElement);
  }
  if (img) {
    contentCell.appendChild(img);
  }
  if (descriptionText) {
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = descriptionText;
    contentCell.appendChild(descriptionElement);
  }

  // Constructing the table
  const cells = [
    ['Hero'], // Header row
    [contentCell], // Second row with combined content
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(blockTable);
}