/* global WebImporter */
export default function parse(element, { document }) {
  // Extract heading
  const heading = element.querySelector('h2')?.textContent || '';

  // Extract description
  const description = element.querySelector('p')?.textContent || '';

  // Extract buttons
  const buttons = Array.from(element.querySelectorAll('.button-group a')).map((button) => {
    const link = document.createElement('a');
    link.href = button.href;
    link.textContent = button.textContent;
    return link;
  });

  // Create table rows
  const rows = [
    ['Cards (no images)'], // Header row
    [
      (() => {
        const content = document.createElement('div');
        
        // Add heading
        if (heading) {
          const title = document.createElement('strong');
          title.textContent = heading;
          content.appendChild(title);
        }
        
        // Add description
        if (description) {
          const para = document.createElement('p');
          para.textContent = description;
          content.appendChild(para);
        }
        
        // Add buttons
        buttons.forEach((button) => {
          content.appendChild(button);
        });
        
        return content;
      })(),
    ],
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with block table
  element.replaceWith(block);
}