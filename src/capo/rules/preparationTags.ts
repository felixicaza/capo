import type { Attributes } from '../types/index.ts'

import { hasRel } from '../helpers/index.ts'
import { TAGS } from '../constants/tags.ts'
import { REL_KEYWORDS } from '../constants/keywords.ts'

const PreparationWeight = {
  PRELOAD: 1,
  MODULEPRELOAD: 0
} as const

export function classifyPreparationTags(name: string, attributes: Attributes): number | undefined {
  if (name !== TAGS.Link) return undefined
  if (hasRel(attributes, REL_KEYWORDS.Preload)) return PreparationWeight.PRELOAD // <link rel="preload">
  if (hasRel(attributes, REL_KEYWORDS.ModulePreload)) return PreparationWeight.MODULEPRELOAD // <link rel="modulepreload">

  return undefined
}
