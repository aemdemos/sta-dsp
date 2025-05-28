/* global WebImporter */

export default function parse(element, { document }) {
  // Helper function to create links dynamically
  const createLink = (href, text) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = text;
    return link;
  };

  // Define header row exactly as per the example structure
  const headerRow = ['Table (striped, bordered, tableStripedBordered75)'];

  // Prepare data rows dynamically by referencing existing content from the element
  const dataRows = [];

  const siteLinks = element.querySelectorAll(':scope ul.o5-site-toggle__links li');

  siteLinks.forEach((listItem) => {
    const linkElement = listItem.querySelector('a.o5-site-toggle__link');
    if (linkElement) {
      const linkText = linkElement.textContent.trim();
      const linkHref = linkElement.href;
      dataRows.push([linkText, createLink(linkHref, linkHref)]);
    }
  });

  // Ensure semantic meaning is retained and all text content is included
  if (!dataRows.length) {
    console.warn('No valid links found in the provided element');
  }

  // Create the table array, ensuring the structure matches the example markdown precisely
  const cells = [
    headerRow,
    ...dataRows
  ];

  // Create table block using existing elements
  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the structured table block
  element.replaceWith(tableBlock);
}