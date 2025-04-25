/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract data from element
  const createLink = (href, text) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = text;
    return link;
  };

  // Extracting content
  const logoImage = element.querySelector('.logo img');
  const logo = logoImage ? document.createElement('img') : null;
  if (logo) {
    logo.src = logoImage.src;
    logo.alt = logoImage.alt;
  }

  const navItems = Array.from(element.querySelectorAll('.navigation-items a')).map((navItem) => {
    if (navItem.id === 'signup-nav') {
      return createLink('/sign-up', navItem.textContent);
    }
    return createLink(navItem.href, navItem.textContent);
  });

  const toggleButtonImages = Array.from(element.querySelectorAll('.navigation-toggle-btn img')).map((img) => {
    const image = document.createElement('img');
    image.src = img.src;
    image.alt = img.alt;
    return image;
  });

  // Header row
  const headerRow = ['Columns'];

  // Content rows
  const contentRow1 = [logo];
  const contentRow2 = [toggleButtonImages];
  const navRow = [navItems];

  const cells = [
    headerRow,
    contentRow1,
    contentRow2,
    navRow,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(blockTable);
}