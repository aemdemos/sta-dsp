/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the input element
  const headerRow = ['Columns'];

  // Extracting content for the table
  const logoLink = element.querySelector('.logo a');
  const logoImage = logoLink ? logoLink.querySelector('img') : null;

  // Extract navigation items
  const navItems = Array.from(element.querySelectorAll('.navigation-items a')).map((link) => {
    const linkElement = document.createElement('a');
    linkElement.href = link.href;
    linkElement.textContent = link.textContent;
    return linkElement;
  });

  // Ensure structure matches example markdown
  const tableData = [
    headerRow,
    [
      logoImage ? [logoImage.cloneNode(true)] : [],
      navItems
    ]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace element with the new structured block table
  element.replaceWith(blockTable);
}