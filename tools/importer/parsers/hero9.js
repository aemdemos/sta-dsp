/* global WebImporter */
export default function parse(element, { document }) {
    // Extract the hero title
    const title = element.querySelector('h1.hero-text__title');
    const titleText = title ? title.textContent.trim() : '';

    // Extract the hero eyebrow text
    const eyebrow = element.querySelector('h3.hero-text__eyebrow-1');
    const eyebrowText = eyebrow ? eyebrow.textContent.trim() : '';

    // Extract the image
    const img = element.querySelector('img');
    const imageElement = document.createElement('img');
    if (img) {
        imageElement.src = img.src;
        imageElement.alt = img.alt || '';
    }

    // Combine all content into one cell
    const contentCell = document.createElement('div');
    const eyebrowElement = document.createElement('p');
    eyebrowElement.textContent = eyebrowText;
    const titleElement = document.createElement('p');
    titleElement.textContent = titleText;
    contentCell.appendChild(eyebrowElement);
    contentCell.appendChild(titleElement);
    contentCell.appendChild(imageElement);

    // Prepare the cells array for the table
    const cells = [
        ['Hero'],
        [contentCell],
    ];

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block
    element.replaceWith(block);
}