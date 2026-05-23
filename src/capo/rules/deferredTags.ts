import type { Attributes } from '../types/index.ts'

import { hasSrc, hasType, hasBooleanAttr } from '../helpers/index.ts'
import { TAGS } from '../constants/tags.ts'
import { TAGS_ATTRIBUTES } from '../constants/attributes.ts'
import { TYPE_KEYWORDS } from '../constants/keywords.ts'

const DeferredWeight = {
  TYPE_MODULE: 1,
  DEFER: 0
} as const

export function classifyDeferredTags(name: string, attributes: Attributes): number | undefined {
  if (name !== TAGS.Script) return undefined
  if (!hasSrc(attributes)) return undefined
  if (hasType(attributes, TYPE_KEYWORDS.Module) && !hasBooleanAttr(attributes, TAGS_ATTRIBUTES.Async)) return DeferredWeight.TYPE_MODULE // <script type="module">
  if (hasBooleanAttr(attributes, TAGS_ATTRIBUTES.Defer)) return DeferredWeight.DEFER // <script defer>

  return undefined
}
