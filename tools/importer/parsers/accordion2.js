/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion (accordion2)'];

  // Get all immediate child elements of the block
  const children = element.querySelectorAll(':scope > div');

  // Parse child elements into rows
  const rows = Array.from(children).map((child) => {
    const title = child.querySelector(':scope > h3 .o5-accordion__basic-question, :scope > h3 .o5-accordion__question');
    const content = child.querySelector(':scope > div.o5-accordion__basic-answer, :scope > div.o5-accordion__answer');

    return [title, content];
  });

  // Create the table
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the table
  element.replaceWith(table);
  return table;
}