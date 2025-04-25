/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the logo image
  const logoElement = element.querySelector('.logo a img');
  const logo = document.createElement('img');
  logo.src = logoElement ? logoElement.src : '';
  logo.alt = logoElement ? logoElement.alt : '';

  // Extract navigation links
  const navItems = element.querySelectorAll('nav .navigation-items ul li');
  const navLinks = Array.from(navItems).map((navItem) => {
    const anchor = navItem.querySelector('a');
    if (anchor) {
      const link = document.createElement('a');
      link.href = anchor.href;
      link.textContent = anchor.textContent;
      return link;
    }
    return document.createTextNode(''); // Handle missing anchors
  });

  // Create the header row (type of block)
  const headerRow = ['Columns'];

  // Create the second row with logo and navigation links
  const secondRow = [logo, navLinks];

  // Create the block table
  const cells = [
    headerRow,
    secondRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}