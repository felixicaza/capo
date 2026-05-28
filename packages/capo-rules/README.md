[![capo-rules](https://raw.githubusercontent.com/felixicaza/capo/HEAD/.github/assets/capo-rules.jpg)](https://npmx.dev/package/capo-rules)

# 🔷 capo-rules

[![npm version](https://img.shields.io/npm/v/capo-rules?color=027bfd&logo=npm&logoColor=888888&labelColor=ffffff)](https://npmx.dev/package/capo-rules)
![GitHub actions workflow tests status](https://img.shields.io/github/actions/workflow/status/felixicaza/capo/tests.yml?color=027bfd&logo=rocket&logoColor=888888&label=tests&labelColor=ffffff)
[![license](https://img.shields.io/badge/license-Apache%202.0-027bfd?logo=googledocs&logoColor=888888&labelColor=ffffff)](https://github.com/felixicaza/capo/blob/main/packages/capo-rules/LICENSE)

The most accurate and modern `<head>` sorting!

> [!WARNING]
> The API is still under development, the goal is to make the library agnostic as possible so that it can be integrated into any framework or build tool.

## ✨ Features
- 🧩 Comprehensive, accurate, and modern tag detection and sorting rules, adapted from [Rick Viscomi][Rick Viscomi]'s wonderful `capo.js` library.
- ⚡ Apply group priority and internal priority by tag type within each group.
- 🔒 Stable ordering for equal-priority tags, preserving original relative order when weights are tied.

## 📦 Installation
You can install [`capo-rules`][package] using npm:

```sh
$ npm install capo-rules
```

<details>
  <summary>Using a different package manager?</summary>
  <br/>

  Using pnpm:
  ```sh
  $ pnpm add capo-rules
  ```

  Using yarn:
  ```sh
  $ yarn add capo-rules
  ```

  Using bun:
  ```sh
  $ bun add capo-rules
  ```
</details>

## ⚡ Usage

[`capo-rules`][package] currently exposes a single function:

```ts
import { capo } from 'capo-rules'

const html = `
<!doctype html>
<html lang="en">
  <head>
    <meta name="description" content="A page">
    <script src="/defer.js" defer></script>
    <meta charset="utf-8">
    <title>My page</title>
    <link rel="preconnect" href="https://cdn.example.com">
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>
`

const sorted = capo(html)

console.log(sorted)
```

> [!NOTE]
> Only `<head>` element tags are reordered; non-element nodes keep their positions, content outside head is preserved, and tags with the same priority keep their original order.

## ⚙️ How it works?
[`capo-rules`][package] sorts head tags in three stages:

<details>
  <summary>1. Classify each element into a semantic group.</summary>
  <br/>
  Groups are evaluated through a classifier pipeline, so each tag is assigned to the first matching group:
  <ul>
    <li>Foundation</li>
    <li>Identity</li>
    <li>Connection</li>
    <li>Preparation</li>
    <li>Async Script</li>
    <li>Import Styles</li>
    <li>Importmap</li>
    <li>Execution</li>
    <li>Styling</li>
    <li>Deferred</li>
    <li>Prediction</li>
    <li>Misc</li>
  </ul>
</details>
<details>
  <summary>2. Compute priority score.</summary>
  <br/>
  Each tag gets:
  <ul>
    <li>A group priority (higher-priority groups go first).</li>
    <li>A tag priority inside that group (more critical tag variants go first).</li>
  </ul>
</details>
<details>
  <summary>3. Rebuild head with stable sorting.</summary>
  <br/>
  Element tags are reordered by group priority, then by internal tag priority, and finally by original position to keep deterministic output. Non-element nodes are kept in place, and content outside head is not affected.
</details>

See [issue #1](https://github.com/felixicaza/capo/issues/1) for more details.

## 🏆 Credits
Many thanks to [Rick Viscomi][Rick Viscomi] for creating [`capo.js`][capo.js].

## 📚 Related Projects
[`@felixicaza/astro-capo`](https://npmx.dev/package/@felixicaza/astro-capo): The most accurate and modern `<head>` sorting in Astro.

## 🤝 Contributing
Contributions to this library are welcome! If you have any ideas for improvements or new features, please feel free to open an issue or submit a pull request. I appreciate your help in making [`capo-rules`][package] better for everyone. Please read the [CONTRIBUTING.md](https://github.com/felixicaza/capo/blob/main/CONTRIBUTING.md).

## 📄 License
This project is licensed under the Apache-2.0 License. See the [LICENSE](https://github.com/felixicaza/capo/blob/main/packages/capo-rules/LICENSE) file for details.

[package]: https://npmx.dev/package/capo-rules
[Rick Viscomi]: https://bsky.app/profile/rviscomi.dev
[capo.js]: https://rviscomi.github.io/capo.js
