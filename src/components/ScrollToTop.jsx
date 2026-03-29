import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls the window to the correct position on every route change.
 * - No hash: scroll to top (fixes mobile nav / SPA leaving scroll mid-page).
 * - With hash (e.g. /about-us#partners): scroll to element id after navigation.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !window.history) return
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useLayoutEffect(() => {
    if (hash) {
      const id = hash.replace(/^#/, '')
      if (id) {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' })
          return
        }
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname, hash])

  return null
}
