/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract immediate child div elements
  const getChildren = (parent) => Array.from(parent.querySelectorAll(':scope > div'));

  // Extract elements for each column
  const leftPanel = element.querySelector('.calendar-sidepanel');
  const calendarElement = leftPanel.querySelector('#calendar');
  const calendarHeading = leftPanel.querySelector('.calendar-sf-activity__heading');

  const rightPanel = element.querySelector('.calendar-sf-activity-results');
  const sortElement = rightPanel.querySelector('.calendar-sf-results__sorter');
  const resultsMessage = rightPanel.querySelector('#noResultMsg');

  // Construct the header row
  const headerRow = ['Columns (columns49)'];

  // Construct the second-row content for the columns
  const columnOneContent = [calendarHeading, calendarElement];
  const columnTwoContent = [sortElement, resultsMessage];

  const secondRow = [columnOneContent, columnTwoContent];

  // Create the table
  const tableContent = [headerRow, secondRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableContent, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}