/* global WebImporter */
export default function parse(element, { document }) {
    // Extract the relevant content for the embed block
    const iframeOrLink = element.querySelector('iframe[src], a[href]');
    let url = '';
    let linkElement = null;

    // Handle if iframe or link exists and extract its URL
    if (iframeOrLink) {
        url = iframeOrLink.getAttribute('src') || iframeOrLink.getAttribute('href');
        // Wrap URL in an anchor element if it exists
        linkElement = document.createElement('a');
        linkElement.setAttribute('href', url);
        linkElement.textContent = url;
    } else {
        // Handle edge case where no iframe or anchor exists
        linkElement = document.createTextNode('No valid content available');
    }

    // Define the header row for the table, matching example structure
    const headerRow = ['Embed (embedSocial59)'];

    // Create the content row containing the URL wrapped in an anchor element
    const contentRow = [linkElement];

    // Create the block table using the helper function
    const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

    // Replace the original element with the newly created block table
    element.replaceWith(blockTable);
}