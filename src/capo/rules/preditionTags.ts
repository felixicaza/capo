import type { Attributes } from '../types/index.ts'

import { hasRel, hasType } from '../helpers/index.ts'

const PredictionWeight = {
  PREFETCH: 1,
  SPECULATIONRULES: 0
} as const

export function classifyPredictionTags(name: string, attributes: Attributes): number | undefined {
  if (name === 'link' && hasRel(attributes, 'prefetch')) return PredictionWeight.PREFETCH
  if (name === 'script' && hasType(attributes, 'speculationrules')) return PredictionWeight.SPECULATIONRULES

  return undefined
}
