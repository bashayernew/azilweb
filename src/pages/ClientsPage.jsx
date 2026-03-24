import { useEffect } from 'react'
import { Check } from 'lucide-react'
import PageHero from '../components/PageHero'
import { useLanguage } from '../contexts/LanguageContext'
import '../components/shared.css'
import './ClientsPage.css'

function ClientsPage() {
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

  const categories = t('clients.categories')
  const categoryList = Array.isArray(categories) ? categories : []

  return (
    <div className="clients-page">
      <PageHero
        title={t('clients.title')}
        subtitle={t('clients.subtitle')}
        overline={t('clients.overline')}
      />

      <section className="section clients-intro">
        <div className="container container--narrow">
          <div className="clients-intro__content reveal">
            <h2>{t('clients.heading')}</h2>
            <p>{t('clients.intro')}</p>
          </div>
        </div>
      </section>

      <section className="section section--alt clients-categories">
        <div className="container">
          <div className="section-title reveal">
            <span className="section-title__overline">{t('clients.categoriesOverline')}</span>
            <h2 className="section-title__heading">{t('clients.categoriesHeading')}</h2>
          </div>
          <div className="clients-categories__grid">
            {categoryList.map((cat, i) => (
              <div key={i} className="client-category-card reveal">
                <div className="client-category-card__icon">
                  <Check size={20} strokeWidth={2} />
                </div>
                <h3>{cat}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section clients-trust">
        <div className="container">
          <div className="trust-cards reveal">
            <div className="trust-card">
              <span className="trust-card__value">+12</span>
              <span className="trust-card__label">{t('clients.statYears')}</span>
            </div>
            <div className="trust-card">
              <span className="trust-card__value">+100</span>
              <span className="trust-card__label">{t('clients.statClients')}</span>
            </div>
            <div className="trust-card">
              <span className="trust-card__value">{t('home.statAreasVal')}</span>
              <span className="trust-card__label">{t('clients.statAreas')}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt clients-cta">
        <div className="container">
          <div className="clients-cta__box reveal">
            <h2>{t('clients.ctaTitle')}</h2>
            <p>{t('clients.ctaText')}</p>
            <a href="https://wa.link/cszcj8" target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
              {t('clients.requestInspection')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ClientsPage
