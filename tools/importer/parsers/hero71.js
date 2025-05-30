/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Hero (hero71)'];

    // Extracting background image
    const heroImageContainer = element.querySelector('.o5-homepage-hero__image-container');
    const desktopImage = heroImageContainer.querySelector('.o5-homepage-hero__desktopimage');

    const backgroundImage = desktopImage ? document.createElement('img') : null;
    if (desktopImage) {
        backgroundImage.src = desktopImage.src;
        backgroundImage.alt = desktopImage.alt;
    }

    // Extracting title
    const titleElement = element.querySelector('.o5-homepage-hero__h1');

    // Extracting subheading
    const subheadingElement = element.querySelector('.o5-homepage-hero__bodycopy');

    // Extracting Call-to-Action links
    const quickLinksContainer = element.querySelector('.o5-homepage-hero__textblock-container-heroquicklinks');
    const quickLinks = quickLinksContainer ? Array.from(quickLinksContainer.querySelectorAll('a')).map(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.href;
        linkElement.innerHTML = link.querySelector('.o5-quick-links__links')?.innerHTML;
        return linkElement;
    }) : [];

    // Constructing table data
    const cells = [
        headerRow,
        [
            [
                backgroundImage,
                titleElement,
                subheadingElement,
                ...quickLinks
            ]
        ]
    ];

    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
}