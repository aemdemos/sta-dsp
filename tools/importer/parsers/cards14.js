/* global WebImporter */
export default function parse(element, { document }) {
 const headerRow = ['Cards'];

 const rows = Array.from(element.querySelectorAll('.col')).map((col) => {
    const image = col.querySelector('.card-thumb__img');
    const imgElement = document.createElement('img');
    imgElement.src = image ? image.src : '';
    imgElement.alt = image ? image.alt : '';

    const title = col.querySelector('h2');
    const titleElement = document.createElement('h2');
    titleElement.textContent = title ? title.textContent : '';

    const description = col.querySelector('p');
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description ? description.textContent : '';

    const cta = col.querySelector('a');
    const ctaElement = document.createElement('a');
    ctaElement.href = cta ? cta.href : '';
    ctaElement.textContent = cta ? cta.textContent : '';

    const textContent = [titleElement, descriptionElement, ctaElement];

    return [imgElement, textContent];
 });

 const cells = [headerRow, ...rows];
 const tableBlock = WebImporter.DOMUtils.createTable(cells, document);
 element.replaceWith(tableBlock);
}