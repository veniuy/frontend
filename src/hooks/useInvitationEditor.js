import { useState, useCallback } from 'react'

// Datos iniciales de la invitación
const initialInvitation = {
  id: 'wedding-123',
  title: 'Seth & Lily\'s Wedding',
  style: 'airbrush',
  theme: {
    colorPalette: '#b0a7a3',
    fontFamily: 'Airbrush',
    backgroundStyle: 'image'
  },
  header: {
    backgroundImage: '/assets/templates/wedding-flowers.jpg',
    centerGraphic: 'rings',
    coupleInitials: 'S.L.',
    date: '2026',
    title: 'Seth & Lily\'s Wedding',
    subtitle: 'Nos Casamos'
  },
  basicInfo: {
    hostedBy: 'SETH & LILY',
    date: 'Sábado, 15 de Septiembre',
    time: '19:00 hs',
    description: 'Seth y Lily te invitan a celebrar su ceremonia de matrimonio. Cena y baile a continuación.'
  },
  rsvp: {
    enabled: true,
    style: 'button',
    deadline: '2024-09-10'
  },
  blocks: [
    {
      id: 'accommodations',
      type: 'accommodations',
      title: 'Dónde Alojarse',
      visible: true,
      items: [
        {
          name: 'Hotel Cliffwalk',
          description: 'Una excelente opción económica que también es la más cercana al lugar. Habrá servicio de transporte desde y hacia el lugar.',
          code: 'MOONRIVER'
        },
        {
          name: 'Hotel de Lujo',
          description: 'Un poco más elegante que el Cliffwalk, y un poco más lejos también. Pero si las sábanas de 1,000 hilos te suenan atractivas, te lo recomendamos.'
        }
      ]
    },
    {
      id: 'venue',
      type: 'venue',
      title: 'El Lugar',
      visible: true,
      content: 'Un lugar único e inolvidable para nuestra celebración.'
    },
    {
      id: 'directions',
      type: 'directions',
      title: 'Cómo Llegar',
      visible: true,
      content: 'Nuestro lugar está ubicado centralmente y es fácil de llegar, sin importar cómo planees hacerlo. En auto: Usa la salida 6 en la Ruta 95 N y gira a la derecha en el semáforo. Maneja derecho por 2 millas, y verás un letrero para Moon River Restaurant a tu izquierda.'
    }
  ]
}

// Tipografías disponibles (basadas en Paperless Post)
export const FONT_FAMILIES = {
  airbrush: {
    name: 'Airbrush',
    fontFamily: '"Brush Script MT", cursive',
    colors: ['#b0a7a3', '#8b7355', '#d4c4a8', '#6b5b73', '#a67c52', '#c9b037', '#8fbc8f', '#cd853f']
  },
  cable: {
    name: 'Cable',
    fontFamily: '"Impact", "Arial Black", sans-serif',
    colors: ['#2c2c2c', '#4a4a4a', '#6b6b6b', '#8c8c8c', '#a0a0a0', '#b8b8b8', '#d0d0d0', '#e8e8e8']
  },
  pixel: {
    name: 'Pixel',
    fontFamily: '"Courier New", monospace',
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe']
  },
  moda: {
    name: 'Moda',
    fontFamily: '"Georgia", serif',
    colors: ['#2d3436', '#636e72', '#b2bec3', '#ddd', '#74b9ff', '#0984e3', '#fd79a8', '#e84393']
  },
  ace: {
    name: 'Ace',
    fontFamily: '"Arial", sans-serif',
    colors: ['#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff', '#ff0000', '#0000ff']
  },
  ophelia: {
    name: 'Ophelia',
    fontFamily: '"Playfair Display", serif',
    colors: ['#8b4513', '#a0522d', '#cd853f', '#daa520', '#b8860b', '#ffd700', '#ffffe0', '#f5deb3']
  },
  artifact: {
    name: 'ARTIFACT',
    fontFamily: '"Roboto Condensed", sans-serif',
    colors: ['#1a1a1a', '#2c2c2c', '#3d3d3d', '#4f4f4f', '#606060', '#717171', '#828282', '#939393']
  }
}

