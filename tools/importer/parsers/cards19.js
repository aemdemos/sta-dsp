/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  const rows = Array.from(element.querySelectorAll('.card')).map((card) => {
    const title = card.querySelector('h3')?.textContent.trim();
    const description = card.querySelector('p')?.textContent.trim();
    const ctaLink = card.querySelector('a');

    const ctaText = ctaLink?.textContent.trim();
    const ctaHref = ctaLink?.href;

    const textContent = [];

    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title;
      textContent.push(titleElement);
    }

    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;
      textContent.push(descriptionElement);
    }

    if (ctaText && ctaHref) {
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', ctaHref);
      linkElement.textContent = ctaText;
      textContent.push(linkElement);
    }

    return ['', textContent];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}