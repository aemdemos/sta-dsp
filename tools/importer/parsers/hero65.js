/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant elements
  const headline = element.querySelector('.o5-section-message__headline');
  const dropdownLabel = element.querySelector('.o5-section-message__label');
  const dropdown = element.querySelector('.o5-section-message__select');
  const button = element.querySelector('.o5-section-message__dropdownbtn');

  // Assemble the content for the table
  const headerRow = ['Hero (hero65)'];
  const contentRow = [
    document.createElement('div'),
  ];

  // Append elements to content row
  if (headline) {
    contentRow[0].appendChild(headline);
  }
  if (dropdownLabel) {
    contentRow[0].appendChild(dropdownLabel);
  }
  if (dropdown) {
    contentRow[0].appendChild(dropdown);
  }
  if (button) {
    contentRow[0].appendChild(button);
  }

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element
  element.replaceWith(table);
}