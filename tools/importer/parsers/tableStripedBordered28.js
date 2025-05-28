/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (striped, bordered, tableStripedBordered28)'];

  // Extract content dynamically from the element
  const rows = [];
  const children = element.querySelectorAll(':scope > div');

  children.forEach((child) => {
    const content = [];
    child.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'IFRAME' && node.src) {
          const link = document.createElement('a');
          link.href = node.src;
          link.textContent = node.src;
          content.push(link);
        } else {
          content.push(node);
        }
      } else if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
        const textNode = document.createTextNode(node.nodeValue.trim());
        content.push(textNode);
      }
    });
    rows.push([content]);
  });

  const cells = [
    headerRow,
    ...rows,
  ];

  // Create the table using the helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}