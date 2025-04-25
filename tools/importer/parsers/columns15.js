/* global WebImporter */
export default function parse(element, { document }) {
  // Create an <hr> for section break
  const sectionBreak = document.createElement('hr');

  // Extracting content from the input element dynamically
  const row = element.querySelector('.row.items-center');
  if (!row) throw new Error('Row with items-center class not found');

  const leftCol = row.querySelector('.col-lg-6:first-child');
  if (!leftCol) throw new Error('Left column not found');

  const rightCol = row.querySelector('.col-lg-6:last-child');
  if (!rightCol) throw new Error('Right column not found');

  const titleElement = leftCol.querySelector('h2');
  const title = titleElement ? titleElement.textContent.trim() : 'Title missing';

  const paragraphs = Array.from(leftCol.querySelectorAll('p')).map(p => {
    // Stripping classes and extracting plain HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = p.innerHTML; // Remove classes by resetting innerHTML
    return tempDiv.outerHTML;
  });

  const image = rightCol.querySelector('img');
  if (!image) throw new Error('Image element not found in right column');

  const imgElement = document.createElement('img');
  imgElement.src = image.getAttribute('src');
  imgElement.alt = image.getAttribute('alt');

  // Creating the header row (as per example structure)
  const headerRow = ['Columns'];

  // Combining paragraphs into a single cell without <br> tags
  const combinedContent = [`<strong>${title}</strong>`, ...paragraphs].join(' ');

  // Creating the content rows
  const contentRow = [
    combinedContent,
    imgElement
  ];

  const tableData = [
    headerRow,
    contentRow
  ];

  const generatedTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replacing the element with the generated table
  element.replaceWith(sectionBreak, generatedTable);
}