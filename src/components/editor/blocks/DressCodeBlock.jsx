import { Shirt } from 'lucide-react'
const DressCodeBlock = ({ block, theme, fontFamily, isSelected, onClick, previewMode }) => {
  if (!block.visible) return null
  return (
    <div className={`py-16 px-8 cursor-pointer transition-all ${isSelected && !previewMode ? 'ring-2 ring-blue-500 ring-inset bg-blue-50' : ''}`} onClick={onClick} style={{ backgroundColor: `${theme.colorPalette}05`, fontFamily }}>
      <div className="max-w-3xl mx-auto text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: `${theme.colorPalette}15` }}>
          <Shirt className="w-8 h-8" style={{ color: theme.colorPalette }} />
        </div>
        <h3 className="text-2xl md:text-3xl font-light mb-6 tracking-wide" style={{ color: theme.colorPalette }}>{block.title}</h3>
        <p className="text-base md:text-lg leading-relaxed opacity-90" style={{ color: theme.colorPalette }}>{typeof block.content === 'string' ? block.content : 'Código de vestimenta...'}</p>
        {isSelected && !previewMode && <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">Editando Vestimenta</div>}
      </div>
    </div>
  )
}
export default DressCodeBlock
