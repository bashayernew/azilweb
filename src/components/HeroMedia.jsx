import { useState } from 'react'
import { publicAsset } from '../constants/serviceImages'
import './HeroMedia.css'

/**
 * Hero video shell: HTML5 video with poster + graceful image fallback.
 * Mobile-friendly: muted, playsInline, loop (required for autoplay on iOS).
 */
function HeroMedia({ videoSrc, posterSrc, fallbackImageSrc, ariaLabel }) {
  const [videoBroken, setVideoBroken] = useState(false)

  const hasVideo = Boolean(videoSrc && String(videoSrc).trim())
  const poster = posterSrc ? publicAsset(posterSrc) : undefined
  const fallback = fallbackImageSrc ? publicAsset(fallbackImageSrc) : poster

  const showImageOnly = !hasVideo || videoBroken

  if (showImageOnly && fallback) {
    return (
      <div className="hero-media hero-media--static">
        <img
          className="hero-media__img"
          src={fallback}
          alt=""
          loading="eager"
          decoding="async"
        />
        <div className="hero-media__shine" aria-hidden="true" />
      </div>
    )
  }

  if (showImageOnly && !fallback) {
    return <div className="hero-media hero-media--empty" aria-hidden="true" />
  }

  return (
    <div className="hero-media">
      <video
        className="hero-media__video"
        src={hasVideo ? publicAsset(videoSrc) : undefined}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={ariaLabel || undefined}
        onError={() => setVideoBroken(true)}
      />
      <div className="hero-media__shine" aria-hidden="true" />
    </div>
  )
}

export default HeroMedia
