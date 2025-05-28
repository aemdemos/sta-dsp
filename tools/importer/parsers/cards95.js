/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards95)'];

  const childDivs = element.querySelectorAll(':scope > div > div > section > div');

  const rows = Array.from(childDivs).map((child) => {
    const titleElement = child.querySelector('h2, h3');
    const bodyElement = child.querySelector('.o5-simple-card-grouping__bodycopy');

    const title = titleElement ? titleElement.textContent.trim() : '';
    const bodyContent = bodyElement ? bodyElement.innerHTML.trim() : '';

    // Ensure body content includes links, phone numbers, and other key data
    const links = Array.from(bodyElement.querySelectorAll('a')).map(link => link);
    const combinedContent = [titleElement, ...links, document.createElement('div')];
    combinedContent[combinedContent.length - 1].innerHTML = bodyContent;

    return combinedContent;
  });

  const cells = [headerRow, ...rows];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}