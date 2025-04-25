/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract content from card elements
  const extractCardData = (cardElement) => {
    const image = cardElement.querySelector('.card-thumb__img');
    const heading = cardElement.querySelector('h2');
    const description = cardElement.querySelector('p');
    const cta = cardElement.querySelector('a');

    const imageElement = document.createElement('img');
    imageElement.src = image.src;
    imageElement.alt = image.alt;

    const content = [];
    if (heading) {
      const headingElement = document.createElement('strong');
      headingElement.textContent = heading.textContent;
      content.push(headingElement);
    }
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description.textContent;
      content.push(descriptionElement);
    }
    if (cta) {
      const ctaElement = document.createElement('a');
      ctaElement.href = cta.href;
      ctaElement.textContent = cta.textContent;
      content.push(ctaElement);
    }

    return [imageElement, content];
  };

  // Extract all cards
  const cards = [...element.querySelectorAll('.card')].map(extractCardData);

  // Create the table cells array
  const cells = [
    ['Cards'],
    ...cards.map(([image, content]) => [image, content]),
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}