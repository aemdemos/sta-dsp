/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row for the block
  const headerRow = ['Columns'];
  rows.push(headerRow);

  // Extract relevant data from element for the columns block
  const columns = Array.from(element.querySelectorAll('.card')).map(card => {
    const img = card.querySelector('img');
    const title = card.querySelector('h2');
    const description = card.querySelector('p');
    const button = card.querySelector('a.button');

    const content = [];

    if (title) {
      const titleEl = document.createElement('p');
      titleEl.textContent = title.textContent;
      content.push(titleEl);
    }

    if (description) {
      const descriptionEl = document.createElement('p');
      descriptionEl.textContent = description.textContent;
      content.push(descriptionEl);
    }

    if (img) {
      const imgEl = document.createElement('img');
      imgEl.src = img.src;
      imgEl.alt = img.alt;
      content.push(imgEl);
    }

    if (button) {
      const buttonEl = document.createElement('a');
      buttonEl.href = button.href;
      buttonEl.textContent = button.textContent;
      content.push(buttonEl);
    }

    return content;
  });

  rows.push(columns);

  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}