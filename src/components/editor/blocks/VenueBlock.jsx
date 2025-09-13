import { MapPin, Navigation } from 'lucide-react'
import { Button } from '../ui/button'

const VenueBlock = ({ 
  block, 
  theme, 
  fontFamily, 
  isSelected, 
  onClick, 
  previewMode 
}) => {
  if (!block.visible) return null

  return (
    <div 
      className={`py-16 px-8 cursor-pointer transition-all ${
        isSelected && !previewMode ? 'ring-2 ring-blue-500 ring-inset bg-blue-50' : ''
      }`}
      onClick={onClick}
      style={{ 
        backgroundColor: `${theme.colorPalette}05`,
        fontFamily: fontFamily 
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Icon */}
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: `${theme.colorPalette}15` }}
        >
          <MapPin 
            className="w-8 h-8"
            style={{ color: theme.colorPalette }}
          />
        </div>

        {/* Title */}
        <h3 
          className="text-2xl md:text-3xl font-light mb-6 tracking-wide"
          style={{ color: theme.colorPalette }}
        >
          {block.title}
        </h3>

        {/* Content */}
        <div className="mb-8">
          <p 
            className="text-base md:text-lg leading-relaxed opacity-90"
            style={{ color: theme.colorPalette }}
          >
            {typeof block.content === 'string' ? block.content : 'Información sobre el lugar de la ceremonia...'}
          </p>
        </div>

        {/* Action Button */}
        <Button
          size="lg"
          className="px-8 py-3 rounded-full font-medium text-white shadow-lg hover:shadow-xl transition-all"
          style={{ 
            backgroundColor: theme.colorPalette,
            borderColor: theme.colorPalette
          }}
        >
          <Navigation className="w-5 h-5 mr-2" />
          Ver en el Mapa
        </Button>
      </div>

      {/* Edit Indicator */}
      {isSelected && !previewMode && (
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
          Editando Lugar
        </div>
      )}
    </div>
  )
}

export default VenueBlock
