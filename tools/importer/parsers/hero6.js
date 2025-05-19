/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerRow = ['Hero'];
  cells.push(headerRow);

  // Content row
  const contentRow = [];

  // Extract title
  const title = element.querySelector('h2.section-heading');
  let titleElement = null;
  if (title) {
    titleElement = document.createElement('h1');
    titleElement.textContent = title.textContent;
  }

  // Extract subtitle
  const subtitle = element.querySelector('h3.section-subheading');
  let subtitleElement = null;
  if (subtitle) {
    subtitleElement = document.createElement('p');
    subtitleElement.textContent = subtitle.textContent;
  }

  // Extract links
  const links = element.querySelectorAll('h5 a');
  let linksContainer = null;
  if (links.length > 0) {
    linksContainer = document.createElement('p');
    links.forEach((link, index) => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.target = link.target;
      anchor.textContent = link.textContent;
      linksContainer.appendChild(anchor);
      // Add separator unless it's the last link
      if (index < links.length - 1) {
        linksContainer.appendChild(document.createTextNode(' | '));
      }
    });
  }

  // Extract paragraph content
  const paragraph = element.querySelector('p.text-color-wt');
  let paragraphElement = null;
  if (paragraph) {
    paragraphElement = document.createElement('p');
    paragraphElement.textContent = paragraph.textContent;
  }

  // Extract table content
  const table = element.querySelector('h5 table');
  let tableContent = null;
  if (table) {
    tableContent = document.createElement('div');
    tableContent.innerHTML = table.outerHTML; // Preserve table structure
  }

  // Combine all extracted content into one cell
  const combinedContent = [titleElement, subtitleElement, linksContainer, paragraphElement, tableContent].filter(Boolean);
  contentRow.push(combinedContent);

  cells.push(contentRow);

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the new block table
  element.replaceWith(blockTable);
}