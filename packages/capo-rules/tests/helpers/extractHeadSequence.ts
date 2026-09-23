type HtmlAttributes = Record<string, string>

const HEAD_REGEX = /<head[^>]*>([\s\S]*?)<\/head>/i
const TAG_REGEX = /<(meta|title|link|script|style|base)\b[^>]*>/gi
const ATTR_REGEX = /\b([a-zA-Z_:][-a-zA-Z0-9_:]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g

const BOOLEAN_ATTRS = ['async', 'defer', 'nomodule'] as const

function getAttributeValue(attr: RegExpMatchArray): string {
  const value = attr[3] ?? attr[4] ?? attr[5]
  return value?.trim() ?? ''
}

function extractAttributes(full: string) {
  const attrs: HtmlAttributes = {}

  for (const attr of full.matchAll(ATTR_REGEX)) {
    const key = attr[1].toLowerCase()
    const value = getAttributeValue(attr)

    attrs[key] = value
  }

  for (const booleanAttr of BOOLEAN_ATTRS) {
    if (new RegExp(`\\b${booleanAttr}\\b`, 'i').test(full)) {
      attrs[booleanAttr] ??= ''
    }
  }

  return attrs
}

function buildMetaParts(attrs: HtmlAttributes): string[] {
  const parts: string[] = []

  if (attrs.charset) parts.push(`charset=${attrs.charset}`)
  if (attrs.name) parts.push(`name=${attrs.name}`)
  if (attrs.property) parts.push(`property=${attrs.property}`)
  if (attrs['http-equiv']) {
    parts.push(`http-equiv=${attrs['http-equiv']}`)
  }

  return parts
}

function buildLinkParts(attrs: HtmlAttributes): string[] {
  const parts: string[] = []

  if (attrs.rel) parts.push(`rel=${attrs.rel}`)
  if (attrs.href) parts.push(`href=${attrs.href}`)
  if (attrs.as) parts.push(`as=${attrs.as}`)

  return parts
}

function buildScriptParts(attrs: HtmlAttributes): string[] {
  const parts: string[] = []

  if (attrs.type) parts.push(`type=${attrs.type}`)
  if (attrs.src) parts.push(`src=${attrs.src}`)
  if (attrs.blocking) parts.push(`blocking=${attrs.blocking}`)
  if ('async' in attrs) parts.push('async')
  if ('defer' in attrs) parts.push('defer')
  if ('nomodule' in attrs) parts.push('nomodule')

  return parts
}

function buildBaseParts(attrs: HtmlAttributes): string[] {
  const parts: string[] = []

  if (attrs.href) parts.push(`href=${attrs.href}`)

  return parts
}

function buildParts(name: string, attrs: HtmlAttributes) {
  switch (name) {
    case 'meta':
      return buildMetaParts(attrs)

    case 'link':
      return buildLinkParts(attrs)

    case 'script':
      return buildScriptParts(attrs)

    case 'base':
      return buildBaseParts(attrs)

    case 'title':
    case 'style':
    default:
      return []
  }
}

function serializeTag(tag: RegExpMatchArray): string {
  const full = tag[0]
  const name = tag[1].toLowerCase()
  const attrs = extractAttributes(full)
  const parts = buildParts(name, attrs)

  return parts.length ? `${name}[${parts.join(';')}]` : name
}

export function extractHeadSequence(html: string) {
  const match = html.match(HEAD_REGEX)
  const head = match?.[1] ?? ''

  const tags = [...head.matchAll(TAG_REGEX)]

  return tags.map(serializeTag)
}
