/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards4)'];

  const rows = [headerRow];

  // Extract card elements
  const cards = element.querySelectorAll(':scope > section > div > div.o5-simple-card-grouping__card');

  cards.forEach((card) => {
    const title = card.querySelector('.o5-simple-card-grouping__HeadingH2');
    const description = card.querySelector('.o5-simple-card-grouping__bodycopy');
    const buttons = card.querySelectorAll('.o5-simple-card-grouping__buttons > a');

    const textContent = document.createElement('div');

    // Add title
    if (title) {
      const titleElement = document.createElement('h2');
      titleElement.textContent = title.textContent;
      textContent.appendChild(titleElement);
    }

    // Add description
    if (description) {
      textContent.appendChild(description.cloneNode(true));
    }

    // Add buttons
    buttons.forEach((button) => {
      const link = document.createElement('a');
      link.href = button.href;
      link.textContent = button.textContent;
      textContent.appendChild(link);
    });

    rows.push([textContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}