/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row with strong element
  const headerText = document.createElement('strong');
  headerText.textContent = 'Accordion (accordion17)';
  const headerRow = [headerText];

  const rows = [];

  // Extract all accordion items
  const accordionItems = element.querySelectorAll(':scope > li.o5-contacts-accordion__item');
  accordionItems.forEach((item) => {
    // Extract title and content
    const titleButton = item.querySelector(':scope > div.o5-contacts-accordion__blade > button');
    const title = titleButton
      ? titleButton.querySelector(':scope > span.o5-contacts-accordion__drawer-face')
      : null;

    const content = item.querySelector(':scope > div.o5-contacts-accordion__blade > div.o5-contacts-accordion__drawer-content');

    // Handle edge cases: skip rows without title or content
    if (title && content) {
      // Convert elements with 'src' attribute (non-images) to links
      content.querySelectorAll('[src]:not(img)').forEach((elementWithSrc) => {
        const link = document.createElement('a');
        link.href = elementWithSrc.src;
        link.textContent = elementWithSrc.src;
        elementWithSrc.replaceWith(link);
      });

      rows.push([title, content]);
    }
  });

  // Ensure no Section Metadata table is generated
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table
  element.replaceWith(table);
}