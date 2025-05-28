/* global WebImporter */
export default function parse(element, { document }) {
    // Define the header row, matching exactly the example markdown structure
    const headerRow = ['Accordion (accordion48)'];

    const rows = [];

    // Extract accordion title
    const accordionTitleElement = element.querySelector(':scope > div.calendar-sf-filter-tray__filters > span');
    const accordionTitle = accordionTitleElement ? accordionTitleElement.textContent.trim() : '';

    // Extract accordion content
    const accordionContentElement = element.querySelector(':scope > div.calendar-sf-filter-tray__category');
    if (accordionContentElement) {
        const mainGroups = accordionContentElement.querySelectorAll(':scope > ul > li');

        mainGroups.forEach((mainGroup) => {
            const mainGroupLabelElement = mainGroup.querySelector(':scope > label');
            const mainGroupLabel = mainGroupLabelElement ? mainGroupLabelElement.textContent.trim() : '';

            const subGroups = mainGroup.querySelectorAll(':scope > ul > li');
            const subGroupContents = Array.from(subGroups).map((subGroup) => {
                const subGroupLabelElement = subGroup.querySelector(':scope > label');
                return subGroupLabelElement ? subGroupLabelElement.textContent.trim() : '';
            });

            const combinedContentElement = document.createElement('div');
            const mainGroupParagraph = document.createElement('p');
            mainGroupParagraph.textContent = mainGroupLabel;
            combinedContentElement.append(mainGroupParagraph);

            subGroupContents.forEach((subContent) => {
                const subContentParagraph = document.createElement('p');
                subContentParagraph.textContent = subContent;
                combinedContentElement.append(subContentParagraph);
            });

            rows.push([mainGroupLabel, combinedContentElement]);
        });
    }

    // Create the table using WebImporter.DOMUtils.createTable
    const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

    // Replace the original element with the new block table
    element.replaceWith(table);
}