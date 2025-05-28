/* global WebImporter */
export default function parse(element, { document }) {
  // Extract text content dynamically
  const headerRow = ['Hero (hero55)']; // Block name header

  // Extract images
  const imageContainer = element.querySelector('.o5-homepage-hero__image-container');
  const desktopImage = imageContainer?.querySelector('.o5-homepage-hero__desktopimage') || '';
  const mobileImage = imageContainer?.querySelector('.o5-homepage-hero__imagemobile') || '';

  // Extract heading text
  const heroTextBlock = element.querySelector('.o5-homepage-hero__textblock');
  const heading = heroTextBlock?.querySelector('h1') || '';

  // Extract body content
  const bodyCopy = heroTextBlock?.querySelector('.o5-homepage-hero__bodycopy') || '';

  // Extract buttons dynamically
  const buttonsContainer = heroTextBlock?.querySelector('.o5-homepage-hero__buttons');
  const buttons = Array.from(buttonsContainer?.querySelectorAll('a') || []);

  // Extract quick links dynamically
  const quickLinksRow = element.querySelector('.o5-quick-links__row');
  const quickLinks = Array.from(quickLinksRow?.querySelectorAll('a') || []).map((link) => {
    const img = link.querySelector('img');
    const span = link.querySelector('span');
    return [img, span, link];
  });

  // Combine all extracted content into a single cell for the second row
  const secondRowContent = [
    desktopImage,
    heading,
    bodyCopy,
    ...buttons,
    ...quickLinks.flat()
  ];

  // Build the table structure dynamically based on the example
  const cells = [
    headerRow,
    [secondRowContent]
  ];

  // Create and replace block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}