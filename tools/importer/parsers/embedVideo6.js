/* global WebImporter */
export default function parse(element, { document }) {
  // Create the Embed block header
  const blockHeader = ['Embed'];

  // Extract the image dynamically
  const image = element.querySelector('img');
  const imageElement = image ? document.createElement('img') : null;
  if (imageElement) {
    imageElement.src = image.src;
    imageElement.alt = image.alt;
    // Dynamically resolve or use meaningful height/width values
    imageElement.height = image.getAttribute('height') !== 'auto' ? image.getAttribute('height') : '100';
    imageElement.width = image.getAttribute('width');
  }

  // Extract the link dynamically
  const link = element.querySelector('a');
  const videoLink = link ? document.createElement('a') : null;
  if (videoLink) {
    videoLink.href = link.href;
    videoLink.textContent = link.href;
  }

  // Combine image and link into one cell properly
  const combinedCellContent = [];
  if (imageElement) combinedCellContent.push(imageElement);
  if (videoLink) combinedCellContent.push(videoLink);

  // Construct the table rows
  const blockRows = [
    blockHeader,
    [combinedCellContent] // Combine content correctly
  ];

  // Generate the table
  const table = WebImporter.DOMUtils.createTable(blockRows, document);

  // Replace the original element with the generated table
  element.replaceWith(table);
}