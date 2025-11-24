import { parse, type ElementNode } from 'ultrahtml'

import { getWeight } from '../../src/capo/rules'

interface CapoNode {
  name?: string
  children?: CapoNode[]
  attributes?: Record<string, string | undefined>
}

interface AstRoot {
  children: CapoNode[]
}

export function weightOf(fragment: string) {
  const ast = parse(`<head>${fragment}</head>`) as AstRoot
  const head = ast.children.find(
    (node): node is CapoNode & { name: string, children: CapoNode[] } =>
      node.name === 'head' && Array.isArray(node.children)
  )
  if (!head) throw new Error('No <head> found')
  const el = head.children[0]
  return getWeight(el as ElementNode)
}
