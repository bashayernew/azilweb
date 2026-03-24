import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ClipboardList,
  Check,
  HardHat,
  Zap,
  Wrench,
  MapPin,
  Building2,
  Home,
  Waves,
  Droplets,
  Snowflake,
  Volume2,
} from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import ImagePlaceholder from '../components/ImagePlaceholder'
import './HomePage.css'
import '../components/shared.css'

const SERVICE_KEYS = ['basement', 'roofs', 'pools', 'tanks', 'acDucts', 'acoustic']
const WHY_US_KEYS = ['experience', 'quality', 'supervision', 'speed', 'aftercare', 'coverage']

const ICON_MAP = {
  experience: ClipboardList,
  quality: Check,
  supervision: HardHat,
  speed: Zap,
  aftercare: Wrench,
  coverage: MapPin,
}

const SERVICE_ICON_MAP = {
  basement: Building2,
  roofs: Home,
  pools: Waves,
  tanks: Droplets,
  acDucts: Snowflake,
  acoustic: Volume2,
}

function HomePage() {
  const { t, path } = useLanguage()

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const stats = [
    { value: t('home.statYearsVal'), label: t('home.statYears') },
    { value: t('home.statClientsVal'), label: t('home.statClients') },
    { value: t('home.statAreasVal'), label: t('home.statAreas') },
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__overlay"></div>
          <div className="hero__pattern"></div>
        </div>
        <div className="hero__content container">
          <div className="hero__grid reveal">
            <div className="hero__text">
              <span className="hero__badge">{t('home.heroBadge')}</span>
              <h1 className="hero__title">
                {t('home.heroTitle')}
              </h1>
              <p className="hero__subtitle">
                {t('home.heroSubtitle')}
              </p>
              <div className="hero__ctas">
                <a href="https://wa.link/cszcj8" target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
                  {t('home.requestInspection')}
                </a>
                <a href="tel:+96524915426" className="btn btn--light btn--lg">
                  {t('home.contactNow')}
                </a>
              </div>
              <div className="hero__stats">
                {stats.map((stat) => (
                  <div key={stat.label} className="hero__stat">
                    <span className="hero__stat-value">{stat.value}</span>
                    <span className="hero__stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero__visual">
              <ImagePlaceholder className="hero__placeholder" aspectRatio="4/3" />
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section about-preview">
        <div className="container">
          <div className="about-preview__grid reveal">
            <div className="about-preview__content">
              <span className="section-title__overline">{t('home.aboutOverline')}</span>
              <h2 className="about-preview__heading">
                {t('home.aboutHeading')}
              </h2>
              <p className="about-preview__text">
                {t('home.aboutText')}
              </p>
              <Link to={path('about')} className="btn btn--primary">
                {t('home.learnMore')}
              </Link>
            </div>
            <div className="about-preview__visual">
              <div className="about-preview__card">
                <ImagePlaceholder className="about-preview__img" aspectRatio="16/10" variant="dark" />
                <h3>{t('home.aboutCardTitle')}</h3>
                <p>{t('home.aboutCardDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section section--alt services-overview">
        <div className="container">
          <div className="section-title reveal">
            <span className="section-title__overline">{t('home.servicesOverline')}</span>
            <h2 className="section-title__heading">{t('home.servicesHeading')}</h2>
            <p className="section-title__sub">{t('home.servicesSub')}</p>
          </div>
          <div className="services-grid">
            {SERVICE_KEYS.map((key, i) => {
              const Icon = SERVICE_ICON_MAP[key]
              return (
                <div key={key} className={`service-card reveal`} style={{ animationDelay: `${i * 0.05}s` }}>
                  <ImagePlaceholder className="service-card__placeholder" aspectRatio="16/10" />
                  <div className="service-card__icon-wrap">
                    <Icon className="service-card__icon" size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="service-card__title">{t(`home.services.${key}.title`)}</h3>
                  <p className="service-card__desc">{t(`home.services.${key}.desc`)}</p>
                  <Link to={`${path('services')}#${t(`home.services.${key}.anchor`)}`} className="service-card__link">
                    {t('home.learnMoreArrow')}
                  </Link>
                </div>
              )
            })}
          </div>
          <div className="section__cta reveal">
            <Link to={path('services')} className="btn btn--primary btn--lg">
              {t('home.viewAllServices')}
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section why-us">
        <div className="container">
          <div className="section-title reveal">
            <span className="section-title__overline">{t('home.whyUsOverline')}</span>
            <h2 className="section-title__heading">{t('home.whyUsHeading')}</h2>
          </div>
          <div className="why-us__grid">
            {WHY_US_KEYS.map((key, i) => {
              const Icon = ICON_MAP[key]
              return (
                <div key={key} className="why-us__card reveal">
                  <div className="why-us__icon">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="why-us__title">{t(`home.whyUs.${key}.title`)}</h3>
                  <p className="why-us__desc">{t(`home.whyUs.${key}.desc`)}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Clients / Trust */}
      <section className="section section--alt trust-section">
        <div className="container">
          <div className="section-title reveal">
            <span className="section-title__overline">{t('home.trustOverline')}</span>
            <h2 className="section-title__heading">{t('home.trustHeading')}</h2>
            <p className="section-title__sub">{t('home.trustSub')}</p>
          </div>
          <div className="trust-section__content reveal">
            <div className="trust-section__badges">
              <div className="trust-badge">{t('home.trustBadge1')}</div>
              <div className="trust-badge">{t('home.trustBadge2')}</div>
              <div className="trust-badge">{t('home.trustBadge3')}</div>
              <div className="trust-badge">{t('home.trustBadge4')}</div>
            </div>
            <Link to={path('clients')} className="btn btn--outline">
              {t('home.trustLearnMore')}
            </Link>
          </div>
        </div>
      </section>

      {/* Projects / Gallery */}
      <section className="section projects-section">
        <div className="container">
          <div className="section-title reveal">
            <span className="section-title__overline">{t('home.projectsOverline')}</span>
            <h2 className="section-title__heading">{t('home.projectsHeading')}</h2>
            <p className="section-title__sub">{t('home.projectsSub')}</p>
          </div>
          <div className="projects-grid reveal">
            <div className="project-card">
              <ImagePlaceholder className="project-card__placeholder" aspectRatio="16/10" />
              <h3>{t('home.waterproofing')}</h3>
              <p>{t('home.waterproofingDesc')}</p>
            </div>
            <div className="project-card">
              <ImagePlaceholder className="project-card__placeholder" aspectRatio="16/10" />
              <h3>{t('home.thermal')}</h3>
              <p>{t('home.thermalDesc')}</p>
            </div>
            <div className="project-card">
              <ImagePlaceholder className="project-card__placeholder" aspectRatio="16/10" />
              <h3>{t('home.acoustic')}</h3>
              <p>{t('home.acousticDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box reveal">
            <h2 className="cta-box__title">{t('home.ctaTitle')}</h2>
            <p className="cta-box__text">
              {t('home.ctaText')}
            </p>
            <div className="cta-box__actions">
              <a href="https://wa.link/cszcj8" target="_blank" rel="noopener noreferrer" className="btn btn--accent btn--lg">
                {t('home.ctaWhatsApp')}
              </a>
              <Link to={path('contact')} className="btn btn--outline btn--lg">
                {t('home.ctaForm')}
              </Link>
            </div>
            <div className="cta-box__contact">
              <a href="tel:+96524915426">+965 24915426</a>
              <span>|</span>
              <a href="tel:+96524915427">+965 24915427</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
