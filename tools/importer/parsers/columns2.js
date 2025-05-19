/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create links dynamically
  const createLink = (url, text) => {
    const link = document.createElement('a');
    link.href = url;
    link.textContent = text;
    return link;
  };

  // Dynamically extract content from the element
  const headerText = element.querySelector('h2.section-heading')?.textContent.trim();
  const subheadingText = element.querySelector('h3.section-subheading')?.textContent.trim();
  const image = element.querySelector('img.img-fluid');

  // Handle edge case: empty or missing image
  const imageElement = image ? document.createElement('img') : null;
  if (imageElement) {
    imageElement.src = image.src;
    imageElement.alt = image.alt || '';
  }

  // Ensure header matches the example markdown structure exactly
  const headerRow = ['Columns'];

  // Dynamically create content row based on extracted elements
  const contentRow = [
    subheadingText ? document.createTextNode(subheadingText) : '',
    imageElement,
  ];

  // Generate the table using WebImporter.DOMUtils.createTable
  const cells = [
    headerRow,
    contentRow,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}