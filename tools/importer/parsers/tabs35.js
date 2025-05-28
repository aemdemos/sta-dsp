/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Tabs (tabs35)'];

  const rows = [];

  // Extracting tab labels and related content
  const tabLinks = element.querySelectorAll(':scope > div > div > nav.o5-site-toggle > ul.o5-site-toggle__links > li');
  const languageListParent = element.querySelector(':scope > div > div > nav.o5-site-toggle__right > ul.o5-site-toggle__list > li > ul');

  tabLinks.forEach(tab => {
    const tabLabel = tab.querySelector('a.o5-site-toggle__link');

    if (tabLabel) {
      let tabContent = [];

      // Include language selector if available in this block
      if (languageListParent) {
        const subLinks = [...languageListParent.querySelectorAll('li > a')];
        tabContent = subLinks; // Directly pushing links without wrapping in unnecessary <div> elements
      }
      rows.push([tabLabel, tabContent.length > 0 ? tabContent : '']); // Leave empty cells blank for tabs with no content
    }
  });

  const cells = [headerRow, ...rows];

  // Creating the table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}