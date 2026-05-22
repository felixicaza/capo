const IdentityWeight = {
  TITLE: 0
}

export function classifyIdentityTag(name: string): number | undefined {
  return name === 'title' ? IdentityWeight.TITLE : undefined
}
