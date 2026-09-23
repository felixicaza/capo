import type { SSRResult } from 'astro'

import { renderAllHeadContent } from 'astro/runtime/server/render/head.js'
import { chunkToString } from 'astro/runtime/server/render/common.js'
import { createComponent, renderSlot, spreadAttributes, unescapeHTML } from 'astro/runtime/server/index.js'

import { capo } from 'capo-rules'

type RenderChunk = Parameters<typeof chunkToString>[1]

export const Head = createComponent({
  // @ts-expect-error using astro internals
  // Astro's internal createComponent factory is typed with Record<string, any>
  // This is an intentional compatibility boundary with Astro's private SSR API
  // oxlint-disable-next-line anti-slop/no-unsafe-dictionary-type
  factory: async(result: SSRResult, props: Record<string, any>, slots: Record<string, any>) => {
    let head = ''
    head += `<head${spreadAttributes(props)} data-capo>`

    // Render slot chunks through Astro's chunk serializer so internal
    // render instructions (like view-transitions script injection) are preserved
    const destination = {
      write(chunk: RenderChunk) {
        if (chunk instanceof Response) return
        head += chunkToString(result, chunk)
      }
    }

    await renderSlot(result, slots.default).render(destination)

    // Keep Astro-managed head content (styles/links/scripts) in sync
    head += chunkToString(result, renderAllHeadContent(result))
    head += '</head>'

    const sortedHead = capo(head)
    console.info(' [astro-capo] Head tags sorted!')
    return unescapeHTML(sortedHead)
  }
})
