/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the header row
  const headerRow = ['Hero (hero3)'];

  // Extract the background image
  const imageContainer = element.querySelector('.o5-homepage-hero__image-container');
  const desktopImage = imageContainer?.querySelector('.o5-homepage-hero__desktopimage');

  // Extract the title
  const title = element.querySelector('h1.o5-homepage-hero__h1');

  // Extract the subheading
  const subheading = element.querySelector('.o5-homepage-hero__bodycopy');

  // Extract the call-to-action button
  const button = element.querySelector('.o5-homepage-hero__buttons a');

  // Handle edge cases (e.g., empty elements)
  const contentRow = [desktopImage, title, subheading, button].filter(Boolean);

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, [contentRow]], document);

  // Replace the original element with the table
  element.replaceWith(table);
}