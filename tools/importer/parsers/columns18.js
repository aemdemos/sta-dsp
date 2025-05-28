/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns18)'];

  // Extract the headline text
  const headline = element.querySelector('.o5-section-message__headline');
  const headlineContent = headline ? headline.textContent.trim() : 'No headline available';

  // Extract dropdown label and dropdown options
  const dropdownLabel = element.querySelector('.o5-section-message__label');
  const dropdownLabelContent = dropdownLabel ? dropdownLabel.textContent.trim() : 'No dropdown label available';

  const selectElement = element.querySelector('.o5-section-message__optionlist');
  const options = Array.from(selectElement.querySelectorAll('option')).map(option => {
    if (option.value && option.value.trim() !== '') {
      const link = document.createElement('a');
      link.href = option.value;
      link.textContent = option.textContent.trim();
      return link;
    }
    return option.textContent.trim();
  });

  // Extract the button
  const button = element.querySelector('.o5-section-message__dropdownbtn');
  const buttonContent = button ? button.outerHTML : 'No button available';

  // Create cells for the table
  const cells = [
    headerRow,
    [headlineContent],
    [dropdownLabelContent, options],
    [buttonContent],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}