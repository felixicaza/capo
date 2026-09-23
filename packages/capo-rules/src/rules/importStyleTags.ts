import type { Attributes } from '../types/index.ts'

import { TAGS } from '../constants/tags.ts'

const ImportStyleWeight = {
  IMPORT_STYLES: 0
} as const

const IMPORT_AT_RULE_REGEX = /@import/i

export function classifyImportStyleTags(name: string, _attributes: Attributes, children: string): number | undefined {
  if (name !== TAGS.Style) return undefined
  if (IMPORT_AT_RULE_REGEX.test(children)) return ImportStyleWeight.IMPORT_STYLES // <style>@import</style>

  return undefined
}
