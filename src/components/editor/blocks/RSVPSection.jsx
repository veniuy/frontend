import { Button } from '../ui/button'
import { Heart, Calendar } from 'lucide-react'

const RSVPSection = ({ 
  rsvp, 
  theme, 
  fontFamily, 
  isSelected, 
  onClick, 
  previewMode 
}) => {
  return (
    <div 
      className={`py-16 px-8 text-center cursor-pointer transition-all ${
        isSelected && !previewMode ? 'ring-2 ring-blue-500 ring-inset' : ''
      }`}
      onClick={onClick}
      style={{ 
        backgroundColor: `${theme.colorPalette}08`,
        fontFamily: fontFamily 
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${theme.colorPalette}15` }}
          >
            <Heart 
              className="w-8 h-8"
              style={{ color: theme.colorPalette }}
            />
          </div>
        </div>

        {/* Title */}
        <h3 
          className="text-2xl md:text-3xl font-light mb-6 tracking-wide"
          style={{ color: theme.colorPalette }}
        >
          Confirmación de Asistencia
        </h3>

        {/* Description */}
        <p 
          className="text-base md:text-lg mb-8 leading-relaxed opacity-90"
          style={{ color: theme.colorPalette }}
        >
          Esperamos que seas parte de esta gran celebración. ¡Confirmanos tu asistencia!
        </p>

        {/* RSVP Button */}
        <div className="mb-8">
          <Button
            size="lg"
            className="px-8 py-3 rounded-full font-medium text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            style={{ 
              backgroundColor: theme.colorPalette,
              borderColor: theme.colorPalette
            }}
          >
            <Heart className="w-5 h-5 mr-2" />
            Confirmar Asistencia
          </Button>
        </div>

        {/* Deadline */}
        {rsvp.deadline && (
          <div className="text-sm opacity-70">
            <Calendar className="w-4 h-4 inline mr-2" />
            Confirma antes del {new Date(rsvp.deadline).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        )}

        {/* Divider */}
        <div className="mt-8 pt-8 border-t border-current border-opacity-20">
          <p className="text-lg font-light">
            ¡Agendá la fecha en tu calendario!
          </p>
          <Button
            variant="outline"
            className="mt-4 rounded-full px-8 py-3"
            style={{ 
              borderColor: theme.colorPalette,
              color: theme.colorPalette
            }}
          >
            <Calendar className="w-4 h-4 mr-2" />
            AGENDAR EVENTO
          </Button>
        </div>
      </div>

      {/* Edit Indicator */}
      {isSelected && !previewMode && (
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
          Editando RSVP
        </div>
      )}
    </div>
  )
}

export default RSVPSection
