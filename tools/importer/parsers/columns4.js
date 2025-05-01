/* global WebImporter */
export default function parse(element, { document }) {
  const blockTableHeader = ['Columns'];

  const logo = element.querySelector('.logo img');
  const navItems = element.querySelectorAll('.navigation-items ul li a');

  // Extracting content dynamically
  const logoContent = logo ? logo.cloneNode(true) : '';
  const navigationContent = Array.from(navItems).map(item => item.cloneNode(true));

  const cells = [
    blockTableHeader, // Header row with 'Columns'
    [logoContent, navigationContent], // Content row with logo and navigation links side by side
  ];

  // Create the final table structure
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structure
  element.replaceWith(table);
}