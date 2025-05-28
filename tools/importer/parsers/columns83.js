/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns83)'];

  // Extract immediate child elements of the block
  const childDivs = element.querySelectorAll(':scope > div');

  const row1 = [];
  const row2 = [];

  childDivs.forEach((child) => {
    const image = child.querySelector(':scope img');
    const content = child.querySelector(':scope .text-component');

    if (image) {
      // Add image to the first row
      row1.push(image);
    }

    if (content) {
      // Combine relevant text and links into a single cell for the second row
      const combinedContent = document.createDocumentFragment();

      [...content.children].forEach((el) => {
        if (el.tagName === 'A' && el.href) {
          const link = document.createElement('a');
          link.href = el.href;
          link.textContent = el.textContent;
          combinedContent.append(link);
        } else {
          combinedContent.append(el);
        }
      });

      row2.push(combinedContent);
    }
  });

  const cells = [headerRow, row1, row2];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(blockTable);
}