import { Calendar, Clock, Users } from 'lucide-react'

const BasicInfoSection = ({ 
  basicInfo, 
  theme, 
  fontFamily, 
  isSelected, 
  onClick, 
  previewMode 
}) => {
  return (
    <div 
      className={`py-16 px-8 text-center cursor-pointer transition-all ${
        isSelected && !previewMode ? 'ring-2 ring-blue-500 ring-inset bg-blue-50' : 'bg-white'
      }`}
      onClick={onClick}
      style={{ fontFamily: fontFamily }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Hosted By */}
        <div className="mb-8">
          <div className="text-sm font-medium tracking-widest uppercase mb-2 opacity-70">
            Anfitriones
          </div>
          <h2 
            className="text-2xl md:text-3xl font-light tracking-wide"
            style={{ color: theme.colorPalette }}
          >
            {basicInfo.hostedBy}
          </h2>
        </div>

        {/* Event Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Date */}
          <div className="flex flex-col items-center">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: `${theme.colorPalette}15` }}
            >
              <Calendar 
                className="w-6 h-6"
                style={{ color: theme.colorPalette }}
              />
            </div>
            <div className="text-sm font-medium tracking-wide uppercase mb-2 opacity-70">
              Cuándo
            </div>
            <div 
              className="text-lg font-medium"
              style={{ color: theme.colorPalette }}
            >
              {basicInfo.date}
            </div>
          </div>

          {/* Time */}
          <div className="flex flex-col items-center">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: `${theme.colorPalette}15` }}
            >
              <Clock 
                className="w-6 h-6"
                style={{ color: theme.colorPalette }}
              />
            </div>
            <div className="text-sm font-medium tracking-wide uppercase mb-2 opacity-70">
              Hora
            </div>
            <div 
              className="text-lg font-medium"
              style={{ color: theme.colorPalette }}
            >
              {basicInfo.time}
            </div>
          </div>
        </div>

        {/* Description */}
        {basicInfo.description && (
          <div className="max-w-2xl mx-auto">
            <div 
              className="h-px w-24 mx-auto mb-6"
              style={{ backgroundColor: `${theme.colorPalette}30` }}
            />
            <p 
              className="text-base md:text-lg leading-relaxed opacity-90"
              style={{ color: theme.colorPalette }}
            >
              {basicInfo.description}
            </p>
          </div>
        )}
      </div>

      {/* Edit Indicator */}
      {isSelected && !previewMode && (
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
          Editando Información Básica
        </div>
      )}
    </div>
  )
}

export default BasicInfoSection
