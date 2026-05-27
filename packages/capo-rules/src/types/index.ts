import type { ElementNode } from 'ultrahtml'

function enumObject<T extends string>(...values: T[]) {
  return Object.fromEntries(values.map((value) => [value, value])) as {
    readonly [K in T]: K
  }
}

export const GroupId = enumObject(
  'FOUNDATION',
  'IDENTITY',
  'CONNECTION',
  'PREPARATION',
  'ASYNC_SCRIPT',
  'IMPORT_STYLES',
  'IMPORTMAP',
  'EXECUTION',
  'STYLING',
  'DEFERRED',
  'PREDICTION',
  'MISC'
)

export type GroupIdValue = keyof typeof GroupId

export type Attributes = Record<string, string>

export interface Classification {
  groupId: GroupIdValue
  groupWeight: number
  tagWeight: number
  score: number
}

export interface RuleEntry {
  groupId: GroupIdValue
  classify: (element: ElementNode) => number | undefined
}

export interface RankedElement {
  index: number
  node: ElementNode
  groupWeight: number
  tagWeight: number
}
