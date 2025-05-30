/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant elements
  const heading = element.querySelector('.o5-callToAction__heading');
  const subheading = element.querySelector('.o5-callToAction__bodyText p');
  const ctaButton = element.querySelector('.o5-callToAction__buttons a');

  // Create the header row
  const headerRow = ['Hero (hero8)'];

  // Build the content row
  const contentRow = [];

  if (heading) {
    contentRow.push(heading); // Reference the existing heading element directly
  }

  if (subheading) {
    contentRow.push(subheading); // Reference the existing subheading element directly
  }

  if (ctaButton) {
    const ctaLink = document.createElement('a');
    ctaLink.href = ctaButton.href;
    ctaLink.textContent = ctaButton.textContent;
    contentRow.push(ctaLink); // Add the link element to the content row
  }

  // Combine rows into cells
  const cells = [
    headerRow,
    [contentRow]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}