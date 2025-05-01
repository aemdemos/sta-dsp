/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];
  const cards = Array.from(element.querySelectorAll('.col')).map((col) => {
    const imgEl = col.querySelector('.card-thumb__img');
    const img = document.createElement('img');
    img.src = imgEl.src;
    img.alt = imgEl.alt;

    const contentEl = col.querySelector('.card-content__text');
    const titleEl = contentEl.querySelector('h3');
    const descriptionEl = contentEl.querySelector('ul');

    const content = [];
    if (titleEl) {
      const title = document.createElement('strong');
      title.textContent = titleEl.textContent;
      content.push(title);
    }
    if (descriptionEl) {
      Array.from(descriptionEl.querySelectorAll('li')).forEach((listItem) => {
        const paragraph = document.createElement('p');
        paragraph.textContent = listItem.textContent;
        content.push(paragraph);
      });
    }

    return [img, content];
  });

  const tableData = [headerRow, ...cards];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(block);
}