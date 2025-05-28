/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the header row dynamically
  const headerText = 'Search (search50)';
  const headerRow = [headerText];

  // Extract URL or 'src' attributes dynamically and verify existence
  const urlElement = element.querySelector('a[href], iframe[src]');
  let url;
  if (urlElement) {
    url = urlElement.href || urlElement.src;
  } else {
    const fallbackMessage = document.createElement('span');
    fallbackMessage.textContent = 'No valid URL or src attribute found';
    const contentRow = [fallbackMessage];
    const cells = [headerRow, contentRow];
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(blockTable);
    return;
  }

  // Create a link dynamically
  const linkElement = document.createElement('a');
  linkElement.href = url;
  linkElement.textContent = url;

  // Handle cases with missing or undefined paragraphs
  const paragraphs = element.querySelectorAll('p');
  const additionalText = paragraphs.length ? Array.from(paragraphs).map(p => p.textContent).join(' ') : '';
  const textNode = additionalText ? document.createTextNode(additionalText) : null;

  // Construct the content row dynamically and check semantic structure
  const contentRow = textNode ? [linkElement, textNode] : [linkElement];

  // Create the table using WebImporter.DOMUtils.createTable
  const cells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}