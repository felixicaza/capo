import type { Attributes } from '../types/index.ts'

import { hasRel } from '../helpers/index.ts'

const PreparationWeight = {
  PRELOAD: 1,
  MODULEPRELOAD: 0
} as const

export function classifyPreparationTags(name: string, attributes: Attributes): number | undefined {
  if (name !== 'link') return undefined
  if (hasRel(attributes, 'preload')) return PreparationWeight.PRELOAD
  if (hasRel(attributes, 'modulepreload')) return PreparationWeight.MODULEPRELOAD
  return undefined
}
