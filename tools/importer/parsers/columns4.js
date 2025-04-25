/* global WebImporter */
export default function parse(element, { document }) {
  // Extract components safely to handle missing data
  const title = element.querySelector('h2')?.textContent.trim() || '';
  const description = element.querySelector('p')?.textContent.trim() || '';

  const nameInput = element.querySelector('input[name="fullName"]') || document.createElement('input');
  const emailInput = element.querySelector('input[name="emailAddress"]') || document.createElement('input');
  const checkboxLabel = element.querySelector('label[for="iConsent"]')?.textContent.trim() || '';
  const legalCopyContent = element.querySelector('.legal-copy')?.innerHTML.trim() || '';

  const submitButtonElement = element.querySelector('#signup') || document.createElement('button');
  const errorMessage = element.querySelector('.text-error')?.textContent.trim() || '';

  // Create header row matching the example
  const headerRow = ['Columns'];

  // Create content rows with consistent structure
  const contentRow = [
    [document.createTextNode(title), document.createElement('br'), document.createTextNode(description)],
    [nameInput, document.createElement('br'), emailInput, document.createElement('br'), document.createTextNode(checkboxLabel)]
  ];

  const legalRow = [
    document.createRange().createContextualFragment(legalCopyContent),
    submitButtonElement
  ];

  const footerRow = [document.createTextNode(errorMessage)];

  const cells = [
    headerRow,
    contentRow,
    legalRow,
    footerRow
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}