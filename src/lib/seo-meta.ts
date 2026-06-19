const MANAGED_ATTR = 'data-seo-managed'

function getManagedSelector(attr: string, key: string) {
  return `meta[${attr}="${key}"][${MANAGED_ATTR}]`
}

export function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  const selector = getManagedSelector(attr, key)
  const fallbackSelector = `meta[${attr}="${key}"]:not([${MANAGED_ATTR}])`

  let element =
    document.head.querySelector<HTMLMetaElement>(selector) ??
    document.head.querySelector<HTMLMetaElement>(fallbackSelector)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }

  element.setAttribute(MANAGED_ATTR, '')
  element.setAttribute('content', content)
}

export function setMetaTags(attr: 'name' | 'property', key: string, contents: string[]) {
  const selector = `meta[${attr}="${key}"][${MANAGED_ATTR}]`
  document.head.querySelectorAll(selector).forEach((element) => element.remove())

  for (const content of contents) {
    const element = document.createElement('meta')
    element.setAttribute(attr, key)
    element.setAttribute('content', content)
    element.setAttribute(MANAGED_ATTR, '')
    document.head.appendChild(element)
  }
}

export function setLinkTag(rel: string, href: string, extra: Record<string, string> = {}) {
  const hreflang = extra.hreflang
  const managedSelector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"][${MANAGED_ATTR}]`
    : `link[rel="${rel}"][${MANAGED_ATTR}]`
  const fallbackSelector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`

  let element =
    document.head.querySelector<HTMLLinkElement>(managedSelector) ??
    document.head.querySelector<HTMLLinkElement>(fallbackSelector)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    element.setAttribute(MANAGED_ATTR, '')

    if (hreflang) {
      element.setAttribute('hreflang', hreflang)
    }

    document.head.appendChild(element)
  } else {
    element.setAttribute(MANAGED_ATTR, '')
  }

  element.setAttribute('href', href)

  for (const [name, value] of Object.entries(extra)) {
    if (name !== 'hreflang') {
      element.setAttribute(name, value)
    }
  }
}

export function setJsonLdScript(id: string, data: unknown) {
  const scriptId = `seo-jsonld-${id}`
  let element = document.head.querySelector<HTMLScriptElement>(`script#${scriptId}`)

  if (!element) {
    element = document.createElement('script')
    element.id = scriptId
    element.type = 'application/ld+json'
    element.setAttribute(MANAGED_ATTR, '')
    document.head.appendChild(element)
  }

  element.textContent = JSON.stringify(data)
}
