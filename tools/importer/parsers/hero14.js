/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting header elements dynamically, ensuring no hardcoding
  const eyebrow1 = element.querySelector('.hero-text__eyebrow-1')?.textContent.trim();
  const eyebrow2 = element.querySelector('.hero-text__eyebrow-2')?.textContent.trim();
  const title = element.querySelector('.hero-text__title')?.innerHTML.trim();

  // Extracting paragraphs dynamically, ensuring proper concatenation
  const descriptionParagraphs = element.querySelectorAll('.col-lg-6 p');
  const description = Array.from(descriptionParagraphs).map(p => p.outerHTML).join('');

  // Extracting image attributes dynamically
  const imgElement = element.querySelector('img');
  const imageSrc = imgElement?.src;
  const imageAlt = imgElement?.alt;

  // Creating the block table dynamically with proper headers and extracted content
  const cells = [
    ['Hero'], // Matches example EXACTLY
    [
      [
        eyebrow1 ? `<h4>${eyebrow1}</h4>` : '',
        eyebrow2 ? `<h3>${eyebrow2}</h3>` : '',
        title ? `<h1>${title}</h1>` : '',
        description,
        imgElement ? `<img src="${imageSrc}" alt="${imageAlt}">` : ''
      ].join('')
    ],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the final block
  element.replaceWith(block);
}