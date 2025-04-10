/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content
  const title = element.querySelector('h1.hero-text__title');
  const eyebrow1 = element.querySelector('h4.hero-text__eyebrow-1');
  const eyebrow2 = element.querySelector('h3.hero-text__eyebrow-2');
  const description = element.querySelector('p.m-b-sm-3');
  const footnote = element.querySelector('p.text-footnote');
  const image = element.querySelector('img');

  // Create image element
  const imgElement = document.createElement('img');
  imgElement.src = image.src;
  imgElement.alt = image.alt;

  // Combine all extracted content into a single cell
  const contentCell = document.createElement('div');
  contentCell.appendChild(eyebrow1);
  contentCell.appendChild(eyebrow2);
  contentCell.appendChild(title);
  contentCell.appendChild(description);
  contentCell.appendChild(footnote);
  contentCell.appendChild(imgElement);

  // Define table structure
  const cells = [
    ['Hero'],
    [contentCell]
  ];

  // Create block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(block);
}