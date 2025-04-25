/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the FAQ heading and introductory paragraph
  const heading = element.querySelector('h2');
  const introParagraph = element.querySelector('p');

  // Extract accordion items
  const accordionItems = element.querySelectorAll('.accordion h3');
  const accordionPanels = element.querySelectorAll('.accordion section');

  // Prepare table data
  const tableData = [];

  // Header row
  tableData.push(['Accordion']);

  // Accordion content rows
  accordionItems.forEach((item, index) => {
    const title = item.textContent.trim();
    const content = accordionPanels[index];
    const contentElements = Array.from(content.childNodes);

    tableData.push([title, contentElements]);
  });

  // Create the block table
  const accordionTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(accordionTable);
}