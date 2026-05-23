import type { Attributes } from '../types/index.ts'

import { hasRel, hasType } from '../helpers/index.ts'
import { TAGS } from '../constants/tags.ts'
import { REL_KEYWORDS, TYPE_KEYWORDS } from '../constants/keywords.ts'

const PredictionWeight = {
  SPECULATIONRULES: 1,
  PREFETCH: 0
} as const

export function classifyPredictionTags(name: string, attributes: Attributes): number | undefined {
  if (name === TAGS.Script && hasType(attributes, TYPE_KEYWORDS.SpeculationRules)) return PredictionWeight.SPECULATIONRULES // <script type="speculationrules">
  if (name === TAGS.Link && hasRel(attributes, REL_KEYWORDS.Prefetch)) return PredictionWeight.PREFETCH // <link rel="prefetch">

  return undefined
}
