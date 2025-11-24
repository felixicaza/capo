import { describe, test, expect } from 'vitest'

import { extractHeadSequence } from './helpers/extractHeadSequence.ts'

import capo from '../src/capo'

describe('Capo ordering', () => {
  test('preserves outside head content', () => {
    const html = '<html><head><title>A</title></head><body><div id="outer"></div></body></html>'
    const out = capo(html)
    expect(out.includes('<div id="outer"></div>')).toBe(true)
    expect(out).toMatchSnapshot()
  })

  test('ordered head', () => {
    const html = `
      <html><head>
        <title>A</title>
        <meta charset="utf-8">
        <style>div{display:flex;}</style>
        <script src="/a.js" async></script>
        <meta name="description" content="A">
        <base href="https://example.com/">
      </head><body><div id="x"></div></body></html>
    `
    const out = capo(html)
    expect(out).toMatchSnapshot()
  })

  test('complex head ordering tokens', () => {
    const original = `
      <html><head>
        <script src="/sync.js"></script>
        <link rel="prefetch" href="/x.js">
        <meta name="viewport" content="width=device-width">
        <title>Site</title>
        <link rel="preconnect" href="https://ex.com">
        <link rel="stylesheet" href="/style.css">
        <script src="/async.js" async></script>
        <style>@import url('a.css'); body{}</style>
        <script src="/module.js" type="module"></script>
        <link rel="preload" href="/font.woff2" as="font">
        <script src="/defer.js" defer></script>
        <meta charset="utf-8">
        <base href="https://example.com/">
      </head><body></body></html>
    `
    const sorted = capo(original)
    expect(extractHeadSequence(sorted)).toMatchSnapshot()
  })
})
