/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns34)'];

  // Extract left section content
  const leftSection = element?.querySelector('.o5-plu-details__inner-left');
  const specialties = leftSection?.querySelector('.o5-plu-details__specialties');
  const specialtyText = specialties?.querySelector('p')?.cloneNode(true);
  const acceptingPatients = leftSection?.querySelector('.o5-plu-details__appointment');
  const acceptingPatientsText = acceptingPatients?.querySelector('p')?.cloneNode(true);

  // Extract right section content
  const rightSection = element?.querySelector('.o5-plu-details__inner-right');
  const certifications = rightSection?.querySelector('.o5-plu-details__certifications');
  const certificationsText = certifications?.querySelector('.o5-plu-details__certifications-heading')?.cloneNode(true);
  const boardCertificationsList = certifications?.querySelector('.o5-plu-details__board-cert-list')?.cloneNode(true);

  // Create left cell content dynamically
  const leftCell = document.createElement('div');
  if (specialtyText) leftCell.append(specialtyText);
  leftCell.append(document.createElement('br')); // Ensure spacing
  if (acceptingPatientsText) leftCell.append(acceptingPatientsText);

  // Create right cell content dynamically
  const rightCell = document.createElement('div');
  if (certificationsText) rightCell.append(certificationsText);
  if (boardCertificationsList) rightCell.append(boardCertificationsList);

  // Ensure table structure matches example
  const cells = [
    headerRow,
    [leftCell, rightCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table
  element?.replaceWith(table);
}