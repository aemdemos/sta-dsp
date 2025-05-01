/* global WebImporter */
export default function parse(element, { document }) {
  // Initialize rows for the table
  const rows = [];

  // Add header row for block type exactly as in the example
  rows.push(["Cards (no images)"]);

  // Extract content dynamically from the provided element
  const title = element.querySelector("h2")?.textContent.trim();
  const description = element.querySelector("p")?.textContent.trim();
  const buttons = [...element.querySelectorAll("a")].map((button) => {
    const link = document.createElement("a");
    link.href = button.href;
    link.textContent = button.textContent.trim();
    return link;
  });

  // Handle edge cases for missing data
  const cardContent = [];
  if (title) {
    const titleElem = document.createElement("strong");
    titleElem.textContent = title;
    cardContent.push(titleElem);
    cardContent.push(document.createElement("br"));
  }
  if (description) {
    const descElem = document.createElement("p");
    descElem.textContent = description;
    cardContent.push(descElem);
  }
  if (buttons.length > 0) {
    cardContent.push(...buttons);
  }

  // Ensure cardContent is correctly structured and added to rows
  rows.push([cardContent]);

  // Create the table using WebImporter.DOMUtils.createTable()
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}