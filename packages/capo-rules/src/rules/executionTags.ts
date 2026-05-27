import type { Attributes } from '../types/index.ts'

import { attrLower, hasBlockingRender, hasSrc, hasBooleanAttr } from '../helpers/index.ts'
import { TAGS } from '../constants/tags.ts'
import { TAGS_ATTRIBUTES } from '../constants/attributes.ts'
import { TYPE_KEYWORDS } from '../constants/keywords.ts'

const ExecutionWeight = {
  INLINE: 6,
  BLOCKING_RENDER_ASYNC: 5,
  BLOCKING_RENDER_TYPE_MODULE: 4,
  BLOCKING_RENDER_DEFER: 3,
  BLOCKING_RENDER: 2,
  SCRIPT: 1,
  NOMODULE: 0
} as const

export function classifyExecutionTags(name: string, attributes: Attributes): number | undefined {
  const src = hasSrc(attributes)
  const type = attrLower(attributes, TAGS_ATTRIBUTES.Type)
  const asyncAttr = hasBooleanAttr(attributes, TAGS_ATTRIBUTES.Async)
  const deferAttr = hasBooleanAttr(attributes, TAGS_ATTRIBUTES.Defer)
  const moduleType = type === TYPE_KEYWORDS.Module
  const nomodule = hasBooleanAttr(attributes, TAGS_ATTRIBUTES.Nomodule)
  const blockingRender = hasBlockingRender(attributes)

  if (name !== TAGS.Script) return undefined
  if (type.includes('json')) return undefined
  if (type === TYPE_KEYWORDS.Importmap || type === TYPE_KEYWORDS.SpeculationRules) return undefined

  if (!src) return ExecutionWeight.INLINE // inline <script>
  if (blockingRender && asyncAttr) return ExecutionWeight.BLOCKING_RENDER_ASYNC // <script blocking="render" async>
  if (blockingRender && moduleType) return ExecutionWeight.BLOCKING_RENDER_TYPE_MODULE // <script blocking="render" type="module">
  if (blockingRender && deferAttr) return ExecutionWeight.BLOCKING_RENDER_DEFER // <script blocking="render" defer>
  if (blockingRender) return ExecutionWeight.BLOCKING_RENDER // <script blocking="render">
  if (!asyncAttr && !deferAttr && !moduleType && !nomodule) return ExecutionWeight.SCRIPT // <script src>
  if (nomodule) return ExecutionWeight.NOMODULE // <script nomodule>

  return undefined
}
