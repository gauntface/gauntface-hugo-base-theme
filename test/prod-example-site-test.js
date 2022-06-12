const path = require('path');
const test = require('ava');
const StaticServer = require('static-server');
const puppeteer = require('puppeteer');
const glob = require('glob');

const siteDir = path.join(__dirname, 'example-site', 'public');
const server = new StaticServer({
  rootPath: siteDir,
  port: 9999,
});

function startServer() {
  return new Promise((resolve, reject) => {
    server.start(() => {
      console.log(`Using http://localhost:${server.port}`);
      resolve(`http://localhost:${server.port}`);
    })
  });
};

let addr;
let browser;

test.before(async (t) => {
  // Server for project
  addr = await startServer();
});
test.before(async (t) => {
  // Start browser
  browser = await puppeteer.launch();
})

test.after('cleanup', async (t) => {
  // This runs before all tests
  server.stop();

  await browser.close();
});

test.beforeEach(async (t) => {
  // Create new page for test
  t.context.page = await browser.newPage();

  // Ensure we get 200 responses from the server
  t.context.page.on('response', (response) => {
    if (response) {
      t.deepEqual(response.status(), 200);
    }
  })
});

test.afterEach(async (t) => {
  await t.context.page.close();
})

test('css links', async (t) => {
  const files = glob.sync('**/*.css', {
      cwd: siteDir,
  });
  files.sort();

  t.deepEqual(files, [
    `base/html/iframe.css`,
    `base/html/img.css`,
    `base/html/p.css`,
    `base/html/pre.css`,
    `base/html/svg.css`,
    `base/html/video.css`,
    `css/theme-assets-example.css`,
    `css/theme-static-example.css`,
    `css/top-static-example.css`,
  ]);
})

test('js scripts', async (t) => {
  const page = t.context.page;

  // Load webpage
  await page.goto(`${addr}`);

  const links = await page.$$('script')

  const linkHrefs = [];
  for(const l of links) {
    const href = await l.evaluate((l) => l.src);
    linkHrefs.push(href);
  }

  linkHrefs.sort();

  t.deepEqual(linkHrefs, [
    `${addr}/base/js/bootstrap/always-async.js`,
    `${addr}/base/js/bootstrap/always-preload.js`,
    `${addr}/base/js/third_party/lite-vimeo-embed/n-hopin-lite-vi-preload.js`,
    `${addr}/base/js/third_party/lite-youtube-embed/n-hopin-lite-yt-preload.js`,
    `${addr}/js/theme-assets-example.js`,
  ]);
})