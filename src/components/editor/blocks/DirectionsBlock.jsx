import { Car, Navigation, Plane } from 'lucide-react'

const DirectionsBlock = ({ 
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
        isSelected && !previewMode ? 'ring-2 ring-blue-500 ring-inset bg-blue-50' : 'bg-white'
      }`}
      onClick={onClick}
      style={{ fontFamily: fontFamily }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: `${theme.colorPalette}15` }}
          >
            <Car 
              className="w-8 h-8"
              style={{ color: theme.colorPalette }}
            />
          </div>
          <h3 
            className="text-2xl md:text-3xl font-light mb-4 tracking-wide"
            style={{ color: theme.colorPalette }}
          >
            {block.title}
          </h3>
        </div>

        {/* Content */}
        <div className="prose prose-lg mx-auto text-center">
          <p 
            className="text-base md:text-lg leading-relaxed opacity-90"
            style={{ color: theme.colorPalette }}
          >
            {typeof block.content === 'string' ? block.content : 'Instrucciones para llegar al lugar...'}
          </p>
        </div>

        {/* Transportation Icons */}
        <div className="flex justify-center space-x-8 mt-12">
          <div className="text-center">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
              style={{ backgroundColor: `${theme.colorPalette}10` }}
            >
              <Car 
                className="w-6 h-6"
                style={{ color: theme.colorPalette }}
              />
            </div>
            <span className="text-sm font-medium">En Auto</span>
          </div>
          <div className="text-center">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
              style={{ backgroundColor: `${theme.colorPalette}10` }}
            >
              <Plane 
                className="w-6 h-6"
                style={{ color: theme.colorPalette }}
              />
            </div>
            <span className="text-sm font-medium">En Avión</span>
          </div>
        </div>
      </div>

      {/* Edit Indicator */}
      {isSelected && !previewMode && (
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
          Editando Direcciones
        </div>
      )}
    </div>
  )
}

export default DirectionsBlock
