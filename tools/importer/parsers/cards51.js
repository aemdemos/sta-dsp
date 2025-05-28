/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards51)']; // Block name

  // Extract content based on structure
  const rows = Array.from(element.querySelectorAll('.ces-article-card')).map(card => {
    const img = card.querySelector('.ces-article-card__card-img');
    const title = card.querySelector('.ces-article-card__card-title');
    const description = card.querySelector('.ces-article-card__card-summary');
    const link = card.querySelector('.ces-article-card__card-link');

    const imageElement = img.cloneNode(true); // Clone image element

    const textContent = document.createElement('div');
    if (title) {
      const titleElement = document.createElement('h3');
      titleElement.textContent = title.textContent;
      textContent.appendChild(titleElement);
    }
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description.textContent;
      textContent.appendChild(descriptionElement);
    }
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent;
      textContent.appendChild(linkElement);
    }

    return [imageElement, textContent];
  });

  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  
  element.replaceWith(table);
}