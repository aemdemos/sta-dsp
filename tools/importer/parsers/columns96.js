/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Columns (columns96)';

    // Gather all columns
    const columns = Array.from(element.querySelectorAll(':scope > div')).map((column) => {
        const content = column.querySelector(':scope > div > div > div > div > div > div > div > div > div');
        return content ? content : '';
    });

    // Ensure all content is properly structured
    const cells = [headerRow, columns];

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the newly created block
    element.replaceWith(block);
}