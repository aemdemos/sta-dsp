/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards89)'];

  const cards = Array.from(element.querySelectorAll(':scope > div > div > section > div'));

  const rows = cards.map((card) => {
    const title = card.querySelector('h3');
    const description = card.querySelector('.o5-simple-card-grouping__bodycopy');
    const link = card.querySelector('.o5-simple-card-grouping__buttons a');

    const textContent = [];
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title.textContent.trim();
      textContent.push(titleElement);
    }
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.innerHTML = description.innerHTML.trim();
      textContent.push(descriptionElement);
    }
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent.trim();
      textContent.push(linkElement);
    }

    return [textContent];
  });

  const tableCells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  element.replaceWith(blockTable);
}