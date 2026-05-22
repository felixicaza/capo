import type { Attributes } from '../types/index.ts'

import { hasSrc, hasType, isBooleanAttrPresent } from '../helpers/index.ts'

const DeferredWeight = {
  MODULE: 1,
  DEFER: 0
} as const

export function classifyDeferredTags(name: string, attributes: Attributes): number | undefined {
  if (name !== 'script') return undefined
  if (!hasSrc(attributes)) return undefined

  if (hasType(attributes, 'module') && !isBooleanAttrPresent(attributes, 'async')) return DeferredWeight.MODULE
  if (isBooleanAttrPresent(attributes, 'defer')) return DeferredWeight.DEFER

  return undefined
}
