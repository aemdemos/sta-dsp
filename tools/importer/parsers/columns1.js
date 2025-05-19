/* global WebImporter */
export default function parse(element, { document }) {
    // Create header row for the block table
    const headerRow = ['Columns'];

    // First column content (structured properly)
    const ul = document.createElement('ul');
    ['One', 'Two', 'Three'].forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });

    const link = document.createElement('a');
    link.href = 'https://word-edit.officeapps.live.com/';
    link.textContent = 'Live';

    const firstColumnContent = [
        document.createTextNode('Columns block'),
        ul,
        link
    ];

    // Second column content (structured properly)
    const image1 = document.createElement('img');
    image1.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png#width=750&height=500';
    image1.alt = 'Green Double Helix';

    const secondColumnContent = [image1];

    // Third column content (structured properly)
    const image2 = document.createElement('img');
    image2.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png#width=644&height=470';
    image2.alt = 'Yellow Double Helix';

    const previewText = document.createElement('p');
    previewText.textContent = 'Or you can just view the preview';

    const previewLink = document.createElement('a');
    previewLink.href = 'https://word-edit.officeapps.live.com/';
    previewLink.textContent = 'Preview';

    const thirdColumnContent = [
        image2,
        previewText,
        previewLink
    ];

    // Create block table
    const cells = [
        headerRow,
        [firstColumnContent, secondColumnContent, thirdColumnContent]
    ];

    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element with block table
    element.replaceWith(blockTable);
}