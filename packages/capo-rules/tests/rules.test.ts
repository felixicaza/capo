import { describe, expect, test } from 'vitest'

import { parseElement } from './helpers/parseElement.ts'
import {
  isFoundationTags,
  isIdentityTag,
  isConnectionTags,
  isPredictionTags,
  isAsyncScriptTags,
  isImportStyleTags,
  isImportmapTags,
  isExecutionTags,
  isStyleTags,
  isDeferredTags,
  isPreparationTags,
  isMiscTags
} from './helpers/verifyTags.ts'

import { classifyFoundationTags } from '../packages/capo-rules/rules/foundationTags.ts'
import { classifyIdentityTag } from '../packages/capo-rules/rules/identityTag.ts'
import { classifyConnectionTags } from '../packages/capo-rules/rules/connectionTags.ts'
import { classifyPreparationTags } from '../packages/capo-rules/rules/preparationTags.ts'
import { classifyAsyncScriptTags } from '../packages/capo-rules/rules/asyncScriptTags.ts'
import { classifyImportStyleTags } from '../packages/capo-rules/rules/importStyleTags.ts'
import { classifyImportmapTags } from '../packages/capo-rules/rules/importmapTags.ts'
import { classifyExecutionTags } from '../packages/capo-rules/rules/executionTags.ts'
import { classifyStyleTags } from '../packages/capo-rules/rules/styleTags.ts'
import { classifyDeferredTags } from '../packages/capo-rules/rules/deferredTags.ts'
import { classifyPredictionTags } from '../packages/capo-rules/rules/preditionTags.ts'
import { classifyMiscTags } from '../packages/capo-rules/rules/miscTags.ts'

