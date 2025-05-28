/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero73)'];

  // Extract the image
  const imageContainer = element.querySelector('.overlay-img-container img');
  const image = document.createElement('img');
  image.src = imageContainer?.src || '';
  image.alt = imageContainer?.alt || '';

  // Extract heading
  const headingContainer = element.querySelector('.o5-50-50-content-block__main-heading');
  const heading = document.createElement('h2');
  heading.innerHTML = headingContainer?.innerHTML || '';

  // Extract subheading
  const subheadingContainer = element.querySelector('.o5-50-50-content-block__bodyCopy');
  const subheading = document.createElement('p');
  subheading.innerHTML = subheadingContainer?.innerHTML || '';

  // Extract buttons
  const buttonContainer = element.querySelector('.o5-50-50-content-block__buttonContainer');
  const buttons = Array.from(buttonContainer?.querySelectorAll('a, button') || []).map((btn) => {
    const link = document.createElement('a');
    if (btn.tagName === 'A') {
      link.href = btn.href;
      link.innerHTML = btn.innerHTML;
    } else {
      link.href = btn.getAttribute('data-modal-open');
      link.innerHTML = btn.innerHTML;
    }
    return link;
  });

  // Combine all elements into a single cell for the content row
  const contentRow = [
    [image, heading, subheading, ...buttons]
  ];

  const cells = [
    headerRow,
    contentRow
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}