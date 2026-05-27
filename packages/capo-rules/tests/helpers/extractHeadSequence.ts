export function extractHeadSequence(html: string) {
  const match = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)
  const childs = match ? match[1] : ''
  const tags = Array.from(childs.matchAll(/<(meta|title|link|script|style|base)\b[^>]*>/gi))

  // oxlint-disable complexity/complexity
  return tags.map((tag) => {
    const full = tag[0]
    const name = tag[1].toLowerCase()

    const attrPairs = Array.from(
      full.matchAll(/\b([a-zA-Z_:][-a-zA-Z0-9_:]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g)
    )
    const attrs: Record<string, string> = {}

    for (const attr of attrPairs) {
      const key = attr[1].toLowerCase()
      const value = (attr[3] || attr[4] || attr[5] || '').trim()
      attrs[key] = value
    }

    for (const booleanAttr of ['async', 'defer', 'nomodule']) {
      if (new RegExp(`\\b${booleanAttr}\\b`, 'i').test(full) && !(booleanAttr in attrs)) {
        attrs[booleanAttr] = ''
      }
    }

    const parts: string[] = []

    switch (name) {
      case 'meta':
        if (attrs.charset) parts.push(`charset=${attrs.charset}`)
        if (attrs.name) parts.push(`name=${attrs.name}`)
        if (attrs.property) parts.push(`property=${attrs.property}`)
        if (attrs['http-equiv']) parts.push(`http-equiv=${attrs['http-equiv']}`)
        break

      case 'link':
        if (attrs.rel) parts.push(`rel=${attrs.rel}`)
        if (attrs.href) parts.push(`href=${attrs.href}`)
        if (attrs.as) parts.push(`as=${attrs.as}`)
        break

      case 'script':
        if (attrs.type) parts.push(`type=${attrs.type}`)
        if (attrs.src) parts.push(`src=${attrs.src}`)
        if (attrs.blocking) parts.push(`blocking=${attrs.blocking}`)
        if ('async' in attrs) parts.push('async')
        if ('defer' in attrs) parts.push('defer')
        if ('nomodule' in attrs) parts.push('nomodule')
        break

      case 'base':
        if (attrs.href) parts.push(`href=${attrs.href}`)
        break

      case 'title':
      case 'style':
        break
    }

    return parts.length ? `${name}[${parts.join(';')}]` : name
  })
}
