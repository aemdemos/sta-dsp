/* global WebImporter */
export default function parse(element, { document }) {
  // Extract headline
  const headlineElement = element.querySelector('h1.hero-text__title');
  const headline = headlineElement ? headlineElement.textContent.trim() : '';

  // Extract subheadline
  const subheadlineElement = element.querySelector('h3.hero-text__eyebrow-1');
  const subheadline = subheadlineElement ? subheadlineElement.textContent.trim() : '';

  // Extract image
  const imgElement = element.querySelector('img');
  let image = '';
  if (imgElement && imgElement.src) {
    const imgLink = document.createElement('a');
    imgLink.href = imgElement.src;
    imgLink.textContent = imgElement.alt || 'Image';
    image = imgLink;
  }

  // Extract patient portrayal text
  const descriptionElement = element.querySelector('.hero-text__patient-portrayal');
  const description = descriptionElement ? descriptionElement.textContent.trim() : '';

  // Create cells for the table
  const cells = [
    ['Hero'],
    [
      [
        subheadline,
        document.createElement('br'),
        headline,
        document.createElement('br'),
        image,
        document.createElement('br'),
        description,
      ],
    ],
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}