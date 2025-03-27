export default function parse(element, {document}) {
  const cells = [];

  // Header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];
  cells.push(headerRow);

  const contentRow = [];

  // Extract the image
  const imgElement = element.querySelector('picture img');
  if (imgElement) {
    const image = document.createElement('img');
    image.src = imgElement.src;
    image.alt = imgElement.alt || '';
    contentRow.push(image);
  }

  // Extract the heading
  const headingElement = element.querySelector('h1');
  if (headingElement) {
    const heading = document.createElement('h1');
    heading.innerHTML = headingElement.innerHTML;
    contentRow.push(heading);
  }

  // Extract the subheading
  const subheadingElement = element.querySelector('h2');
  if (subheadingElement) {
    const subheading = document.createElement('h2');
    subheading.innerHTML = subheadingElement.innerHTML;
    contentRow.push(subheading);
  }

  cells.push(contentRow);

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}