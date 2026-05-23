import type { Attributes } from '../types/index.ts'

import { hasSrc, hasType, hasBooleanAttr } from '../helpers/index.ts'
import { TAGS } from '../constants/tags.ts'
import { TAGS_ATTRIBUTES } from '../constants/attributes.ts'
import { TYPE_KEYWORDS } from '../constants/keywords.ts'

const AsyncScriptWeight = {
  TYPE_MODULE_ASYNC: 1,
  ASYNC: 0
} as const

export function classifyAsyncScriptTags(name: string, attributes: Attributes): number | undefined {
  if (name !== TAGS.Script) return undefined
  if (!hasSrc(attributes)) return undefined
  if (hasType(attributes, TYPE_KEYWORDS.Module) && hasBooleanAttr(attributes, TAGS_ATTRIBUTES.Async)) return AsyncScriptWeight.TYPE_MODULE_ASYNC // <script type="module" async>
  if (hasBooleanAttr(attributes, TAGS_ATTRIBUTES.Async)) return AsyncScriptWeight.ASYNC // <script async>

  return undefined
}
