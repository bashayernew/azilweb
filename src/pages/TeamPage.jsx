import { useEffect } from 'react'
import { Briefcase, HardHat, CheckCircle, Phone } from 'lucide-react'
import PageHero from '../components/PageHero'
import { publicAsset } from '../constants/serviceImages'
import { useLanguage } from '../contexts/LanguageContext'
import { WHATSAPP_URL } from '../constants/socialLinks'
import '../components/shared.css'
import './TeamPage.css'

const TEAM_SECTION_KEYS = ['admin', 'technical', 'supervision', 'customer']
const TEAM_ICONS = [Briefcase, HardHat, CheckCircle, Phone]
const TEAM_PHOTO_PATH = 'tam%20image.webp'

function TeamPage() {
  const { t } = useLanguage()

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const values = t('team.values')
  const valuesList = Array.isArray(values) ? values : []

  return (
    <div className="team-page">
      <PageHero
        title={t('team.title')}
        subtitle={t('team.subtitle')}
        overline={t('team.overline')}
      />

      <section className="section team-lead">
        <div className="container">
          <div className="team-lead__grid reveal">
            <div className="team-lead__text">
              <h2>{t('team.heading')}</h2>
              <p>{t('team.intro')}</p>
            </div>
            <figure className="team-lead__figure">
              <div className="team-lead__frame">
                <img
                  className="team-lead__img"
                  src={publicAsset(TEAM_PHOTO_PATH)}
                  alt={t('home.teamImageAlt')}
                  loading="lazy"
                  decoding="async"
                />
                <div className="team-lead__shine" aria-hidden="true" />
              </div>
              <figcaption className="team-lead__caption">{t('team.photoCaption')}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section section--alt team-sections">
        <div className="container">
          <div className="section-title reveal">
            <span className="section-title__overline">{t('team.structureOverline')}</span>
            <h2 className="section-title__heading">{t('team.structureHeading')}</h2>
          </div>
          <div className="team-sections__grid">
            {TEAM_SECTION_KEYS.map((key, i) => {
              const Icon = TEAM_ICONS[i]
              return (
                <div key={key} className="team-section-card reveal">
                  <div className="team-section-card__icon">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3>{t(`team.sections.${key}.title`)}</h3>
                  <p>{t(`team.sections.${key}.desc`)}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section team-values">
        <div className="container">
          <div className="team-values__content reveal">
            <h2>{t('team.valuesHeading')}</h2>
            <ul>
              {valuesList.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--alt team-cta">
        <div className="container">
          <div className="team-cta__box reveal">
            <h2>{t('team.ctaTitle')}</h2>
            <p>{t('team.ctaText')}</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
              {t('team.ctaWhatsApp')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TeamPage
