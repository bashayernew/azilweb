import { useLanguage } from '../contexts/LanguageContext'
import './ImagePlaceholder.css'

function ImagePlaceholder({ className = '', aspectRatio = '16/9', variant }) {
  const { t } = useLanguage()
  const variantClass = variant === 'dark' ? ' image-placeholder--on-dark' : ''
  return (
    <div
      className={`image-placeholder${variantClass} ${className}`.trim()}
      style={{ aspectRatio }}
      aria-hidden="true"
    >
      <span className="image-placeholder__label">{t('common.imagePlaceholder')}</span>
    </div>
  )
}

export default ImagePlaceholder
