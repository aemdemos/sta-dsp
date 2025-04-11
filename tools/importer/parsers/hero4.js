/* global WebImporter */
export default function parse(element, { document }) {
  // Corrected Header Row
  const headerRow = ['Hero'];

  // Extract the title
  const titleElement = element.querySelector('.hero-text__title');
  const title = document.createElement('h1');
  title.innerHTML = titleElement?.innerHTML || '';

  // Extract the subheading
  const subheadingElement = element.querySelector('.hero-text__eyebrow-2');
  const subheading = document.createElement('h3');
  subheading.innerHTML = subheadingElement?.innerHTML || '';

  // Extract the description paragraph
  const descriptionElement = element.querySelector('.m-b-sm-3');
  const description = document.createElement('p');
  description.innerHTML = descriptionElement?.innerHTML || '';

  // Extract the image
  const imageElement = element.querySelector('img');
  const image = document.createElement('img');
  image.src = imageElement?.src || '';
  image.alt = imageElement?.alt || '';

  // Combine all extracted elements into a single cell
  const combinedContent = document.createElement('div');
  combinedContent.appendChild(image);
  combinedContent.appendChild(title);
  combinedContent.appendChild(subheading);
  combinedContent.appendChild(description);

  // Create the second row with a single column containing combined content
  const contentRow = [combinedContent];

  // Construct the table
  const tableData = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the table
  element.replaceWith(table);
}