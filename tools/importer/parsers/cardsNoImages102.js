/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row
  const headerRow = ['Cards (cardsNoImages102)'];

  // Extract immediate child divs
  const childDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Initialize rows with header
  const rows = [headerRow];

  childDivs.forEach((child) => {
    const promoBar = child.querySelector('.o5-promo-bar__body');
    if (promoBar) {
      // Extract heading, description, and link elements
      const heading = promoBar.querySelector('span');
      const description = promoBar.querySelector('p:last-of-type');
      const link = promoBar.querySelector('a');

      // Prepare cell content array
      const cellContent = [];

      if (heading) {
        cellContent.push(heading);
      }

      if (description) {
        cellContent.push(description);
      }

      if (link) {
        cellContent.push(link);
      }

      rows.push([cellContent]); // Add cell content to rows
    }
  });

  // Create a table using WebImporter.DOMUtils.createTable helper
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the generated table
  element.replaceWith(table);
}