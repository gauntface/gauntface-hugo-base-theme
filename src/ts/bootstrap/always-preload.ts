import {OnLoad} from '../utils/_onload.js';

function asyncPreloadCSS() {
  const styles = document.querySelectorAll('link[rel="preload"][as="style"]') as NodeListOf<HTMLLinkElement>;
  for (const s of styles) {
    const l = document.createElement('link');
    l.href = s.href;
    l.rel = 'stylesheet';
    document.head.appendChild(l);
  }
}

function asyncDataSrc() {
  const elements = document.querySelectorAll("[data-src]") as NodeListOf<HTMLIFrameElement>;
  for (const e of elements) {
    e.src = e.dataset.src;
  }
}

function run() {
  asyncDataSrc();
  asyncPreloadCSS();
}

OnLoad(run);