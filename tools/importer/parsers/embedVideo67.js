/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the relevant link from the provided HTML
  const linkElement = element.querySelector(':scope > div .o5-l2-nav-standalone__button a');
  
  if (!linkElement) {
    console.error('No link element found in the provided HTML.');
    return;
  }

  // Create the header row as specified in the example
  const headerRow = ['Embed (embedVideo67)'];

  // Table content consists of the header row and the extracted link
  const tableContent = [
    headerRow,
    [linkElement]
  ];

  // Create the structured table using the helper function
  const table = WebImporter.DOMUtils.createTable(tableContent, document);

  // Replace the original element with the newly created block table
  element.replaceWith(table);
}