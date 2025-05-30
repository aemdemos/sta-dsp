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
import hero3Parser from './parsers/hero3.js';
import tableNoHeader7Parser from './parsers/tableNoHeader7.js';
import accordion9Parser from './parsers/accordion9.js';
import hero10Parser from './parsers/hero10.js';
import cards4Parser from './parsers/cards4.js';
import hero8Parser from './parsers/hero8.js';
import search13Parser from './parsers/search13.js';
import search15Parser from './parsers/search15.js';
import columns18Parser from './parsers/columns18.js';
import accordion6Parser from './parsers/accordion6.js';
import accordion17Parser from './parsers/accordion17.js';
import tableStripedBordered11Parser from './parsers/tableStripedBordered11.js';
import accordion22Parser from './parsers/accordion22.js';
import columns21Parser from './parsers/columns21.js';
import tableStripedBordered23Parser from './parsers/tableStripedBordered23.js';
import hero16Parser from './parsers/hero16.js';
import embedVideo1Parser from './parsers/embedVideo1.js';
import embedVideo19Parser from './parsers/embedVideo19.js';
import columns25Parser from './parsers/columns25.js';
import accordion20Parser from './parsers/accordion20.js';
import cards32Parser from './parsers/cards32.js';
import columns33Parser from './parsers/columns33.js';
import accordion27Parser from './parsers/accordion27.js';
import accordion29Parser from './parsers/accordion29.js';
import accordion2Parser from './parsers/accordion2.js';
import tabs26Parser from './parsers/tabs26.js';
import embedVideo38Parser from './parsers/embedVideo38.js';
import cards39Parser from './parsers/cards39.js';
import cardsNoImages30Parser from './parsers/cardsNoImages30.js';
import tabs35Parser from './parsers/tabs35.js';
import columns37Parser from './parsers/columns37.js';
import columns34Parser from './parsers/columns34.js';
import embedVideo43Parser from './parsers/embedVideo43.js';
import tabs40Parser from './parsers/tabs40.js';
import columns44Parser from './parsers/columns44.js';
import columns46Parser from './parsers/columns46.js';
import cards47Parser from './parsers/cards47.js';
import tableStripedBordered42Parser from './parsers/tableStripedBordered42.js';
import embedVideo5Parser from './parsers/embedVideo5.js';
import tableStripedBordered28Parser from './parsers/tableStripedBordered28.js';
import cards51Parser from './parsers/cards51.js';
import embedVideo45Parser from './parsers/embedVideo45.js';
import columns14Parser from './parsers/columns14.js';
import search50Parser from './parsers/search50.js';
import cards56Parser from './parsers/cards56.js';
import hero53Parser from './parsers/hero53.js';
import hero55Parser from './parsers/hero55.js';
import tableStripedBordered57Parser from './parsers/tableStripedBordered57.js';
import tableStripedBordered12Parser from './parsers/tableStripedBordered12.js';
import columns49Parser from './parsers/columns49.js';
import tableStripedBordered62Parser from './parsers/tableStripedBordered62.js';
import search63Parser from './parsers/search63.js';
import embedSocial59Parser from './parsers/embedSocial59.js';
import columns58Parser from './parsers/columns58.js';
import columns52Parser from './parsers/columns52.js';
import hero64Parser from './parsers/hero64.js';
import embedVideo68Parser from './parsers/embedVideo68.js';
import hero65Parser from './parsers/hero65.js';
import search69Parser from './parsers/search69.js';
import columns36Parser from './parsers/columns36.js';
import tabs54Parser from './parsers/tabs54.js';
import hero71Parser from './parsers/hero71.js';
import accordion48Parser from './parsers/accordion48.js';
import tableStripedBordered61Parser from './parsers/tableStripedBordered61.js';
import cardsNoImages70Parser from './parsers/cardsNoImages70.js';
import cardsNoImages41Parser from './parsers/cardsNoImages41.js';
import hero73Parser from './parsers/hero73.js';
import embedVideo67Parser from './parsers/embedVideo67.js';
import hero77Parser from './parsers/hero77.js';
import hero79Parser from './parsers/hero79.js';
import columns80Parser from './parsers/columns80.js';
import cardsNoImages66Parser from './parsers/cardsNoImages66.js';
import cardsNoImages81Parser from './parsers/cardsNoImages81.js';
import columns76Parser from './parsers/columns76.js';
import accordion87Parser from './parsers/accordion87.js';
import columns72Parser from './parsers/columns72.js';
import search90Parser from './parsers/search90.js';
import cardsNoImages91Parser from './parsers/cardsNoImages91.js';
import search92Parser from './parsers/search92.js';
import columns83Parser from './parsers/columns83.js';
import table94Parser from './parsers/table94.js';
import cards78Parser from './parsers/cards78.js';
import columns88Parser from './parsers/columns88.js';
import tableStripedBordered60Parser from './parsers/tableStripedBordered60.js';
import tableNoHeader98Parser from './parsers/tableNoHeader98.js';
import hero97Parser from './parsers/hero97.js';
import cards82Parser from './parsers/cards82.js';
import columns100Parser from './parsers/columns100.js';
import cards101Parser from './parsers/cards101.js';
import columns96Parser from './parsers/columns96.js';
import tableStripedBordered104Parser from './parsers/tableStripedBordered104.js';
import cardsNoImages102Parser from './parsers/cardsNoImages102.js';
import accordion74Parser from './parsers/accordion74.js';
import accordion86Parser from './parsers/accordion86.js';
import columns99Parser from './parsers/columns99.js';
import tableStripedBordered75Parser from './parsers/tableStripedBordered75.js';
import cardsNoImages103Parser from './parsers/cardsNoImages103.js';
import cards95Parser from './parsers/cards95.js';
import cards89Parser from './parsers/cards89.js';
import accordion93Parser from './parsers/accordion93.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import { TransformHook } from './transformers/transform.js';
import {
  generateDocumentPath,
  handleOnLoad,
  TableBuilder,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  hero3: hero3Parser,
  tableNoHeader7: tableNoHeader7Parser,
  accordion9: accordion9Parser,
  hero10: hero10Parser,
  cards4: cards4Parser,
  hero8: hero8Parser,
  search13: search13Parser,
  search15: search15Parser,
  columns18: columns18Parser,
  accordion6: accordion6Parser,
  accordion17: accordion17Parser,
  tableStripedBordered11: tableStripedBordered11Parser,
  accordion22: accordion22Parser,
  columns21: columns21Parser,
  tableStripedBordered23: tableStripedBordered23Parser,
  hero16: hero16Parser,
  embedVideo1: embedVideo1Parser,
  embedVideo19: embedVideo19Parser,
  columns25: columns25Parser,
  accordion20: accordion20Parser,
  cards32: cards32Parser,
  columns33: columns33Parser,
  accordion27: accordion27Parser,
  accordion29: accordion29Parser,
  accordion2: accordion2Parser,
  tabs26: tabs26Parser,
  embedVideo38: embedVideo38Parser,
  cards39: cards39Parser,
  cardsNoImages30: cardsNoImages30Parser,
  tabs35: tabs35Parser,
  columns37: columns37Parser,
  columns34: columns34Parser,
  embedVideo43: embedVideo43Parser,
  tabs40: tabs40Parser,
  columns44: columns44Parser,
  columns46: columns46Parser,
  cards47: cards47Parser,
  tableStripedBordered42: tableStripedBordered42Parser,
  embedVideo5: embedVideo5Parser,
  tableStripedBordered28: tableStripedBordered28Parser,
  cards51: cards51Parser,
  embedVideo45: embedVideo45Parser,
  columns14: columns14Parser,
  search50: search50Parser,
  cards56: cards56Parser,
  hero53: hero53Parser,
  hero55: hero55Parser,
  tableStripedBordered57: tableStripedBordered57Parser,
  tableStripedBordered12: tableStripedBordered12Parser,
  columns49: columns49Parser,
  tableStripedBordered62: tableStripedBordered62Parser,
  search63: search63Parser,
  embedSocial59: embedSocial59Parser,
  columns58: columns58Parser,
  columns52: columns52Parser,
  hero64: hero64Parser,
  embedVideo68: embedVideo68Parser,
  hero65: hero65Parser,
  search69: search69Parser,
  columns36: columns36Parser,
  tabs54: tabs54Parser,
  hero71: hero71Parser,
  accordion48: accordion48Parser,
  tableStripedBordered61: tableStripedBordered61Parser,
  cardsNoImages70: cardsNoImages70Parser,
  cardsNoImages41: cardsNoImages41Parser,
  hero73: hero73Parser,
  embedVideo67: embedVideo67Parser,
  hero77: hero77Parser,
  hero79: hero79Parser,
  columns80: columns80Parser,
  cardsNoImages66: cardsNoImages66Parser,
  cardsNoImages81: cardsNoImages81Parser,
  columns76: columns76Parser,
  accordion87: accordion87Parser,
  columns72: columns72Parser,
  search90: search90Parser,
  cardsNoImages91: cardsNoImages91Parser,
  search92: search92Parser,
  columns83: columns83Parser,
  table94: table94Parser,
  cards78: cards78Parser,
  columns88: columns88Parser,
  tableStripedBordered60: tableStripedBordered60Parser,
  tableNoHeader98: tableNoHeader98Parser,
  hero97: hero97Parser,
  cards82: cards82Parser,
  columns100: columns100Parser,
  cards101: cards101Parser,
  columns96: columns96Parser,
  tableStripedBordered104: tableStripedBordered104Parser,
  cardsNoImages102: cardsNoImages102Parser,
  accordion74: accordion74Parser,
  accordion86: accordion86Parser,
  columns99: columns99Parser,
  tableStripedBordered75: tableStripedBordered75Parser,
  cardsNoImages103: cardsNoImages103Parser,
  cards95: cards95Parser,
  cards89: cards89Parser,
  accordion93: accordion93Parser,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
};

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.entries(transformers).forEach(([, transformerFn]) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
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
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

const pageElements = [{ name: 'metadata' }];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
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

  const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);
  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ element = main, ...pageBlock }) => {
    const parserName = WebImporter.Import.getParserName(pageBlock);
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    try {
      // before parse hook
      WebImporter.Import.transform(TransformHook.beforeParse, element, { ...source });
      // parse the element
      WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
      parserFn.call(this, element, { ...source });
      WebImporter.DOMUtils.createTable = tableBuilder.restore();
      // after parse hook
      WebImporter.Import.transform(TransformHook.afterParse, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${pageBlock.key}`, e);
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
    const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);

    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
          parserFn.call(this, element, source);
          WebImporter.DOMUtils.createTable = tableBuilder.restore();
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
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
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, inventory });

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
      path = generateDocumentPath(source, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, inventory });

    return [{
      element: main,
      path,
    }];
  },
};
