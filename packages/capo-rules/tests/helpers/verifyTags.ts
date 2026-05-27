import type { ElementNode } from 'ultrahtml'
import type { Attributes } from '../../src/types/index.ts'

import { classifyFoundationTags } from '../../src/rules/foundationTags.ts'
import { classifyIdentityTag } from '../../src/rules/identityTag.ts'
import { classifyConnectionTags } from '../../src/rules/connectionTags.ts'
import { classifyPreparationTags } from '../../src/rules/preparationTags.ts'
import { classifyAsyncScriptTags } from '../../src/rules/asyncScriptTags.ts'
import { classifyImportStyleTags } from '../../src/rules/importStyleTags.ts'
import { classifyImportmapTags } from '../../src/rules/importmapTags.ts'
import { classifyExecutionTags } from '../../src/rules/executionTags.ts'
import { classifyStyleTags } from '../../src/rules/styleTags.ts'
import { classifyDeferredTags } from '../../src/rules/deferredTags.ts'
import { classifyPredictionTags } from '../../src/rules/preditionTags.ts'
import { classifyMiscTags } from '../../src/rules/miscTags.ts'

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
