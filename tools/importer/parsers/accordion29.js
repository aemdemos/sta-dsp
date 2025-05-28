/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Accordion (accordion29)'];

    const rows = [];

    // Extract accordion items dynamically
    const accordionItems = element.querySelectorAll('.calendar-sf-filter-tray__filters');

    accordionItems.forEach((accordionItem) => {
        const titleCell = accordionItem.querySelector(':scope > span');
        const contentCellId = accordionItem.getAttribute('aria-controls');
        const contentCell = contentCellId ? document.getElementById(contentCellId) : null;

        // Add to rows only if both title and content exist
        if (titleCell && contentCell) {
            rows.push([titleCell.cloneNode(true), contentCell.cloneNode(true)]);
        }
    });

    // Ensure rows are populated dynamically
    const tableData = [headerRow, ...rows];
    const block = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(block);
}