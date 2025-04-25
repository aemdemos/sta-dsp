/* global WebImporter */
export default function parse(element, { document }) {
    // Helper to extract text content
    const extractText = (el) => el ? el.textContent.trim() : '';

    // Helper to create a link element
    const createLink = (href, text) => {
        const link = document.createElement('a');
        link.href = href;
        link.textContent = text;
        return link;
    };

    // Extract content for the first column
    const firstCard = element.querySelectorAll('.card')[0];
    const firstCardTitle = document.createElement('h3');
    firstCardTitle.textContent = extractText(firstCard.querySelector('h3'));
    const firstCardDescription = document.createElement('p');
    firstCardDescription.textContent = extractText(firstCard.querySelector('p'));
    const firstCardLinkElement = firstCard.querySelector('a');
    const firstCardLink = createLink(firstCardLinkElement.href, extractText(firstCardLinkElement));

    // Extract content for the second column
    const secondCard = element.querySelectorAll('.card')[1];
    const secondCardTitle = document.createElement('h3');
    secondCardTitle.textContent = extractText(secondCard.querySelector('h3'));
    const secondCardDescription = document.createElement('p');
    secondCardDescription.textContent = extractText(secondCard.querySelector('p'));
    const secondCardLinkElement = secondCard.querySelector('a');
    const secondCardLink = createLink(secondCardLinkElement.href, extractText(secondCardLinkElement));

    // Create table rows
    const tableData = [
        ['Columns'],
        [
            [firstCardTitle, firstCardDescription, firstCardLink],
            [secondCardTitle, secondCardDescription, secondCardLink]
        ]
    ];

    // Create block table
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the element with the new block table
    element.replaceWith(blockTable);
}