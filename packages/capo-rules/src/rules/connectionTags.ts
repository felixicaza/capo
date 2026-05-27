import type { Attributes } from '../types/index.ts'

import { hasRel } from '../helpers/index.ts'
import { TAGS } from '../constants/tags.ts'
import { REL_KEYWORDS } from '../constants/keywords.ts'

const ConnectionWeight = {
  PRECONNECT: 1,
  DNS_PREFETCH: 0
} as const

export function classifyConnectionTags(name: string, attributes: Attributes): number | undefined {
  if (name !== TAGS.Link) return undefined
  if (hasRel(attributes, REL_KEYWORDS.Preconnect)) return ConnectionWeight.PRECONNECT // <link rel="preconnect">
  if (hasRel(attributes, REL_KEYWORDS.DnsPrefetch)) return ConnectionWeight.DNS_PREFETCH // <link rel="dns-prefetch">

  return undefined
}
