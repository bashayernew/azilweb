import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
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

  const isActive = (pathKey) => {
    const p = path(pathKey)
    if (pathKey === 'about') {
      return location.pathname === p || location.pathname === '/عملائنا' || location.pathname === '/clients'
    }
    return location.pathname === p
  }

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner container">
        <Link to="/" className="header__logo">
          <img
            src="/logohamra-removebg-preview.png"
            alt={t('brand.name')}
            className="header__logo-img"
          />
        </Link>

        <nav className={`header__nav ${mobileOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            {NAV_KEYS.map(({ pathKey, labelKey }) => (
              <li key={pathKey}>
                <Link
                  to={path(pathKey)}
                  className={`header__nav-link ${isActive(pathKey) ? 'header__nav-link--active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {t(labelKey)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="header__nav-mobile-actions">
            <button
              type="button"
              className="header__lang-toggle header__lang-toggle--mobile"
              onClick={() => {
                toggleLang()
                setMobileOpen(false)
              }}
              aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>
            <a
              href="https://wa.link/cszcj8"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
              onClick={() => setMobileOpen(false)}
            >
              {t('header.requestInspection')}
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
          className={`header__toggle ${mobileOpen ? 'header__toggle--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={t('header.menuAria')}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header
