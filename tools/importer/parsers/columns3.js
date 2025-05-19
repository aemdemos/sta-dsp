/* global WebImporter */
export default function parse(element, { document }) {
  // Create a horizontal rule for the section break
  const hr = document.createElement('hr');

  // Define the header row for the table
  const headerRow = ['Columns'];

  // Extract the content for the columns dynamically from the HTML structure
  const columnsContent = Array.from(element.querySelectorAll('.col-md-6')).map((col) => {
    const icon = col.querySelector('.fa-stack');
    const heading = col.querySelector('.service-heading');

    // Ensure proper handling of missing or empty elements
    const iconWrapper = document.createElement('div');
    if (icon) {
      iconWrapper.append(icon.cloneNode(true));
    }

    const headingWrapper = document.createElement('div');
    if (heading) {
      headingWrapper.append(heading.cloneNode(true));
    }

    return [iconWrapper, headingWrapper];
  });

  // Create the table array based on extracted content
  const blockTableArray = [
    headerRow,
    [columnsContent[0] || '', columnsContent[1] || ''],
  ];

  // Create the block table using the helper function
  const block = WebImporter.DOMUtils.createTable(blockTableArray, document);

  // Replace the original element with the new block table, preceded by the section break
  element.replaceWith(hr, block);
}