import { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { ScrollArea } from '../ui/scroll-area'
import { 
  Palette, 
  Type, 
  Layout, 
  Plus, 
  Settings,
  Image,
  AlignLeft
} from 'lucide-react'
import { FONT_FAMILIES } from '../../hooks/useInvitationEditor'
import PageStylesPanel from './panels/PageStylesPanel'
import DetailsPanel from './panels/DetailsPanel'
import AddBlocksPanel from './panels/AddBlocksPanel'

const EditorSidebar = ({ 
  invitation, 
  selectedElement, 
  activePanel, 
  setActivePanel,
  updateInvitation,
  updateElement,
  addBlock,
  removeBlock 
}) => {
  const sidebarTabs = [
    { id: 'styles', label: 'Page Styles', icon: Type },
    { id: 'details', label: 'Details', icon: Settings },
    { id: 'blocks', label: 'Add Blocks', icon: Plus },
    { id: 'pageStyle', label: 'Page Style', icon: Palette },
    { id: 'headerLogo', label: 'Header Logo', icon: Image }
  ]

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'styles':
        return (
          <PageStylesPanel
            invitation={invitation}
            updateInvitation={updateInvitation}
            updateElement={updateElement}
          />
        )
      case 'details':
        return (
          <DetailsPanel
            invitation={invitation}
            selectedElement={selectedElement}
            updateElement={updateElement}
          />
        )
      case 'blocks':
        return (
          <AddBlocksPanel
            invitation={invitation}
            addBlock={addBlock}
            removeBlock={removeBlock}
          />
        )
      case 'pageStyle':
        return (
          <div className="p-4">
            <h3 className="font-medium mb-4">Configuración de Página</h3>
            <p className="text-sm text-gray-600">Configuraciones globales de la página...</p>
          </div>
        )
      case 'headerLogo':
        return (
          <div className="p-4">
            <h3 className="font-medium mb-4">Logo del Encabezado</h3>
            <p className="text-sm text-gray-600">Gestión del logo y elementos del encabezado...</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Sidebar Tabs */}
      <div className="border-b border-gray-200 p-2">
        <div className="space-y-1">
          {sidebarTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activePanel === tab.id
            
            return (
              <Button
                key={tab.id}
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActivePanel(tab.id)}
                className={`w-full justify-start text-left ${
                  isActive ? 'bg-blue-50 text-blue-700 border-blue-200' : 'hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                <span className="text-xs font-medium">{tab.label}</span>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Panel Content */}
      <ScrollArea className="flex-1">
        {renderActivePanel()}
      </ScrollArea>
    </div>
  )
}

export default EditorSidebar
