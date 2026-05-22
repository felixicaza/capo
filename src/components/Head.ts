import type { SSRResult } from 'astro'

import { renderAllHeadContent } from 'astro/runtime/server/render/head.js'
import { chunkToString } from 'astro/runtime/server/render/common.js'
import { createComponent, renderSlot, spreadAttributes, unescapeHTML } from 'astro/runtime/server/index.js'

import { capo } from '../capo/index.ts'

export const Head = createComponent({
  // @ts-expect-error using astro internals
  factory: async (result: SSRResult, props: Record<string, any>, slots: Record<string, any>) => {
    let head = ''
    head += `<head${spreadAttributes(props)} data-capo>`

    // Render slot chunks through Astro's chunk serializer so internal
    // render instructions (like view-transitions script injection) are preserved.
    const destination = {
      write(chunk: unknown) {
        if (chunk instanceof Response) return
        head += chunkToString(result, chunk as any)
      }
    }

    await renderSlot(result, slots.default).render(destination)

    // Keep Astro-managed head content (styles/links/scripts) in sync.
    head += chunkToString(result, renderAllHeadContent(result))
    head += '</head>'

    return unescapeHTML(capo(head))
  }
})
