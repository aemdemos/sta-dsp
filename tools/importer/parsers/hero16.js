/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row
  const headerRow = ['Hero (hero16)'];

  // Extract image from the element
  const imageElement = element.querySelector('.o5-detail-hero-banner__image img.desktopImg');

  // Extract headline (mandatory)
  const headlineElement = element.querySelector('.o5-detail-hero-banner__main-heading_1');

  // Extract subheading (optional)
  const subheadingElement = element.querySelector('.o5-detail-hero-banner__bodyCopy');

  // Extract call-to-action button (optional)
  const ctaElement = element.querySelector('.o5-detail-hero-banner__button a');

  // Combine all content for the second row, filtering out any null elements
  const secondRowContent = [
    imageElement,
    headlineElement,
    subheadingElement,
    ctaElement,
  ].filter(Boolean);

  // Create a table structure
  const tableData = [
    headerRow, // Header row with block name
    [secondRowContent], // Content row with extracted elements
  ];

  // Generate the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}