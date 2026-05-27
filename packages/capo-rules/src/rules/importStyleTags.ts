import type { Attributes } from '../types/index.ts'

import { TAGS } from '../constants/tags.ts'

const ImportStyleWeight = {
  IMPORT_STYLES: 0
} as const

export function classifyImportStyleTags(name: string, _attributes: Attributes, children: string): number | undefined {
  if (name !== TAGS.Style) return undefined
  if (/@import/i.test(children)) return ImportStyleWeight.IMPORT_STYLES // <style>@import</style>

  return undefined
}
