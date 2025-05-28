/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure correct header row with <strong> for consistency
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Accordion (accordion6)';

  // Extract accordion items dynamically from the provided element
  const accordionItems = Array.from(element.querySelectorAll('.ui-b-accordion__section')).map((section) => {
    const titleElement = section.querySelector('.uie-filter-tray__btn');
    const contentElement = section.querySelector('.uie-filter-tray__content');

    // Validate extracted content ensuring no missing data
    const title = titleElement ? titleElement.textContent.trim() : '';
    const content = contentElement || document.createTextNode('');

    // Return the accordion item as a row with title and content
    return [title, content];
  });

  // Combine header row and accordion items into table structure
  const tableData = [headerRow, ...accordionItems];

  // Create table using WebImporter helper
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the generated table
  element.replaceWith(table);
}