/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];
  const rows = [];

  const accordionItems = element.querySelectorAll('h3');
  accordionItems.forEach((item) => {
    const titleButton = item.querySelector('button');
    const title = titleButton ? titleButton.textContent.trim() : '';

    const contentSection = item.nextElementSibling;
    const content = contentSection ? contentSection.innerHTML.trim() : '';

    const titleCell = document.createElement('p');
    titleCell.textContent = title;

    const contentCell = document.createElement('div');
    contentCell.innerHTML = content;

    rows.push([titleCell, contentCell]);
  });

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}