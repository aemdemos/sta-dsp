/* global WebImporter */

export default function parse(element, { document }) {
  const headerRow = ['Hero (hero79)'];

  // Extract Background Image
  const imageContainer = element.querySelector('.o5-homepage-hero__image-container');
  const desktopImage = imageContainer?.querySelector('.o5-homepage-hero__desktopimage');

  // Extract Title
  const titleElement = element.querySelector('.o5-homepage-hero__h1');

  // Extract Body Copy
  const bodyCopyElement = element.querySelector('.o5-homepage-hero__bodycopy');

  // Extract Call-to-Action
  const buttonElement = element.querySelector('.o5-homepage-hero__buttons button');

  const cells = [
    headerRow,
    [
      [
        desktopImage,
        titleElement,
        bodyCopyElement,
        buttonElement
      ]
    ]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}