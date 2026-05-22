import type { Attributes } from '../types/index.ts'

import { hasType } from '../helpers/index.ts'

const ImportmapWeight = {
  IMPORTMAP: 0
} as const

export function classifyImportmapTags(name: string, attributes: Attributes): number | undefined {
  if (name !== 'script') return undefined
  return hasType(attributes, 'importmap') ? ImportmapWeight.IMPORTMAP : undefined
}
