/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Accordion (accordion22)'];

    const rows = Array.from(element.querySelectorAll(':scope > h3, :scope > div')).map((child) => {
        if (child.matches('h3')) {
            const title = child.querySelector('.o5-accordion__basic-question');
            return [title];
        } else if (child.matches('div')) {
            const content = child.querySelectorAll(':scope > *');
            return [Array.from(content)];
        }
    }).filter(Boolean); // Ensures rows with no content are excluded.

    const tableData = [headerRow, ...rows];
    const block = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(block);
}