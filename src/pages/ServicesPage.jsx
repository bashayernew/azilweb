import { useEffect } from 'react'
import {
  Building2,
  BrickWall,
  Home,
  Waves,
  Droplets,
  Snowflake,
  Volume2,
  Flame,
  Check,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { publicAsset, SERVICE_DETAIL_IMAGES, ROOFS_SERVICE_IMAGES, POOL_PROCESS_STEPS } from '../constants/serviceImages'
import { useLanguage } from '../contexts/LanguageContext'
import { WHATSAPP_URL } from '../constants/socialLinks'
import '../components/shared.css'
import './ServicesPage.css'

const SERVICE_KEYS = ['basement', 'foundations', 'roofs', 'bitumen', 'pools', 'tanks', 'acDucts', 'acoustic']
const ANCHORS = {
  basement: 'basement-insulation',
  foundations: 'foundation-insulation',
  roofs: 'roof-insulation',
  bitumen: 'bitumen-insulation',
  pools: 'pool-insulation',
  tanks: 'tank-insulation',
  acDucts: 'ac-duct-insulation',
  acoustic: 'acoustic-insulation',
}
const SERVICE_ICONS = {
  basement: Building2,
  foundations: BrickWall,
  roofs: Home,
  bitumen: Flame,
  pools: Waves,
  tanks: Droplets,
  acDucts: Snowflake,
  acoustic: Volume2,
}

const ROOFS_ALT_KEYS = ['img1Alt', 'img2Alt', 'img3Alt']
const POOL_PROCESS_STEP_KEYS = ['step1', 'step2', 'step3', 'step4', 'step5']

function PoolsServiceDetail({ t, anchorId }) {
  const { isRtl } = useLanguage()
  const Icon = SERVICE_ICONS.pools
  const processLabel = t('services.detail.pools.process.title')

  const stepsGrid = (
    <div
      className="service-detail-pools__steps"
      role="group"
      aria-label={processLabel}
    >
      {POOL_PROCESS_STEPS.map((cfg, i) => {
        const stepKey = POOL_PROCESS_STEP_KEYS[i]
        const stepTitle = t(`services.detail.pools.process.${stepKey}.title`)
        const mediaUrl = publicAsset(cfg.src)
        return (
          <figure key={stepKey} className="service-detail-pools__figure">
            <span className="service-detail-pools__badge" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            {cfg.type === 'video' ? (
              <video
                className="service-detail-pools__img"
                src={mediaUrl}
                muted
                loop
                playsInline
                autoPlay
                aria-label={stepTitle}
              />
            ) : (
              <img
                className="service-detail-pools__img"
                src={mediaUrl}
                alt={stepTitle}
                loading="lazy"
                decoding="async"
              />
            )}
          </figure>
        )
      })}
    </div>
  )

  const visual = (
    <div className="service-detail__visual">
      {stepsGrid}
      <div className="service-detail__icon-wrap">
        <Icon className="service-detail__icon" size={28} strokeWidth={1.5} />
      </div>
    </div>
  )

  const content = (
    <div className="service-detail__content">
      <h2 className="service-detail__title">{t('services.detail.pools.title')}</h2>
      <p className="service-detail__desc">{t('services.detail.pools.desc')}</p>
      <ul className="service-detail__benefits">
        {(() => {
          const benefits = t('services.detail.pools.benefits')
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
  )

  return (
    <article id={anchorId} className="service-detail service-detail-pools reveal">
      {isRtl ? (
        <>
          {content}
          {visual}
        </>
      ) : (
        <>
          {visual}
          {content}
        </>
      )}
    </article>
  )
}

function RoofsImageGrid({ images, subsectionKey, t }) {
  return (
    <div
      className="service-detail-roofs__grid"
      role="group"
      aria-label={t(`services.detail.roofs.${subsectionKey}.title`)}
    >
      {images.map((src, i) => (
        <figure key={`${subsectionKey}-${src}-${i}`} className="service-detail-roofs__figure">
          <img
            src={publicAsset(src)}
            alt={t(`services.detail.roofs.${subsectionKey}.${ROOFS_ALT_KEYS[i]}`)}
            className="service-detail-roofs__img"
            loading="lazy"
            decoding="async"
          />
        </figure>
      ))}
    </div>
  )
}

function RoofsServiceDetail({ t, anchorId }) {
  const Icon = SERVICE_ICONS.roofs
  const roofImages = ROOFS_SERVICE_IMAGES
  const sectionAImages = roofImages.slice(0, 3)
  const sectionBImages = roofImages.slice(3, 6)
  const items1 = t('services.detail.roofs.subsection1.items')
  const items2 = t('services.detail.roofs.subsection2.items')
  const list1 = Array.isArray(items1) ? items1 : []
  const list2 = Array.isArray(items2) ? items2 : []
  const benefits = t('services.detail.roofs.benefits')
  const benefitList = Array.isArray(benefits) ? benefits : []

  return (
    <article id={anchorId} className="service-detail-roofs reveal">
      <div className="service-detail-roofs__intro">
        <div className="service-detail-roofs__icon-wrap">
          <Icon className="service-detail-roofs__icon" size={28} strokeWidth={1.5} />
        </div>
        <h2 className="service-detail-roofs__title">{t('services.detail.roofs.title')}</h2>
        <p className="service-detail-roofs__lead">{t('services.detail.roofs.desc')}</p>
        {benefitList.length > 0 ? (
          <ul className="service-detail-roofs__highlights">
            {benefitList.map((b, j) => (
              <li key={j}>
                <Check size={18} strokeWidth={2.2} className="service-detail-roofs__check" />
                {b}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* Section A: desktop = images left, text right */}
      <div className="service-detail-roofs__block service-detail-roofs__block--a">
        <div className="service-detail-roofs__card service-detail-roofs__card--media" dir="ltr">
          <RoofsImageGrid images={sectionAImages} subsectionKey="subsection1" t={t} />
        </div>
        <div className="service-detail-roofs__card service-detail-roofs__card--body">
          <h3 className="service-detail-roofs__subtitle">{t('services.detail.roofs.subsection1.title')}</h3>
          <p className="service-detail-roofs__excerpt">{t('services.detail.roofs.subsection1.intro')}</p>
          <ul className="service-detail-roofs__bullets">
            {list1.map((line, j) => (
              <li key={j}>
                <Check size={17} strokeWidth={2.2} className="service-detail-roofs__check" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section B: desktop = text left, images right */}
      <div className="service-detail-roofs__block service-detail-roofs__block--b">
        <div className="service-detail-roofs__card service-detail-roofs__card--body">
          <h3 className="service-detail-roofs__subtitle">{t('services.detail.roofs.subsection2.title')}</h3>
          <p className="service-detail-roofs__excerpt">{t('services.detail.roofs.subsection2.intro')}</p>
          <ul className="service-detail-roofs__bullets">
            {list2.map((line, j) => (
              <li key={j}>
                <Check size={17} strokeWidth={2.2} className="service-detail-roofs__check" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="service-detail-roofs__card service-detail-roofs__card--media" dir="ltr">
          <RoofsImageGrid images={sectionBImages} subsectionKey="subsection2" t={t} />
        </div>
      </div>

      <div className="service-detail-roofs__actions">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary service-detail-roofs__cta"
        >
          {t('services.inquireService')}
        </a>
      </div>
    </article>
  )
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
            if (key === 'roofs') {
              return <RoofsServiceDetail key={key} t={t} anchorId={ANCHORS.roofs} />
            }
            if (key === 'pools') {
              return <PoolsServiceDetail key={key} t={t} anchorId={ANCHORS.pools} />
            }

            const Icon = SERVICE_ICONS[key]
            const imgCfg = SERVICE_DETAIL_IMAGES[key]
            const dualSrcs = Array.isArray(imgCfg) ? imgCfg : null
            const singleSrc = typeof imgCfg === 'string' ? imgCfg : null
            const detailTitle = t(`services.detail.${key}.title`)
            const isBasementProcess = key === 'basement' && dualSrcs
            const isTanksContain = key === 'tanks' && dualSrcs
            const isBitumenContain = key === 'bitumen' && singleSrc
            return (
              <article
                key={key}
                id={ANCHORS[key]}
                className={`service-detail reveal${isBasementProcess ? ' service-detail--basement-process' : ''}${
                  isTanksContain ? ' service-detail--tanks-contain' : ''
                }${isBitumenContain ? ' service-detail--bitumen-contain' : ''} ${
                  i % 2 === 1 ? 'service-detail--reverse' : ''
                }`}
              >
                <div className="service-detail__visual">
                  {dualSrcs ? (
                    <div
                      className={`service-detail__media service-detail__media--dual${
                        isTanksContain ? ' service-detail__media--tanks' : ''
                      }`}
                    >
                      <div className="service-detail__dual-frame">
                        <div
                          className={`service-detail__dual${isBasementProcess ? ' service-detail__dual--basement' : ''}${
                            isTanksContain ? ' service-detail__dual--tanks' : ''
                          }`}
                          role="group"
                          aria-label={detailTitle}
                        >
                          {dualSrcs.map((src, idx) => (
                            <div key={`${key}-${idx}`} className="service-detail__dual-cell">
                              {isBasementProcess ? (
                                <span className="service-detail__dual-badge" aria-hidden="true">
                                  {String(idx + 1).padStart(2, '0')}
                                </span>
                              ) : null}
                              <img
                                src={publicAsset(src)}
                                alt={
                                  key === 'basement'
                                    ? t(`services.detail.basement.img${idx + 1}Alt`)
                                    : key === 'tanks'
                                      ? t(`services.detail.tanks.img${idx + 1}Alt`)
                                      : idx === 0
                                        ? detailTitle
                                        : ''
                                }
                                className={`service-detail__img service-detail__img--dual${
                                  isTanksContain ? ' service-detail__img--tanks-contain' : ''
                                }`}
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : singleSrc ? (
                    <div
                      className={`service-detail__media${
                        isBitumenContain ? ' service-detail__media--bitumen' : ''
                      }`}
                    >
                      <img
                        src={publicAsset(singleSrc)}
                        alt={detailTitle}
                        className={`service-detail__img${
                          isBitumenContain ? ' service-detail__img--bitumen-contain' : ''
                        }`}
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
                  {key === 'bitumen' ? (
                    <>
                      <p className="service-detail__desc">{t('services.detail.bitumen.desc2')}</p>
                      <p className="service-detail__desc">{t('services.detail.bitumen.desc3')}</p>
                    </>
                  ) : null}
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
