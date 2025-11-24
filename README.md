# Capo.js for Astro

Forked from [natemoo-re/astro-capo](https://github.com/natemoo-re/astro-capo/).

#### Changes made in this fork:
- Changed package name to `@felixicaza/astro-capo` to publish under my npm scope.
- Update order of `preload` tags to be higher priority and avoid CLS issues (see [why](#why)).
- Added tests.

Get your `<head>` in order—automatically!

`@felixicaza/astro-capo` is a component that automatically optimizes the order of elements in your `<head>`, adapted from [Rick Viscomi](https://twitter.com/rick_viscomi)'s wonderful `capo.js` library.

Unlike [`capo.js`](https://rviscomi.github.io/capo.js/), which makes it easy to debug the optimal order of your `<head>` in the browser, `@felixicaza/astro-capo` automatically optimizes your `<head>` on the server while rendering your page.

⬇️ Installation

NPM:

```bash
npm install @felixicaza/astro-capo
```

PNPM:

```bash
pnpm add @felixicaza/astro-capo
```

Yarn:

```bash
yarn add @felixicaza/astro-capo
```

## 🚀 Usage

Replace your regular `<head>` element with our custom `<Head>` component. That's it!

```astro
---
import { Head } from '@felixicaza/astro-capo'
---

<html lang="en">
  <Head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>Astro</title>
  </Head>
  <body>
    <h1>Astro</h1>
  </body>
</html>
```

## 💡 Why?

The previous order placed the `preload` tags very low, which caused some resources to be preloaded too late, for example, when there were `@font-face` declarations in inline `style` tags, resulting in Cumulative Layout Shift (CLS) issues. (See test [ada71429](https://github.com/felixicaza/astro-capo/blob/ada71429a83d5d128d463196eb7d2047b2ed67af/tests/fixtures/base/dist/index.html)).

## 📄 License

This project is licensed under the MIT License. See the [license file](LICENSE) for more details.
