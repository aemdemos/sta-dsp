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

import { TransformHook } from './transform.js';

export default function transform(hookName, element, { document, originalURL, publishUrl }) {
  if (hookName === TransformHook.beforeTransform) {
    // adjust links
    [...document.querySelectorAll('a')].forEach((a) => {
      let href = a.getAttribute('href');
      if (href) {
        try {
          /* eslint-disable no-new */
          new URL(href);
        } catch (e) {
          href = `./${href}`;
        }

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
  if (hookName === TransformHook.afterTransform) {
    // adjust anchor links
    if (element.querySelector('a[href^="#"]')) {
      const u = new URL(originalURL);
      const links = element.querySelectorAll('a[href^="#"]');
      for (let i = 0; i < links.length; i += 1) {
        const a = links[i];
        a.href = `${u.pathname}${a.getAttribute('href')}`;
      }
    }
  }
}
