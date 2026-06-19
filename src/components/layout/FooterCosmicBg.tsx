export function FooterCosmicBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="footer-cosmic-nebula absolute inset-0" />
      <div className="footer-cosmic-stars absolute inset-0" />
      <div className="footer-cosmic-glow absolute inset-x-0 top-0 h-40" />
      <div className="footer-cosmic-line absolute inset-x-0 top-0 h-px" />
      <div className="footer-cosmic-orbit absolute -right-16 -bottom-16 size-64 opacity-40 sm:-right-8 sm:size-80" />
    </div>
  )
}
