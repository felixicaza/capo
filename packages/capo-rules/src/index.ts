import { ELEMENT_NODE, parse, renderSync, walkSync } from 'ultrahtml'
import { getSortedHead } from './utils/getSortedHead.ts'
import { TAGS } from './constants/tags.ts'

const DONE_ERROR = '__CAPO_DONE__'

export function capo(html: string): string {
  const ast = parse(html)

  try {
    walkSync(ast, (node, parent, index) => {
      if (node.type !== ELEMENT_NODE || node.name !== TAGS.Head) return
      if (!parent) return

      parent.children.splice(index, 1, getSortedHead(node))
      throw new Error(DONE_ERROR)
    })
  } catch(error) {
    if (!(error instanceof Error) || error.message !== DONE_ERROR) {
      throw error
    }
  }

  return renderSync(ast)
}
