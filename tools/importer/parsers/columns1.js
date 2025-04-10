/* global WebImporter */
export default function parse(element, { document }) {
    const footer = element.querySelector('footer');

    // Extract logo dynamically
    const logoContainer = footer.querySelector('.col.offset-lg-1.col-lg-3');
    const logoLink = logoContainer?.querySelector('a');
    const logoImage = logoLink?.querySelector('img');

    const logo = document.createElement('div');
    if (logoLink) {
        logo.append(logoLink);
    }

    // Extract navigation links dynamically
    const navLinksContainer = footer.querySelector('.footer-nav');
    const navLinks = Array.from(navLinksContainer?.querySelectorAll('li') || []).map(li => li.querySelector('a'));

    const navLinksList = document.createElement('ul');
    navLinks.forEach(link => {
        const listItem = document.createElement('li');
        if (link) {
            listItem.append(link);
        }
        navLinksList.append(listItem);
    });

    // Extract copyrights dynamically
    const copyrightsContainer = footer.querySelector('.copyrights');
    const copyrightsText = copyrightsContainer?.querySelector('p')?.innerHTML || '';

    const copyrightsElement = document.createElement('div');
    copyrightsElement.innerHTML = copyrightsText;

    // Ensure header row matches example
    const headerRow = ['Columns'];

    // Create table structure dynamically
    const cells = [
        headerRow,
        [logo, navLinksList],
        [copyrightsElement]
    ];

    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element with the table
    element.replaceWith(table);
}