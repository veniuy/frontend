import { Button } from '../../ui/button'
import { Card, CardContent } from '../ui/card'
import { Hotel, MapPin, Phone } from 'lucide-react'

const AccommodationsBlock = ({ 
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
            <Hotel 
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
          <div 
            className="h-px w-24 mx-auto"
            style={{ backgroundColor: `${theme.colorPalette}30` }}
          />
        </div>

        {/* Accommodations List */}
        {block.items && block.items.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
            {block.items.map((item, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${theme.colorPalette}15` }}
                    >
                      <Hotel 
                        className="w-6 h-6"
                        style={{ color: theme.colorPalette }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 
                        className="text-lg font-medium mb-3"
                        style={{ color: theme.colorPalette }}
                      >
                        {item.name}
                      </h4>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {item.description}
                      </p>
                      
                      {item.code && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <div className="text-sm font-medium text-gray-700 mb-1">
                            Código de Reserva:
                          </div>
                          <div 
                            className="font-mono text-lg font-bold"
                            style={{ color: theme.colorPalette }}
                          >
                            {item.code}
                          </div>
                        </div>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        style={{ 
                          borderColor: theme.colorPalette,
                          color: theme.colorPalette
                        }}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Ver Ubicación
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Additional Info */}
        <div className="text-center mt-12">
          <div 
            className="inline-block px-6 py-3 rounded-full text-sm"
            style={{ 
              backgroundColor: `${theme.colorPalette}10`,
              color: theme.colorPalette
            }}
          >
            💡 Menciona el código al hacer tu reserva para obtener tarifas especiales
          </div>
        </div>
      </div>

      {/* Edit Indicator */}
      {isSelected && !previewMode && (
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
          Editando Alojamiento
        </div>
      )}
    </div>
  )
}

export default AccommodationsBlock
