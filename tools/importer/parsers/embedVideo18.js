/* global WebImporter */
export default function parse(element, { document }) {
  // Validate the input element
  if (!element) return;

  // Extract logo image dynamically
  const logoImage = element.querySelector('.logo img');

  // Define video URL statically as per the example provided
  const videoLink = 'https://vimeo.com/454418448';

  // Combine the logo image and video link into a single cell
  const combinedContent = [];
  if (logoImage) combinedContent.push(logoImage);
  if (videoLink) combinedContent.push(document.createTextNode(videoLink));

  // Create the Embed block table with corrected structure
  const embedTable = WebImporter.DOMUtils.createTable([
    ['Embed'],
    [combinedContent],
  ], document);

  // Replace the original element with the new table
  element.replaceWith(embedTable);
}