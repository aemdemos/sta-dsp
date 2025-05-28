/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerRow = ['Columns (columns36)'];
  cells.push(headerRow);

  const rows = [];

  // Extract relevant content for each column block
  const columns = element.querySelectorAll(':scope > div');
  columns.forEach((column) => {
    const columnContent = [];

    // Extract text content
    const textElements = column.querySelectorAll('p, h1, h2, h3, span, ul, li');
    textElements.forEach((textElement) => {
      columnContent.push(textElement.cloneNode(true));
    });

    // Extract images
    const images = column.querySelectorAll('img');
    images.forEach((image) => {
      columnContent.push(image.cloneNode(true));
    });

    // Extract links for non-image elements with src attributes
    const srcElements = column.querySelectorAll('[src]:not(img)');
    srcElements.forEach((srcElement) => {
      const link = document.createElement('a');
      link.href = srcElement.src;
      link.textContent = srcElement.src;
      columnContent.push(link);
    });

    // Extract other inline elements (e.g., buttons, anchors)
    const inlineElements = column.querySelectorAll('a, button');
    inlineElements.forEach((inlineElement) => {
      columnContent.push(inlineElement.cloneNode(true));
    });

    // Push column content to rows
    rows.push([columnContent]);
  });

  cells.push(...rows);

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);

  return block;
}