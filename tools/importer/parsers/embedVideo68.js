/* global WebImporter */
export default function parse(element, { document }) {
    // Extract relevant content from the source HTML
    const linkElement = element.querySelector('.o5-l2-nav-standalone__button > a');

    // Prepare the table rows based on the example structure
    const headerRow = ['Embed (embedVideo68)'];
    const contentRow = [linkElement ? linkElement.cloneNode(true) : ''];

    // Create the block table using the helper function
    const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

    // Replace the original element with the structured block table
    element.replaceWith(blockTable);
}