/* global WebImporter */
export default function parse(element, { document }) {
  // Get the immediate child elements of the root element
  const childDivs = element.querySelectorAll(':scope > div');

  // Extract the tabs container and the tabs list
  const tabsContainer = childDivs[0];
  const tabsList = tabsContainer.querySelector('[role="tablist"]');

  // Extract individual tabs and their labels
  const tabs = [...tabsList.querySelectorAll('[role="tab"]')];

  // Prepare table rows
  const headerRow = ['Tabs (tabs26)'];
  const contentRows = tabs.map(tab => {
    const tabLabel = tab.textContent.trim();
    const tabContent = document.createElement('div'); // Placeholder content block
    tabContent.textContent = `Content for ${tabLabel}`; // Dynamic content can be added here
    return [tabLabel, tabContent];
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, ...contentRows], document);

  // Replace the original element with the table
  element.replaceWith(table);
}