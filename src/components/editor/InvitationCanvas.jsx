import { useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../../ui/button'
import { Badge } from '../ui/badge'
import { FONT_FAMILIES } from '../../hooks/useInvitationEditor'
import HeaderSection from './blocks/HeaderSection'
import BasicInfoSection from './blocks/BasicInfoSection'
import RSVPSection from './blocks/RSVPSection'
import AccommodationsBlock from './blocks/AccommodationsBlock'
import VenueBlock from './blocks/VenueBlock'
import DirectionsBlock from './blocks/DirectionsBlock'
import ShuttleBlock from './blocks/ShuttleBlock'
import ScheduleBlock from './blocks/ScheduleBlock'
import WeddingPartyBlock from './blocks/WeddingPartyBlock'
import RegistryBlock from './blocks/RegistryBlock'
import DressCodeBlock from './blocks/DressCodeBlock'
import PhotosBlock from './blocks/PhotosBlock'
import CustomTextBlock from './blocks/CustomTextBlock'

const InvitationCanvas = ({ 
  invitation, 
  selectedElement, 
  selectElement, 
  updateElement, 
  previewMode 
}) => {
  const currentFont = FONT_FAMILIES[invitation.style] || FONT_FAMILIES.airbrush
  const theme = invitation.theme

  const handleElementClick = (elementId, elementType, event) => {
    if (!previewMode) {
      event.stopPropagation()
      selectElement(elementId, elementType)
    }
  }

  const isSelected = (elementId, elementType) => {
    return selectedElement?.id === elementId && selectedElement?.type === elementType
  }

  const getBlockComponent = (block) => {
    const blockProps = {
      key: block.id,
      block,
      theme,
      fontFamily: currentFont.fontFamily,
      isSelected: isSelected(block.id, 'block'),
      onClick: (e) => handleElementClick(block.id, 'block', e),
      previewMode
    }

    switch (block.type) {
      case 'accommodations':
        return <AccommodationsBlock {...blockProps} />
      case 'venue':
        return <VenueBlock {...blockProps} />
      case 'directions':
        return <DirectionsBlock {...blockProps} />
      case 'shuttle':
        return <ShuttleBlock {...blockProps} />
      case 'schedule':
        return <ScheduleBlock {...blockProps} />
      case 'weddingParty':
        return <WeddingPartyBlock {...blockProps} />
      case 'registry':
        return <RegistryBlock {...blockProps} />
      case 'dressCode':
        return <DressCodeBlock {...blockProps} />
      case 'photos':
        return <PhotosBlock {...blockProps} />
      case 'customText':
        return <CustomTextBlock {...blockProps} />
      default:
        return <CustomTextBlock {...blockProps} />
    }
  }

  return (
    <div className="flex-1 bg-gray-100 overflow-auto">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Simulación de navegador */}
        <div className="bg-white rounded-t-lg border border-gray-200 p-2 flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-1 bg-gray-100 rounded px-3 py-1 text-xs text-gray-600">
            paperlesspost.com/create/wedding-invitation
          </div>
          {!previewMode && (
            <Badge variant="secondary" className="text-xs">
              MODO EDICIÓN
            </Badge>
          )}
        </div>

        {/* Invitación */}
        <div 
          className="bg-white border-l border-r border-b border-gray-200 rounded-b-lg shadow-lg overflow-hidden"
          style={{ fontFamily: currentFont.fontFamily }}
        >
          {/* Header Section */}
          <HeaderSection
            header={invitation.header}
            theme={theme}
            fontFamily={currentFont.fontFamily}
            isSelected={isSelected('header', 'header')}
            onClick={(e) => handleElementClick('header', 'header', e)}
            previewMode={previewMode}
          />

          {/* Basic Info Section */}
          <BasicInfoSection
            basicInfo={invitation.basicInfo}
            theme={theme}
            fontFamily={currentFont.fontFamily}
            isSelected={isSelected('basicInfo', 'basicInfo')}
            onClick={(e) => handleElementClick('basicInfo', 'basicInfo', e)}
            previewMode={previewMode}
          />

          {/* RSVP Section */}
          {invitation.rsvp.enabled && (
            <RSVPSection
              rsvp={invitation.rsvp}
              theme={theme}
              fontFamily={currentFont.fontFamily}
              isSelected={isSelected('rsvp', 'rsvp')}
              onClick={(e) => handleElementClick('rsvp', 'rsvp', e)}
              previewMode={previewMode}
            />
          )}

          {/* Dynamic Blocks */}
          {invitation.blocks
            .filter(block => block.visible)
            .map(block => getBlockComponent(block))
          }

          {/* Footer */}
          <div className="p-8 text-center border-t border-gray-100">
            <div className="text-sm text-gray-500 mb-2">
              Creado con ❤️ para Seth & Lily
            </div>
            <div className="text-xs text-gray-400">
              Editor de Invitaciones - Estilo Paperless Post
            </div>
          </div>
        </div>

        {/* Información adicional en modo edición */}
        {!previewMode && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">💡 Modo Edición Activo</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Haz clic en cualquier elemento para editarlo</li>
              <li>• Los elementos seleccionados se resaltan con un borde azul</li>
              <li>• Usa el panel lateral para modificar contenido y estilos</li>
              <li>• Cambia a "Vista Previa" para ver el resultado final</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default InvitationCanvas
