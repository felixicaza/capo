import { TAGS } from '../constants/tags.ts'

const IdentityWeight = {
  TITLE: 0
} as const

export function classifyIdentityTag(name: string): number | undefined {
  if (name === TAGS.Title) return IdentityWeight.TITLE // <title>

  return undefined
}
