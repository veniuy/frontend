import { useState } from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  ArrowLeft, 
  Eye, 
  Save, 
  ArrowRight
} from 'lucide-react'
import EditorSidebar from './editor/EditorSidebar'
import InvitationCanvas from './editor/InvitationCanvas'
import { useInvitationEditor } from '../hooks/useInvitationEditor'
import { useNavigate } from 'react-router-dom'

const WeddingInvitationEditor = () => {
  const navigate = useNavigate()
  const {
    invitation,
    selectedElement,
    activePanel,
    setActivePanel,
    updateInvitation,
    selectElement,
    updateElement,
    addBlock,
    removeBlock,
    reorderBlocks
  } = useInvitationEditor()

  const [previewMode, setPreviewMode] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center space-x-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver</span>
          </Button>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-pink-100 text-pink-800">
              EDITOR DE INVITACIONES
            </Badge>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>{previewMode ? 'Editar' : 'Vista Previa'}</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Guardar</span>
          </Button>
          <Button size="sm" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
            <ArrowRight className="w-4 h-4" />
            <span>Siguiente</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {!previewMode && (
          <EditorSidebar
            invitation={invitation}
            selectedElement={selectedElement}
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            updateInvitation={updateInvitation}
            updateElement={updateElement}
            addBlock={addBlock}
            removeBlock={removeBlock}
          />
        )}

        {/* Canvas */}
        <div className="flex-1 overflow-auto">
          <InvitationCanvas
            invitation={invitation}
            selectedElement={selectedElement}
            selectElement={selectElement}
            updateElement={updateElement}
            previewMode={previewMode}
          />
        </div>
      </div>
    </div>
  )
}

export default WeddingInvitationEditor
