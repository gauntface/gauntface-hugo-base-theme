import {OnLoad} from '../utils/_onload.js';

function asyncPreloadCSS() {
  /**
   * @type {NodeListOf<HTMLLinkElement>} styles
   */
  const styles = document.querySelectorAll('link[rel="preload"][as="style"]')
  for (const s of styles) {
    const l = document.createElement('link');
    l.href = s.href;
    l.rel = 'stylesheet';
    document.head.appendChild(l);
  }
}

function asyncDataSrc() {
  /**
   * @type {NodeListOf<HTMLIFrameElement>} elements
   */
  const elements = document.querySelectorAll("[data-src]");
  for (const e of elements) {
    e.src = e.dataset.src;
  }
}

function run() {
  asyncDataSrc();
  asyncPreloadCSS();
}

OnLoad(run);