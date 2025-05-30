/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cardsNoImages81)'];

  const rows = [];

  // Get all immediate child elements of the block
  const childDivs = element.querySelectorAll(':scope > div');

  childDivs.forEach((childDiv) => {
    const promoBars = childDiv.querySelectorAll('.o5-promo-bar__body');

    promoBars.forEach((promoBar) => {
      const content = [];

      const heading = promoBar.querySelector('span');
      if (heading) {
        content.push(heading);
      }

      const link = promoBar.querySelector('a');
      if (link) {
        content.push(link);
      }

      rows.push([content]);
    });
  });

  const cells = [headerRow, ...rows];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}