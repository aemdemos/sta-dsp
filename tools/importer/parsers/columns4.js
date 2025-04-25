/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the heading and description
  const heading = element.querySelector('h2')?.textContent.trim() || '';
  const description = element.querySelector('p')?.textContent.trim() || '';

  // Extract the form fields and related content
  const form = element.querySelector('form');
  const fullNameLabel = form.querySelector('label[for="fullName"]')?.textContent.trim() || 'Full name';
  const emailLabel = form.querySelector('label[for="emailAddress"]')?.textContent.trim() || 'Email address';
  const consentText = form.querySelector('label[for="iConsent"]')?.textContent.trim() || '';

  // Extract and structure legal text properly
  const legalCopyElement = form.querySelector('.legal-copy');
  const legalText = legalCopyElement ? Array.from(legalCopyElement.querySelectorAll('p')).map(p => p.outerHTML).join('') : '';

  // Extract button text
  const buttonText = form.querySelector('#signup')?.value || 'Sign up';

  // Extract error message
  const errorMessage = form.querySelector('.text-error')?.textContent.trim() || 'All fields are required.';

  // Create the table content dynamically without unnecessary wrappers
  const tableContent = [
    ['Columns'], // Exact header row
    [
      heading,
      description,
      fullNameLabel,
      emailLabel,
      consentText,
      legalText,
      buttonText,
      errorMessage,
    ],
  ];

  const table = WebImporter.DOMUtils.createTable(tableContent, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}