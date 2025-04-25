/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the hero title
  const titleElement = element.querySelector('.hero-text__title');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract the eyebrow heading
  const eyebrowElement = element.querySelector('.hero-text__eyebrow-1');
  const eyebrow = eyebrowElement ? eyebrowElement.textContent.trim() : '';

  // Extract the image
  const imageElement = element.querySelector('img');
  const image = imageElement ? imageElement.cloneNode(true) : null;

  // Combine eyebrow and title into a heading structure
  const heading = document.createElement('div');
  if (eyebrow) {
    const eyebrowDiv = document.createElement('div');
    eyebrowDiv.textContent = eyebrow;
    heading.appendChild(eyebrowDiv);
  }
  if (title) {
    const titleHeading = document.createElement('h1');
    titleHeading.textContent = title;
    heading.appendChild(titleHeading);
  }

  // Create the table rows
  const headerRow = ['Hero'];
  const contentRow = [
    image,
    heading,
  ];

  // Create the block table
  const cells = [
    headerRow,
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}