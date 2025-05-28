/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the main container for content
  const bannerContainer = element.querySelector(':scope > div.ces-article-banner__container');

  // Extract left content
  const leftContent = bannerContainer.querySelector(':scope > div.ces-article-banner__content-left');
  const medicallyApproved = leftContent.querySelector(':scope > div.ces-article-banner__content-left-inner > p.ces-article-banner__content-left-label');
  const title = leftContent.querySelector(':scope > div.ces-article-banner__content-left-inner > h1.ces-article-banner__content-left-title');
  const description = leftContent.querySelector(':scope > div.ces-article-banner__content-left-inner > p.ces-article-banner__content-left-bodyCopy');
  const socialLinks = leftContent.querySelector(':scope > div.ces-article-banner__content-left-inner > div.ces-article-banner__social-links');

  // Extract right content
  const rightImage = bannerContainer.querySelector(':scope > div.ces-article-banner__content-right img');

  // Check for missing elements and handle gracefully
  const leftCellContent = [
    medicallyApproved || '',
    title || '',
    description || '',
    socialLinks || ''
  ];

  // Ensure header matches exactly
  const headerRow = ['Columns (columns37)'];

  // Create the table structure ensuring proper header and body rows
  const cells = [
    headerRow,
    [leftCellContent, rightImage || '']
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}