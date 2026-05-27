import type { ElementNode } from 'ultrahtml'
import type { Attributes } from '../../packages/capo-rules/types/index.ts'

import { classifyFoundationTags } from '../../packages/capo-rules/rules/foundationTags.ts'
import { classifyIdentityTag } from '../../packages/capo-rules/rules/identityTag.ts'
import { classifyConnectionTags } from '../../packages/capo-rules/rules/connectionTags.ts'
import { classifyPreparationTags } from '../../packages/capo-rules/rules/preparationTags.ts'
import { classifyAsyncScriptTags } from '../../packages/capo-rules/rules/asyncScriptTags.ts'
import { classifyImportStyleTags } from '../../packages/capo-rules/rules/importStyleTags.ts'
import { classifyImportmapTags } from '../../packages/capo-rules/rules/importmapTags.ts'
import { classifyExecutionTags } from '../../packages/capo-rules/rules/executionTags.ts'
import { classifyStyleTags } from '../../packages/capo-rules/rules/styleTags.ts'
import { classifyDeferredTags } from '../../packages/capo-rules/rules/deferredTags.ts'
import { classifyPredictionTags } from '../../packages/capo-rules/rules/preditionTags.ts'
import { classifyMiscTags } from '../../packages/capo-rules/rules/miscTags.ts'

export function isFoundationTags(name: string, attributes: Attributes): boolean {
  return classifyFoundationTags(name, attributes) !== undefined
}

export function isIdentityTag(name: string): boolean {
  return classifyIdentityTag(name) !== undefined
}

export function isConnectionTags(name: string, attributes: Attributes): boolean {
  return classifyConnectionTags(name, attributes) !== undefined
}

export function isPreparationTags(name: string, attributes: Attributes): boolean {
  return classifyPreparationTags(name, attributes) !== undefined
}

export function isAsyncScriptTags(name: string, attributes: Attributes): boolean {
  return classifyAsyncScriptTags(name, attributes) !== undefined
}

export function isImportStyleTags(name: string, attributes: Attributes, children: string): boolean {
  return classifyImportStyleTags(name, attributes, children) !== undefined
}

export function isImportmapTags(name: string, attributes: Attributes): boolean {
  return classifyImportmapTags(name, attributes) !== undefined
}

export function isExecutionTags(name: string, attributes: Attributes): boolean {
  return classifyExecutionTags(name, attributes) !== undefined
}

export function isStyleTags(name: string, attributes: Attributes): boolean {
  return classifyStyleTags(name, attributes) !== undefined
}

export function isDeferredTags(name: string, attributes: Attributes): boolean {
  return classifyDeferredTags(name, attributes) !== undefined
}

export function isPredictionTags(name: string, attributes: Attributes): boolean {
  return classifyPredictionTags(name, attributes) !== undefined
}

export function isMiscTags(element: ElementNode): boolean {
  return classifyMiscTags(element).groupId === 'MISC'
}
