/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content for column 1
  const column1 = document.createElement('div');
  const heading = element.querySelector('.col-lg-6 h2');
  const paragraph = element.querySelector('.col-lg-6 p');
  const subHeading = element.querySelector('.col-lg-6 h4');
  const list = element.querySelector('.col-lg-6 ul');

  column1.append(heading);
  column1.append(paragraph);
  column1.append(subHeading);
  column1.append(list);

  // Extract content for column 2
  const column2 = document.createElement('div');
  const image = element.querySelector('.col-lg-6 img');

  column2.append(image);

  // Create block table
  const cells = [
    ['Columns'],
    [column1, column2]
  ];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}