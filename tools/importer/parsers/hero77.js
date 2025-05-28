/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Define the header row with exactly one column
  const headerRow = ['Hero (hero77)'];

  // Step 2: Extract relevant content

  // Extract title
  const titleElement = element.querySelector('h1');

  // Extract subtitle
  const subtitleElement = element.querySelector('p span.o5-text__body-1');

  // Extract social icons and other relevant elements
  const socialIcons = Array.from(element.querySelectorAll('a.text-component__socialIcon'));

  // Extract background image (if any)
  const backgroundImage = element.querySelector('img');

  // Combine all extracted elements into a single cell in the second row
  const contentCell = document.createElement('div');
  if (backgroundImage) contentCell.append(backgroundImage);
  if (titleElement) contentCell.append(titleElement);
  if (subtitleElement) contentCell.append(subtitleElement);
  socialIcons.forEach(icon => contentCell.append(icon));

  // Prepare the rows for the table
  const contentRow = [contentCell];
  const tableData = [headerRow, contentRow];

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}