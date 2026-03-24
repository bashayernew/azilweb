import { useState } from 'react'
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react'
import PageHero from '../components/PageHero'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { useLanguage } from '../contexts/LanguageContext'
import '../components/shared.css'
import './ContactPage.css'

function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = `${t('contact.waMessageIntro')} ${formData.name}\n${t('contact.waMessagePhone')}: ${formData.phone}\n${t('contact.waMessageInquiry')}: ${formData.message}`
    const waUrl = `https://wa.link/cszcj8?text=${encodeURIComponent(msg)}`
    window.open(waUrl, '_blank')
  }

  return (
    <div className="contact-page">
      <PageHero
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
        overline={t('contact.overline')}
      />

      <section className="section contact-main">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>{t('contact.infoHeading')}</h2>
              <div className="contact-cards">
                <div className="contact-card">
                  <div className="contact-card__icon"><Phone size={22} strokeWidth={1.5} /></div>
                  <h3>{t('contact.phone')}</h3>
                  <a href="tel:+96524915426">+965 24915426</a>
                  <a href="tel:+96524915427">+965 24915427</a>
                </div>
                <div className="contact-card">
                  <div className="contact-card__icon"><MessageCircle size={22} strokeWidth={1.5} /></div>
                  <h3>{t('contact.whatsapp')}</h3>
                  <a href="https://wa.link/cszcj8" target="_blank" rel="noopener noreferrer">
                    +965 95595244
                  </a>
                </div>
                <div className="contact-card">
                  <div className="contact-card__icon"><Mail size={22} strokeWidth={1.5} /></div>
                  <h3>{t('contact.email')}</h3>
                  <a href="mailto:alhamra.q8@gmail.com">alhamra.q8@gmail.com</a>
                </div>
                <div className="contact-card">
                  <div className="contact-card__icon"><MapPin size={22} strokeWidth={1.5} /></div>
                  <h3>{t('contact.address')}</h3>
                  <p>{t('footer.address')}</p>
                  <a href="https://goo.gl/maps/Hd29zfMHLa1km9WG8" target="_blank" rel="noopener noreferrer" className="contact-card__map-link">
                    {t('contact.viewOnMap')}
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h2>{t('contact.formHeading')}</h2>
              <p className="contact-form__intro">{t('contact.formIntro')}</p>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">{t('contact.nameLabel')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">{t('contact.phoneLabel')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder={t('contact.phonePlaceholder')}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">{t('contact.emailLabel')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">{t('contact.messageLabel')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder={t('contact.messagePlaceholder')}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn--primary btn--lg contact-form__submit">
                  {t('contact.submitBtn')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact-map">
        <div className="container">
          <div className="map-wrapper">
            <ImagePlaceholder className="map-image-placeholder" aspectRatio="21/9" />
            <div className="map-placeholder">
              <p>{t('contact.mapTitle')}</p>
              <a
                href="https://goo.gl/maps/Hd29zfMHLa1km9WG8"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                {t('contact.viewOnGoogleMaps')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
