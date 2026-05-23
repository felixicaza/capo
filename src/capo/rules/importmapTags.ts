import type { Attributes } from '../types/index.ts'

import { hasType } from '../helpers/index.ts'
import { TAGS } from '../constants/tags.ts'
import { TYPE_KEYWORDS } from '../constants/keywords.ts'

const ImportmapWeight = {
  IMPORTMAP: 0
} as const

export function classifyImportmapTags(name: string, attributes: Attributes): number | undefined {
  if (name !== TAGS.Script) return undefined
  if (hasType(attributes, TYPE_KEYWORDS.Importmap)) return ImportmapWeight.IMPORTMAP // <script type="importmap">

  return undefined
}
