/* global WebImporter */
export default function parse(element, { document }) {
  // Validate element inputs
  if (!element || !document) return;

  // Extract content from the left column
  const leftColumn = element.querySelector('.col-lg-6');
  if (!leftColumn) return;

  const heading = leftColumn.querySelector('h2');
  const paragraph = leftColumn.querySelector('p');
  const subheading = leftColumn.querySelector('h4');
  const listItems = Array.from(leftColumn.querySelectorAll('ul li')).map(li => li.textContent);

  // Extract image content from the right column
  const rightColumnImage = element.querySelector('.col-lg-6 img');
  if (!rightColumnImage) return;

  const imageSrc = rightColumnImage.getAttribute('src');
  const imageAlt = rightColumnImage.getAttribute('alt');
  const image = document.createElement('img');
  image.src = imageSrc;
  image.alt = imageAlt;

  // Create structured content for the hero block
  const heroContent = [];
  if (heading) {
    const headingElement = document.createElement('h1');
    headingElement.textContent = heading.textContent;
    heroContent.push(headingElement);
  }
  if (paragraph) {
    const paragraphElement = document.createElement('p');
    paragraphElement.textContent = paragraph.textContent;
    heroContent.push(paragraphElement);
  }
  if (subheading) {
    const subheadingElement = document.createElement('h4');
    subheadingElement.textContent = subheading.textContent;
    heroContent.push(subheadingElement);
  }
  if (listItems.length) {
    const listElement = document.createElement('ul');
    listItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      listElement.appendChild(li);
    });
    heroContent.push(listElement);
  }
  heroContent.push(image);

  // Create table array
  const cells = [
    ['Hero'],
    [heroContent]
  ];

  // Create hero block table
  const heroBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the hero block table
  element.replaceWith(heroBlock);
}