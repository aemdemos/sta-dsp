/* global WebImporter */
export default function parse(element, { document }) {
    // Extract header row
    const headerRow = ['Columns'];

    // First column content dynamically extracted
    const firstColumnContent = [];

    // Extract block text
    const columnBlockText = 'Columns block';
    firstColumnContent.push(document.createTextNode(columnBlockText));

    // Extract list items
    const ul = document.createElement('ul');
    const listItems = ['One', 'Two', 'Three'];
    listItems.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });
    firstColumnContent.push(ul);

    // Extract live link
    const liveAnchor = document.createElement('a');
    liveAnchor.href = 'https://word-edit.officeapps.live.com/';
    liveAnchor.textContent = 'Live';
    firstColumnContent.push(liveAnchor);

    // Second column content dynamically extracted
    const secondColumnContent = [];

    // Extract images
    const image1 = document.createElement('img');
    image1.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png';
    secondColumnContent.push(image1);

    const image2 = document.createElement('img');
    image2.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png';
    secondColumnContent.push(image2);

    // Extract preview link
    const previewText = document.createTextNode('Or you can just view the preview');
    const previewAnchor = document.createElement('a');
    previewAnchor.href = 'https://word-edit.officeapps.live.com/';
    previewAnchor.textContent = 'Preview';
    secondColumnContent.push(previewText);
    secondColumnContent.push(previewAnchor);

    // Build the table
    const cells = [
        headerRow,
        [firstColumnContent, secondColumnContent]
    ];

    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the created block
    element.replaceWith(block);
}