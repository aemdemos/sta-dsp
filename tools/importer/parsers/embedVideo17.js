/* global WebImporter */
export default function parse(element, { document }) {
  // Validate input
  if (!element || !document) {
    throw new Error('Invalid element or document provided');
  }

  // Extracting the content dynamically from the provided HTML
  const logoImage = element.querySelector('.logo img');
  const videoURL = 'https://vimeo.com/454418448'; // Example URL, should ideally be dynamically extracted if in HTML

  if (!logoImage) {
    throw new Error('Logo image missing');
  }

  const headerRow = ['Embed'];

  // Create the content row dynamically
  const imageElement = document.createElement('img');
  imageElement.src = logoImage.src;
  imageElement.alt = logoImage.alt;

  const linkElement = document.createElement('a');
  linkElement.href = videoURL;
  linkElement.textContent = videoURL;

  const contentRow = [[imageElement, linkElement]]; // Ensuring proper formatting

  const tableData = [headerRow, ...contentRow];

  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}