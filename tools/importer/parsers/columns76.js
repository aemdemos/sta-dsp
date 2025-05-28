/* global WebImporter */
export default function parse(element, { document }) {
    // Validate the input element
    if (!element || !document) {
        throw new Error('Invalid input: element and document are required');
    }

    // Create the header row exactly matching the block name
    const headerRow = ['Columns (columns76)'];

    // Extract immediate child blocks of the element
    const childBlocks = element.querySelectorAll(':scope > div');
    
    if (!childBlocks || childBlocks.length < 1) {
        throw new Error('Unexpected structure: Required child blocks are missing');
    }

    // Extract text content and organization from the first child block
    const textBlock = childBlocks[0]?.querySelector('.o5-detail-hero-banner__content');

    if (!textBlock) {
        throw new Error('Unexpected structure: Text block is missing');
    }

    const headerElement = textBlock.querySelector('h1');
    const eyebrowElement = textBlock.querySelector('p.o5-detail-hero-banner__eyeBrow');
    const bodyContent = textBlock.querySelector('div.o5-detail-hero-banner__bodyCopy');

    const listItems = bodyContent ? Array.from(bodyContent.querySelectorAll('li')).map(li => li.textContent).join('<br />') : '';

    const buttonElement = textBlock.querySelector('a');

    // Extract image from second child block
    const imageBlock = childBlocks[0]?.querySelector('.o5-detail-hero-banner__image img');

    if (!imageBlock) {
        throw new Error('Unexpected structure: Image block is missing');
    }

    // Organize extracted elements into rows and columns
    const rows = [
        headerRow,
        [
            `${eyebrowElement.outerHTML}<br />${headerElement.outerHTML}<br />${listItems}<br />${buttonElement.outerHTML}`
        ],
        [
            imageBlock
        ]
    ];

    // Create the block table using WebImporter.DOMUtils.createTable
    const blockTable = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the generated block table
    element.replaceWith(blockTable);
}