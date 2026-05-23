import type { Attributes } from '../types/index.ts'

import { hasRel } from '../helpers/index.ts'
import { TAGS } from '../constants/tags.ts'
import { REL_KEYWORDS } from '../constants/keywords.ts'

const StylesWeight = {
  STYLE: 1,
  LINK: 0
} as const

export function classifyStyleTags(name: string, attributes: Attributes): number | undefined {
  if (name === TAGS.Style) return StylesWeight.STYLE // inline <style>
  if (name === TAGS.Link && hasRel(attributes, REL_KEYWORDS.Stylesheet)) return StylesWeight.LINK // <link rel="stylesheet">

  return undefined
}
