/* global WebImporter */

export default function parse(element, { document }) {
  // Extract content from the hero block
  const title = element.querySelector('.hero-text__title');
  const subheading1 = element.querySelector('.hero-text__eyebrow-1');
  const subheading2 = element.querySelector('.hero-text__eyebrow-2');
  const description = element.querySelector('p.m-b-sm-3');
  const footnote = element.querySelector('p.text-footnote');
  const image = element.querySelector('img');
  const patientPortrayal = element.querySelector('.hero-text__patient-portrayal');

  // Construct the content for the table
  const content = document.createElement('div');

  // Add subheadings
  if (subheading1) {
    const h4 = document.createElement('h4');
    h4.innerHTML = subheading1.innerHTML;
    content.appendChild(h4);
  }

  if (subheading2) {
    const h3 = document.createElement('h3');
    h3.innerHTML = subheading2.innerHTML;
    content.appendChild(h3);
  }

  // Add title
  if (title) {
    const h1 = document.createElement('h1');
    h1.innerHTML = title.innerHTML;
    content.appendChild(h1);
  }

  // Add description
  if (description) {
    const p = document.createElement('p');
    p.innerHTML = description.innerHTML;
    content.appendChild(p);
  }

  // Add footnotes
  if (footnote) {
    const footnoteElement = document.createElement('p');
    footnoteElement.innerHTML = footnote.innerHTML;
    content.appendChild(footnoteElement);
  }

  // Add image
  const imageWrapper = document.createElement('div');
  if (image) {
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.setAttribute('width', image.getAttribute('width'));
    img.setAttribute('height', image.getAttribute('height'));
    imageWrapper.appendChild(img);

    // Add patient portrayal text
    if (patientPortrayal) {
      const portrayalText = document.createElement('p');
      portrayalText.textContent = patientPortrayal.textContent;
      imageWrapper.appendChild(portrayalText);
    }
  }

  // Create table cells
  const cells = [
    ['Hero'], // Header row
    [content, imageWrapper],
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
