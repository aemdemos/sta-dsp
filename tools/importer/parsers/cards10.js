/* global WebImporter */
export default function parse(element, { document }) {
    const cards = [];

    // Extract cards from the given HTML structure
    const cardElements = element.querySelectorAll('.card');
    cardElements.forEach((card) => {
        const imageElement = card.querySelector('.card-thumb__img');
        const titleElement = card.querySelector('.card-content__text h3');
        const descriptionElements = card.querySelectorAll('.card-content__text ul li');

        const image = document.createElement('img');
        image.src = imageElement.src;
        image.alt = imageElement.alt;

        const title = document.createElement('strong');
        title.textContent = titleElement.textContent;

        // Combine descriptions into a paragraph
        const description = document.createElement('p');
        description.textContent = Array.from(descriptionElements).map(li => li.textContent).join('\n');

        // Add the card details to the array
        cards.push([image, [title, description]]);
    });

    // Define the header row for the table
    const headerRow = ['Cards'];

    // Create the table data array
    const tableData = [headerRow, ...cards];

    // Create the block table using WebImporter
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}