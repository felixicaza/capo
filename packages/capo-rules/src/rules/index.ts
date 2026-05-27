import type { Classification, GroupIdValue, RuleEntry } from '../types/index.ts'

import { classifyFoundationTags } from './foundationTags.ts'
import { classifyIdentityTag } from './identityTag.ts'
import { classifyConnectionTags } from './connectionTags.ts'
import { classifyPreparationTags } from './preparationTags.ts'
import { classifyAsyncScriptTags } from './asyncScriptTags.ts'
import { classifyImportStyleTags } from './importStyleTags.ts'
import { classifyImportmapTags } from './importmapTags.ts'
import { classifyExecutionTags } from './executionTags.ts'
import { classifyStyleTags } from './styleTags.ts'
import { classifyDeferredTags } from './deferredTags.ts'
import { classifyPredictionTags } from './preditionTags.ts'

import { getElementText } from '../helpers/index.ts'
import { TAGS } from '../constants/tags.ts'
import { GroupId } from '../types/index.ts'

export const GroupsWeight: Record<GroupIdValue, number> = {
  FOUNDATION: 11,
  IDENTITY: 10,
  CONNECTION: 9,
  PREPARATION: 8,
  ASYNC_SCRIPT: 7,
  IMPORT_STYLES: 6,
  IMPORTMAP: 5,
  EXECUTION: 4,
  STYLING: 3,
  DEFERRED: 2,
  PREDICTION: 1,
  MISC: 0
}

export const classificationPipeline: RuleEntry[] = [
  {
    groupId: GroupId.FOUNDATION,
    classify: (element) => classifyFoundationTags(element.name, element.attributes)
  },
  {
    groupId: GroupId.IDENTITY,
    classify: (element) => classifyIdentityTag(element.name)
  },
  {
    groupId: GroupId.CONNECTION,
    classify: (element) => classifyConnectionTags(element.name, element.attributes)
  },
  {
    groupId: GroupId.PREPARATION,
    classify: (element) => classifyPreparationTags(element.name, element.attributes)
  },
  {
    groupId: GroupId.ASYNC_SCRIPT,
    classify: (element) => classifyAsyncScriptTags(element.name, element.attributes)
  },
  {
    groupId: GroupId.IMPORT_STYLES,
    classify: (element) => classifyImportStyleTags(element.name, element.attributes, element.name === TAGS.Style ? getElementText(element) : '')
  },
  {
    groupId: GroupId.IMPORTMAP,
    classify: (element) => classifyImportmapTags(element.name, element.attributes)
  },
  {
    groupId: GroupId.EXECUTION,
    classify: (element) => classifyExecutionTags(element.name, element.attributes)
  },
  {
    groupId: GroupId.STYLING,
    classify: (element) => classifyStyleTags(element.name, element.attributes)
  },
  {
    groupId: GroupId.DEFERRED,
    classify: (element) => classifyDeferredTags(element.name, element.attributes)
  },
  {
    groupId: GroupId.PREDICTION,
    classify: (element) => classifyPredictionTags(element.name, element.attributes)
  }
]

export function buildClassification(groupId: GroupIdValue, tagWeight: number): Classification {
  const groupWeight = GroupsWeight[groupId]
  const score = groupWeight * 100 + tagWeight

  return {
    groupId,
    groupWeight,
    tagWeight,
    score
  }
}
