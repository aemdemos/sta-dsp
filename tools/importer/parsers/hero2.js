/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row according to the example
  const headerRow = ['Hero'];

  // Extract dynamic content
  const eyebrow = element.querySelector('.hero-text__eyebrow-1')?.textContent.trim() || '';
  const title = element.querySelector('.hero-text__title')?.textContent.trim() || '';
  const imgEl = element.querySelector('img');
  const image = imgEl ? document.createElement('img') : null;
  if (image) {
    image.src = imgEl.src;
    image.alt = imgEl.alt;
  }

  const patientPortrayal = element.querySelector('.hero-text__patient-portrayal')?.textContent.trim() || '';

  // Create content cell with all extracted elements
  const contentCell = document.createElement('div');
  if (image) contentCell.appendChild(image);

  if (eyebrow) {
    const eyebrowElement = document.createElement('p');
    eyebrowElement.textContent = eyebrow;
    contentCell.appendChild(eyebrowElement);
  }

  if (title) {
    const titleElement = document.createElement('h1');
    titleElement.textContent = title;
    contentCell.appendChild(titleElement);
  }

  if (patientPortrayal) {
    const portrayalElement = document.createElement('small');
    portrayalElement.textContent = patientPortrayal;
    contentCell.appendChild(portrayalElement);
  }

  // Organize into table format
  const table = WebImporter.DOMUtils.createTable([
    headerRow, // Header row
    [contentCell] // Single content cell including all extracted components
  ], document);

  // Replace the original element
  element.replaceWith(table);
}