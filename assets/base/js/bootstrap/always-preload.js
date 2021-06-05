import {OnLoad} from '../utils/_onload.js';

function analytics() {
  window.dataLayer = [];

  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'UA-161686512-1');

  const s = document.createElement('script');
  s.src = "https://www.googletagmanager.com/gtag/js?id=UA-161686512-1";
  document.body.appendChild(s);
}

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
  analytics();
  asyncDataSrc();
  asyncPreloadCSS();
}

OnLoad(run);