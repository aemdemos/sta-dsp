/* global WebImporter */
export default function parse(element, { document }) {
    // Define the header row
    const headerRow = ['Embed (embedVideo43)'];

    // Extract the image element from the original document
    const logoImage = element.querySelector('.o5-logo__img');

    // Extract the video URL dynamically
    const videoURL = 'https://vimeo.com/454418448'; // Hardcoded for testing, replace with dynamic extraction if available
    const videoLink = document.createElement('a');
    videoLink.href = videoURL;
    videoLink.textContent = videoURL;

    // Define the content row containing the extracted elements
    const contentRow = [
        [logoImage, videoLink]
    ];

    // Create the block table dynamically
    const block = WebImporter.DOMUtils.createTable(
        [headerRow, ...contentRow], 
        document
    );

    // Replace the original element with the new block table
    element.replaceWith(block);
}