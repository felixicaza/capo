import type { Attributes } from '../types/index.ts'

import { attrLower, hasAttr } from '../helpers/index.ts'

const FoundationWeight = {
  META_CHARSET: 4,
  META_VIEWPORT: 3,
  META_CSP: 2,
  BASE: 1,
  META_REFERRER: 0
} as const

export function classifyFoundationTags(name: string, attributes: Attributes): number | undefined {
  if (name === 'base') return FoundationWeight.BASE
  if (name !== 'meta') return undefined

  if (hasAttr(attributes, 'charset')) return FoundationWeight.META_CHARSET

  const metaName = attrLower(attributes, 'name')
  if (metaName === 'viewport') return FoundationWeight.META_VIEWPORT
  if (metaName === 'referrer') return FoundationWeight.META_REFERRER

  const httpEquiv = attrLower(attributes, 'http-equiv')
  if (httpEquiv === 'content-security-policy') return FoundationWeight.META_CSP

  return undefined
}
