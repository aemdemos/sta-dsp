/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the title dynamically
  const title = element.querySelector('h1')?.textContent?.trim() || '';

  // Extract the subheading dynamically
  const subheading = element.querySelector('p')?.textContent?.trim() || '';

  // Create the cells array for the table as per the example structure
  const cells = [
    ['Hero'],
    [
      (() => {
        const container = document.createElement('div');

        // Add Title (mandatory) to the container
        const titleElement = document.createElement('h1');
        titleElement.textContent = title;
        container.appendChild(titleElement);

        // Add Subheading (optional) to the container if it exists
        if (subheading) {
          const subheadingElement = document.createElement('p');
          subheadingElement.textContent = subheading;
          container.appendChild(subheadingElement);
        }

        return container;
      })()
    ]
  ];

  // Create the block table using WebImporter.DOMUtils.createTable()
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}