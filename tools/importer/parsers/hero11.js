/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add header row
  cells.push(['Hero']);

  // Get all relevant content
  const title = element.querySelector('h2');
  const paragraphs = element.querySelectorAll('p');
  const image = element.querySelector('img');

  // Validate the data exists
  if (title) {
    const titleContent = document.createElement('h1');
    titleContent.innerHTML = title.innerHTML;
    cells.push([titleContent]);
  } else {
    console.warn('Title not found');
  }

  if (paragraphs.length > 0) {
    const content = document.createElement('div');
    paragraphs.forEach((p) => {
      const clonedParagraph = document.createElement('p');
      clonedParagraph.innerHTML = p.innerHTML;
      content.appendChild(clonedParagraph);
    });
    cells.push([content]);
  } else {
    console.warn('Paragraphs not found');
  }

  if (image) {
    const imageElement = document.createElement('img');
    imageElement.src = image.src;
    imageElement.alt = image.alt;
    cells.push([imageElement]);
  } else {
    console.warn('Image not found');
  }

  // Create table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(blockTable);
}