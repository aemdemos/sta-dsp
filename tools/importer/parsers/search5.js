/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the table
  const headerRow = ['Search'];

  // Extract relevant content from the input element
  const logoImg = element.querySelector('img');
  const links = Array.from(element.querySelectorAll('.nav-link'));

  // Handle logo extraction
  const logoContent = logoImg
    ? document.createElement('div')
    : 'No logo found';

  if (logoImg) {
    const logoElement = document.createElement('img');
    logoElement.src = logoImg.src;
    logoElement.alt = logoImg.alt || 'No alt text';
    logoContent.appendChild(logoElement);
  }

  // Handle navigation links extraction
  const linkContent = links.map((link) => {
    const linkElement = document.createElement('a');
    linkElement.href = link.href;
    linkElement.textContent = link.textContent;
    return linkElement;
  });

  // Combine all content into a single cell for the second row
  const combinedContent = document.createElement('div');
  if (logoContent !== 'No logo found') combinedContent.appendChild(logoContent);
  combinedContent.append(...linkContent);

  // Construct the table rows
  const tableContent = [
    headerRow,
    [combinedContent],
  ];

  // Create the block table using WebImporter.DOMUtils.createTable()
  const blockTable = WebImporter.DOMUtils.createTable(tableContent, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}