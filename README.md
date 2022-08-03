## Install

Add the project as a submodule and install deps.

```
git submodule add https://github.com/gauntface/hugo-base-theme.git themes/base-theme \
&& npm install -g postcss-cli
```

## Linting

```shell
npx stylelint '**/*.css' --fix
```