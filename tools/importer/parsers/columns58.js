/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract the text content from the left column
  const leftColumn = document.createElement('div');
  const eyebrow = element.querySelector('.o5-50-50-content-block__eyeBrow');
  const heading = element.querySelector('.o5-50-50-content-block__main-heading');
  const bodyCopy = element.querySelector('.o5-50-50-content-block__bodyCopy');
  const button = element.querySelector('.o5-50-50-content-block__buttonContainer button');

  if (eyebrow) leftColumn.appendChild(eyebrow.cloneNode(true));
  if (heading) leftColumn.appendChild(heading.cloneNode(true));
  if (bodyCopy) leftColumn.appendChild(bodyCopy.cloneNode(true));
  if (button) {
    // Add the button as a link
    const link = document.createElement('a');
    link.href = button.dataset.modalOpen;
    link.textContent = button.textContent;
    leftColumn.appendChild(link);
  }

  // Extract the content for the right column (image and video modal link)
  const rightColumn = document.createElement('div');
  const image = element.querySelector('.o5-50-50-content-block__image img');
  const videoModal = element.querySelector('.o5-50-50-content-block__video-modal section');

  if (image) {
    rightColumn.appendChild(image.cloneNode(true));
  }

  if (videoModal) {
    const videoLink = document.createElement('a');
    videoLink.href = videoModal.dataset.videoUrl;
    videoLink.textContent = 'Video Preview';
    rightColumn.appendChild(videoLink);
  }

  const cells = [
    headerRow,
    [leftColumn, rightColumn],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}