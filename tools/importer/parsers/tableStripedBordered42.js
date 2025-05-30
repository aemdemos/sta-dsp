/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (striped, bordered)']; // Correcting header row to match example

  // Collect rows data
  const rows = [];
  const childDivs = element.querySelectorAll(':scope > div');

  childDivs.forEach((div) => {
    const heading = div.querySelector('.calendar-serp__heading');
    const description = div.querySelector('.calendar-serp__mainDescription');

    // Check for missing or empty content and handle gracefully
    if (heading || description) {
      const rowContent = [];

      // Combine heading and description into a single cell
      if (heading) rowContent.push(heading);
      if (description) rowContent.push(description);

      rows.push([rowContent]);
    }
  });

  const tableData = [headerRow, ...rows];

  // Create the table using WebImporter's utility
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}