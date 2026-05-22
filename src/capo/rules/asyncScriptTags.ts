import type { Attributes } from '../types/index.ts'

import { hasSrc, hasType, isBooleanAttrPresent } from '../helpers/index.ts'

const AsyncScriptWeight = {
  TYPE_MODULE_ASYNC: 1,
  SCRIPT_ASYNC: 0
} as const

export function classifyAsyncScriptTags(name: string, attributes: Attributes): number | undefined {
  if (name !== 'script') return undefined
  if (!hasSrc(attributes)) return undefined
  if (hasType(attributes, 'module') && isBooleanAttrPresent(attributes, 'async')) return AsyncScriptWeight.TYPE_MODULE_ASYNC
  return isBooleanAttrPresent(attributes, 'async') ? AsyncScriptWeight.SCRIPT_ASYNC : undefined
}
