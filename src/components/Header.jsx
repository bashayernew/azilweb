import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X, Phone, MessageCircle } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
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
    const prev = document.body.style.overflow
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isActive = (pathKey) => {
    const p = path(pathKey)
    if (pathKey === 'about') {
      return location.pathname === p || location.pathname === '/عملائنا' || location.pathname === '/clients'
    }
    return location.pathname === p
  }

  const closeMenu = () => setMobileOpen(false)

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      {mobileOpen ? (
        <button
          type="button"
          className="header__backdrop"
          onClick={closeMenu}
          aria-label={t('header.closeMenu')}
        />
      ) : null}

      <div className="header__inner container">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          <img
            src="/logohamra-removebg-preview.png"
            alt={t('brand.name')}
            className="header__logo-img"
          />
        </Link>

        <nav
          className={`header__nav ${mobileOpen ? 'header__nav--open' : ''}`}
          id="site-navigation"
          aria-label={t('header.drawerNavLabel')}
        >
          {/* Mobile drawer: top bar + label (hidden on desktop via CSS) */}
          <div className="header__drawer-chrome">
            <div className="header__drawer-top">
              <Link to="/" className="header__drawer-logo" onClick={closeMenu}>
                <img
                  src="/logohamra-removebg-preview.png"
                  alt=""
                  className="header__drawer-logo-img"
                />
              </Link>
              <button
                type="button"
                className="header__drawer-close"
                onClick={closeMenu}
                aria-label={t('header.closeMenu')}
              >
                <X size={22} strokeWidth={2.25} aria-hidden="true" />
              </button>
            </div>
            <p className="header__drawer-overline">{t('header.drawerNavLabel')}</p>
          </div>

          <ul className="header__nav-list">
            {NAV_KEYS.map(({ pathKey, labelKey }) => (
              <li key={pathKey} className="header__nav-item">
                <Link
                  to={path(pathKey)}
                  className={`header__nav-link ${isActive(pathKey) ? 'header__nav-link--active' : ''}`}
                  onClick={closeMenu}
                >
                  {t(labelKey)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="header__drawer-cta">
            <a
              href="https://wa.link/cszcj8"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--lg header__drawer-primary-cta"
              onClick={closeMenu}
            >
              {t('header.requestInspection')}
            </a>
          </div>

          <div className="header__drawer-footer">
            <button
              type="button"
              className="header__drawer-footer-lang"
              onClick={() => {
                toggleLang()
                closeMenu()
              }}
              aria-label={lang === 'ar' ? 'Switch to English' : 'Switch to Arabic'}
            >
              <span className="header__drawer-footer-lang-label">
                {lang === 'ar' ? 'English' : 'العربية'}
              </span>
              <span className="header__drawer-footer-lang-badge">{lang === 'ar' ? 'EN' : 'AR'}</span>
            </button>
            <a href="tel:+96524915426" className="header__drawer-footer-link" onClick={closeMenu}>
              <Phone size={18} strokeWidth={2} aria-hidden="true" />
              <span>{t('header.drawerCall')}</span>
            </a>
            <a
              href="https://wa.link/cszcj8"
              target="_blank"
              rel="noopener noreferrer"
              className="header__drawer-footer-link header__drawer-footer-link--wa"
              onClick={closeMenu}
            >
              <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
              <span>{t('header.drawerWhatsAppShort')}</span>
            </a>
          </div>
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
            href="https://wa.link/cszcj8"
            target="_blank"
            rel="noopener noreferrer"
            className="header__cta btn btn--primary"
          >
            {t('header.requestInspection')}
          </a>
        </div>

        <button
          type="button"
          className={`header__toggle ${mobileOpen ? 'header__toggle--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
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
  )
}

export default Header
