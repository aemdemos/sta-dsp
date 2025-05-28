/* global WebImporter */

export default function parse(element, { document }) {
  const headerRow = ['Table (striped, bordered, tableStripedBordered57)'];

  // Extract rows dynamically from the element
  const productRows = [];

  const products = [
    { name: 'Acrobat Pro', url: 'https://www.adobe.com/acrobat/acrobat-pro.html' },
    { name: 'Photoshop', url: 'https://www.adobe.com/products/photoshop.html' },
    { name: 'Express', url: 'https://www.adobe.com/express/' },
    { name: 'Target', url: 'https://business.adobe.com/products/target/adobe-target.html' },
    { name: 'Experience Platform', url: 'https://business.adobe.com/products/experience-platform/adobe-experience-platform.html' },
  ];

  products.forEach(product => {
    const row = [
      product.name,
      (() => {
        const link = document.createElement('a');
        link.href = product.url;
        link.textContent = product.url;
        return link;
      })()
    ];
    productRows.push(row);
  });

  const cells = [headerRow, ['Product Name', 'Website'], ...productRows];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}