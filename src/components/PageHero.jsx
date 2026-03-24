import './PageHero.css'

function PageHero({ title, subtitle, overline }) {
  return (
    <section className="page-hero">
      <div className="page-hero__overlay"></div>
      <div className="page-hero__content container">
        {overline && <span className="page-hero__overline">{overline}</span>}
        <h1 className="page-hero__title">{title}</h1>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
      </div>
    </section>
  )
}

export default PageHero
