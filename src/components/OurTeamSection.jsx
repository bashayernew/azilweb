import { Link } from 'react-router-dom'
import { publicAsset } from '../constants/serviceImages'
import { useLanguage } from '../contexts/LanguageContext'
import './OurTeamSection.css'

/** Public asset — filename contains a space (encoded for URL safety). */
const TEAM_PHOTO_PATH = 'tam%20image.webp'

function OurTeamSection() {
  const { t, path } = useLanguage()

  return (
    <section className="our-team" aria-labelledby="our-team-heading">
      <div className="container">
        <header className="our-team__header section-title reveal">
          <h2 id="our-team-heading" className="our-team__heading">
            {t('home.teamHeading')}
          </h2>
          <p className="our-team__subtitle">{t('home.teamSub')}</p>
        </header>

        <div className="our-team__row reveal">
          <div className="our-team__visual">
            <figure className="our-team__figure">
              <div className="our-team__frame">
                <img
                  className="our-team__img"
                  src={publicAsset(TEAM_PHOTO_PATH)}
                  alt={t('home.teamImageAlt')}
                  loading="lazy"
                  decoding="async"
                />
                <div className="our-team__overlay" aria-hidden="true" />
              </div>
            </figure>
          </div>

          <div className="our-team__copy">
            <p className="our-team__summary">{t('home.teamSummary')}</p>
            <Link to={path('team')} className="btn btn--primary btn--lg our-team__cta">
              {t('home.teamCta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurTeamSection
