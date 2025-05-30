/* global WebImporter */
export default function parse(element, { document }) {
  // Define header row
  const headerRow = ['Tabs (tabs40)'];

  // Extract tabs and content dynamically from the element
  const tabs = Array.from(element.querySelectorAll(':scope > ul.tabs > li.tab-link')).map((tab) => {
    const label = tab.querySelector('button > span')?.textContent.trim();
    const assistiveText = tab.querySelector('i > span.assistText')?.textContent.trim();
    const content = assistiveText ? `${label} (${assistiveText})` : label;

    return [label, content];
  });

  // Create the table structure
  const cells = [headerRow, ...tabs];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}