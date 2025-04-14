/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the input element
  const accordion = element.querySelector('.accordion');
  if (!accordion) {
    console.warn('Accordion element not found');
    return;
  }

  const accordionItems = Array.from(accordion.children);

  // Organize extracted content into a table array matching desired structure
  const headerRow = ['Accordion'];
  const rows = [];

  for (let i = 0; i < accordionItems.length; i++) {
    const item = accordionItems[i];
    if (item.tagName.toLowerCase() === 'h3') {
      const button = item.querySelector('button');
      const title = button ? button.textContent.trim() : 'Unknown Title';

      const nextElement = accordionItems[i + 1];
      let content = '';
      if (nextElement && nextElement.tagName.toLowerCase() === 'section') {
        content = nextElement.innerHTML.trim();
      }

      rows.push([title, content]);
    }
  }

  const cells = [headerRow, ...rows];

  // Create the block table using WebImporter.DOMUtils.createTable()
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}