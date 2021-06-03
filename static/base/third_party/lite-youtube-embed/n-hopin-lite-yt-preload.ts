import {OnLoad} from '../../js/utils/_onload';

class LiteYTEmbed {

  private element: HTMLElement;
  private anchor: HTMLElement;
  private videoID: string;
  private preconnected: boolean;

  constructor(e: HTMLElement) {
      this.element = e;
      this.anchor = e.querySelector('.n-hopin-lite-yt__link');

      this.videoID = encodeURIComponent(e.getAttribute('videoid'));
      this.preconnected = false;

      this.setup();
  }

  setup() {
      // On hover (or tap), warm up the TCP connections we're (likely) about to use.
      this.anchor.addEventListener('pointerover', () => this.warmConnections(), {once: true});

      // Once the user clicks, add the real iframe
      this.anchor.addEventListener('click', (e) => {
        e.preventDefault();
        this.addIframe();
      });
  }

  addIframe(){
    const iframeHTML = `<iframe 
    allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen
    src="https://www.youtube-nocookie.com/embed/${this.videoID}?autoplay=1"
    style="width:100%;height:100%;border:none;"
    ></iframe>`;
    this.element.removeChild(this.anchor);
    this.element.insertAdjacentHTML('beforeend', iframeHTML);
    this.element.classList.add('n-hopin-lite-yt--activated');
  }

  /**
   * Add a <link rel={preload | preconnect} ...> to the head
   */
  addPrefetch(kind: string, url: string, as?: string) {
      const linkElem = document.createElement('link');
      linkElem.rel = kind;
      linkElem.href = url;
      if (as) {
          linkElem.as = as;
      }
      linkElem.crossOrigin = "";
      document.head.append(linkElem);
  }

  /**
   * Begin pre-connecting to warm up the iframe load
   * Since the embed's network requests load within its iframe,
   *   preload/prefetch'ing them outside the iframe will only cause double-downloads.
   * So, the best we can do is warm up a few connections to origins that are in the critical path.
   *
   * Maybe `<link rel=preload as=document>` would work, but it's unsupported: http://crbug.com/593267
   * But TBH, I don't think it'll happen soon with Site Isolation and split caches adding serious complexity.
   */
  warmConnections() {
      if (this.preconnected) return;
      this.preconnected = true;

      // The iframe document and most of its subresources come right off youtube.com
      this.addPrefetch('preconnect', 'https://www.youtube-nocookie.com');
      // The botguard script is fetched off from google.com
      this.addPrefetch('preconnect', 'https://www.google.com');
  }
}

OnLoad(() => {
  const ytElements = document.querySelectorAll<HTMLElement>('.n-hopin-lite-yt');
  for (const e of ytElements) {
    new LiteYTEmbed(e);
  }
})
