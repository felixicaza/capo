import type { ElementNode } from 'ultrahtml'

import { ELEMENT_NODE, parse } from 'ultrahtml'

interface AstNode {
  type?: number
  name?: string
  children?: AstNode[]
  attributes?: Record<string, string>
}

export function parseElement(element: string): ElementNode {
  const ast = parse(`<head>${element}</head>`) as { children: AstNode[] }

  const head = ast.children.find((node) => node.name === 'head')
  if (!head || !Array.isArray(head.children)) {
    throw new Error('No <head> found')
  }

  const child = head.children.find((node) => node.type === ELEMENT_NODE)
  if (!child) {
    throw new Error('No element node found in <head>')
  }

  return child as ElementNode
}
