/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly matching the example
  const headerRow = ['Accordion (accordion9)'];
  const rows = [];

  // Get all accordion items dynamically
  const accordionItems = element.querySelectorAll(':scope > .MuiPaper-root');

  accordionItems.forEach((accordion) => {
    const titleElement = accordion.querySelector('.MuiAccordionSummary-content');
    const contentElement = accordion.querySelector('.MuiAccordionDetails-root');

    // Handle edge cases for missing data
    if (titleElement && contentElement) {
      const titleCell = titleElement; // Directly reference the title element
      const contentCell = contentElement; // Directly reference the content element

      rows.push([titleCell, contentCell]);
    }
  });

  // Create the table dynamically including all elements
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the table
  element.replaceWith(table);
}