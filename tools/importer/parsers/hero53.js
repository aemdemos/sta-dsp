/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the background image
  const imageContainer = element.querySelector(':scope .o5-50-50-content-block__image img');
  const image = imageContainer ? imageContainer : null;

  // Extract the heading
  const headingContainer = element.querySelector(':scope .o5-50-50-content-block__main-heading');
  const heading = headingContainer ? headingContainer : null;

  // Extract the subheading
  const subheadingContainer = element.querySelector(':scope .o5-50-50-content-block__eyeBrow');
  const subheading = subheadingContainer ? subheadingContainer : null;

  // Extract the body copy
  const bodyContainer = element.querySelector(':scope .o5-50-50-content-block__bodyCopy');
  const body = bodyContainer ? bodyContainer : null;

  // Extract the call-to-action buttons
  const buttonsContainer = element.querySelectorAll(':scope .o5-50-50-content-block__button');
  const buttons = Array.from(buttonsContainer).map(button => {
    const link = document.createElement('a');
    link.href = button.href;
    link.textContent = button.textContent;
    return link;
  });

  // Combine content into a single cell
  const combinedContent = document.createElement('div');
  if (image) combinedContent.appendChild(image);
  if (heading) combinedContent.appendChild(heading);
  if (subheading) combinedContent.appendChild(subheading);
  if (body) combinedContent.appendChild(body);
  buttons.forEach(button => combinedContent.appendChild(button));

  // Create the table cells array
  const headerRow = ['Hero (hero53)'];
  const contentRow = [[combinedContent]];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...contentRow], document);

  // Replace the original element with the block table
  element.parentNode.replaceChild(blockTable, element);
}