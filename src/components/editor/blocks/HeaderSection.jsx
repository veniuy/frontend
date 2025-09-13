import { useState } from 'react'

const HeaderSection = ({ 
  header, 
  theme, 
  fontFamily, 
  isSelected, 
  onClick, 
  previewMode 
}) => {
  const [imageError, setImageError] = useState(false)

  const getCenterGraphic = () => {
    switch (header.centerGraphic) {
      case 'rings':
        return (
          <div className="text-6xl mb-4 opacity-90">
            💍
          </div>
        )
      case 'heart':
        return (
          <div className="text-6xl mb-4 opacity-90">
            💕
          </div>
        )
      case 'monogram':
        return (
          <div 
            className="text-4xl font-bold mb-4 opacity-90 border-2 rounded-full w-20 h-20 flex items-center justify-center"
            style={{ 
              color: theme.colorPalette,
              borderColor: theme.colorPalette
            }}
          >
            {header.coupleInitials}
          </div>
        )
      default:
        return (
          <div className="text-6xl mb-4 opacity-90">
            💍
          </div>
        )
    }
  }

  return (
    <div 
      className={`relative min-h-[500px] flex items-center justify-center overflow-hidden cursor-pointer transition-all ${
        isSelected && !previewMode ? 'ring-2 ring-blue-500 ring-inset' : ''
      }`}
      onClick={onClick}
      style={{
        background: imageError || !header.backgroundImage 
          ? `linear-gradient(135deg, ${theme.colorPalette}20, ${theme.colorPalette}10)`
          : 'transparent'
      }}
    >
      {/* Background Image */}
      {header.backgroundImage && !imageError && (
        <div className="absolute inset-0">
          <img
            src={header.backgroundImage}
            alt="Wedding background"
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${theme.colorPalette}30, ${theme.colorPalette}10)`
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-4xl">
        {/* Center Graphic */}
        <div className="flex justify-center mb-6">
          {getCenterGraphic()}
        </div>

        {/* Main Title */}
        <h1 
          className="text-5xl md:text-7xl font-light mb-4 tracking-wider leading-tight"
          style={{ 
            color: theme.colorPalette,
            fontFamily: fontFamily,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {header.title}
        </h1>

        {/* Subtitle */}
        {header.subtitle && (
          <p 
            className="text-xl md:text-2xl font-light mb-6 tracking-wide opacity-90"
            style={{ 
              color: theme.colorPalette,
              fontFamily: fontFamily
            }}
          >
            {header.subtitle}
          </p>
        )}

        {/* Date */}
        {header.date && (
          <div className="flex items-center justify-center mb-6">
            <div className="h-px w-16 bg-current opacity-30" />
            <div 
              className="mx-6 text-3xl font-light tracking-widest"
              style={{ color: theme.colorPalette }}
            >
              {header.date}
            </div>
            <div className="h-px w-16 bg-current opacity-30" />
          </div>
        )}

        {/* Decorative Elements */}
        <div className="flex justify-center space-x-4 opacity-60">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: theme.colorPalette }}
          />
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: theme.colorPalette }}
          />
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: theme.colorPalette }}
          />
        </div>
      </div>

      {/* Edit Indicator */}
      {isSelected && !previewMode && (
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
          Editando Encabezado
        </div>
      )}
    </div>
  )
}

export default HeaderSection
