/* global WebImporter */
 export default function parse(element, { document }) {
  const headerRow = ['Cards (cards82)'];
  const rows = [headerRow];

  const cardElements = element.querySelectorAll(':scope > div > div > div > section > div');

  cardElements.forEach((card) => {
    const imageElement = card.querySelector('img');
    const titleElement = card.querySelector('h2');
    const descriptionElement = card.querySelector('.o5-simple-card-grouping__bodycopy');
    const linkElement = card.querySelector('a');

    const cellContent = [];

    if (titleElement) {
      const validTitleElement = titleElement.cloneNode(true);
      validTitleElement.removeAttribute('${model.headinglevelsimple}'); // Fix invalid model reference
      cellContent.push(validTitleElement);
    }

    if (descriptionElement) {
      cellContent.push(descriptionElement);
    }

    if (linkElement) {
      cellContent.push(linkElement);
    }

    rows.push([
      imageElement,
      cellContent,
    ]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}