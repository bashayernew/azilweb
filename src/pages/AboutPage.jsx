import { useEffect } from 'react'
import { Target, FileText } from 'lucide-react'
import PageHero from '../components/PageHero'
import { useLanguage } from '../contexts/LanguageContext'
import '../components/shared.css'
import './AboutPage.css'

const VALUE_KEYS = ['quality', 'transparency', 'professionalism', 'commitment']
const PROCESS_KEYS = ['step1', 'step2', 'step3', 'step4', 'step5']

function AboutPage() {
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

  return (
    <div className="about-page">
      <PageHero
        title={t('about.title')}
        subtitle={t('about.subtitle')}
        overline={t('about.overline')}
      />

      <section className="section about-intro">
        <div className="container container--narrow">
          <div className="about-intro__content reveal">
            <h2 className="about-intro__heading">{t('about.heading')}</h2>
            <p className="about-intro__text">{t('about.intro1')}</p>
            <p className="about-intro__text">{t('about.intro2')}</p>
          </div>
        </div>
      </section>

      <section className="section section--alt about-mission">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card reveal">
              <div className="mission-card__icon">
                <Target size={28} strokeWidth={1.5} />
              </div>
              <h3>{t('about.vision')}</h3>
              <p>{t('about.visionDesc')}</p>
            </div>
            <div className="mission-card reveal">
              <div className="mission-card__icon">
                <FileText size={28} strokeWidth={1.5} />
              </div>
              <h3>{t('about.mission')}</h3>
              <p>{t('about.missionDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-values">
        <div className="container">
          <div className="section-title reveal">
            <span className="section-title__overline">{t('about.valuesOverline')}</span>
            <h2 className="section-title__heading">{t('about.valuesHeading')}</h2>
          </div>
          <div className="values-grid">
            {VALUE_KEYS.map((key) => (
              <div key={key} className="value-card reveal">
                <h3>{t(`about.values.${key}.title`)}</h3>
                <p>{t(`about.values.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt about-process">
        <div className="container">
          <div className="section-title reveal">
            <span className="section-title__overline">{t('about.processOverline')}</span>
            <h2 className="section-title__heading">{t('about.processHeading')}</h2>
          </div>
          <div className="process-timeline">
            {PROCESS_KEYS.map((key, i) => (
              <div key={key} className="process-step reveal">
                <div className="process-step__num">{i + 1}</div>
                <div className="process-step__content">
                  <h3>{t(`about.process.${key}.title`)}</h3>
                  <p>{t(`about.process.${key}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-cta">
        <div className="container">
          <div className="about-cta__box reveal">
            <h2>{t('about.ctaTitle')}</h2>
            <p>{t('about.ctaText')}</p>
            <a href="https://wa.link/cszcj8" target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
              {t('about.requestInspection')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
