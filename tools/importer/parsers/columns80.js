/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns80)'];

  // Extract content for the first column
  const textContainer = element.querySelector('.o5-detail-hero-banner__content');
  const eyebrow = textContainer?.querySelector('.o5-detail-hero-banner__eyeBrow');
  const mainHeading = textContainer?.querySelector('.o5-detail-hero-banner__main-heading_1');
  const bodyCopy = textContainer?.querySelector('.o5-detail-hero-banner__bodyCopy');

  const firstColumnContent = [eyebrow, mainHeading, bodyCopy].filter(Boolean);

  // Extract content for the second column
  const imageContainer = element.querySelector('.o5-detail-hero-banner__image');
  const image = imageContainer?.querySelector('img');

  const secondColumnContent = image ? [image] : [];

  // Create the table structure
  const cells = [
    headerRow,
    [
      firstColumnContent.length > 0 ? firstColumnContent : '',
      secondColumnContent.length > 0 ? secondColumnContent : '',
    ],
  ];

  // Create the table block
  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(tableBlock);
}