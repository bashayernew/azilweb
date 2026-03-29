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
import { publicAsset, SERVICE_CARD_IMAGES } from '../constants/serviceImages'
import { HERO_HOME_MEDIA } from '../constants/heroHome'
import HeroMedia from '../components/HeroMedia'
import OurTeamSection from '../components/OurTeamSection'
import './HomePage.css'
import '../components/shared.css'

/** Project gallery: العزل المائي / الحراري / الصوتي — shared layout & images */
const PROJECT_GALLERY = [
  {
    id: 'waterproofing',
    srcs: ['/pool1.webp', '/pool11.webp'],
    titleKey: 'home.waterproofing',
    descKey: 'home.waterproofingDesc',
  },
  { id: 'thermal', src: '/azilharary.webp', titleKey: 'home.thermal', descKey: 'home.thermalDesc' },
  { id: 'acoustic', src: '/sound2.webp', titleKey: 'home.acoustic', descKey: 'home.acousticDesc' },
]

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
      { threshold: 0.05, rootMargin: '0px 0px 120px 0px' }
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
      {/* Hero — two columns: copy (start) + framed video (end); RTL flips visually */}
      <section className="hero" aria-labelledby="home-hero-title">
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__overlay" />
          <div className="hero__pattern" />
        </div>
        <div className="hero__inner container">
          <div className="hero__grid">
            <div className="hero__copy reveal">
              <span className="hero__badge">{t('home.heroBadge')}</span>
              <h1 id="home-hero-title" className="hero__title">
                {t('home.heroTitle')}
              </h1>
              <p className="hero__subtitle">{t('home.heroSubtitle')}</p>
              <div className="hero__ctas">
                <a
                  href="https://wa.link/cszcj8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--lg"
                >
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
            <div className="hero__media-col reveal">
              <HeroMedia
                videoSrc={HERO_HOME_MEDIA.video}
                posterSrc={HERO_HOME_MEDIA.poster}
                fallbackImageSrc={HERO_HOME_MEDIA.fallback}
                ariaLabel={t('home.heroVideoAria')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section about-preview">
        <div className="container">
          <div className="about-preview__grid reveal">
            <div className="about-preview__content">
              <span className="section-title__overline about-preview__overline">{t('home.aboutOverline')}</span>
              <h2 className="about-preview__heading">{t('home.aboutHeading')}</h2>
              <p className="about-preview__text">{t('home.aboutText')}</p>
              <Link to={path('about')} className="btn btn--primary btn--lg about-preview__cta">
                {t('home.learnMore')}
              </Link>
            </div>
            <div className="about-preview__visual">
              <div className="about-preview__card">
                <div className="about-preview__card-video-wrap">
                  <video
                    className="about-preview__card-video"
                    src={publicAsset('herosectionvid.mp4')}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={publicAsset('roof2.webp')}
                    aria-label={t('home.aboutCardTitle')}
                  />
                </div>
                <div className="about-preview__card-copy">
                  <h3>{t('home.aboutCardTitle')}</h3>
                  <p>{t('home.aboutCardDesc')}</p>
                </div>
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
              const imgConfig = SERVICE_CARD_IMAGES[key]
              const dualSrcs = Array.isArray(imgConfig) ? imgConfig : null
              const imgSrc = typeof imgConfig === 'string' ? imgConfig : null
              const benefitsRaw = t(`home.services.${key}.benefits`)
              const benefits = Array.isArray(benefitsRaw) ? benefitsRaw : null
              return (
                <div key={key} className={`service-card reveal`} style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className={`service-card__media${dualSrcs ? ' service-card__media--dual' : ''}`}>
                    <div className="service-card__media-inner">
                      {dualSrcs ? (
                        <div className="service-card__dual-frame">
                          <div className="service-card__dual" role="group" aria-label={t(`home.services.${key}.title`)}>
                            {dualSrcs.map((src, idx) => (
                              <div key={`${key}-${idx}`} className="service-card__dual-cell">
                                <img
                                  src={publicAsset(src)}
                                  alt={idx === 0 ? t(`home.services.${key}.title`) : ''}
                                  className="service-card__img service-card__img--dual"
                                  loading="lazy"
                                  decoding="async"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <img
                          src={publicAsset(imgSrc)}
                          alt={t(`home.services.${key}.title`)}
                          className="service-card__img"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      <div className="service-card__img-gradient" aria-hidden="true" />
                      <div className="service-card__img-hover" aria-hidden="true" />
                    </div>
                    <div className="service-card__icon-badge">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="service-card__body">
                    <h3 className="service-card__title">{t(`home.services.${key}.title`)}</h3>
                    <p className="service-card__desc">{t(`home.services.${key}.desc`)}</p>
                    {benefits && (
                      <ul className="service-card__bullets">
                        {benefits.map((line, bi) => (
                          <li key={`${key}-b${bi}`}>{line}</li>
                        ))}
                      </ul>
                    )}
                    <Link to={`${path('services')}#${t(`home.services.${key}.anchor`)}`} className="service-card__link">
                      {t('home.learnMoreArrow')}
                    </Link>
                  </div>
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
            <Link to={`${path('about')}#partners`} className="btn btn--outline">
              {t('home.trustLearnMore')}
            </Link>
          </div>
        </div>
      </section>

      <OurTeamSection />

      {/* Projects / Gallery */}
      <section className="section projects-section">
        <div className="container">
          <div className="section-title reveal">
            <span className="section-title__overline">{t('home.projectsOverline')}</span>
            <h2 className="section-title__heading">{t('home.projectsHeading')}</h2>
            <p className="section-title__sub">{t('home.projectsSub')}</p>
          </div>
          <div className="projects-grid reveal">
            {PROJECT_GALLERY.map((item) => {
              const { id, titleKey, descKey } = item
              const dualSrcs = item.srcs
              const singleSrc = item.src
              return (
                <div key={id} className="project-card">
                  <div className={`project-card__media${dualSrcs ? ' project-card__media--dual' : ''}`}>
                    <div className="project-card__media-inner">
                      {dualSrcs ? (
                        <div className="project-card__dual-frame">
                          <div className="project-card__dual" role="group" aria-label={t(titleKey)}>
                            {dualSrcs.map((src, idx) => (
                              <div key={`${id}-${idx}`} className="project-card__dual-cell">
                                <img
                                  src={publicAsset(src)}
                                  alt={idx === 0 ? t(titleKey) : ''}
                                  className="project-card__img project-card__img--dual"
                                  loading="lazy"
                                  decoding="async"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <img
                          src={publicAsset(singleSrc)}
                          alt={t(titleKey)}
                          className="project-card__img"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                      <div className="project-card__img-gradient" aria-hidden="true" />
                      <div className="project-card__img-hover" aria-hidden="true" />
                    </div>
                  </div>
                  <h3>{t(titleKey)}</h3>
                  <p>{t(descKey)}</p>
                </div>
              )
            })}
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
