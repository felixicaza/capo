[![@felixicaza/astro-capo](https://raw.githubusercontent.com/felixicaza/capo/HEAD/.github/assets/astro-capo.jpg)](https://npmx.dev/package/@felixicaza/astro-capo)

# 🔷🚀 @felixicaza/astro-capo

[![npm version](https://img.shields.io/npm/v/@felixicaza/astro-capo?color=027bfd&logo=npm&logoColor=888888&labelColor=ffffff)](https://npmx.dev/package/@felixicaza/astro-capo)
![GitHub actions workflow tests status](https://img.shields.io/github/actions/workflow/status/felixicaza/capo/tests.yml?color=027bfd&logo=rocket&logoColor=888888&label=tests&labelColor=ffffff)
[![license](https://img.shields.io/badge/license-MIT-027bfd?logo=googledocs&logoColor=888888&labelColor=ffffff)](https://github.com/felixicaza/capo/blob/main/packages/astro-capo/LICENSE)

The most accurate and modern `<head>` sorting in Astro!

Forked from [natemoo-re/astro-capo][natemoo-re/astro-capo].

##### Changes made in this fork:
- 🖥️ Changed package name to [`@felixicaza/astro-capo`][package] to publish under my npm scope.
- 🧩 Make tag detection and sorting more comprehensive and accurate. (See [issue #1](https://github.com/felixicaza/capo/issues/1))
- ⚠️ Updated order of `preload` tags to be higher priority and avoid CLS issues (see [why? section](#-why)).
- 🧪 Added unit and fixtures tests.

_Now rules related changes are in [`capo-rules`][capo-rules]._

---

Get your `<head>` in order automatically!

`@felixicaza/astro-capo` is a component that automatically optimizes the order of elements in your `<head>` tag, adapted from [Rick Viscomi][Rick Viscomi]'s wonderful `capo.js` library.

Unlike [`capo.js`][capo.js], which makes it easy to debug the optimal order in the browser, `@felixicaza/astro-capo` automatically optimizes your `<head>` tag on the server while rendering your page.

## 📦 Installation
You can install [`@felixicaza/astro-capo`][package] using npm:

```sh
$ npm install @felixicaza/astro-capo
```

<details>
  <summary>Using a different package manager?</summary>
  <br/>

  Using pnpm:
  ```sh
  $ pnpm add @felixicaza/astro-capo
  ```

  Using yarn:
  ```sh
  $ yarn add @felixicaza/astro-capo
  ```

  Using bun:
  ```sh
  $ bun add @felixicaza/astro-capo
  ```
</details>

## 🚀 Usage
Replace your regular `<head>` element with this custom `<Head>` component. That's it!

```astro
---
import { Head } from '@felixicaza/astro-capo'
---

<!DOCTYPE html>
<html lang="en">
  <Head>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <meta name="viewport" content="width=device-width" />
    <meta charset="utf-8" />
    <title>@felixicaza/astro-capo</title>
  </Head>
  <body>
    <h1>@felixicaza/astro-capo</h1>
  </body>
</html>
```

## 💡 Why?
The previous order placed the `preload` tags very low, which caused some resources to be preloaded too late, for example, when there were `@font-face` declarations in inline `style` tags, resulting in Cumulative Layout Shift (CLS) issues. (See commit test [`ada71429`](https://github.com/felixicaza/capo/blob/ada71429a83d5d128d463196eb7d2047b2ed67af/tests/fixtures/base/dist/index.html) and `capo.js` [issue #113](https://github.com/rviscomi/capo.js/issues/113)).

_Now rules related changes are in [`capo-rules`][capo-rules]._

> [!NOTE]
> This change is opinionated and actually is under investigation. If you have any insights on this, please share them in the [issues tab](https://github.com/felixicaza/capo/issues).

## 🏆 Credits
Many thanks to [Nate Moore][Nate Moore] for creating the first version of [`astro-capo`][natemoo-re/astro-capo] and to [Rick Viscomi][Rick Viscomi] for creating [`capo.js`][capo.js].

## 📚 Related Projects
[`capo-rules`](https://npmx.dev/package/capo-rules): The most accurate and modern `<head>` sorting.

## 🤝 Contributing
Contributions to this library are welcome! If you have any ideas for improvements or new features, please feel free to open an issue or submit a pull request. I appreciate your help in making [`@felixicaza/astro-capo`][package] better for everyone. Please read the [CONTRIBUTING.md](https://github.com/felixicaza/capo/blob/main/CONTRIBUTING.md).

## 📄 License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/felixicaza/capo/blob/main/packages/astro-capo/LICENSE) file for details.

[package]: https://npmx.dev/package/@felixicaza/astro-capo
[Nate Moore]: https://bsky.app/profile/natemoo.re
[natemoo-re/astro-capo]: https://github.com/natemoo-re/astro-capo
[Rick Viscomi]: https://bsky.app/profile/rviscomi.dev
[capo.js]: https://rviscomi.github.io/capo.js
[capo-rules]: https://github.com/felixicaza/capo/tree/main/packages/capo-rules
