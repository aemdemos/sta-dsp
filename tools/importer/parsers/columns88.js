/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row for the table
  const headerRow = ['Columns (columns88)'];

  // Extract child divs directly under the expected row structure
  const childDivs = element.querySelectorAll(':scope > div > div > div > div');
  const columnCells = [];

  // Iterate over each child div to extract relevant content for columns
  childDivs.forEach((childDiv) => {
    const columnContent = [];

    // Extract text components
    const textComponents = childDiv.querySelectorAll('.text-component');
    textComponents.forEach((textComponent) => {
      columnContent.push(textComponent);
    });

    // Extract image elements
    const images = childDiv.querySelectorAll('img');
    images.forEach((image) => {
      columnContent.push(image);
    });

    columnCells.push(columnContent);
  });

  // Prepare table data array
  const tableData = [
    headerRow, // Header row
    columnCells // Content rows
  ];

  // Use the WebImporter.DOMUtils.createTable function to create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}