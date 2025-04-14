/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the logo image
  const logoContainer = element.querySelector('.logo a img');
  const logoImage = logoContainer ? logoContainer.cloneNode(true) : null; // Clone the logo image element if it exists

  // Extract the navigation items
  const navigationContainer = element.querySelector('nav .navigation-items ul');
  const links = navigationContainer 
    ? Array.from(navigationContainer.querySelectorAll('li a')).map(link => link.cloneNode(true))
    : []; // Extract links if they exist

  // Create the header row
  const headerRow = ['Hero'];

  // Create the content row
  const contentRow = [
    logoImage, // Include the logo image
    ...links // Include navigation links
  ].filter(item => item); // Filter out any null or undefined items

  // Create the block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow, // First row is the header
    contentRow.length > 0 ? [contentRow] : ['No content'], // Second row contains the content or a fallback
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}