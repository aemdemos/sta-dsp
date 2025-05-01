/*
 * Copyright 2024 Adobe. All rights reserved.
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
/* eslint-disable no-console */
import cards11Parser from './parsers/cards11.js';
import accordion12Parser from './parsers/accordion12.js';
import columns8Parser from './parsers/columns8.js';
import columns2Parser from './parsers/columns2.js';
import columns7Parser from './parsers/columns7.js';
import columns4Parser from './parsers/columns4.js';
import hero9Parser from './parsers/hero9.js';
import cards10Parser from './parsers/cards10.js';
import cards13Parser from './parsers/cards13.js';
import hero14Parser from './parsers/hero14.js';
import hero16Parser from './parsers/hero16.js';
import columns17Parser from './parsers/columns17.js';
import cards15Parser from './parsers/cards15.js';
import cards20Parser from './parsers/cards20.js';
import tabs19Parser from './parsers/tabs19.js';
import columns21Parser from './parsers/columns21.js';
import embedVideo6Parser from './parsers/embedVideo6.js';
import hero23Parser from './parsers/hero23.js';
import hero24Parser from './parsers/hero24.js';
import hero22Parser from './parsers/hero22.js';
import embedVideo3Parser from './parsers/embedVideo3.js';
import embedVideo18Parser from './parsers/embedVideo18.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import { TransformHook } from './transformers/transform.js';
import {
  generateDocumentPath,
  handleOnLoad,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  cards11: cards11Parser,
  accordion12: accordion12Parser,
  columns8: columns8Parser,
  columns2: columns2Parser,
  columns7: columns7Parser,
  columns4: columns4Parser,
  hero9: hero9Parser,
  cards10: cards10Parser,
  cards13: cards13Parser,
  hero14: hero14Parser,
  hero16: hero16Parser,
  columns17: columns17Parser,
  cards15: cards15Parser,
  cards20: cards20Parser,
  tabs19: tabs19Parser,
  columns21: columns21Parser,
  embedVideo6: embedVideo6Parser,
  hero23: hero23Parser,
  hero24: hero24Parser,
  hero22: hero22Parser,
  embedVideo3: embedVideo3Parser,
  embedVideo18: embedVideo18Parser,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
};

WebImporter.Import = {
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.entries(transformers).forEach(([, transformerFn]) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, cluster }) => {
    // Remove invalid filename characters
    let sanitizedString = name.replace(/[^a-zA-Z0-9-_\s]/g, ' ').trim();
    // Remove all numbers at the beginning of the string
    sanitizedString = sanitizedString.replace(/^\d+/, '');
    // Convert to camel case
    sanitizedString = sanitizedString
      .replace(/[\s-_]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : ''))
      .replace(/^\w/, (c) => c.toLowerCase());
    return cluster ? `${sanitizedString}${cluster}` : sanitizedString;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (fragments = [], url = '') => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath)),
};

const pageElements = [
  {
    name: 'metadata',
  },
];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { fragments = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(fragments, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => instance.url === originalURL)
      .map((instance) => ({
        ...block,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ name, cluster, element = main }) => {
    const parserName = WebImporter.Import.getParserName({ name, cluster });
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    try {
      // before parse hook
      WebImporter.Import.transform(TransformHook.beforeParse, element, { ...source });
      // parse the element
      parserFn.call(this, element, { ...source });
      // after parse hook
      WebImporter.Import.transform(TransformHook.afterParse, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter(({ url }) => `${url}#${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}#${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserName = WebImporter.Import.getParserName({ name, cluster });
        const parserFn = parsers[parserName];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, publishUrl });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, publishUrl });

    return [{
      element: main,
      path,
    }];
  },
};
