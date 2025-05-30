/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Create header row matching example exactly
  const headerRow = ['Accordion (accordion86)'];

  // Step 2: Initialize rows array for accordion items
  const rows = [];

  // Step 3: Extract accordion sections dynamically
  const accordionSections = element.querySelectorAll('.ui-b-accordion__section');

  // Step 4: Loop through each accordion section
  accordionSections.forEach(section => {
    const titleButton = section.querySelector('.uie-filter-tray__btn');
    const contentDrawer = section.querySelector('.ui-b-accordion__drawer');

    // Handle missing data edge case
    if (titleButton && contentDrawer) {
      // Reference existing elements instead of cloning
      const titleCell = titleButton;
      const contentCell = contentDrawer;

      // Add extracted content to rows array
      rows.push([titleCell, contentCell]);
    }
  });

  // Step 5: Combine header row and rows into table data
  const tableData = [headerRow, ...rows];

  // Step 6: Create block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Step 7: Replace original element with new block table
  element.replaceWith(blockTable);
}