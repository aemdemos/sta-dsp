/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the header content from the element
  const header = 'Tabs';

  // Extract tab data
  const titleElement = element.querySelector('h2');
  const descriptionElement = element.querySelector('p');
  const links = Array.from(element.querySelectorAll('a'));

  // Build the rows for the block table
  const rows = [
    [header],
  ];

  links.forEach((link) => {
    const tabLabel = link.textContent.trim();
    const tabContent = document.createElement('div');

    // Add the description
    const description = document.createElement('p');
    description.textContent = descriptionElement.textContent.trim();
    tabContent.appendChild(description);

    // Add the link itself
    const linkElement = document.createElement('a');
    linkElement.href = link.href;
    linkElement.textContent = link.textContent.trim();
    tabContent.appendChild(linkElement);

    rows.push([tabLabel, tabContent]);
  });

  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}