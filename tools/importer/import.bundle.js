var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // tools/importer/import.js
  var import_exports = {};
  __export(import_exports, {
    default: () => import_default
  });

  // tools/importer/parsers/columns1.js
  function parse(element, { document: document2 }) {
    var _a;
    const footer = element.querySelector("footer");
    const logoContainer = footer.querySelector(".col.offset-lg-1.col-lg-3");
    const logoLink = logoContainer == null ? void 0 : logoContainer.querySelector("a");
    const logoImage = logoLink == null ? void 0 : logoLink.querySelector("img");
    const logo = document2.createElement("div");
    if (logoLink) {
      logo.append(logoLink);
    }
    const navLinksContainer = footer.querySelector(".footer-nav");
    const navLinks = Array.from((navLinksContainer == null ? void 0 : navLinksContainer.querySelectorAll("li")) || []).map((li) => li.querySelector("a"));
    const navLinksList = document2.createElement("ul");
    navLinks.forEach((link) => {
      const listItem = document2.createElement("li");
      if (link) {
        listItem.append(link);
      }
      navLinksList.append(listItem);
    });
    const copyrightsContainer = footer.querySelector(".copyrights");
    const copyrightsText = ((_a = copyrightsContainer == null ? void 0 : copyrightsContainer.querySelector("p")) == null ? void 0 : _a.innerHTML) || "";
    const copyrightsElement = document2.createElement("div");
    copyrightsElement.innerHTML = copyrightsText;
    const headerRow = ["Columns"];
    const cells = [
      headerRow,
      [logo, navLinksList],
      [copyrightsElement]
    ];
    const table = WebImporter.DOMUtils.createTable(cells, document2);
    element.replaceWith(table);
  }

  // tools/importer/parsers/cards3.js
  function parse2(element, { document: document2 }) {
    const cards = Array.from(element.querySelectorAll(".col"));
    const rows = [
      ["Cards"]
      // Header row matching the example exactly
    ];
    cards.forEach((card) => {
      const img = card.querySelector(".card-thumb__img");
      const title = card.querySelector("h2");
      const description = card.querySelector("p");
      const link = card.querySelector("a");
      const imageElement = document2.createElement("img");
      imageElement.src = img ? img.src : "";
      imageElement.alt = img ? img.alt : "";
      const textContent = [];
      if (title) {
        const titleElement = document2.createElement("strong");
        titleElement.textContent = title.textContent;
        textContent.push(titleElement);
      }
      if (description) {
        const descriptionElement = document2.createElement("p");
        descriptionElement.textContent = description.textContent;
        textContent.push(descriptionElement);
      }
      if (link) {
        const linkElement = document2.createElement("a");
        linkElement.href = link.href;
        linkElement.textContent = link.textContent;
        textContent.push(linkElement);
      }
      rows.push([imageElement, textContent]);
    });
    const table = WebImporter.DOMUtils.createTable(rows, document2);
    element.replaceWith(table);
  }

  // tools/importer/parsers/hero4.js
  function parse3(element, { document: document2 }) {
    const title = element.querySelector("h1.hero-text__title");
    const eyebrow1 = element.querySelector("h4.hero-text__eyebrow-1");
    const eyebrow2 = element.querySelector("h3.hero-text__eyebrow-2");
    const description = element.querySelector("p.m-b-sm-3");
    const footnote = element.querySelector("p.text-footnote");
    const image = element.querySelector("img");
    const imgElement = document2.createElement("img");
    imgElement.src = image.src;
    imgElement.alt = image.alt;
    const contentCell = document2.createElement("div");
    contentCell.appendChild(eyebrow1);
    contentCell.appendChild(eyebrow2);
    contentCell.appendChild(title);
    contentCell.appendChild(description);
    contentCell.appendChild(footnote);
    contentCell.appendChild(imgElement);
    const cells = [
      ["Hero"],
      [contentCell]
    ];
    const block = WebImporter.DOMUtils.createTable(cells, document2);
    element.replaceWith(block);
  }

  // tools/importer/parsers/cardsNoImages5.js
  function parse4(element, { document: document2 }) {
    var _a, _b;
    const heading = ((_a = element.querySelector("h2")) == null ? void 0 : _a.textContent) || "";
    const description = ((_b = element.querySelector("p")) == null ? void 0 : _b.textContent) || "";
    const buttons = Array.from(element.querySelectorAll(".button-group a")).map((button) => {
      const link = document2.createElement("a");
      link.href = button.href;
      link.textContent = button.textContent;
      return link;
    });
    const rows = [
      ["Cards (no images)"],
      // Header row
      [
        (() => {
          const content = document2.createElement("div");
          if (heading) {
            const title = document2.createElement("strong");
            title.textContent = heading;
            content.appendChild(title);
          }
          if (description) {
            const para = document2.createElement("p");
            para.textContent = description;
            content.appendChild(para);
          }
          buttons.forEach((button) => {
            content.appendChild(button);
          });
          return content;
        })()
      ]
    ];
    const block = WebImporter.DOMUtils.createTable(rows, document2);
    element.replaceWith(block);
  }

  // tools/importer/parsers/header.js
  var brandLogoMapping = [
    {
      checkFn: (e) => [...e.querySelectorAll("a > picture, a > img")].filter((i) => i.closest("[data-hlx-imp-hidden-div]") === null)[0],
      parseFn: (e, targetEl, bodyWidth, x) => {
        if (bodyWidth && x < bodyWidth / 2) {
          const linkedPictureEl = document.createElement("div");
          const linkEl = e.parentElement;
          let imgEl = e.cloneNode(true);
          if (imgEl.tagName === "PICTURE") {
            imgEl = imgEl.querySelector("img");
          }
          linkEl.chilren = null;
          linkEl.parentElement.append(linkedPictureEl);
          linkedPictureEl.append(document.createElement("br"));
          linkedPictureEl.append(linkEl);
          linkedPictureEl.prepend(imgEl);
          if (linkEl.textContent.replaceAll(/[\n\t]/gm, "").trim().length === 0) {
            linkEl.textContent = linkEl.href;
          }
          if (linkedPictureEl.closest("li")) {
            const liEl = linkedPictureEl.closest("li");
            targetEl.append(...liEl.children);
            liEl.remove();
          } else {
            targetEl.append(linkedPictureEl);
          }
          return true;
        }
        return false;
      }
    },
    {
      checkFn: (e) => e.querySelector("picture + br + a, img + br + a"),
      parseFn: (e, targetEl, bodyWidth, x) => {
        if (bodyWidth && x < bodyWidth / 2) {
          const imgEl = e.closest("picture, img");
          if (imgEl) {
            if (imgEl.closest("li")) {
              const liEl = imgEl.closest("li");
              targetEl.append(...liEl.children);
              liEl.remove();
            } else {
              targetEl.append(imgEl);
            }
          }
          return true;
        }
        return false;
      }
    },
    {
      checkFn: (e) => e.querySelector("img"),
      parseFn: (e, targetEl, bodyWidth, x) => {
        if (bodyWidth && x < bodyWidth / 2) {
          if (e.closest("li")) {
            const liEl = e.closest("li");
            targetEl.append(...liEl.children);
            liEl.remove();
          } else {
            targetEl.append(e);
          }
          return true;
        }
        return false;
      }
    },
    {
      checkFn: (e, { originURL }) => e.querySelector(`a[href="/"], a[href="${originURL}"], a[href="${originURL}/"]`),
      parseFn: (e, targetEl, bodyWidth, x) => {
        if (bodyWidth && x < bodyWidth / 2) {
          targetEl.append(e);
          return true;
        }
        return false;
      }
    },
    {
      checkFn: () => {
        const resp = fetch("/favicon.ico");
        if (resp && resp.status === 200) {
          const logoEl = document.createElement("img");
          logoEl.src = "/favicon.ico";
          return logoEl;
        }
        return null;
      },
      parseFn: (e, targetEl) => {
        targetEl.append(e);
        return true;
      }
    }
  ];
  function getBrandLogo(rootEl, document2, { bodyWidth, originURL }) {
    const brandEl = document2.createElement("div");
    brandLogoMapping.some((m) => {
      var _a;
      const logoEl = m.checkFn(rootEl, { originURL });
      if (logoEl) {
        let x = 0;
        try {
          x = JSON.parse((_a = logoEl.closest("div")) == null ? void 0 : _a.getAttribute("data-hlx-imp-rect")).x;
        } catch (e) {
          console.error("error", e);
        }
        return m.parseFn(logoEl, brandEl, bodyWidth, x);
      }
      return false;
    });
    return brandEl;
  }
  var navMapping = [
    {
      checkFn: (e) => [...e.querySelectorAll("nav ul, nav ol")].filter((i) => !i.parentElement.closest("ul, ol") && !i.hasAttribute("data-hlx-imp-hidden-div")).reduce((acc, navListEl) => {
        var _a;
        let x = null;
        try {
          x = JSON.parse((_a = navListEl.closest("div")) == null ? void 0 : _a.getAttribute("data-hlx-imp-rect")).x;
        } catch (err) {
          console.error("error", err);
        }
        if (!acc || typeof x === "number" && x < acc.x) {
          return {
            el: navListEl,
            x
          };
        }
        return acc;
      }, null),
      parseFn: (e, targetEl) => {
        targetEl.append(e == null ? void 0 : e.el);
        return true;
      }
    },
    {
      checkFn: (e) => [...e.querySelectorAll("nav")].filter((i) => !i.parentElement.closest("nav") && !i.hasAttribute("data-hlx-imp-hidden-div")).reduce((acc, navListEl) => {
        var _a;
        let x = null;
        try {
          x = JSON.parse((_a = navListEl.closest("div")) == null ? void 0 : _a.getAttribute("data-hlx-imp-rect")).x;
        } catch (err) {
          console.error("error", err);
        }
        if (!acc || typeof x === "number" && x < acc.x) {
          return {
            el: navListEl,
            x
          };
        }
        return acc;
      }, null),
      parseFn: (e, targetEl) => {
        targetEl.append(e == null ? void 0 : e.el);
        return true;
      }
    },
    {
      checkFn: (e, { bodyWidth }) => [...e.querySelectorAll("ol,ul")].filter((f) => f.parentElement.closest("ol,ul") === null).reduce(
        (acc, listEl) => {
          var _a;
          console.log("listEl", listEl);
          const items = [...listEl.querySelectorAll(":scope > li")].filter((liEl) => {
            liEl.querySelectorAll("script", "style").forEach((d) => d.remove());
            return liEl.textContent.replaceAll("\n", "").trim().length > 0;
          });
          let x = null;
          try {
            x = JSON.parse((_a = listEl.closest("div")) == null ? void 0 : _a.getAttribute("data-hlx-imp-rect")).x;
          } catch (err) {
            console.error("error", err);
          }
          console.log("items", items.length, acc == null ? void 0 : acc.children.length, x, bodyWidth, listEl);
          if (items.length > 1 && (!acc || items.length > acc.children.length) && (!bodyWidth || typeof x === "number" && x < bodyWidth / 2)) {
            console.log("found", listEl);
            return listEl;
          }
          return acc;
        },
        null
      ),
      parseFn: (e, targetEl) => {
        const elsToDelete = e.querySelectorAll(":scope > :not(li)");
        elsToDelete.forEach((d) => d.remove());
        targetEl.append(e);
        return true;
      }
    }
  ];
  function getNavigation(rootEl, document2, { bodyWidth }) {
    const navEl = document2.createElement("div");
    navMapping.some((m) => {
      var _a;
      const el = m.checkFn(rootEl, { bodyWidth });
      if (el) {
        console.log("nav", el);
        let x = 0;
        try {
          x = JSON.parse((_a = el.closest("div")) == null ? void 0 : _a.getAttribute("data-hlx-imp-rect")).x;
        } catch (e) {
          console.error("error", e);
        }
        return m.parseFn(el, navEl, bodyWidth, x);
      }
      return false;
    });
    return navEl;
  }
  function cleanup(el) {
    el.querySelectorAll("script", "style").forEach((e) => e.remove());
    el.querySelectorAll("a").forEach((a) => {
      if (a.textContent.replaceAll("\n", "").trim().toLowerCase() === "skip to content") {
        a.remove();
      }
    });
    return el;
  }
  function headerParser(el, { document: document2, params, bodyWidth }) {
    console.log("headerParser", el, params, bodyWidth);
    const containerEl = document2.createElement("div");
    const originURL = new URL(params.originalURL).origin;
    const brandEl = getBrandLogo(el, document2, { bodyWidth, originURL });
    const navEl = getNavigation(el, document2, { bodyWidth });
    const hiddenEls = document2.createElement("div");
    while (el.querySelector("[data-hlx-imp-hidden-div]")) {
      hiddenEls.append(el.querySelector("[data-hlx-imp-hidden-div]"));
    }
    const toolsEl = document2.createElement("div");
    toolsEl.append(...el.children);
    containerEl.append(brandEl);
    containerEl.append(document2.createElement("hr"));
    containerEl.append(navEl);
    containerEl.append(document2.createElement("hr"));
    containerEl.append(toolsEl);
    if (hiddenEls.children.length > 0 && hiddenEls.textContent.replaceAll("\n", "").trim().length > 0) {
      containerEl.append(document2.createElement("hr"));
      containerEl.append(hiddenEls);
      containerEl.append(WebImporter.DOMUtils.createTable([
        ["section-metadata"],
        ["style", "hidden"]
      ], document2));
    }
    cleanup(containerEl);
    return containerEl;
  }

  // tools/importer/parsers/metadata.js
  function isDate(str) {
    if (typeof str !== "string") return false;
    const date = new Date(str);
    return !Number.isNaN(Number(date));
  }
  function parse5(element, { document: document2 }) {
    const meta = WebImporter.Blocks.getMetadata(document2) || {};
    Object.entries(meta).forEach(([key, value]) => {
      if (key === "Image") {
        const [img1] = value.src.split(",");
        value.src = img1;
      }
      if (isDate(value)) {
        meta[key] = new Date(value).toISOString().slice(0, 10);
      }
    });
    const block = WebImporter.Blocks.createBlock(document2, {
      name: "Metadata",
      cells: meta
    });
    element.append(block);
  }

  // tools/importer/import.utils.js
  function cleanUpAttributes(e) {
    e.removeAttribute("class");
    e.removeAttribute("style");
    const attrNames = e.getAttributeNames().filter((a) => a.startsWith("data-") || a.startsWith("aria-"));
    if (attrNames.length > 0) {
      attrNames.forEach((a) => {
        e.removeAttribute(a);
      });
    }
    [...e.children].forEach((child) => cleanUpAttributes(child));
  }
  function handleOnLoad(_0) {
    return __async(this, arguments, function* ({ document: document2 }) {
      var _a;
      document2.dispatchEvent(
        new KeyboardEvent("keydown", {
          altKey: false,
          code: "Escape",
          ctrlKey: false,
          isComposing: false,
          key: "Escape",
          location: 0,
          metaKey: false,
          repeat: false,
          shiftKey: false,
          which: 27,
          charCode: 0,
          keyCode: 27
        })
      );
      (_a = document2.elementFromPoint(0, 0)) == null ? void 0 : _a.click();
      document2.querySelectorAll("*").forEach((el) => {
        if (el && (/none/i.test(window.getComputedStyle(el).display.trim()) || /hidden/i.test(window.getComputedStyle(el).visibility.trim()))) {
          el.setAttribute("data-hlx-imp-hidden-div", "");
        }
      });
      document2.querySelectorAll("div").forEach((div) => {
        if (div && (/none/i.test(window.getComputedStyle(div).display.trim()) || /hidden/i.test(window.getComputedStyle(div).visibility.trim()))) {
          div.setAttribute("data-hlx-imp-hidden-div", "");
        } else {
          const domRect = div.getBoundingClientRect().toJSON();
          if (Math.round(domRect.width) > 0 && Math.round(domRect.height) > 0) {
            div.setAttribute("data-hlx-imp-rect", JSON.stringify(domRect));
          }
          const bgImage = window.getComputedStyle(div).getPropertyValue("background-image");
          if (bgImage && bgImage !== "none" && bgImage.includes("url(")) {
            div.setAttribute("data-hlx-background-image", bgImage);
          }
          const bgColor = window.getComputedStyle(div).getPropertyValue("background-color");
          if (bgColor && bgColor !== "rgb(0, 0, 0)" && bgColor !== "rgba(0, 0, 0, 0)") {
            div.setAttribute("data-hlx-imp-bgcolor", bgColor);
          }
          const color = window.getComputedStyle(div).getPropertyValue("color");
          if (color && color !== "rgb(0, 0, 0)") {
            div.setAttribute("data-hlx-imp-color", color);
          }
        }
      });
      document2.querySelectorAll("img").forEach((img) => {
        var _a2;
        const src = img.getAttribute("src");
        const srcset = (_a2 = img.getAttribute("srcset")) == null ? void 0 : _a2.split(" ")[0];
        if (!src && srcset) {
          img.setAttribute("src", srcset);
        }
      });
      const bodyWidth = document2.body.getBoundingClientRect().width;
      document2.body.setAttribute("data-hlx-imp-body-width", bodyWidth);
    });
  }
  function preTransformRules({
    root,
    document: document2,
    url,
    publishUrl,
    originalURL
  }) {
    [...document2.querySelectorAll("a")].forEach((a) => {
      const href = a.getAttribute("href");
      if (href) {
        try {
          if (href.startsWith("./") || href.startsWith("/") || href.startsWith("../")) {
            const targetUrl = new URL(href, publishUrl);
            a.href = targetUrl.toString();
          } else if (originalURL) {
            const currentHref = new URL(href);
            const currentUrl = new URL(originalURL);
            if (currentHref.host === currentUrl.host) {
              const targetUrl = new URL(publishUrl);
              const newHref = new URL(`${currentHref.pathname}${currentHref.search}${currentHref.hash}`, `${targetUrl.protocol}//${targetUrl.host}`);
              a.href = newHref.toString();
            }
          }
        } catch (e) {
          console.warn(`Unable to adjust link ${href}`);
        }
      }
    });
  }
  function postTransformRules({
    root,
    document: document2,
    originalURL
  }) {
    WebImporter.DOMUtils.remove(root, [
      "style",
      "source",
      "script",
      "noscript",
      "iframe",
      "link"
    ]);
    WebImporter.rules.transformBackgroundImages(root, document2);
    cleanUpAttributes(root);
    if (root.querySelector('a[href^="#"]')) {
      const u = new URL(originalURL);
      const links = root.querySelectorAll('a[href^="#"]');
      for (let i = 0; i < links.length; i += 1) {
        const a = links[i];
        a.href = `${u.pathname}${a.getAttribute("href")}`;
      }
    }
  }
  function generateDocumentPath({ url }) {
    let p = new URL(url).pathname;
    if (p.endsWith("/")) {
      p = `${p}index`;
    }
    p = decodeURIComponent(p).toLowerCase().replace(/\.html$/, "").replace(/[^a-z0-9/]/gm, "-");
    return WebImporter.FileUtils.sanitizePath(p);
  }

  // tools/importer/import.js
  var parsers = {
    metadata: parse5,
    columns1: parse,
    cards3: parse2,
    hero4: parse3,
    cardsNoImages5: parse4
  };
  WebImporter.Import = {
    getParserName: ({ name, cluster }) => {
      let sanitizedString = name.replace(/[^a-zA-Z0-9-_\s]/g, " ").trim();
      sanitizedString = sanitizedString.replace(/^\d+/, "");
      sanitizedString = sanitizedString.replace(/[\s-_]+(.)?/g, (match, chr) => chr ? chr.toUpperCase() : "").replace(/^\w/, (c) => c.toLowerCase());
      return cluster ? `${sanitizedString}${cluster}` : sanitizedString;
    },
    getElementByXPath: (document2, xpath) => {
      const result = document2.evaluate(
        xpath,
        document2,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      );
      return result.singleNodeValue;
    },
    getFragmentXPaths: (fragments = [], url = "") => fragments.flatMap(({ instances = [] }) => instances).filter((instance) => instance.url === url).map(({ xpath }) => xpath)
  };
  var pageElements = [
    {
      name: "metadata"
    }
  ];
  function transformPage(main, _a) {
    var _b = _a, { inventory } = _b, source = __objRest(_b, ["inventory"]);
    const { fragments = [], blocks: inventoryBlocks = [] } = inventory;
    const { document: document2, params: { originalURL } } = source;
    const fragmentElements = WebImporter.Import.getFragmentXPaths(fragments, originalURL).map((xpath) => WebImporter.Import.getElementByXPath(document2, xpath)).filter((el) => el);
    const blockElements = inventoryBlocks.map((block) => {
      const foundInstance = block.instances.find((instance) => instance.url === originalURL);
      if (foundInstance) {
        block.element = WebImporter.Import.getElementByXPath(document2, foundInstance.xpath);
      }
      return block;
    }).filter((block) => block.element);
    fragmentElements.forEach((element) => {
      if (element) {
        element.remove();
      }
    });
    [...pageElements, ...blockElements].forEach(({ name, cluster, element = main }) => {
      const parserName = WebImporter.Import.getParserName({ name, cluster });
      const parserFn = parsers[parserName];
      if (!parserFn) return;
      try {
        parserFn.call(this, element, __spreadValues({}, source));
      } catch (e) {
        console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
      }
    });
  }
  function transformFragment(main, _a) {
    var _b = _a, { fragment, inventory } = _b, source = __objRest(_b, ["fragment", "inventory"]);
    const { document: document2, params: { originalURL } } = source;
    if (fragment.name === "nav") {
      const navEl = document2.createElement("div");
      const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes("-00-")).length);
      console.log("navBlocks", navBlocks);
      for (let i = 0; i < navBlocks; i += 1) {
        const { xpath } = fragment.instances[i];
        const el = WebImporter.Import.getElementByXPath(document2, xpath);
        if (!el) {
          console.warn(`Failed to get element for xpath: ${xpath}`);
        } else {
          navEl.append(el);
        }
      }
      const bodyWidthAttr = document2.body.getAttribute("data-hlx-imp-body-width");
      const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1e3;
      try {
        const headerBlock = headerParser(navEl, __spreadProps(__spreadValues({}, source), {
          document: document2,
          fragment,
          bodyWidth
        }));
        main.append(headerBlock);
      } catch (e) {
        console.warn("Failed to parse header block", e);
      }
    } else {
      (fragment.instances || []).filter(({ url }) => `${url}#${fragment.name}` === originalURL).map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document2, xpath)
      })).filter(({ element }) => element).forEach(({ xpath, element }) => {
        main.append(element);
        const fragmentBlock = inventory.blocks.find(
          ({ instances }) => instances.find(({ url, xpath: blockXpath }) => `${url}#${fragment.name}` === originalURL && blockXpath === xpath)
        );
        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserFn = parsers[WebImporter.Import.getParserName({ name, cluster })];
        if (!parserFn) return;
        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
    }
  }
  var import_default = {
    onLoad: (payload) => __async(void 0, null, function* () {
      yield handleOnLoad(payload);
    }),
    transform: (source) => __async(void 0, null, function* () {
      const { document: document2, url, params: { originalURL } } = source;
      source.params.originalURL = new URL(originalURL).href;
      let publishUrl = window.location.origin;
      let inventory = null;
      if (!inventory) {
        const inventoryUrl = new URL("/tools/importer/inventory.json", publishUrl);
        try {
          const inventoryResp = yield fetch(inventoryUrl.href);
          inventory = yield inventoryResp.json();
        } catch (e) {
          console.error("Failed to fetch inventory");
        }
        if (!inventory) {
          return [];
        }
      }
      let main = document2.body;
      preTransformRules({
        root: main,
        document: document2,
        url,
        publishUrl,
        originalURL
      });
      let path = null;
      const sourceUrl = new URL(originalURL);
      const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : "";
      if (fragName) {
        const fragment = inventory.fragments.find(({ name }) => name === fragName);
        if (!fragment) {
          return [];
        }
        main = document2.createElement("div");
        transformFragment(main, __spreadProps(__spreadValues({}, source), { fragment, inventory }));
        path = fragment.path;
      } else {
        transformPage(main, __spreadProps(__spreadValues({}, source), { inventory }));
        path = generateDocumentPath(source);
      }
      postTransformRules({
        root: main,
        document: document2,
        originalURL
      });
      return [{
        element: main,
        path
      }];
    })
  };
  return __toCommonJS(import_exports);
})();