describe('groups tags detection', () => {
  test('detects foundation tags from rules', () => {
    const result = {
      metaCharset: {
        isFoundationTag: isFoundationTags('meta', { charset: 'utf-8' }),
        classification: classifyFoundationTags('meta', { charset: 'utf-8' }),
        miscClassification: classifyMiscTags(parseElement('<meta charset="utf-8">'))
      },
      metaViewport: {
        isFoundationTag: isFoundationTags('meta', { name: 'viewport', content: 'width=device-width' }),
        classification: classifyFoundationTags('meta', { name: 'viewport', content: 'width=device-width' }),
        miscClassification: classifyMiscTags(parseElement('<meta name="viewport" content="width=device-width">'))
      },
      metaCsp: {
        isFoundationTag: isFoundationTags('meta', { 'http-equiv': 'content-security-policy' }),
        classification: classifyFoundationTags('meta', { 'http-equiv': 'content-security-policy' }),
        miscClassification: classifyMiscTags(parseElement('<meta http-equiv="content-security-policy" content="default-src \'self\'">'))
      },
      base: {
        isFoundationTag: isFoundationTags('base', { href: '/' }),
        classification: classifyFoundationTags('base', { href: '/' }),
        miscClassification: classifyMiscTags(parseElement('<base href="/">'))
      },
      metaReferrer: {
        isFoundationTag: isFoundationTags('meta', { name: 'referrer' }),
        classification: classifyFoundationTags('meta', { name: 'referrer' }),
        miscClassification: classifyMiscTags(parseElement('<meta name="referrer">'))
      }
    }

    expect(result).toMatchSnapshot()
  })

  test('detect identity tag from rules', () => {
    const result = {
      title: {
        isIdentityTag: isIdentityTag('title'),
        classification: classifyIdentityTag('title'),
        miscClassification: classifyMiscTags(parseElement('<title>Page Title</title>'))
      }
    }

    expect(result).toMatchSnapshot()
  })

  test('detects connection tags from rules', () => {
    const result = {
      preconnect: {
        isConnectionTag: isConnectionTags('link', { rel: 'preconnect', href: 'https://cdn.example.com' }),
        classification: classifyConnectionTags('link', { rel: 'preconnect', href: 'https://cdn.example.com' }),
        miscClassification: classifyMiscTags(parseElement('<link rel="preconnect" href="https://cdn.example.com">'))
      },
      dnsPrefetch: {
        isConnectionTag: isConnectionTags('link', { rel: 'dns-prefetch', href: '//cdn.example.com' }),
        classification: classifyConnectionTags('link', { rel: 'dns-prefetch', href: '//cdn.example.com' }),
        miscClassification: classifyMiscTags(parseElement('<link rel="dns-prefetch" href="//cdn.example.com">'))
      }
    }

    expect(result).toMatchSnapshot()
  })

  test('detects preparation tags from rules', () => {
    const result = {
      preload: {
        isPreparationTag: isPreparationTags('link', { rel: 'preload', href: '/font.woff2', as: 'font' }),
        classification: classifyPreparationTags('link', { rel: 'preload', href: '/font.woff2', as: 'font' }),
        miscClassification: classifyMiscTags(parseElement('<link rel="preload" href="/font.woff2" as="font">'))
      },
      modulepreload: {
        isPreparationTag: isPreparationTags('link', { rel: 'modulepreload', href: '/entry.js' }),
        classification: classifyPreparationTags('link', { rel: 'modulepreload', href: '/entry.js' }),
        miscClassification: classifyMiscTags(parseElement('<link rel="modulepreload" href="/entry.js">'))
      }
    }

    expect(result).toMatchSnapshot()
  })

  test('detects async script tags from rules', () => {
    const result = {
      asyncTypeModule: {
        isAsyncScriptTag: isAsyncScriptTags('script', { src: '/a.js', type: 'module', async: '' }),
        classification: classifyAsyncScriptTags('script', { src: '/a.js', type: 'module', async: '' }),
        miscClassification: classifyMiscTags(parseElement('<script src="/a.js" type="module" async></script>'))
      },
      asyncScript: {
        isAsyncScriptTag: isAsyncScriptTags('script', { src: '/a.js', async: '' }),
        classification: classifyAsyncScriptTags('script', { src: '/a.js', async: '' }),
        miscClassification: classifyMiscTags(parseElement('<script src="/a.js" async></script>'))
      }
    }

    expect(result).toMatchSnapshot()
  })

  test('detects import style tags from rules', () => {
    const result = {
      importStyle: {
        isImportStyleTag: isImportStyleTags('style', {}, '@import url("/a.css");'),
        classification: classifyImportStyleTags('style', {}, '@import url("/a.css");'),
        miscClassification: classifyMiscTags(parseElement('<style>@import url("/a.css");</style>'))
      }
    }

    expect(result).toMatchSnapshot()
  })

  test('detects importmap tags from rules', () => {
    const result = {
      importmap: {
        isImportmapTag: isImportmapTags('script', { type: 'importmap' }),
        classification: classifyImportmapTags('script', { type: 'importmap' }),
        miscClassification: classifyMiscTags(parseElement('<script type="importmap">{}</script>'))
      }
    }

    expect(result).toMatchSnapshot()
  })

  test('detects execution tags from rules', () => {
    const result = {
      scriptInline: {
        isExecutionTag: isExecutionTags('script', {}),
        classification: classifyExecutionTags('script', {}),
        miscClassification: classifyMiscTags(parseElement('<script>console.log("Hello")</script>'))
      },
      scriptBlockingAsync: {
        isExecutionTag: isExecutionTags('script', { src: '/a.js', blocking: 'render', async: '' }),
        classification: classifyExecutionTags('script', { src: '/a.js', blocking: 'render', async: '' }),
        miscClassification: classifyMiscTags(parseElement('<script src="/a.js" blocking="render" async></script>'))
      },
      scriptBlockingDefer: {
        isExecutionTag: isExecutionTags('script', { src: '/a.js', blocking: 'render', defer: '' }),
        classification: classifyExecutionTags('script', { src: '/a.js', blocking: 'render', defer: '' }),
        miscClassification: classifyMiscTags(parseElement('<script src="/a.js" blocking="render" defer></script>'))
      },
      scriptBlockingModule: {
        isExecutionTag: isExecutionTags('script', { src: '/a.js', blocking: 'render', type: 'module' }),
        classification: classifyExecutionTags('script', { src: '/a.js', blocking: 'render', type: 'module' }),
        miscClassification: classifyMiscTags(parseElement('<script src="/a.js" blocking="render" type="module"></script>'))
      },
      scriptBlocking: {
        isExecutionTag: isExecutionTags('script', { src: '/a.js', blocking: 'render' }),
        classification: classifyExecutionTags('script', { src: '/a.js', blocking: 'render' }),
        miscClassification: classifyMiscTags(parseElement('<script src="/a.js" blocking="render"></script>'))
      },
      script: {
        isExecutionTag: isExecutionTags('script', { src: '/a.js' }),
        classification: classifyExecutionTags('script', { src: '/a.js' }),
        miscClassification: classifyMiscTags(parseElement('<script src="/a.js"></script>'))
      },
      scriptNomodule: {
        isExecutionTag: isExecutionTags('script', { src: '/legacy.js', nomodule: '' }),
        classification: classifyExecutionTags('script', { src: '/legacy.js', nomodule: '' }),
        miscClassification: classifyMiscTags(parseElement('<script src="/legacy.js" nomodule></script>'))
      }
    }

    expect(result).toMatchSnapshot()
  })

  test('detects style tags from rules', () => {
    const result = {
      style: {
        isStyleTag: isStyleTags('style', {}),
        classification: classifyStyleTags('style', {}),
        miscClassification: classifyMiscTags(parseElement('<style>.class { color: red; }</style>'))
      },
      linkStylesheet: {
        isStyleTag: isStyleTags('link', { rel: 'stylesheet', href: '/a.css' }),
        classification: classifyStyleTags('link', { rel: 'stylesheet', href: '/a.css' }),
        miscClassification: classifyMiscTags(parseElement('<link rel="stylesheet" href="/a.css">'))
      }
    }

    expect(result).toMatchSnapshot()
  })

  test('detects deferred tags from rules', () => {
    const result = {
      typeModule: {
        isDeferredTag: isDeferredTags('script', { src: '/m.js', type: 'module' }),
        classification: classifyDeferredTags('script', { src: '/m.js', type: 'module' }),
        miscClassification: classifyMiscTags(parseElement('<script src="/m.js" type="module"></script>'))
      },
      defer: {
        isDeferredTag: isDeferredTags('script', { src: '/d.js', defer: '' }),
        classification: classifyDeferredTags('script', { src: '/d.js', defer: '' }),
        miscClassification: classifyMiscTags(parseElement('<script src="/d.js" defer></script>'))
      }
    }

    expect(result).toMatchSnapshot()
  })

  test('detects prediction tags from rules', () => {
    const result = {
      prefetch: {
        isPredictionTag: isPredictionTags('link', { rel: 'prefetch', href: '/next.js' }),
        classification: classifyPredictionTags('link', { rel: 'prefetch', href: '/next.js' }),
        miscClassification: classifyMiscTags(parseElement('<link rel="prefetch" href="/next.js">'))
      },
      speculationRules: {
        isPredictionTag: isPredictionTags('script', { type: 'speculationrules' }),
        classification: classifyPredictionTags('script', { type: 'speculationrules' }),
        miscClassification: classifyMiscTags(parseElement('<script type="speculationrules">{}</script>'))
      }
    }

    expect(result).toMatchSnapshot()
  })

  test('does not classify unrelated tags', () => {
    const result = {
      metaDescription: {
        isFoundationTag: isFoundationTags('meta', { name: 'description' }),
        miscClassification: classifyMiscTags(parseElement('<meta name="description" content="x">'))
      },
      link: {
        isIdentityTag: isIdentityTag('link'),
        miscClassification: classifyMiscTags(parseElement('<link rel="stylesheet" href="/a.css">'))
      },
      linkOGImage: {
        isConnectionTag: isConnectionTags('link', { rel: 'og:image' }),
        miscClassification: classifyMiscTags(parseElement('<link rel="og:image" href="/image.jpg">'))
      },
      script: {
        isPreparationTag: isPreparationTags('script', {}),
        miscClassification: classifyMiscTags(parseElement('<script>console.log("Hello")</script>'))
      },
      metaViewport: {
        isAsyncScriptTag: isAsyncScriptTags('meta', { name: 'viewport' }),
        miscClassification: classifyMiscTags(parseElement('<meta name="viewport" content="width=device-width">'))
      },
      scriptSchema: {
        isImportStyleTag: isImportStyleTags('script', { type: 'application/ld+json' }, ''),
        miscClassification: classifyMiscTags(parseElement('<script type="application/ld+json">{}</script>'))
      },
      metaCharset: {
        isImportmapTag: isImportmapTags('meta', { charset: 'utf-8' }),
        miscClassification: classifyMiscTags(parseElement('<meta charset="utf-8">'))
      },
      scriptJson: {
        isExecutionTag: isExecutionTags('script', { type: 'application/json' }),
        miscClassification: classifyMiscTags(parseElement('<script type="application/json">{}</script>'))
      },
      scriptAsync: {
        isStyleTag: isStyleTags('script', { src: '/a.js', async: '' }),
        miscClassification: classifyMiscTags(parseElement('<script src="/a.js" async></script>'))
      },
      linkStylesheet: {
        isDeferredTag: isDeferredTags('link', { rel: 'stylesheet', href: '/a.css' }),
        miscClassification: classifyMiscTags(parseElement('<link rel="stylesheet" href="/a.css">'))
      },
      prerenderLink: {
        isPredictionTag: isPredictionTags('link', { rel: 'prerender', href: '/x' }),
        miscClassification: classifyMiscTags(parseElement('<link rel="prerender" href="/x">'))
      },
      metaOGDecription: {
        isMiscTag: isMiscTags(parseElement('<meta property="og:description" content="x">')),
        miscClassification: classifyMiscTags(parseElement('<meta property="og:description" content="x">'))
      }
    }

    expect(result).toMatchSnapshot()
  })
})

