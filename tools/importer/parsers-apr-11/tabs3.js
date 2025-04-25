/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Tabs'];

  // Extract tab links and content
  const tabs = [];

  const navLinks = element.querySelectorAll('nav .navigation-items ul li a');

  navLinks.forEach((link) => {
    const tabLabel = link.textContent.trim();

    // Extract or construct content dynamically
    const tabContent = document.createElement('div');
    tabContent.appendChild(link.cloneNode(true));

    // Push label and content to tabs array
    tabs.push([tabLabel, tabContent]);
  });

  // Create table array
  const tableData = [headerRow, ...tabs];

  // Create block table using WebImporter.DOMUtils
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}