/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (striped, bordered, tableStripedBordered60)'];
  const rows = [headerRow];

  // Query all 'a' tags within breadcrumb sections
  const breadcrumbLinks = element.querySelectorAll('.breadcrumb__wrapper a');

  breadcrumbLinks.forEach((link) => {
    const linkText = link.textContent.trim();
    const linkHref = link.href;
    const linkElement = document.createElement('a');
    linkElement.href = linkHref;
    linkElement.textContent = linkHref;

    rows.push([linkText, linkElement]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}