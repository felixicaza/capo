export function extractHeadSequence(html: string) {
  const match = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)
  const inner = match ? match[1] : ''
  const tags = Array.from(inner.matchAll(/<(meta|title|link|script|style|base)\b[^>]*>/gi))

  return tags.map((tag) => {
    const full = tag[0]
    const name = tag[1].toLowerCase()

    const attrPairs = Array.from(
      full.matchAll(/\b([a-zA-Z_:][-a-zA-Z0-9_:]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g)
    )
    const attrs: Record<string, string> = {}

    for (const a of attrPairs) {
      const key = a[1].toLowerCase()
      const val = (a[3] || a[4] || a[5] || '').trim()
      attrs[key] = val
    }

    // boolean attributes (async, defer)
    for (const b of ['async', 'defer']) {
      if (new RegExp(`\\b${b}\\b`, 'i').test(full) && !(b in attrs)) {
        attrs[b] = ''
      }
    }

    const parts: string[] = []

    switch (name) {
      case 'meta':
        if (attrs.charset) parts.push('charset')
        if (attrs.name) parts.push(`name=${attrs.name}`)
        if (attrs.property) parts.push(`property=${attrs.property}`)
        if (attrs['http-equiv']) parts.push(`http-equiv=${attrs['http-equiv']}`)
        break
      case 'link':
        if (attrs.rel) parts.push(`rel=${attrs.rel}`)
        if (attrs.as) parts.push(`as=${attrs.as}`)
        break
      case 'script':
        if (attrs.type) parts.push(`type=${attrs.type}`)
        if ('async' in attrs) parts.push('async')
        if ('defer' in attrs) parts.push('defer')
        break
      case 'base':
        if (attrs.href) parts.push('href')
        break
      case 'title':
      case 'style':
        break
    }

    return parts.length ? `${name}[${parts.join(';')}]` : name
  })
}
