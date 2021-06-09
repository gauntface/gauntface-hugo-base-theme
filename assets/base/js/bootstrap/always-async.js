import {OnLoad} from '../utils/_onload.js';

OnLoad(function() {
  /**
   * @type {NodeListOf<HTMLLinkElement>} scripts
   */
  const scripts = document.querySelectorAll('link[rel="preload"][as="script"]')
  for (const s of scripts) {
    const script = document.createElement('script');
    script.src = s.href;
    document.body.appendChild(script);
  }
})