/** Calls `fn` once, the first time `el` is at least `threshold` visible. Returns a cleanup. */
export function onceInView(el: Element, fn: () => void, threshold = 0.6) {
  if (!('IntersectionObserver' in window)) return () => {}
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      io.disconnect()
      fn()
    }
  }, { threshold })
  io.observe(el)
  return () => io.disconnect()
}
