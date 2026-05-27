import type { ElementNode } from 'ultrahtml'
import type { Attributes } from '../types/index.ts'

import { TAGS_ATTRIBUTES } from '../constants/attributes.ts'
import { BLOCKING_KEYWORD } from '../constants/keywords.ts'

export function attrLower(attributes: Attributes, key: string): string {
  return (attributes[key] ?? '').toLowerCase()
}

export function hasAttr(attributes: Attributes, key: string): boolean {
  return Object.hasOwn(attributes, key)
}

export function hasRel(attributes: Attributes, expectedToken: string): boolean {
  const rel = attrLower(attributes, TAGS_ATTRIBUTES.Rel)
  if (!rel) return false

  const tokens = rel.split(/\s+/).filter(Boolean)
  return tokens.includes(expectedToken)
}

export function hasType(attributes: Attributes, expected: string): boolean {
  return attrLower(attributes, TAGS_ATTRIBUTES.Type) === expected
}

export function hasSrc(attributes: Attributes): boolean {
  return hasAttr(attributes, TAGS_ATTRIBUTES.Src) && (attributes.src ?? '') !== ''
}

export function hasBlockingRender(attributes: Attributes): boolean {
  return attrLower(attributes, TAGS_ATTRIBUTES.Blocking) === BLOCKING_KEYWORD.Render
}

export function hasBooleanAttr(attributes: Attributes, key: string): boolean {
  return hasAttr(attributes, key)
}

export function getElementText(element: ElementNode): string {
  let text = ''

  for (const child of element.children) {
    const childValue = (child as { value?: unknown }).value
    if (typeof childValue === 'string') {
      text += childValue
    }
  }

  return text
}
