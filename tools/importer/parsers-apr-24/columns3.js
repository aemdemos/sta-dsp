/* global WebImporter */
export default function parse(element, { document }) {
    // Extract dynamic content from the provided HTML element
    const headerRow = ['Columns'];

    const firstColumnContent = [];

    // Extract the list dynamically
    const navigationItems = element.querySelector('.navigation-items ul');
    if (navigationItems) {
        const list = document.createElement('ul');
        navigationItems.querySelectorAll('li a').forEach(link => {
            const li = document.createElement('li');
            li.textContent = link.textContent.trim();
            list.appendChild(li);
        });
        firstColumnContent.push(list);
    }

    // Extract the logo dynamically
    const logo = element.querySelector('.logo img');
    if (logo) {
        const logoImage = document.createElement('img');
        logoImage.setAttribute('alt', logo.getAttribute('alt'));
        logoImage.setAttribute('src', logo.getAttribute('src'));
        firstColumnContent.push(logoImage);
    }

    // Extract 'Sign up' link dynamically
    const signUpLink = element.querySelector('#signup-nav');
    if (signUpLink) {
        const liveLink = document.createElement('a');
        liveLink.textContent = 'Sign up';
        liveLink.setAttribute('href', signUpLink.getAttribute('href'));
        firstColumnContent.push(liveLink);
    }

    const secondColumnContent = [];

    // Include placeholder text and dynamic extraction for second column
    const placeholderText = document.createTextNode('Or you can just view the preview');
    secondColumnContent.push(placeholderText);

    const previewLink = document.createElement('a');
    previewLink.textContent = 'Preview';
    previewLink.setAttribute('href', 'https://word-edit.officeapps.live.com/');
    secondColumnContent.push(previewLink);

    // Construct the table
    const cells = [
        headerRow,
        [firstColumnContent, secondColumnContent],
    ];

    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element
    element.replaceWith(blockTable);
}