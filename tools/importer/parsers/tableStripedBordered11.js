/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (striped, bordered, tableStripedBordered11)'];

  // Extract heading content
  const headingContainer = element.querySelector(':scope > div.dmp-col-12.dmp-col-lg-8.dmp-col-xxl-9 .patient-resources h2');
  const headingContent = headingContainer ? headingContainer.textContent.trim() : '';

  // Extract sorting info
  const sortContainer = element.querySelector(':scope > div.dmp-col-12.dmp-col-lg-4.dmp-col-xxl-3 .uie-sort');
  const sortLabel = sortContainer && sortContainer.querySelector('label.uie-sort__label');
  const sortLabelContent = sortLabel ? sortLabel.textContent.trim() : '';
  const sortSelection = sortContainer && sortContainer.querySelector('button span.js-uib-customselect-selected-value');
  const sortSelectionContent = sortSelection ? sortSelection.textContent.trim() : '';

  // Create table rows
  const rows = [
    [headingContent],
    [sortLabelContent, sortSelectionContent]
  ];

  // Generate block table
  const block = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace original element
  element.replaceWith(block);
}