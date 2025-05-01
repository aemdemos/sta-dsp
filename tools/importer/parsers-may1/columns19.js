/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row for the block
  rows.push(['Columns']);

  // Second row: Extract dynamic content for all three columns
  const column1Content = [];
  const ul = document.createElement('ul');

  const navItems = element.querySelectorAll('nav ul li:not(.button.white)');
  navItems.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item.textContent.trim();
    ul.appendChild(li);
  });
  column1Content.push(ul);

  const liveLinkElement = element.querySelector('nav ul li a[href*="live"]');
  if (liveLinkElement) {
    const liveLink = document.createElement('a');
    liveLink.href = liveLinkElement.href;
    liveLink.textContent = liveLinkElement.textContent.trim();
    column1Content.push(liveLink);
  }

  const column2Content = [];
  const logoImg = element.querySelector('.logo img');
  if (logoImg) {
    const img = document.createElement('img');
    img.src = logoImg.src;
    column2Content.push(img);
  }

  const column3Content = [];

  const hamburgerImg = element.querySelector('.navigation-toggle-btn img.open-btn');
  if (hamburgerImg) {
    const hamburgerWrapper = document.createElement('div');
    const hamburgerImgElement = document.createElement('img');
    hamburgerImgElement.src = hamburgerImg.src;
    hamburgerWrapper.append(hamburgerImgElement);
    column3Content.push(hamburgerWrapper);
  }

  const signUpElement = element.querySelector('nav ul li a.button.white');
  if (signUpElement) {
    const signUpWrapper = document.createElement('div');
    const signUpText = document.createElement('p');
    signUpText.textContent = signUpElement.textContent.trim();
    const signUpLink = document.createElement('a');
    signUpLink.href = signUpElement.href;
    signUpLink.textContent = signUpElement.textContent.trim();

    signUpWrapper.append(signUpText);
    signUpWrapper.append(signUpLink);
    column3Content.push(signUpWrapper);
  }

  rows.push([column1Content, column2Content, column3Content]);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}