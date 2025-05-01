/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly as specified
  const headerRow = ['Columns'];

  // Retrieve the steps and their content dynamically
  const steps = element.querySelectorAll('.card');

  const columnsRow = Array.from(steps).map((step) => {
    const stepHeader = step.querySelector('h5')?.textContent || '';
    const stepTitle = step.querySelector('h2')?.textContent || '';
    const stepDescription = step.querySelector('p')?.textContent || '';
    const image = step.querySelector('img');

    const imgElement = image ? Object.assign(document.createElement('img'), {
      src: image.src,
      alt: image.alt,
    }) : '';

    // Combine step details properly into an array of HTML elements
    const stepContent = [
      Object.assign(document.createElement('strong'), { textContent: stepHeader }),
      document.createElement('br'),
      Object.assign(document.createElement('span'), { textContent: stepTitle }),
      document.createElement('br'),
      Object.assign(document.createElement('p'), { textContent: stepDescription }),
    ];

    return [imgElement, stepContent];
  });

  // Add Learn More link if available dynamically
  const learnMoreLink = element.querySelector('#dto-btn');
  if (learnMoreLink) {
    const linkElement = Object.assign(document.createElement('a'), {
      href: learnMoreLink.href,
      textContent: learnMoreLink.textContent,
      target: '_blank',
      className: learnMoreLink.className,
    });
    columnsRow.push([linkElement]);
  }

  // Compile the final table structure
  const cells = [headerRow, ...columnsRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element dynamically with the new block
  element.replaceWith(block);
}