/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the element
  const title = element.querySelector('h2')?.textContent || '';
  const description = element.querySelector('p')?.textContent || '';

  // Extract buttons and their links
  const buttons = Array.from(element.querySelectorAll('a')).map((button) => {
    const buttonText = button.textContent;
    const buttonLink = document.createElement('a');
    buttonLink.href = button.href;
    buttonLink.textContent = buttonText;
    return buttonLink;
  });

  // Create the table structure with header row matching the example exactly
  const cells = [
    ['Tabs'], // Header row EXACTLY matching the example
    ['Thank You', [title, description, ...buttons]],
  ];

  // Generate the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table
  element.replaceWith(table);
}