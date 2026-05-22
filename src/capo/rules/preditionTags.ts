import type { Attributes } from '../types/index.ts'

import { hasRel, hasType } from '../helpers/index.ts'

const PredictionWeight = {
  SPECULATIONRULES: 1,
  PREFETCH: 0
} as const

export function classifyPredictionTags(name: string, attributes: Attributes): number | undefined {
  if (name === 'script' && hasType(attributes, 'speculationrules')) return PredictionWeight.SPECULATIONRULES
  if (name === 'link' && hasRel(attributes, 'prefetch')) return PredictionWeight.PREFETCH

  return undefined
}
