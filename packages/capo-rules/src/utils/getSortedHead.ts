import type { ElementNode } from 'ultrahtml'
import type { RankedElement } from '../types/index.ts'

import { ELEMENT_NODE } from 'ultrahtml'
import { classifyMiscTags } from '../rules/miscTags.ts'

export function getSortedHead(head: ElementNode): ElementNode {
  const rankedElements: RankedElement[] = []

  for (let index = 0; index < head.children.length; index += 1) {
    const node = head.children[index]
    if (node.type !== ELEMENT_NODE) continue

    const { groupWeight, tagWeight } = classifyMiscTags(node)
    rankedElements.push({
      index,
      node,
      groupWeight,
      tagWeight
    })
  }

  rankedElements.sort((a, b) => {
    if (a.groupWeight !== b.groupWeight) {
      return b.groupWeight - a.groupWeight
    }
    if (a.tagWeight !== b.tagWeight) {
      return b.tagWeight - a.tagWeight
    }
    return a.index - b.index
  })

  const sortedOnlyElements = rankedElements.map((item) => item.node)
  let cursor = 0

  const mergedChildren = head.children.map((node) => {
    if (node.type !== ELEMENT_NODE) return node
    const nextElement = sortedOnlyElements[cursor]
    cursor += 1
    return nextElement
  })
  const children = mergedChildren

  return {
    ...head,
    children
  }
}
