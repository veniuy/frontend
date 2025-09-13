// CategoryHero.jsx - Hero section para páginas de categoría
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { onImgError } from '../../utils/assets'

const CategoryHero = ({ 
  title, 
  subtitle, 
  image, 
  ctaText, 
  ctaLink,
  className = '' 
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (ctaLink) {
      navigate(ctaLink)
    }
  }

  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div className="relative min-h-[520px] flex items-end justify-center">
        {/* Imagen de fondo */}
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => onImgError(e, title)}
          loading="eager"
          decoding="async"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/12" />
        
        {/* Tarjeta CTA */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
          className="relative z-[1] mb-7 w-[82%] max-w-[520px] bg-white/95 backdrop-blur-[1px] text-center shadow-xl px-4 py-3 cursor-pointer select-none border border-black/10 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:scale-[1.02]"
          aria-label={`${ctaText} - ${title}`}
        >
          <h1 className="font-display font-bold text-[20px] sm:text-[22px] lg:text-[24px] leading-snug text-foreground">
            {title}
          </h1>
          <div className="mt-1 text-[11px] tracking-[0.12em] text-muted-foreground font-medium">
            {subtitle}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoryHero
