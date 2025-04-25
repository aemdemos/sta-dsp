/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content from the original element
  const eyebrow1 = element.querySelector('.hero-text__eyebrow-1')?.textContent.trim() || '';
  const eyebrow2 = element.querySelector('.hero-text__eyebrow-2')?.textContent.trim() || '';
  const titleElement = element.querySelector('.hero-text__title');
  const title = document.createElement('h1');
  if (titleElement) {
    title.innerHTML = titleElement.innerHTML.trim();
  }

  const descriptionElement = element.querySelector('.m-b-sm-3');
  const description = document.createElement('p');
  if (descriptionElement) {
    description.innerHTML = descriptionElement.innerHTML.trim();
  }

  const footnoteElement = element.querySelector('.text-footnote');
  const footnote = document.createElement('p');
  if (footnoteElement) {
    footnote.innerHTML = footnoteElement.innerHTML.trim();
  }

  const imageElement = element.querySelector('img');
  const image = document.createElement('img');
  if (imageElement) {
    image.src = imageElement.src;
    image.alt = imageElement.alt || '';
  }

  const patientPortrayalElement = element.querySelector('.hero-text__patient-portrayal');
  const patientPortrayal = document.createElement('p');
  if (patientPortrayalElement) {
    patientPortrayal.textContent = patientPortrayalElement.textContent.trim();
  }

  // Create the rows for the table
  const headerRow = ['Hero'];
  const contentRow = [
    [
      image,
      document.createElement('hr'),
      document.createElement('h4').appendChild(document.createTextNode(eyebrow1)),
      document.createElement('h3').appendChild(document.createTextNode(eyebrow2)),
      title,
      description,
      footnote,
      patientPortrayal
    ]
  ];

  const tableData = [headerRow, contentRow];

  // Create block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}