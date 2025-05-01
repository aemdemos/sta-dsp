/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content dynamically
  const eyebrow = element.querySelector('.hero-text__eyebrow-1');
  const title = element.querySelector('.hero-text__title');
  const image = element.querySelector('img');
  const patientPortrayal = element.querySelector('.hero-text__patient-portrayal');

  // Ensure proper handling of missing data
  const eyebrowText = eyebrow ? eyebrow.textContent.trim() : '';
  const titleHTML = title ? title.outerHTML.trim() : '';
  const imageHTML = image ? `<img src="${image.src}" alt="${image.alt}" width="${image.width}" height="${image.height}" />` : '';
  const portrayalText = patientPortrayal ? patientPortrayal.textContent.trim() : '';

  // Correct structure with single-column header row
  const cells = [
    ['Hero'],
    [
      `${eyebrowText}<br>${titleHTML}<br>${imageHTML}<br>${portrayalText}`
    ]
  ];

  // Create the block table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}