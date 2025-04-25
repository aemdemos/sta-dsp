/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract the image
  const img = element.querySelector('img');
  const clonedImg = img ? img.cloneNode(true) : null;

  // Extract the title
  const title = element.querySelector('h2');
  const clonedTitle = title ? title.cloneNode(true) : null;

  // Extract paragraphs
  const paragraphs = element.querySelectorAll('p');
  const clonedParagraphs = paragraphs.length > 0 
    ? Array.from(paragraphs).map(p => p.cloneNode(true)) 
    : [];

  // Combine content into a single cell
  const combinedContent = [
    clonedImg,
    clonedTitle,
    ...clonedParagraphs
  ].filter(Boolean); // Filter out null/undefined elements

  // Create a table structure
  const cells = [
    headerRow, // Header row with a single column
    [combinedContent] // Second row with all content combined into a single cell
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}