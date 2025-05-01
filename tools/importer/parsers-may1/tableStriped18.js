/* global WebImporter */
export default function parse(element, { document }) {
  // Validate the existence of element
  if (!element) return;

  // Extract logo dynamically
  const logoElement = element.querySelector('.logo img');
  const logo = logoElement ? logoElement.cloneNode(true) : null;

  // Extract navigation links dynamically
  const navLinks = Array.from(element.querySelectorAll('nav .navigation-items a')); 

  // Create table structure dynamically
  const cells = [
    ['Header'],
    [logo],
    navLinks.length > 0 ? navLinks.map(link => link.cloneNode(true)) : ['No navigation links found']
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Verify example Markdown for section metadata
  const hr = document.createElement('hr');

  // Add section metadata only if applicable
  const metadataCells = [
    ['Section metadata'],
    ['Type: Navigation']
  ];
  const metadataBlock = WebImporter.DOMUtils.createTable(metadataCells, document);

  // Replace element with new structure ensuring section metadata placement
  element.replaceWith(hr, metadataBlock, blockTable);
}