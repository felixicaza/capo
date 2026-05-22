import type { ElementNode } from 'ultrahtml'
import type { Classification } from '../types/index.ts'

import { GroupId } from '../types/index.ts'
import { classificationPipeline, buildClassification } from './index.ts'

const MiscTagsWeight = {
  MISC: 0
} as const

export function classifyMiscTags(element: ElementNode): Classification {
  for (const rule of classificationPipeline) {
    const tagWeight = rule.classify(element)
    if (tagWeight !== undefined) {
      return buildClassification(rule.groupId, tagWeight)
    }
  }

  return buildClassification(GroupId.MISC, MiscTagsWeight.MISC)
}
