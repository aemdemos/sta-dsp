/* global WebImporter */

export default function parse(element, { document }) {
  // Extract the relevant content from the provided element
  const textComponent = element.querySelector('.text-component');

  // Validate if the text component exists, handle edge cases
  let textContent;
  if (textComponent) {
    textContent = textComponent.cloneNode(true);
  } else {
    console.error('Text component not found in the element');
    textContent = document.createTextNode('Missing text content');
  }

  // Extract media content (e.g., image or video link) if available
  const imageElement = element.querySelector('img');
  const videoElement = element.querySelector('iframe');

  const mediaContent = [];
  if (imageElement) {
    mediaContent.push(imageElement);
  }
  if (videoElement && videoElement.src) {
    const videoLink = document.createElement('a');
    videoLink.href = videoElement.src;
    videoLink.textContent = videoElement.src;
    mediaContent.push(videoLink);
  }

  // Create the table structure
  const headerRow = ['Embed (embedVideo1)']; // Matches example markdown structure

  // Combine all extracted content into a single cell for the second row
  const contentRow = mediaContent.length > 0 ? [textContent, ...mediaContent] : [textContent];

  // Use the helper function to create the block table
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}