/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row
  const headerRow = ['Columns'];

  // Extract footer logo dynamically
  const logoContainer = element.querySelector('.col.offset-lg-1.col-lg-3');
  const logoLink = logoContainer.querySelector('a').cloneNode(true); // Clone the link dynamically
  const logoCell = [logoLink]; // Place the logo link in the first cell

  // Extract and structure footer navigation links into a single cell
  const navContainer = element.querySelector('.col.col-lg-8');
  const navLinks = Array.from(navContainer.querySelectorAll('.footer-nav li a')).map(link => link.cloneNode(true));

  const navList = document.createElement('ul');
  navLinks.forEach(link => {
    const listItem = document.createElement('li');
    listItem.appendChild(link);
    navList.appendChild(listItem);
  });
  const navCell = [navList]; // Place the navigation links list in the second cell

  // Handle copyright information dynamically
  const copyrightContainer = element.querySelector('.copyrights');
  const copyrightText = copyrightContainer ? copyrightContainer.querySelector('p').cloneNode(true) : document.createTextNode('');

  // Define table cells following the example structure
  const cells = [
    headerRow,
    [logoCell, navCell],
    [copyrightText]
  ];

  // Create the table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(block);
}