export const useInvitationEditor = () => {
  const [invitation, setInvitation] = useState(initialInvitation)
  const [selectedElement, setSelectedElement] = useState(null)
  const [activePanel, setActivePanel] = useState('styles')

  const updateInvitation = useCallback((updates) => {
    setInvitation(prev => ({
      ...prev,
      ...updates
    }))
  }, [])

  const selectElement = useCallback((elementId, elementType) => {
    setSelectedElement({ id: elementId, type: elementType })
  }, [])

  const updateElement = useCallback((elementId, elementType, updates) => {
    setInvitation(prev => {
      const newInvitation = { ...prev }
      
      if (elementType === 'header') {
        newInvitation.header = { ...prev.header, ...updates }
      } else if (elementType === 'basicInfo') {
        newInvitation.basicInfo = { ...prev.basicInfo, ...updates }
      } else if (elementType === 'block') {
        newInvitation.blocks = prev.blocks.map(block => 
          block.id === elementId ? { ...block, ...updates } : block
        )
      } else if (elementType === 'theme') {
        newInvitation.theme = { ...prev.theme, ...updates }
      }
      
      return newInvitation
    })
  }, [])

  const addBlock = useCallback((blockType) => {
    const newBlock = {
      id: `block-${Date.now()}`,
      type: blockType,
      title: getBlockTitle(blockType),
      visible: true,
      content: getBlockDefaultContent(blockType)
    }
    
    setInvitation(prev => ({
      ...prev,
      blocks: [...prev.blocks, newBlock]
    }))
  }, [])

  const removeBlock = useCallback((blockId) => {
    setInvitation(prev => ({
      ...prev,
      blocks: prev.blocks.filter(block => block.id !== blockId)
    }))
  }, [])

  const reorderBlocks = useCallback((startIndex, endIndex) => {
    setInvitation(prev => {
      const newBlocks = Array.from(prev.blocks)
      const [reorderedItem] = newBlocks.splice(startIndex, 1)
      newBlocks.splice(endIndex, 0, reorderedItem)
      
      return {
        ...prev,
        blocks: newBlocks
      }
    })
  }, [])

  return {
    invitation,
    setInvitation,
    selectedElement,
    activePanel,
    setActivePanel,
    updateInvitation,
    selectElement,
    updateElement,
    addBlock,
    removeBlock,
    reorderBlocks
  }
}

// Funciones auxiliares
function getBlockTitle(blockType) {
  const titles = {
    accommodations: 'Alojamiento',
    venue: 'El Lugar',
    directions: 'Cómo Llegar',
    shuttle: 'Transporte',
    schedule: 'Cronograma',
    weddingParty: 'Cortejo Nupcial',
    registry: 'Lista de Regalos',
    dressCode: 'Código de Vestimenta',
    photos: 'Galería de Fotos',
    customText: 'Texto Personalizado'
  }
  return titles[blockType] || 'Nuevo Bloque'
}

function getBlockDefaultContent(blockType) {
  const defaults = {
    accommodations: {
      items: [
        {
          name: 'Hotel Principal',
          description: 'Descripción del hotel...',
          code: 'CODIGO'
        }
      ]
    },
    venue: 'Información sobre el lugar de la ceremonia...',
    directions: 'Instrucciones para llegar al lugar...',
    shuttle: 'Información sobre el transporte...',
    schedule: 'Cronograma del día de la boda...',
    weddingParty: 'Información sobre el cortejo nupcial...',
    registry: 'Información sobre la lista de regalos...',
    dressCode: 'Código de vestimenta para el evento...',
    photos: 'Galería de fotos...',
    customText: 'Tu texto personalizado aquí...'
  }
  return defaults[blockType] || 'Contenido del bloque...'
}
