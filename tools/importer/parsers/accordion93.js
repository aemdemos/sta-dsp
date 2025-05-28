/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract accordion items
  function extractAccordionItems(accordionElement) {
    const items = [];
    const childDivs = accordionElement.querySelectorAll(':scope > div'); // Direct child divs
    childDivs.forEach((div) => {
      const titleButton = div.querySelector('h3 button'); // Title element
      const contentDiv = div.querySelector('.MuiAccordionDetails-root'); // Content section

      if (titleButton && contentDiv) {
        items.push([titleButton, contentDiv]);
      }
    });

    return items;
  }

  // Locate the accordion block container
  const accordionBlock = element.querySelector('.o5-serp-filters__container');

  if (!accordionBlock) {
    console.error('Accordion block not found');
    return;
  }

  const accordionItems = extractAccordionItems(accordionBlock);

  // Define the header row dynamically based on example guidelines
  const headerRow = ['Accordion (accordion93)'];

  const tableRows = accordionItems.map(([title, content]) => [title, content]);

  // Combine header and rows into cell array
  const cells = [headerRow, ...tableRows];

  // Create the table using WebImporter helper
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the structured element
  element.replaceWith(blockTable);
}