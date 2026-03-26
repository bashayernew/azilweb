import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ar from '../locales/ar.json'
import en from '../locales/en.json'

const STORAGE_KEY = 'azilweb_lang'

const translations = { ar, en }

const ROUTES = {
  ar: {
    home: '/',
    about: '/من-نحن',
    services: '/خدماتنا',
    /** Merged with About — anchor to partners band */
    clients: '/من-نحن#partners',
    team: '/فريق-العمل',
    contact: '/تواصل-معنا',
  },
  en: {
    home: '/',
    about: '/about-us',
    services: '/services',
    clients: '/about-us#partners',
    team: '/team',
    contact: '/contact',
  },
}

const PATH_TO_PAGE = {
  '/': 'home',
  '/من-نحن': 'about',
  '/about-us': 'about',
  '/خدماتنا': 'services',
  '/services': 'services',
  '/عملائنا': 'about',
  '/clients': 'about',
  '/فريق-العمل': 'team',
  '/team': 'team',
  '/تواصل-معنا': 'contact',
  '/contact': 'contact',
}

const LanguageContext = createContext(null)

function getStoredLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'en' ? 'en' : 'ar'
  } catch {
    return 'ar'
  }
}

function applyDocumentAttributes(lang) {
  document.documentElement.lang = lang
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  document.title = lang === 'ar'
    ? 'شركة الحمرا سي آي | للمواد العازلة والإنشائية'
    : 'Al Hamra CI | Insulation & Construction Materials'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getStoredLang)
  const navigate = useNavigate()
  const location = useLocation()

  const setLang = useCallback((newLang) => {
    if (newLang !== 'ar' && newLang !== 'en') return
    setLangState(newLang)
    localStorage.setItem(STORAGE_KEY, newLang)
    applyDocumentAttributes(newLang)
  }, [])

  const toggleLang = useCallback(() => {
    const newLang = lang === 'ar' ? 'en' : 'ar'
    const page = PATH_TO_PAGE[location.pathname]
    setLang(newLang)
    if (page && page !== 'home') {
      navigate(ROUTES[newLang][page])
    }
  }, [lang, location.pathname, navigate, setLang])

  const t = useCallback(
    (key, vars = {}) => {
      const keys = key.split('.')
      let value = translations[lang]
      for (const k of keys) {
        value = value?.[k]
      }
      if (Array.isArray(value)) return value
      if (typeof value !== 'string') return key
      return Object.entries(vars).reduce(
        (str, [k, v]) => str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v)),
        value
      )
    },
    [lang]
  )

  const path = useCallback((page) => ROUTES[lang]?.[page] ?? '/', [lang])

  useEffect(() => {
    applyDocumentAttributes(lang)
  }, [lang])

  const value = {
    lang,
    setLang,
    toggleLang,
    t,
    path,
    isRtl: lang === 'ar',
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
