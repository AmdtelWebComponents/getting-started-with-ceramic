# \<getting-started-with-ceramic>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation. This Example folows the tutorial [Getting Started With Ceramic](https://github.com/ceramicstudio/tutorial-getting-started-with-ceramic) using open-wc web component generator.

## Installation

```bash
npm i getting-started-with-ceramic
```

## Usage

```html
<script type="module">
  import 'getting-started-with-ceramic/getting-started-with-ceramic.js';
</script>

<getting-started-with-ceramic></getting-started-with-ceramic>
```



## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
