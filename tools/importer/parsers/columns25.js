/* global WebImporter */
export default function parse(element, { document }) {
  // Define header row based on example structure
  const headerRow = ['Columns (columns25)'];

  // Extract relevant content dynamically
  const title = element.querySelector(':scope h1');
  const subtitle = element.querySelector(':scope h2');
  const formSection = element.querySelector(':scope .o5-plu-intakeform-content__form');
  const imageSection = element.querySelector(':scope .o5-plu-intake-viewtypes__img-container');

  // Handle empty or missing data gracefully
  const desktopImage = imageSection ? imageSection.querySelector(':scope .o5-plu-intake-viewtypes__desktop') : null;

  // Create structured rows for the block table
  const rows = [
    headerRow,
    [
      [title, subtitle, formSection],
      desktopImage,
    ],
  ];

  // Create the table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  if (blockTable) {
    element.replaceWith(blockTable);
  }
}