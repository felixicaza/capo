import type { Attributes } from '../types/index.ts'

const ImportStyleWeight = {
  IMPORT_STYLES: 0
} as const

export function classifyImportStyleTags(name: string, _attributes: Attributes, children: string): number | undefined {
  if (name !== 'style') return undefined
  return /@import/i.test(children) ? ImportStyleWeight.IMPORT_STYLES : undefined
}
