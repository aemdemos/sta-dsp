/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract image
  const image = element.querySelector('img');
  const imageElement = document.createElement('img');
  if (image) {
    imageElement.src = image.src;
    imageElement.alt = image.alt;
  }

  // Extract the heading
  const heading = element.querySelector('h2');
  const headingElement = document.createElement('h1');
  if (heading) {
    headingElement.innerHTML = heading.innerHTML;
  }

  // Extract the paragraphs
  const paragraphs = Array.from(element.querySelectorAll('p'));

  // Combine content into a single cell
  const contentCell = document.createElement('div');
  contentCell.appendChild(headingElement);
  paragraphs.forEach((paragraph) => {
    const paragraphElement = document.createElement('p');
    paragraphElement.innerHTML = paragraph.innerHTML;
    contentCell.appendChild(paragraphElement);
  });
  contentCell.appendChild(imageElement);

  const tableCells = [headerRow, [contentCell]];

  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  element.replaceWith(block);
}