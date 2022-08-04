## Install

Add the project as a submodule and install deps.

```
git submodule add https://github.com/gauntface/hugo-base-theme.git themes/base-theme \
&& npm install -g postcss-cli
```

## Usage

You can use the base-theme as is, but there are a couple of extra features
that you can take advantage of.

### CSS & JS via JSON

This is helpful if you want to include CSS or JS from external sources.

Define your data in `data/base-theme/*.json` with the following format:

```json
{
    "css": {
        "<sync | async | preload>": [...],
    },
    "js": {
      "<sync | async>": [...],
    }
}
```

The theme will add these assets in your development builds.

### ESBuild Defines

ESBuild is used to build/minify JS and TS files and you can configure the
defines like so:

Create a file in `data/base-theme/esbuild.json` with the following structure:

```
{
  "defines": {
    "<Key>": "<Value>"
  }
}
```

This will be passed to esbuild.

## Linting

```shell
npx stylelint '**/*.css' --fix
```