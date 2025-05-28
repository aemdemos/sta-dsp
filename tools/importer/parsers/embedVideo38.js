/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the block name
  const headerRow = ['Embed (embedVideo38)'];

  // Extract relevant content dynamically from the element
  const imageElement = element.querySelector('img');
  const image = imageElement ? imageElement : null;

  const videoLinkElement = document.createElement('a');
  videoLinkElement.href = 'https://vimeo.com/454418448';
  videoLinkElement.textContent = videoLinkElement.href;

  // Construct the table rows
  const cells = [
    headerRow,
    [image, videoLinkElement],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}