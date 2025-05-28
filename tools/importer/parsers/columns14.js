/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract reviews
  function getReviewText(container) {
    const reviewSpan = container.querySelector('.o5-plu-rating__count');
    return reviewSpan ? reviewSpan.textContent.trim() : '';
  }

  // Extract specialties
  const specialtiesContainer = element.querySelector('.o5-plu-serp-provider__specialties');

  // Extract status information
  const statusContainer = element.querySelector('.o5-plu-serp-provider__status-text');

  // Extract location information
  const clinicNameContainer = element.querySelector('.o5-plu-serp-provider__clinicname');
  const addressLinkContainer = element.querySelector('.address-link');
  const multipleLocationText = element.querySelector('.o5-plu-serp-provider__multiple');

  // Build the cells array for the table
  const cells = [
    ['Columns (columns14)'],
    [
      specialtiesContainer,
      [statusContainer, getReviewText(element)],
      [clinicNameContainer, addressLinkContainer, multipleLocationText],
    ],
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table block
  element.replaceWith(block);

  return block;
}