describe('priority behavior', () => {
  test('async beats defer beats prefetch by group weight', () => {
    const asyncResult = classifyMiscTags(parseElement('<script src="/a.js" async></script>'))
    const deferResult = classifyMiscTags(parseElement('<script src="/a.js" defer></script>'))
    const prefetchResult = classifyMiscTags(parseElement('<link rel="prefetch" href="/x.js">'))

    expect({
      asyncGroupWeight: asyncResult.groupWeight,
      deferGroupWeight: deferResult.groupWeight,
      prefetchGroupWeight: prefetchResult.groupWeight,
      asyncBeatsDefer: asyncResult.groupWeight > deferResult.groupWeight,
      deferBeatsPrefetch: deferResult.groupWeight > prefetchResult.groupWeight
    }).toMatchSnapshot()
  })

  test('charset beats viewport inside Foundation Group by tag weight', () => {
    const charset = classifyMiscTags(parseElement('<meta charset="utf-8">'))
    const viewport = classifyMiscTags(parseElement('<meta name="viewport">'))

    expect({
      charset: {
        groupId: charset.groupId,
        tagWeight: charset.tagWeight
      },
      viewport: {
        groupId: viewport.groupId,
        tagWeight: viewport.tagWeight
      },
      charsetBeatsViewport: charset.tagWeight > viewport.tagWeight
    }).toMatchSnapshot()
  })

  test('multiple rel tokens are supported', () => {
    const result = classifyMiscTags(parseElement('<link rel="preconnect dns-prefetch" href="https://cdn.example.com">'))

    expect({
      groupId: result.groupId,
      tagWeight: result.tagWeight,
      groupWeight: result.groupWeight,
      score: result.score
    }).toMatchSnapshot()
  })
})
