import { describe, test, expect } from 'vitest'

import { weightOf } from './helpers/weightOf'
import { weightName } from './helpers/weightName'

describe('Basic individual element classification tests', () => {
  test('meta charset', () => {
    expect(weightName(weightOf('<meta charset="utf-8">'))).toMatchSnapshot()
  })
  test('meta viewport', () => {
    expect(weightName(weightOf('<meta name="viewport">'))).toMatchSnapshot()
  })

  test('base', () => {
    expect(weightName(weightOf('<base href="/">'))).toMatchSnapshot()
  })

  test('title', () => {
    expect(weightName(weightOf('<title>a</title>'))).toMatchSnapshot()
  })

  test('script', () => {
    expect(weightName(weightOf('<script src="/a.js"></script>'))).toMatchSnapshot()
  })
  test('inline script', () => {
    expect(weightName(weightOf('<script>console.log(\'Hi!\')</script>'))).toMatchSnapshot()
  })
  test('defer script', () => {
    expect(weightName(weightOf('<script src="/a.js" defer></script>'))).toMatchSnapshot()
  })
  test('script module', () => {
    expect(weightName(weightOf('<script src="/a.js" type="module"></script>'))).toMatchSnapshot()
  })
  test('async script', () => {
    expect(weightName(weightOf('<script src="/a.js" async></script>'))).toMatchSnapshot()
  })

  test('stylesheet', () => {
    expect(weightName(weightOf('<link rel="stylesheet" href="a.css">'))).toMatchSnapshot()
  })
  test('inline styles', () => {
    expect(weightName(weightOf('<style>div{color:dodgerblue;}</style>'))).toMatchSnapshot()
  })
  test('style @import', () => {
    expect(weightName(weightOf('<style>@import url(a.css);</style>'))).toMatchSnapshot()
  })

  test('preconnect', () => {
    expect(weightName(weightOf('<link rel="preconnect" href="https://x">'))).toMatchSnapshot()
  })
  test('preload', () => {
    expect(weightName(weightOf('<link rel="preload" href="a.css">'))).toMatchSnapshot()
  })
  test('prefetch', () => {
    expect(weightName(weightOf('<link rel="prefetch" href="a.js">'))).toMatchSnapshot()
  })

  test('favicon', () => {
    expect(weightName(weightOf('<link rel="icon" href="a.ico">'))).toMatchSnapshot()
  })

  test('open graph', () => {
    expect(weightName(weightOf('<meta property="og:title" content="x">'))).toMatchSnapshot()
  })

  test('content security policy', () => {
    expect(weightName(weightOf('<meta http-equiv="content-security-policy" content="default-src \'self\'">'))).toMatchSnapshot()
  })

  test('rich snippet json', () => {
    expect(weightName(weightOf('<script type="application/ld+json">{"@context":"https://schema.org"}</script>'))).toMatchSnapshot()
  })
})

describe('Element classification - additional cases', () => {
  test('prerender', () => {
    expect(weightName(weightOf('<link rel="prerender" href="/next">'))).toMatchSnapshot()
  })
  test('modulepreload', () => {
    expect(weightName(weightOf('<link rel="modulepreload" href="/m.js">'))).toMatchSnapshot()
  })
  test('script application/json', () => {
    expect(weightName(weightOf('<script type="application/json">{"a":1}</script>'))).toMatchSnapshot()
  })
  test('async + defer', () => {
    expect(weightName(weightOf('<script src="/a.js" async defer></script>'))).toMatchSnapshot()
  })
  test('script nomodule', () => {
    expect(weightName(weightOf('<script src="/legacy.js" nomodule></script>'))).toMatchSnapshot()
  })
  test('preconnect crossorigin', () => {
    expect(weightName(weightOf('<link rel="preconnect" href="https://cdn" crossorigin>'))).toMatchSnapshot()
  })
  test('preload font', () => {
    expect(weightName(weightOf('<link rel="preload" href="/font.woff2" as="font" type="font/woff2" crossorigin>'))).toMatchSnapshot()
  })
  test('script importmap', () => {
    expect(weightName(weightOf('<script type="importmap">{"imports":{}}</script>'))).toMatchSnapshot()
  })
  test('script speculation rules', () => {
    expect(weightName(weightOf('<script type="speculationrules">{"prefetch":[{"urls":["a.html"]}]}</script>'))).toMatchSnapshot()
  })
})

describe('Bulk classification', () => {
  test('list of elements and their weights', () => {
    const elements = [
      '<meta charset="utf-8">',
      '<meta name="viewport">',
      '<base href="/">',
      '<title>X</title>',
      '<link rel="preconnect" href="https://x">',
      '<link rel="stylesheet" href="a.css">',
      '<link rel="modulepreload" href="/m.js">',
      '<link rel="preload" href="/font.woff2" as="font">',
      '<link rel="prefetch" href="/x.js">',
      '<style>@import url(a.css);</style>',
      '<style>body{}</style>',
      '<script src="/a.js" async></script>',
      '<script src="/a.js" defer></script>',
      '<script src="/a.js"></script>',
      '<script src="/a.js" type="module"></script>',
      '<script type="application/json">{"a":1}</script>',
      '<script>console.log(1)</script>',
      '<script src="/legacy.js" nomodule></script>',
      '<link rel="icon" href="/favicon.ico">'
    ]
    const result = elements.map((element) => ({ element, weight: weightName(weightOf(element)) }))
    expect(result).toMatchSnapshot()
  })
})
