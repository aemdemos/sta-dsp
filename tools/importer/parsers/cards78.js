/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards78)'];

  // Get all cards in the container
  const cards = element.querySelectorAll(':scope > section > div > div');

  const rows = Array.from(cards).map((card) => {
    const image = card.querySelector('.o5-lateral-card__image');

    const title = card.querySelector('.o5-lateral-card__HeadingH3');
    const description = card.querySelector('.o5-lateral-card__bodycopy');
    const cta = card.querySelector('.o5-lateral-card__buttons a');

    const textContent = document.createElement('div');

    if (title) {
      const titleElement = document.createElement('h3');
      titleElement.innerHTML = title.innerHTML;
      textContent.appendChild(titleElement);
    }

    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.innerHTML = description.innerHTML;
      textContent.appendChild(descriptionElement);
    }

    if (cta) {
      const ctaElement = document.createElement('a');
      ctaElement.href = cta.href;
      ctaElement.innerHTML = cta.textContent;
      textContent.appendChild(ctaElement);
    }

    return [image, textContent];
  });

  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}