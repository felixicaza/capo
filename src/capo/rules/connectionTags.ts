import type { Attributes } from '../types/index.ts'

import { hasRel } from '../helpers/index.ts'

const ConnectionWeight = {
  PRECONNECT: 1,
  DNS_PREFETCH: 0
}

export function classifyConnectionTags(name: string, attributes: Attributes): number | undefined {
  if (name !== 'link') return undefined
  if (hasRel(attributes, 'preconnect')) return ConnectionWeight.PRECONNECT
  if (hasRel(attributes, 'dns-prefetch')) return ConnectionWeight.DNS_PREFETCH
  return undefined
}
