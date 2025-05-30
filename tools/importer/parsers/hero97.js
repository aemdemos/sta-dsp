/* global WebImporter */
export default function parse(element, { document }) {
  // Extract title
  const titleElement = element.querySelector('.ces-hero-banner__title');

  // Extract description
  const descriptionElement = element.querySelector('.ces-hero-banner__desc');

  // Extract all images
  const imageElements = Array.from(element.querySelectorAll(':scope .ces-hero-banner__banner-img, :scope .ces-hero-banner__banner-img-mobile'));

  // Create cells for table
  const headerRow = ['Hero (hero97)'];

  // Collect all content into one cell
  const contentCell = [];

  // Add title to content cell
  if (titleElement) {
    contentCell.push(titleElement);
  }

  // Add description to content cell
  if (descriptionElement) {
    contentCell.push(descriptionElement);
  }

  // Add images to content cell
  contentCell.push(...imageElements);

  const cells = [
    headerRow,
    [contentCell],
  ];

  // Create block table using helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(block);
}