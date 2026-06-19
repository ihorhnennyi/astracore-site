export const NAV_ITEMS = [
  { id: 'home', href: '#home' },
  { id: 'services', href: '#services' },
  { id: 'about', href: '#about' },
  { id: 'contact', href: '#contact' },
] as const

export type NavItemId = (typeof NAV_ITEMS)[number]['id']
