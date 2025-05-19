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
/* global WebImporter */

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
 * Generate document path
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

export const TableBuilder = (originalFunc) => {
  const original = originalFunc;

  return {
    build: (parserName) => (cells, document) => {
      if (cells.length > 0 && Array.isArray(cells[0])) {
        const current = cells[0][0];
        // Handle Section Metadata specially
        if (current?.toLowerCase().includes('section metadata')) {
          const styleRow = cells.find((row) => row[0]?.toLowerCase() === 'style');
          if (styleRow) {
            if (styleRow.length > 1) {
              const existingStyles = styleRow[1].split(',').map((s) => s.trim());
              if (!existingStyles.includes(parserName)) {
                existingStyles.push(parserName);
                styleRow[1] = existingStyles.join(', ');
              }
            } else {
              styleRow[1] = parserName;
            }
          } else {
            cells.push(['style', parserName]);
          }
          return original(cells, document); // skip the rest
        } else if (current?.toLowerCase().includes('metadata')) {
          return original(cells, document); // skip the rest
        }
        const variantMatch = current.match(/\(([^)]+)\)/);

        if (variantMatch) {
          const existingVariants = variantMatch[1].split(',').map((v) => v.trim());
          if (!existingVariants.includes(parserName)) {
            existingVariants.push(parserName);
          }
          const baseName = current.replace(/\s*\([^)]+\)/, '').trim();
          cells[0][0] = `${baseName} (${existingVariants.join(', ')})`;
        } else {
          cells[0][0] = `${current} (${parserName})`;
        }
      }

      return original(cells, document);
    },

    restore: () => original,
  };
};
