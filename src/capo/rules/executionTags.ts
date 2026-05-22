import type { Attributes } from '../types/index.ts'

import { attrLower, hasBlockingRender, hasSrc, isBooleanAttrPresent } from '../helpers/index.ts'

const ExecutionWeight = {
  BLOCKING_RENDER: 6,
  BLOCKING_RENDER_ASYNC: 5,
  BLOCKING_RENDER_MODULE: 4,
  BLOCKING_RENDER_DEFER: 3,
  BLOCKING_RENDER_ATTR: 2,
  SYNC_MODULE: 1,
  NOMODULE: 0
} as const

export function classifyExecutionTags(name: string, attributes: Attributes): number | undefined {
  if (name !== 'script') return undefined

  const type = attrLower(attributes, 'type')
  if (type.includes('json')) return undefined
  if (type === 'importmap' || type === 'speculationrules') return undefined

  const src = hasSrc(attributes)
  const asyncAttr = isBooleanAttrPresent(attributes, 'async')
  const deferAttr = isBooleanAttrPresent(attributes, 'defer')
  const moduleType = type === 'module'
  const nomodule = isBooleanAttrPresent(attributes, 'nomodule')
  const blockingRender = hasBlockingRender(attributes)

  if (!src) return ExecutionWeight.BLOCKING_RENDER
  if (blockingRender && asyncAttr) return ExecutionWeight.BLOCKING_RENDER_ASYNC
  if (blockingRender && deferAttr) return ExecutionWeight.BLOCKING_RENDER_DEFER
  if (blockingRender && moduleType) return ExecutionWeight.BLOCKING_RENDER_MODULE
  if (blockingRender) return ExecutionWeight.BLOCKING_RENDER_ATTR
  if (nomodule) return ExecutionWeight.NOMODULE
  if (!asyncAttr && !deferAttr && !moduleType) return ExecutionWeight.SYNC_MODULE

  return undefined
}
