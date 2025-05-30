/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly as specified
  const headerRow = ['Hero (hero10)'];

  // Extract the heading dynamically
  const heading = element.querySelector('.o5-detail-hero-banner__main-heading_1');

  // Extract the body copy dynamically
  const bodyCopy = element.querySelector('.o5-detail-hero-banner__bodyCopy');

  // Extract the call-to-action button dynamically and correct the href
  const button = element.querySelector('.o5-detail-hero-banner__button button');
  const buttonLink = button ? document.createElement('a') : null;
  if (buttonLink) {
    const videoSection = element.querySelector('.o5-detail-hero-banner__video-modal section');
    buttonLink.href = videoSection ? videoSection.getAttribute('data-video-url') : '#';
    buttonLink.textContent = button.textContent;
  }

  // Extract the image dynamically
  const image = element.querySelector('.o5-detail-hero-banner__image img');

  // Ensure the second row follows correct structure by separating content into distinct cells
  const contentRow = [
    [image],
    [heading],
    [bodyCopy],
    [buttonLink].filter(Boolean)
  ];

  // Create table structure
  const tableData = [headerRow, ...contentRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}