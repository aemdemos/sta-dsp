/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global KeyboardEvent, WebImporter, window */

/**
 *  Cleanup unwanted attributes in element and children
  * @param {Element} e
*/
function cleanUpAttributes(e) {
  e.removeAttribute('class');
  e.removeAttribute('style');
  const attrNames = e.getAttributeNames().filter((a) => a.startsWith('data-') || a.startsWith('aria-'));
  if (attrNames.length > 0) {
    attrNames.forEach((a) => {
      e.removeAttribute(a);
    });
  }
  [...e.children].forEach((child) => cleanUpAttributes(child));
}

export async function handleOnLoad({ document }) {
  // send 'esc' keydown event to close the dialog
  document.dispatchEvent(
    new KeyboardEvent('keydown', {
      altKey: false,
      code: 'Escape',
      ctrlKey: false,
      isComposing: false,
      key: 'Escape',
      location: 0,
      metaKey: false,
      repeat: false,
      shiftKey: false,
      which: 27,
      charCode: 0,
      keyCode: 27,
    }),
  );
  document.elementFromPoint(0, 0)?.click();

  // mark hidden elements
  document.querySelectorAll('*').forEach((el) => {
    if (
      el
      && (
        /none/i.test(window.getComputedStyle(el).display.trim())
        || /hidden/i.test(window.getComputedStyle(el).visibility.trim())
      )
    ) {
      el.setAttribute('data-hlx-imp-hidden-div', '');
    }
  });

  // mark hidden divs + add bounding client rect data to all "visible" divs
  document.querySelectorAll('div').forEach((div) => {
    if (
      div
      && (
        /none/i.test(window.getComputedStyle(div).display.trim())
        || /hidden/i.test(window.getComputedStyle(div).visibility.trim())
      )
    ) {
      div.setAttribute('data-hlx-imp-hidden-div', '');
    } else {
      const domRect = div.getBoundingClientRect().toJSON();
      if (Math.round(domRect.width) > 0 && Math.round(domRect.height) > 0) {
        div.setAttribute('data-hlx-imp-rect', JSON.stringify(domRect));
      }
      const bgImage = window.getComputedStyle(div).getPropertyValue('background-image');
      if (bgImage && bgImage !== 'none' && bgImage.includes('url(')) {
        div.setAttribute('data-hlx-background-image', bgImage);
      }
      const bgColor = window.getComputedStyle(div).getPropertyValue('background-color');
      if (bgColor && bgColor !== 'rgb(0, 0, 0)' && bgColor !== 'rgba(0, 0, 0, 0)') {
        div.setAttribute('data-hlx-imp-bgcolor', bgColor);
      }
      const color = window.getComputedStyle(div).getPropertyValue('color');
      if (color && color !== 'rgb(0, 0, 0)') {
        div.setAttribute('data-hlx-imp-color', color);
      }
    }
  });

  // fix image with only srcset attribute (not supported in helix-importer)
  document.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src');
    const srcset = img.getAttribute('srcset')?.split(' ')[0];
    if (!src && srcset) {
      img.setAttribute('src', srcset);
    }
  });

  // get body width
  const bodyWidth = document.body.getBoundingClientRect().width;
  document.body.setAttribute('data-hlx-imp-body-width', bodyWidth);
}

/**
 *  Pre transform rules
 * @param {Element} root
 * @param {Document} document
 * @param {string} url
 * @param {string} originalURL
*/
export function preTransformRules({
  root,
  document,
  url,
  publishUrl,
  originalURL,
}) {
  // adjust image urls
  WebImporter.rules.adjustImageUrls(root, url, originalURL);

  [...document.querySelectorAll('a')].forEach((a) => {
    const href = a.getAttribute('href');
    if (href) {
      try {
        if (href.startsWith('./') || href.startsWith('/') || href.startsWith('../')) {
          // transform relative URLs to absolute URLs
          const targetUrl = new URL(href, publishUrl);
          // eslint-disable-next-line no-param-reassign
          a.href = targetUrl.toString();
        } else if (originalURL) {
          // also transform absolute URLs to current host
          const currentHref = new URL(href);
          const currentUrl = new URL(originalURL);
          if (currentHref.host === currentUrl.host) {
            // if current host is same than href host, switch href host with url host
            // this is the case for absolutes URLs pointing to the same host
            const targetUrl = new URL(publishUrl);
            const newHref = new URL(`${currentHref.pathname}${currentHref.search}${currentHref.hash}`, `${targetUrl.protocol}//${targetUrl.host}`);
            // eslint-disable-next-line no-param-reassign
            a.href = newHref.toString();
          }
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`Unable to adjust link ${href}`);
      }
    }
  });
}

/**
 *  Post transform rules
 * @param {Element} root
 * @param {Document} document
 * @param {string} url
 * @param {string} originalURL
*/
export function postTransformRules({
  root,
  document,
  originalURL,
}) {
  // remove unwanted elements
  WebImporter.DOMUtils.remove(root, [
    'style',
    'source',
    'script',
    'noscript',
    'iframe',
    'link',
  ]);

  // transform background images
  WebImporter.rules.transformBackgroundImages(root, document);

  // cleanup unwanted attributes
  cleanUpAttributes(root);

  // adjust anchor links
  if (root.querySelector('a[href^="#"]')) {
    const u = new URL(originalURL);
    const links = root.querySelectorAll('a[href^="#"]');
    for (let i = 0; i < links.length; i += 1) {
      const a = links[i];
      a.href = `${u.pathname}${a.getAttribute('href')}`;
    }
  }
}

/**
 *  Generate document path
 * @param {string} url
 * @returns {string}
*/
export function generateDocumentPath({ url }) {
  let p = new URL(url).pathname;
  if (p.endsWith('/')) {
    p = `${p}index`;
  }
  p = decodeURIComponent(p)
    .toLowerCase()
    .replace(/\.html$/, '')
    .replace(/[^a-z0-9/]/gm, '-');
  return WebImporter.FileUtils.sanitizePath(p);
}
