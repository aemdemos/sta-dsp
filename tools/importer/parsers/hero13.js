/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract elements dynamically
  const eyebrow1 = element.querySelector('.hero-text__eyebrow-1')?.textContent.trim() || '';
  const eyebrow2 = element.querySelector('.hero-text__eyebrow-2')?.textContent.trim() || '';
  const title = element.querySelector('.hero-text__title')?.outerHTML || '';
  const description = element.querySelector('.m-b-sm-3')?.outerHTML || '';
  const footnote = element.querySelector('.text-footnote')?.outerHTML || '';

  // Extract image dynamically
  const imgElement = element.querySelector('img');
  const imgNode = document.createElement('img');
  if (imgElement) {
    imgNode.setAttribute('src', imgElement.src);
    imgNode.setAttribute('alt', imgElement.alt);
  }

  // Combine extracted content dynamically
  const combinedContent = document.createElement('div');
  combinedContent.innerHTML = `${eyebrow1}<br>${eyebrow2}<br>${title}<br>${description}<br>${footnote}`;
  if (imgElement) combinedContent.append(imgNode);

  // Create rows for table structure
  const rows = [
    headerRow,
    [combinedContent]
  ];

  // Create block table dynamically
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}