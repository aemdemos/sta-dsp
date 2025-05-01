/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract the main elements
  const eyebrow1 = element.querySelector('.hero-text__eyebrow-1');
  const eyebrow2 = element.querySelector('.hero-text__eyebrow-2');
  const title = element.querySelector('.hero-text__title');
  const description = element.querySelector('p.m-b-sm-3');
  const footnote = element.querySelector('p.text-footnote');
  const image = element.querySelector('img');
  const imageCaption = element.querySelector('.hero-text__patient-portrayal');

  // Validate and handle potential missing content
  const heading = title ? document.createElement('h1') : null;
  if (heading) heading.innerHTML = title.innerHTML;

  const subheading1 = eyebrow1 ? document.createElement('h4') : null;
  if (subheading1) subheading1.innerHTML = eyebrow1.innerHTML;

  const subheading2 = eyebrow2 ? document.createElement('h3') : null;
  if (subheading2) subheading2.innerHTML = eyebrow2.innerHTML;

  const paragraph = description ? document.createElement('p') : null;
  if (paragraph) paragraph.innerHTML = description.innerHTML;

  const footnoteElement = footnote ? document.createElement('p') : null;
  if (footnoteElement) footnoteElement.innerHTML = footnote.innerHTML;

  const finalImage = image ? document.createElement('img') : null;
  if (finalImage) {
    finalImage.src = image.src;
    finalImage.setAttribute('alt', image.alt);
  }

  const caption = imageCaption ? document.createElement('p') : null;
  if (caption) caption.innerHTML = imageCaption.innerHTML;

  // Prepare table content
  const cells = [
    headerRow,
    [subheading1, subheading2, heading, paragraph, footnoteElement, finalImage, caption].filter(Boolean),
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}