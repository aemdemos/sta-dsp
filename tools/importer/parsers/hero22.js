/* global WebImporter */
export default function parse(element, { document }) {
    // Define the header row as per the example
    const headerRow = ['Hero'];

    // Extract the image dynamically
    const image = element.querySelector('.col-lg-4 img');
    let imageElement;
    if (image) {
        imageElement = document.createElement('img');
        imageElement.src = image.src;
        imageElement.alt = image.alt || '';
    }

    // Extract text content dynamically
    const heading = element.querySelector('.col-lg-8 h2');
    const paragraphs = element.querySelectorAll('.col-lg-8 p');

    const textElements = [];
    if (heading) {
        textElements.push(heading);
    }
    paragraphs.forEach((paragraph) => {
        textElements.push(paragraph);
    });

    // Combine all content into a single cell for the second row
    const combinedContent = document.createElement('div');
    if (imageElement) {
        combinedContent.appendChild(imageElement);
    }
    textElements.forEach((element) => {
        combinedContent.appendChild(element);
    });

    // Define table cells
    const cells = [
        headerRow,
        [combinedContent],
    ];

    // Generate the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block
    element.replaceWith(block);
}