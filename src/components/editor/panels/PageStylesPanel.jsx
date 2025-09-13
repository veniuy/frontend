import { Button } from '../../ui/button'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { FONT_FAMILIES } from '../../hooks/useInvitationEditor'

const PageStylesPanel = ({ invitation, updateInvitation, updateElement }) => {
  const currentStyle = invitation.style
  const currentTheme = invitation.theme

  const handleStyleChange = (styleKey) => {
    const selectedFont = FONT_FAMILIES[styleKey]
    updateInvitation({
      style: styleKey,
      theme: {
        ...currentTheme,
        fontFamily: selectedFont.name,
        colorPalette: selectedFont.colors[0] // Color por defecto
      }
    })
  }

  const handleColorChange = (color) => {
    updateElement(null, 'theme', {
      colorPalette: color
    })
  }

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="font-medium mb-4 text-sm">Estilos de Página</h3>
        <div className="space-y-3">
          {Object.entries(FONT_FAMILIES).map(([key, font]) => {
            const isSelected = currentStyle === key
            
            return (
              <Card 
                key={key}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleStyleChange(key)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span 
                      className="font-medium text-lg"
                      style={{ fontFamily: font.fontFamily }}
                    >
                      {font.name}
                    </span>
                    {isSelected && (
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                        Activo
                      </Badge>
                    )}
                  </div>
                  
                  {/* Vista previa del texto */}
                  <div 
                    className="text-sm text-gray-600 mb-3"
                    style={{ fontFamily: font.fontFamily }}
                  >
                    Seth & Lily's Wedding
                  </div>
                  
                  {/* Paleta de colores */}
                  <div className="flex space-x-1">
                    {font.colors.slice(0, 4).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">+{font.colors.length - 4}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Paleta de colores para el estilo seleccionado */}
      {currentStyle && FONT_FAMILIES[currentStyle] && (
        <div>
          <h3 className="font-medium mb-4 text-sm">Colores Disponibles</h3>
          <div className="grid grid-cols-4 gap-2">
            {FONT_FAMILIES[currentStyle].colors.map((color, index) => {
              const isSelected = currentTheme.colorPalette === color
              
              return (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={`h-12 p-1 ${
                    isSelected ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => handleColorChange(color)}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <div
                      className="w-6 h-6 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs font-mono">{color.slice(1)}</span>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>
      )}

      {/* Color personalizado */}
      <div>
        <h3 className="font-medium mb-2 text-sm">Color Personalizado</h3>
        <div className="flex items-center space-x-2">
          <input
            type="color"
            value={currentTheme.colorPalette}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-8 h-8 rounded border border-gray-200 cursor-pointer"
          />
          <input
            type="text"
            value={currentTheme.colorPalette}
            onChange={(e) => handleColorChange(e.target.value)}
            className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded font-mono"
            placeholder="#000000"
          />
        </div>
      </div>

      {/* Vista previa del estilo actual */}
      <div>
        <h3 className="font-medium mb-2 text-sm">Vista Previa</h3>
        <Card className="p-4" style={{ backgroundColor: `${currentTheme.colorPalette}10` }}>
          <div 
            className="text-center"
            style={{ 
              fontFamily: FONT_FAMILIES[currentStyle]?.fontFamily,
              color: currentTheme.colorPalette
            }}
          >
            <div className="text-xl font-medium mb-1">Seth & Lily's Wedding</div>
            <div className="text-sm opacity-80">Sábado, 15 de Septiembre</div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default PageStylesPanel
