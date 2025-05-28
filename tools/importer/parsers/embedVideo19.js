/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the breadcrumb links
  const breadcrumbLinks = Array.from(element.querySelectorAll(':scope > div > div > nav > ul > li > a'));

  if (!breadcrumbLinks.length) {
    console.warn('No breadcrumb links found');
    return;
  }

  // Create the header row
  const headerRow = ['Embed (embedVideo19)'];

  // Create the content row dynamically, grouping all links into a single cell
  const contentRow = breadcrumbLinks.map(link => {
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = link.textContent.trim();
    return anchor;
  });

  // Combine all links into a single cell
  const combinedContentCell = document.createElement('div');
  contentRow.forEach(anchor => combinedContentCell.appendChild(anchor));

  const cells = [
    headerRow,
    [combinedContentCell] // Single cell containing all links
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}