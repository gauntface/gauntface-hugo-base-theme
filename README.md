## Install

Add the project as a submodule.

```
git submodule add https://github.com/gauntface/hugo-base-theme.git themes/base-theme
```

Then add the node modules used for assets.

```
npm install -g postcss-cli
```

## Development

Development is done on the dev branch and built like so:

```
git checkout -b dev
npm install
npm run build
```