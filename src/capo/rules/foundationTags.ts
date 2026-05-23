import type { Attributes } from '../types/index.ts'

import { attrLower, hasAttr } from '../helpers/index.ts'
import { TAGS } from '../constants/tags.ts'
import { TAGS_ATTRIBUTES } from '../constants/attributes.ts'
import { HTTP_EQUIV_KEYWORDS, NAME_KEYWORDS } from '../constants/keywords.ts'

const FoundationWeight = {
  CHARSET: 4,
  VIEWPORT: 3,
  CSP: 2,
  BASE: 1,
  REFERRER: 0
} as const

export function classifyFoundationTags(name: string, attributes: Attributes): number | undefined {
  const metaName = attrLower(attributes, TAGS_ATTRIBUTES.Name)
  const httpEquiv = attrLower(attributes, TAGS_ATTRIBUTES.HttpEquiv)

  if (name === TAGS.Base) return FoundationWeight.BASE // <base>
  if (name !== TAGS.Meta) return undefined
  if (hasAttr(attributes, TAGS_ATTRIBUTES.Charset)) return FoundationWeight.CHARSET // <meta charset="utf-8">
  if (metaName === NAME_KEYWORDS.Viewport) return FoundationWeight.VIEWPORT // <meta name="viewport">
  if (metaName === NAME_KEYWORDS.Referrer) return FoundationWeight.REFERRER // <meta name="referrer">
  if (httpEquiv === HTTP_EQUIV_KEYWORDS.ContentSecurityPolicy) return FoundationWeight.CSP // <meta http-equiv="Content-Security-Policy">

  return undefined
}
