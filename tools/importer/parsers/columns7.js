/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image
  const extractImage = (imgEl) => {
    if (!imgEl) return null;
    const img = document.createElement('img');
    img.src = imgEl.src;
    img.alt = imgEl.alt;
    img.width = imgEl.width;
    img.height = imgEl.height;
    return img;
  };

  // Extracting first column content
  const imgEl = element.querySelector('.col-lg-6 img');
  const firstColumnImage = extractImage(imgEl);
  const firstColumnHeadingEl = element.querySelector('.col-lg-6 h2');
  const firstColumnHeading = firstColumnHeadingEl ? firstColumnHeadingEl.textContent : '';
  const firstColumnParagraphEl = element.querySelector('.col-lg-6 p');
  const firstColumnParagraph = firstColumnParagraphEl ? firstColumnParagraphEl.textContent : '';

  const firstColumnContent = [];
  if (firstColumnImage) firstColumnContent.push(firstColumnImage);
  firstColumnContent.push(document.createElement('br'));
  if (firstColumnHeading) firstColumnContent.push(document.createTextNode(firstColumnHeading));
  firstColumnContent.push(document.createElement('br'));
  if (firstColumnParagraph) firstColumnContent.push(document.createTextNode(firstColumnParagraph));

  // Extracting second column content
  const secondColumnCardHeadingEl = element.querySelector('#questions-doctor h5');
  const secondColumnCardHeading = secondColumnCardHeadingEl ? secondColumnCardHeadingEl.textContent : '';
  const secondColumnListEl = element.querySelector('#questions-doctor ul');
  const secondColumnList = secondColumnListEl ? secondColumnListEl.cloneNode(true) : null;

  const secondColumnContent = [];
  if (secondColumnCardHeading) secondColumnContent.push(document.createTextNode(secondColumnCardHeading));
  secondColumnContent.push(document.createElement('br'));
  if (secondColumnList) secondColumnContent.push(secondColumnList);

  // Creating the table
  const cells = [
    ['Columns'],
    [firstColumnContent, secondColumnContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element
  element.replaceWith(table);
}