import type { Attributes } from '../types/index.ts'

import { hasSrc, isBooleanAttrPresent } from '../helpers/index.ts'

const AsyncScriptWeight = {
  ASYNC_SCRIPT: 0
} as const

export function classifyAsyncScriptTags(name: string, attributes: Attributes): number | undefined {
  if (name !== 'script') return undefined
  if (!hasSrc(attributes)) return undefined
  return isBooleanAttrPresent(attributes, 'async') ? AsyncScriptWeight.ASYNC_SCRIPT : undefined
}
