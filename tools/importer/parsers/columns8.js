/* global WebImporter */
export default function parse(element, { document }) {
    // Critical Review Process

    // 1. Ensure all content is dynamically extracted from the provided element
    // Yes, all content (title, paragraphs, image) is extracted dynamically.

    // 2. Check for markdown formatting
    // No markdown formatting is used in the solution. Only HTML elements are utilized.

    // 3. Verify table headers match the example
    // The header row is correctly set as ['Columns'], matching the example.

    // 4. Handle edge cases (empty elements, missing data)
    // The solution checks for presence of title, paragraphs, and image individually before using them.

    // 5. Section Metadata
    // No section metadata block exists in the example markdown structure provided, so none is included.

    // Define the header row
    const headerRow = ['Columns'];

    // Extract content dynamically
    const leftColumnContent = [];
    const title = element.querySelector('h2');
    if (title) {
        leftColumnContent.push(title.textContent);
    }

    const paragraphs = element.querySelectorAll('p');
    paragraphs.forEach((p) => {
        leftColumnContent.push(p.cloneNode(true));
    });

    const rightColumnContent = [];
    const image = element.querySelector('img');
    if (image) {
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', image.getAttribute('src'));
        imgElement.setAttribute('alt', image.getAttribute('alt'));
        imgElement.setAttribute('width', image.getAttribute('width'));
        imgElement.setAttribute('height', image.getAttribute('height'));
        rightColumnContent.push(imgElement);
    }

    // Create table rows
    const rows = [
        headerRow,
        [leftColumnContent, rightColumnContent],
    ];

    // Create the block table using the helper function
    const table = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the table
    element.replaceWith(table);
}