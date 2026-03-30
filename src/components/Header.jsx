import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { X, Phone, MessageCircle } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { WHATSAPP_URL } from '../constants/socialLinks'
import './Header.css'

const NAV_KEYS = [
  { pathKey: 'home', labelKey: 'nav.home' },
  { pathKey: 'about', labelKey: 'nav.about' },
  { pathKey: 'services', labelKey: 'nav.services' },
  { pathKey: 'team', labelKey: 'nav.team' },
  { pathKey: 'contact', labelKey: 'nav.contact' },
]

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { t, path, toggleLang, lang } = useLanguage()

  const handleScroll = () => {
    setScrolled(window.scrollY > 20)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (mobileOpen) {
      root.classList.add('mobile-drawer-open')
      document.body.classList.add('mobile-drawer-open')
    } else {
      root.classList.remove('mobile-drawer-open')
      document.body.classList.remove('mobile-drawer-open')
    }
    return () => {
      root.classList.remove('mobile-drawer-open')
      document.body.classList.remove('mobile-drawer-open')
    }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  const isActive = useCallback(
    (pathKey) => {
      const p = path(pathKey)
      if (pathKey === 'about') {
        return location.pathname === p || location.pathname === '/عملائنا' || location.pathname === '/clients'
      }
      return location.pathname === p
    },
    [location.pathname, path]
  )

  const closeMenu = () => setMobileOpen(false)

  const mobileDrawer =
    mobileOpen &&
    typeof document !== 'undefined' &&
    createPortal(
      <div className="mobile-drawer" role="presentation">
        <button
          type="button"
          className="mobile-drawer__overlay"
          onClick={closeMenu}
          aria-label={t('header.closeMenu')}
        />
        <aside
          className="mobile-drawer__panel"
          id="site-navigation"
          role="dialog"
          aria-modal="true"
          aria-label={t('header.drawerNavLabel')}
        >
          <div className="mobile-drawer__header">
            <Link to="/" className="mobile-drawer__logo" onClick={closeMenu}>
              <img
                src="/logohamra-removebg-preview.png"
                alt={t('brand.name')}
                className="mobile-drawer__logo-img"
              />
            </Link>
            <button
              type="button"
              className="mobile-drawer__close"
              onClick={closeMenu}
              aria-label={t('header.closeMenu')}
            >
              <X size={20} strokeWidth={2.25} aria-hidden="true" />
            </button>
          </div>

          <div className="mobile-drawer__body">
            <nav className="mobile-drawer__nav">
              <ul className="mobile-drawer__list">
                {NAV_KEYS.map(({ pathKey, labelKey }) => (
                  <li key={pathKey} className="mobile-drawer__item">
                    <Link
                      to={path(pathKey)}
                      className={`mobile-drawer__link ${isActive(pathKey) ? 'mobile-drawer__link--active' : ''}`}
                      onClick={closeMenu}
                    >
                      {t(labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mobile-drawer__cta">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--lg mobile-drawer__cta-btn"
              onClick={closeMenu}
            >
              {t('header.requestInspection')}
            </a>
          </div>

          <div className="mobile-drawer__footer">
            <button
              type="button"
              className="mobile-drawer__footer-lang"
              onClick={() => {
                toggleLang()
                closeMenu()
              }}
              aria-label={lang === 'ar' ? 'Switch to English' : 'Switch to Arabic'}
            >
              <span className="mobile-drawer__footer-lang-label">
                {lang === 'ar' ? 'English' : 'العربية'}
              </span>
              <span className="mobile-drawer__footer-lang-badge">{lang === 'ar' ? 'EN' : 'AR'}</span>
            </button>
            <div className="mobile-drawer__footer-actions">
              <a href="tel:+96524915426" className="mobile-drawer__footer-link" onClick={closeMenu}>
                <Phone size={18} strokeWidth={2} aria-hidden="true" />
                <span>{t('header.drawerCall')}</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-drawer__footer-link mobile-drawer__footer-link--wa"
                onClick={closeMenu}
              >
                <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
                <span>{t('header.drawerWhatsAppShort')}</span>
              </a>
            </div>
          </div>
        </aside>
      </div>,
      document.body
    )

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__inner container">
          <Link to="/" className="header__logo" onClick={closeMenu}>
            <img
              src="/logohamra-removebg-preview.png"
              alt={t('brand.name')}
              className="header__logo-img"
            />
          </Link>

          <nav className="header__nav-desktop" aria-label={t('header.drawerNavLabel')}>
            <ul className="header__nav-list">
              {NAV_KEYS.map(({ pathKey, labelKey }) => (
                <li key={pathKey} className="header__nav-item">
                  <Link
                    to={path(pathKey)}
                    className={`header__nav-link ${isActive(pathKey) ? 'header__nav-link--active' : ''}`}
                  >
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <button
              type="button"
              className="header__lang-toggle"
              onClick={toggleLang}
              aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              title={lang === 'ar' ? 'English' : 'العربية'}
            >
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="header__cta btn btn--primary"
            >
              {t('header.requestInspection')}
            </a>
          </div>

          <button
            type="button"
            className="header__toggle"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="site-navigation"
            aria-label={t('header.menuAria')}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      {mobileDrawer}
    </>
  )
}

export default Header
