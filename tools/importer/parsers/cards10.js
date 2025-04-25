/* global WebImporter */
export default function parse(element, { document }) {
    const cardsHeader = ['Cards'];
    const cardsContent = [];

    // Extract individual cards
    const cardElements = element.querySelectorAll('.card-content__text');

    cardElements.forEach((card) => {
        const cardContent = [];

        // Extract heading
        const heading = card.querySelector('h3');
        if (heading) {
            const headingElement = document.createElement('strong');
            headingElement.textContent = heading.textContent.trim();
            cardContent.push(headingElement);
        }

        // Extract the rest of the descriptive text
        const paragraphs = card.querySelectorAll('p');
        paragraphs.forEach((paragraph) => {
            const paragraphElement = document.createElement('p');
            paragraphElement.innerHTML = paragraph.innerHTML.trim();
            cardContent.push(paragraphElement);
        });

        cardsContent.push([cardContent]);
    });

    // Create the table
    const tableData = [cardsHeader, ...cardsContent];
    const table = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element
    element.replaceWith(table);
}