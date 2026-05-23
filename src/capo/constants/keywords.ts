export const REL_KEYWORDS = {
  DnsPrefetch: 'dns-prefetch',
  ModulePreload: 'modulepreload',
  Preconnect: 'preconnect',
  Prefetch: 'prefetch',
  Preload: 'preload',
  Prerender: 'prerender',
  Stylesheet: 'stylesheet'
} as const

export const HTTP_EQUIV_KEYWORDS = {
  ContentSecurityPolicy: 'content-security-policy'
} as const

export const TYPE_KEYWORDS = {
  Module: 'module',
  Importmap: 'importmap',
  SpeculationRules: 'speculationrules'
} as const

export const NAME_KEYWORDS = {
  Viewport: 'viewport',
  Referrer: 'referrer'
} as const

export const BLOCKING_KEYWORD = {
  Render: 'render'
} as const
