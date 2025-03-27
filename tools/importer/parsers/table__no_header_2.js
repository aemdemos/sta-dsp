export default function parse(element, {document}) {
  // Extract navigation links
  const navLinks = Array.from(element.querySelectorAll('ul > li > a'));

  // Create cells for the table
  const cells = navLinks.map(link => {
    const text = document.createElement('span');
    text.textContent = link.textContent.trim();
    return [text];
  });

  // Add header row indicating no table header
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Table (no header)';

  cells.unshift(headerRow);

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.parentNode.replaceChild(table, element);
}