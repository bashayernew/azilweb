import { useEffect } from 'react'
import {
  Building2,
  Home,
  Waves,
  Droplets,
  Snowflake,
  Volume2,
  Check,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { publicAsset, SERVICE_DETAIL_IMAGES } from '../constants/serviceImages'
import { useLanguage } from '../contexts/LanguageContext'
import { WHATSAPP_URL } from '../constants/socialLinks'
import '../components/shared.css'
import './ServicesPage.css'

const SERVICE_KEYS = ['basement', 'roofs', 'pools', 'tanks', 'acDucts', 'acoustic']
const ANCHORS = {
  basement: 'basement-insulation',
  roofs: 'roof-insulation',
  pools: 'pool-insulation',
  tanks: 'tank-insulation',
  acDucts: 'ac-duct-insulation',
  acoustic: 'acoustic-insulation',
}
const SERVICE_ICONS = {
  basement: Building2,
  roofs: Home,
  pools: Waves,
  tanks: Droplets,
  acDucts: Snowflake,
  acoustic: Volume2,
}

function ServicesPage() {
  const { t } = useLanguage()

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="services-page">
      <PageHero
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        overline={t('services.overline')}
      />

      <section className="section services-list">
        <div className="container">
          {SERVICE_KEYS.map((key, i) => {
            const Icon = SERVICE_ICONS[key]
            const imgCfg = SERVICE_DETAIL_IMAGES[key]
            const dualSrcs = Array.isArray(imgCfg) ? imgCfg : null
            const singleSrc = typeof imgCfg === 'string' ? imgCfg : null
            const detailTitle = t(`services.detail.${key}.title`)
            return (
              <article
                key={key}
                id={ANCHORS[key]}
                className={`service-detail reveal ${i % 2 === 1 ? 'service-detail--reverse' : ''}`}
              >
                <div className="service-detail__visual">
                  {dualSrcs ? (
                    <div className="service-detail__media service-detail__media--dual">
                      <div className="service-detail__dual-frame">
                        <div className="service-detail__dual" role="group" aria-label={detailTitle}>
                          {dualSrcs.map((src, idx) => (
                            <div key={`${key}-${idx}`} className="service-detail__dual-cell">
                              <img
                                src={publicAsset(src)}
                                alt={idx === 0 ? detailTitle : ''}
                                className="service-detail__img service-detail__img--dual"
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : singleSrc ? (
                    <div className="service-detail__media">
                      <img
                        src={publicAsset(singleSrc)}
                        alt={detailTitle}
                        className="service-detail__img"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : (
                    <ImagePlaceholder className="service-detail__placeholder" aspectRatio="4/3" />
                  )}
                  <div className="service-detail__icon-wrap">
                    <Icon className="service-detail__icon" size={28} strokeWidth={1.5} />
                  </div>
                </div>
                <div className="service-detail__content">
                  <h2 className="service-detail__title">{t(`services.detail.${key}.title`)}</h2>
                  <p className="service-detail__desc">{t(`services.detail.${key}.desc`)}</p>
                  <ul className="service-detail__benefits">
                    {(() => {
                      const benefits = t(`services.detail.${key}.benefits`)
                      return Array.isArray(benefits) ? benefits : []
                    })().map((b, j) => (
                      <li key={j}>
                        <Check size={16} strokeWidth={2} className="service-detail__check" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                    {t('services.inquireService')}
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="section section--alt services-cta">
        <div className="container">
          <div className="services-cta__box reveal">
            <h2>{t('services.ctaTitle')}</h2>
            <p>{t('services.ctaText')}</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn--accent btn--lg">
              {t('services.ctaWhatsApp')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
