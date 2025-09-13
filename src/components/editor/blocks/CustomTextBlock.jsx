import { FileText } from 'lucide-react'

const CustomTextBlock = ({ 
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
      <div className="max-w-3xl mx-auto text-center">
        {/* Icon */}
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: `${theme.colorPalette}15` }}
        >
          <FileText 
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
            className="text-base md:text-lg leading-relaxed opacity-90 whitespace-pre-line"
            style={{ color: theme.colorPalette }}
          >
            {typeof block.content === 'string' ? block.content : 'Contenido personalizado...'}
          </p>
        </div>
      </div>

      {/* Edit Indicator */}
      {isSelected && !previewMode && (
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
          Editando {block.title}
        </div>
      )}
    </div>
  )
}

export default CustomTextBlock
