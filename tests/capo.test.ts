import { describe, expect, test } from 'vitest'

import { capo } from '../src/capo'
import { extractHeadSequence } from './helpers/extractHeadSequence.ts'

describe('Capo ordering', () => {
  test('preserves outside head content', () => {
    const html = '<html><head><title>A</title></head><body><div id="outer"></div></body></html>'
    const out = capo(html)

    expect({
      hasOuterDiv: out.includes('<div id="outer"></div>'),
      output: out
    }).toMatchSnapshot()
  })

  test('preserves non-element nodes inside head while sorting elements', () => {
    const html = '<html><head>\n<!-- marker -->\n<title>A</title>\n<meta charset="utf-8">\n</head><body></body></html>'
    const out = capo(html)

    expect({
      hasMarkerComment: out.includes('<!-- marker -->'),
      sequence: extractHeadSequence(out),
      output: out
    }).toMatchSnapshot()
  })

  test('orders mixed head according to rules groups and tags weights', () => {
    const html = [
      '<html><head>',
      '<meta name="description" content="A">',
      '<script src="/defer.js" defer></script>',
      '<link rel="modulepreload" href="/m.js">',
      '<link rel="dns-prefetch" href="//cdn.example.com">',
      '<meta property="og:image" content="image.png">',
      '<script type="speculationrules">{"prefetch":[{"urls":["a.html"]}]}</script>',
      '<style>body{}</style>',
      '<script src="/sync.js" blocking="render"></script>',
      '<script type="importmap">{"imports":{}}</script>',
      '<link rel="stylesheet" href="/style.css">',
      '<title>Site</title>',
      '<meta name="referrer" content="no-referrer">',
      '<script src="/async.js" async></script>',
      '<link rel="icon" type="image/x-icon" href="/images/favicon.ico">',
      '<meta name="viewport" content="width=device-width, initial-scale=1">',
      '<script src="/module.js" type="module"></script>',
      '<style>@import url("/a.css");</style>',
      '<link rel="preload" href="/font.woff2" as="font">',
      '<link rel="prefetch" href="/x.js">',
      '<meta charset="utf-8">',
      '<base href="https://example.com/">',
      '<link rel="preconnect" href="https://cdn.example.com">',
      '<meta property="og:title" content="a">',
      '<script src="/test.js" type="module" async></script>',
      '</head><body></body></html>'
    ].join('')

    const sorted = capo(html)

    expect({
      sequence: extractHeadSequence(sorted),
      output: sorted
    }).toMatchSnapshot()
  })

  test('orders sync scripts by tags weight including blocking and nomodule', () => {
    const html = [
      '<html><head>',
      '<script src="/legacy.js" nomodule></script>',
      '<script src="/a.js"></script>',
      '<script src="/a.js" blocking="render"></script>',
      '<script src="/a.js" blocking="render" type="module"></script>',
      '<script src="/a.js" blocking="render" defer></script>',
      '<script src="/a.js" blocking="render" async></script>',
      '</head><body></body></html>'
    ].join('')

    const sorted = capo(html)

    expect({
      sequence: extractHeadSequence(sorted),
      output: sorted
    }).toMatchSnapshot()
  })
})
