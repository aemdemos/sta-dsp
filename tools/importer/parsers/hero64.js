/* global WebImporter */
export default function parse(element, { document }) {
    // Validate and extract necessary components
    const heading = element.querySelector('h1');
    const subheading = element.querySelector('.o5-detail-hero-banner__bodyCopy');
    const image = element.querySelector('.o5-detail-hero-banner__image img.desktopImg');
    const dropdown = element.querySelector('.o5-detail-hero-banner__select select');

    // Ensure all content is dynamically extracted
    const headerRow = ['Hero (hero64)'];

    // Construct content cell
    const contentCell = [];

    if (image) {
        contentCell.push(image);
    }

    if (heading) {
        contentCell.push(heading);
    }

    if (subheading) {
        contentCell.push(subheading);
    }

    if (dropdown) {
        const options = dropdown.querySelectorAll('option');
        options.forEach(option => {
            const href = option.value.trim();
            const textContent = option.textContent.trim();
            if (href && textContent && href !== '') {
                const link = document.createElement('a');
                link.href = href;
                link.textContent = textContent;
                contentCell.push(link);
            }
        });
    }

    // Ensure semantic meaning from source HTML is preserved
    const cells = [
        headerRow,
        [contentCell]
    ];

    // Create block table dynamically
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace existing element
    element.replaceWith(table);
}