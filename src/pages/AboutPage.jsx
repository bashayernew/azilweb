import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Target,
  FileText,
  Award,
  Eye,
  ShieldCheck,
  Handshake,
  Building2,
  Check,
} from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { publicAsset } from '../constants/serviceImages'
import '../components/shared.css'
import './AboutPage.css'

const STORY_IMAGE = '/roof2.webp'

const VALUE_KEYS = ['quality', 'transparency', 'professionalism', 'commitment']
const VALUE_ICONS = {
  quality: Award,
  transparency: Eye,
  professionalism: ShieldCheck,
  commitment: Handshake,
}
const PROCESS_KEYS = ['step1', 'step2', 'step3', 'step4', 'step5']

function AboutPage() {
  const { t, path } = useLanguage()
  const location = useLocation()

  const categoryList = (() => {
    const categories = t('clients.categories')
    return Array.isArray(categories) ? categories : []
  })()

  const partnersSuccessList = (() => {
    const list = t('about.partnersSuccessList')
    return Array.isArray(list) ? list : []
  })()

  const heroStats = [
    { value: t('home.statYearsVal'), label: t('home.statYears') },
    { value: t('home.statClientsVal'), label: t('home.statClients') },
    { value: t('home.statAreasVal'), label: t('home.statAreas') },
  ]

  useEffect(() => {
    const reveals = document.querySelectorAll('.about-page .reveal')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.06, rootMargin: '0px 0px 100px 0px' }
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (location.hash !== '#partners') return
    const tId = window.setTimeout(() => {
      document.getElementById('partners')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 180)
    return () => window.clearTimeout(tId)
  }, [location.pathname, location.hash])

  return (
    <div className="about-page">
      <section className="about-page__hero" aria-labelledby="about-hero-title">
        <div className="about-page__hero-bg" aria-hidden="true" />
        <div className="about-page__hero-glow about-page__hero-glow--1" aria-hidden="true" />
        <div className="about-page__hero-glow about-page__hero-glow--2" aria-hidden="true" />
        <div className="about-page__hero-inner container">
          <div className="about-page__hero-copy reveal">
            <span className="about-page__hero-eyebrow">{t('about.overline')}</span>
            <h1 id="about-hero-title" className="about-page__hero-title">
              {t('about.title')}
            </h1>
            <p className="about-page__hero-lead">{t('about.subtitle')}</p>
            <p className="about-page__hero-trust">{t('clients.subtitle')}</p>
            <div className="about-page__hero-cta">
              <a
                href="https://wa.link/cszcj8"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--lg"
              >
                {t('about.requestInspection')}
              </a>
            </div>
            <div className="about-page__hero-stats" role="presentation">
              {heroStats.map((s) => (
                <div key={s.label} className="about-page__hero-stat">
                  <span className="about-page__hero-stat-value">{s.value}</span>
                  <span className="about-page__hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="about-page__hero-fade" aria-hidden="true" />
      </section>

      <section id="about-story" className="about-page__story section">
        <div className="container">
          <div className="about-page__story-grid">
            <div className="about-page__story-text reveal">
              <span className="section-title__overline">{t('brand.name')}</span>
              <h2 className="about-page__story-heading">{t('about.heading')}</h2>
              <p className="about-page__story-p">{t('about.intro1')}</p>
              <p className="about-page__story-p">{t('about.intro2')}</p>
            </div>
            <div className="about-page__story-panel reveal">
              <div className="about-page__story-frame">
                <img
                  src={publicAsset(STORY_IMAGE)}
                  alt=""
                  className="about-page__story-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="about-page__story-img-caption" aria-hidden="true">
                  <Building2 size={28} strokeWidth={1.25} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-page__mission section section--alt">
        <div className="container">
          <div className="about-page__mission-grid">
            <article className="about-page__mission-card reveal">
              <div className="about-page__mission-icon">
                <Target size={26} strokeWidth={1.5} />
              </div>
              <h3>{t('about.vision')}</h3>
              <p>{t('about.visionDesc')}</p>
            </article>
            <article className="about-page__mission-card reveal">
              <div className="about-page__mission-icon">
                <FileText size={26} strokeWidth={1.5} />
              </div>
              <h3>{t('about.mission')}</h3>
              <p>{t('about.missionDesc')}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-page__values section">
        <div className="container">
          <div className="section-title reveal">
            <span className="section-title__overline">{t('about.valuesOverline')}</span>
            <h2 className="section-title__heading">{t('about.valuesHeading')}</h2>
          </div>
          <div className="about-page__values-grid">
            {VALUE_KEYS.map((key) => {
              const Icon = VALUE_ICONS[key]
              return (
                <article key={key} className="about-page__value-card reveal">
                  <div className="about-page__value-icon">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3>{t(`about.values.${key}.title`)}</h3>
                  <p>{t(`about.values.${key}.desc`)}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="about-page__process section section--alt">
        <div className="container">
          <div className="section-title reveal">
            <span className="section-title__overline">{t('about.processOverline')}</span>
            <h2 className="section-title__heading">{t('about.processHeading')}</h2>
          </div>
          <div className="about-page__timeline about-page__timeline--premium">
            {PROCESS_KEYS.map((key, i) => (
              <article key={key} className="about-page__timeline-item reveal">
                <div className="about-page__timeline-axis" aria-hidden="true">
                  <span className="about-page__timeline-node">{i + 1}</span>
                  {i < PROCESS_KEYS.length - 1 ? <span className="about-page__timeline-connector" /> : null}
                </div>
                <div className="about-page__timeline-content">
                  <h3>{t(`about.process.${key}.title`)}</h3>
                  <p>{t(`about.process.${key}.desc`)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="about-page__partners-success section"
        aria-labelledby="partners-success-title"
      >
        <div className="about-page__partners-success__deco" aria-hidden="true">
          <span className="about-page__partners-success__shape about-page__partners-success__shape--1" />
          <span className="about-page__partners-success__shape about-page__partners-success__shape--2" />
        </div>
        <div className="container">
          <div className="section-title reveal">
            <span className="section-title__overline">{t('about.partnersSuccessOverline')}</span>
            <h2 id="partners-success-title" className="section-title__heading">
              {t('about.partnersSuccessTitle')}
            </h2>
            <p className="section-title__sub about-page__partners-success__intro">
              {t('about.partnersSuccessSub')}
            </p>
          </div>
          <ul
            className="about-page__partners-success__grid reveal"
            dir="rtl"
            lang="ar"
          >
            {partnersSuccessList.map((name, i) => (
              <li key={i} className="about-page__partners-success__item">
                <span className="about-page__partners-success__accent" aria-hidden="true" />
                <span className="about-page__partners-success__name">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="partners" className="about-page__partners section">
        <div className="about-page__partners-bg" aria-hidden="true" />
        <div className="about-page__partners-glow" aria-hidden="true" />
        <div className="container about-page__partners-inner">
          <div className="about-page__partners-head reveal">
            <span className="section-title__overline">{t('clients.overline')}</span>
            <h2 className="section-title__heading">{t('clients.heading')}</h2>
            <p className="about-page__partners-intro">{t('clients.intro')}</p>
          </div>

          <div className="about-page__sectors">
            <h3 className="about-page__sectors-title reveal">{t('clients.categoriesHeading')}</h3>
            <ul className="about-page__sectors-grid">
              {categoryList.map((cat, i) => (
                <li key={i} className="about-page__sector reveal">
                  <span className="about-page__sector-check">
                    <Check size={18} strokeWidth={2.2} />
                  </span>
                  <span className="about-page__sector-label">{cat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-page__trust-strip reveal" role="presentation">
            <div className="about-page__trust-item">
              <span className="about-page__trust-value">+12</span>
              <span className="about-page__trust-label">{t('clients.statYears')}</span>
            </div>
            <div className="about-page__trust-divider" aria-hidden="true" />
            <div className="about-page__trust-item">
              <span className="about-page__trust-value">+100</span>
              <span className="about-page__trust-label">{t('clients.statClients')}</span>
            </div>
            <div className="about-page__trust-divider" aria-hidden="true" />
            <div className="about-page__trust-item">
              <span className="about-page__trust-value">{t('home.statAreasVal')}</span>
              <span className="about-page__trust-label">{t('clients.statAreas')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-page__cta section">
        <div className="container">
          <div className="about-page__cta-box reveal">
            <h2>{t('about.ctaTitle')}</h2>
            <p>{t('about.ctaText')}</p>
            <div className="about-page__cta-actions">
              <a
                href="https://wa.link/cszcj8"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--accent btn--lg"
              >
                {t('about.requestInspection')}
              </a>
              <Link to={path('contact')} className="btn btn--outline btn--lg about-page__cta-outline">
                {t('nav.contact')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
