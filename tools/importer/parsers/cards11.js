/* global WebImporter */
export default function parse(element, { document }) {
    const blockHeader = ['Cards'];
    const rows = [];

    // Extract card elements
    const cards = element.querySelectorAll('.card-content__text');
    cards.forEach((card) => {
        const titleElement = card.querySelector('h3');
        const title = titleElement ? titleElement.textContent.trim() : '';

        const paragraphs = Array.from(card.querySelectorAll('p')).map(p => p.cloneNode(true));
        const content = [title, ...paragraphs];

        rows.push([content]);
    });

    const tableData = [blockHeader, ...rows];
    const table = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(table);
}