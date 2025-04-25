/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Define the header row exactly as specified in the example
  const headerRow = ['Embed'];
  cells.push(headerRow);

  // Extract logo image and its link
  const logoContainer = element.querySelector('.logo a');
  const logoImage = logoContainer.querySelector('img');
  const logoLink = document.createElement('a');
  logoLink.href = logoContainer.href;
  logoLink.appendChild(logoImage.cloneNode(true));

  // Extract navigation links
  const navLinks = Array.from(element.querySelectorAll('.navigation-items a')).map(link => {
    const navLink = document.createElement('a');
    navLink.href = link.href;
    navLink.textContent = link.textContent;
    return navLink;
  });

  // Consolidate all content into a single cell
  const contentCell = [logoLink, ...navLinks];
  cells.push([contentCell]);

  // Create the table with extracted data
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the new structured table
  element.replaceWith(table);
}