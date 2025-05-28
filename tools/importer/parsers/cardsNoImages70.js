/* global WebImporter */
export default function parse(element, { document }) {
  const contentDivs = element.querySelectorAll(':scope > div');

  const cards = [];

  contentDivs.forEach((div) => {
    const textElements = div.querySelectorAll('p');

    if (textElements.length > 0) {
      const cardContent = [];

      textElements.forEach((textElement) => {
        cardContent.push(textElement);
      });

      cards.push(cardContent);
    }

    // Handle elements with 'src' attributes (e.g., iframe), integrating them within existing rows
    const srcElements = div.querySelectorAll('[src]:not(img)');
    srcElements.forEach((srcElement) => {
      if (srcElement.src) {
        const link = document.createElement('a');
        link.href = srcElement.src;
        link.textContent = srcElement.src;
        if (cards.length > 0) {
          cards[cards.length - 1].push(link); // Add to the last card row if it exists
        } else {
          cards.push([link]); // Create a new row if no cards exist
        }
      }
    });
  });

  const headerRow = ['Cards (cardsNoImages70)'];
  
  // Filter out empty rows and structure output correctly
  const filteredCards = cards.filter((row) => row.length > 0);
  const tableRows = [headerRow, ...filteredCards.map((card) => [card])];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  element.replaceWith(table);
}