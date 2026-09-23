import type { ElementNode } from 'ultrahtml'

import { ELEMENT_NODE, parse } from 'ultrahtml'

interface AstNode {
  type?: number
  name?: string
  children?: AstNode[]
  attributes?: Record<string, string>
}

function parseHead(element:string) {
  return `<head>${element}</head>`
}

function isElementNode(node: AstNode): node is ElementNode {
  return node.type === ELEMENT_NODE
}

export function parseElement(element: string): ElementNode {
  // SAFETY: ultrahtml types parse() as any, its root AST exposes
  // parsed child nodes through the `children` property
  const ast = parse(parseHead(element)) as { children: AstNode[] }

  const head = ast.children.find((node) => node.name === 'head')
  if (!head || !Array.isArray(head.children)) {
    throw new Error('No <head> found')
  }

  const child = head.children.find(isElementNode)
  if (!child) throw new Error('No element node found in <head>')

  // SAFETY: child was selected only after verifying that its type is ELEMENT_NODE
  return child as ElementNode
}
