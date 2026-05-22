import type { Attributes } from '../types/index.ts'

import { hasRel } from '../helpers/index.ts'

const StylesWeight = {
  STYLE: 1,
  LINK: 0
} as const

export function classifyStyleTags(name: string, attributes: Attributes): number | undefined {
  if (name === 'style') return StylesWeight.STYLE
  if (name === 'link' && hasRel(attributes, 'stylesheet')) return StylesWeight.LINK
  return undefined
}
