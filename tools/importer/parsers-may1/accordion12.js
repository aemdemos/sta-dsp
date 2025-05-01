/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create rows for the table
  const createAccordionRow = (title, content) => [title, content];

  const rows = [];

  // Add the header row
  rows.push(['Accordion']);

  // Fetch accordion items dynamically
  const accordion = element.querySelector('.accordion');

  if (accordion) {
    const buttons = accordion.querySelectorAll('h3 button');
    const panels = accordion.querySelectorAll('section.accordion-panel');

    buttons.forEach((button, index) => {
      const title = button.textContent.trim();
      const contentElement = document.createElement('div');
      const content = panels[index]?.innerHTML.trim() || '';

      contentElement.innerHTML = content;
      rows.push(createAccordionRow(title, contentElement));
    });
  }

  // Ensure accordion rows are properly populated
  if (rows.length === 1) {
    console.error('No accordion items could be extracted');
  }

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(table);
}