/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  const rows = [...element.querySelectorAll('.col')].map((col) => {
    const image = col.querySelector('img');
    if (!image) return ['Missing Image'];

    const imgEl = document.createElement('img');
    imgEl.src = image.src;
    imgEl.alt = image.alt || 'Image';

    const title = col.querySelector('h2');
    const titleEl = document.createElement('strong');
    titleEl.textContent = title ? title.textContent : 'Missing Title';

    const description = col.querySelector('p');
    const descriptionEl = document.createElement('p');
    descriptionEl.textContent = description ? description.textContent : 'Missing Description';

    const link = col.querySelector('a');
    const linkEl = document.createElement('a');
    if (link) {
      linkEl.href = link.href;
      linkEl.textContent = link.textContent;
    } else {
      linkEl.textContent = 'Missing Link';
    }

    const textContent = document.createElement('div');
    textContent.appendChild(titleEl);
    textContent.appendChild(descriptionEl);
    textContent.appendChild(linkEl);

    return [imgEl, textContent];
  });

  const tableData = [headerRow, ...rows];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}