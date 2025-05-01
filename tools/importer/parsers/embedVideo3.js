/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Create header row
  const headerRow = ['Embed'];
  cells.push(headerRow);

  // Extract embed content (image and video link)
  const imageSrc = element.querySelector('img')?.src;
  const videoLink = element.querySelector('a')?.href;

  const contentRow = [];

  if (imageSrc) {
    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    contentRow.push(imageElement);
  }

  if (videoLink) {
    const linkElement = document.createElement('a');
    linkElement.href = videoLink;
    linkElement.textContent = videoLink;
    contentRow.push(linkElement);
  }

  // Combine both items into a single cell to ensure the row has only one column
  cells.push([contentRow]);

  // Create table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}