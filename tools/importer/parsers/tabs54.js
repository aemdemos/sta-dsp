/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Tabs (tabs54)'];

  // Retrieve all tab button elements
  const tabs = element.querySelectorAll(':scope > button');

  // Extract content dynamically linked to tab IDs
  const rows = Array.from(tabs).map((tab) => {
    const tabLabel = tab.textContent.trim();
    const tabContentId = tab.getAttribute('aria-controls');
    const tabContent = document.getElementById(tabContentId);

    let content;
    if (tabContent) {
      // Clone tab content and include fallback handling for missing elements
      content = tabContent.cloneNode(true);
    } else {
      // Handle missing tab content by providing a dynamic fallback message
      content = document.createTextNode(`Content for "${tabLabel}" is not available in the source HTML.`);
    }

    return [tabLabel, content];
  });

  const tableData = [headerRow, ...rows];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the newly constructed table
  element.replaceWith(blockTable);
}