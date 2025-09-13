import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// Store principal del editor de invitaciones
const useEditorStore = create()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        // Estado del diseño actual
        currentDesign: null,
        designId: null,
        isLoading: false,
        error: null,
        
        // Estado del canvas
        canvas: {
          width: 600,
          height: 800,
          zoom: 1,
          showGrid: false,
          backgroundColor: '#ffffff'
        },
        
        // Elemento seleccionado
        selectedElement: null,
        selectedSection: null,
        
        // Historial para undo/redo
        history: [],
        historyIndex: -1,
        maxHistorySize: 50,
        
        // Configuración del editor
        config: {
          fonts: [],
          colorPalettes: [],
          canvasSizes: []
        },
        
        // Estado de la UI
        ui: {
          activeTab: 'templates', // templates, text, design, layers
          sidebarOpen: true,
          showPreview: false,
          isDirty: false // Indica si hay cambios sin guardar
        },
        
        // Plantillas disponibles
        templates: [],
        templatesLoading: false,
        
        // Secciones de la invitación
        sections: [],
        
        // Acciones para gestionar el diseño
        setCurrentDesign: (design) => set((state) => {
          state.currentDesign = design
          state.designId = design?.id || null
          state.sections = design?.sections || []
          if (design?.design_data?.canvas) {
            state.canvas = { ...state.canvas, ...design.design_data.canvas }
          }
        }),
        
        // Nuevas acciones para elementos del diseño
        addElement: (element) => set((state) => {
          if (!state.currentDesign) return
          
          const newElement = {
            id: `${element.type}_${Date.now()}`,
            x: 300,
            y: 300,
            ...element
          }
          
          if (!state.currentDesign.design_data) {
            state.currentDesign.design_data = { elements: [] }
          }
          if (!state.currentDesign.design_data.elements) {
            state.currentDesign.design_data.elements = []
          }
          
          state.currentDesign.design_data.elements.push(newElement)
          state.selectedElement = newElement
          state.ui.isDirty = true
        }),
        
        updateElement: (elementId, updates) => set((state) => {
          if (!state.currentDesign?.design_data?.elements) return
          
          const elementIndex = state.currentDesign.design_data.elements.findIndex(el => el.id === elementId)
          if (elementIndex !== -1) {
            state.currentDesign.design_data.elements[elementIndex] = {
              ...state.currentDesign.design_data.elements[elementIndex],
              ...updates
            }
            state.ui.isDirty = true
          }
        }),
        
        deleteElement: (elementId) => set((state) => {
          if (!state.currentDesign?.design_data?.elements) return
          
          state.currentDesign.design_data.elements = state.currentDesign.design_data.elements.filter(
            el => el.id !== elementId
          )
          
          if (state.selectedElement?.id === elementId) {
            state.selectedElement = null
          }
          
          state.ui.isDirty = true
        }),
        
        moveElement: (elementId, direction) => set((state) => {
          if (!state.currentDesign?.design_data?.elements) return
          
          const elements = state.currentDesign.design_data.elements
          const index = elements.findIndex(el => el.id === elementId)
          
          if (index === -1) return
          
          let newIndex
          if (direction === 'up' && index > 0) {
            newIndex = index - 1
          } else if (direction === 'down' && index < elements.length - 1) {
            newIndex = index + 1
          } else {
            return
          }
          
          [elements[index], elements[newIndex]] = [elements[newIndex], elements[index]]
          state.ui.isDirty = true
        }),
        
        setLoading: (loading) => set((state) => {
          state.isLoading = loading
        }),
        
        setError: (error) => set((state) => {
          state.error = error
        }),
        
        // Acciones del canvas
        updateCanvas: (canvasUpdates) => set((state) => {
          state.canvas = { ...state.canvas, ...canvasUpdates }
          state.ui.isDirty = true
        }),
        
        setZoom: (zoom) => set((state) => {
          state.canvas.zoom = Math.max(0.25, Math.min(2, zoom))
        }),
        
        toggleGrid: () => set((state) => {
          state.canvas.showGrid = !state.canvas.showGrid
        }),
        
        // Acciones de selección
        selectElement: (element) => set((state) => {
          state.selectedElement = element
          state.selectedSection = null
        }),
        
        selectSection: (section) => set((state) => {
          state.selectedSection = section
          state.selectedElement = null
        }),
        
        clearSelection: () => set((state) => {
          state.selectedElement = null
          state.selectedSection = null
        }),
        
        // Acciones de secciones
        updateSection: (sectionId, updates) => set((state) => {
          const sectionIndex = state.sections.findIndex(s => s.id === sectionId)
          if (sectionIndex !== -1) {
            state.sections[sectionIndex] = { ...state.sections[sectionIndex], ...updates }
            state.ui.isDirty = true
          }
        }),
        
        toggleSectionEnabled: (sectionId) => set((state) => {
          const section = state.sections.find(s => s.id === sectionId)
          if (section) {
            section.is_enabled = !section.is_enabled
            state.ui.isDirty = true
          }
        }),
        
        reorderSections: (fromIndex, toIndex) => set((state) => {
          const sections = [...state.sections]
          const [removed] = sections.splice(fromIndex, 1)
          sections.splice(toIndex, 0, removed)
          
          // Actualizar sort_order
          sections.forEach((section, index) => {
            section.sort_order = index + 1
          })
          
          state.sections = sections
          state.ui.isDirty = true
        }),
        
        // Acciones del historial
        addToHistory: (action) => set((state) => {
          // Crear snapshot del estado actual
          const snapshot = {
            timestamp: Date.now(),
            action,
            design_data: state.currentDesign?.design_data ? 
              JSON.parse(JSON.stringify(state.currentDesign.design_data)) : null,
            sections: state.sections ? 
              JSON.parse(JSON.stringify(state.sections)) : []
          }
          
          // Remover elementos del historial después del índice actual
          if (state.historyIndex < state.history.length - 1) {
            state.history = state.history.slice(0, state.historyIndex + 1)
          }
          
          // Añadir nuevo snapshot
          state.history.push(snapshot)
          
          // Mantener el tamaño máximo del historial
          if (state.history.length > state.maxHistorySize) {
            state.history = state.history.slice(-state.maxHistorySize)
          }
          
          state.historyIndex = state.history.length - 1
        }),
        
        undo: () => set((state) => {
          if (state.historyIndex > 0) {
            state.historyIndex -= 1
            const snapshot = state.history[state.historyIndex]
            
            if (snapshot.design_data && state.currentDesign) {
              state.currentDesign.design_data = snapshot.design_data
            }
            if (snapshot.sections) {
              state.sections = snapshot.sections
            }
            
            state.ui.isDirty = true
          }
        }),
        
        redo: () => set((state) => {
          if (state.historyIndex < state.history.length - 1) {
            state.historyIndex += 1
            const snapshot = state.history[state.historyIndex]
            
            if (snapshot.design_data && state.currentDesign) {
              state.currentDesign.design_data = snapshot.design_data
            }
            if (snapshot.sections) {
              state.sections = snapshot.sections
            }
            
            state.ui.isDirty = true
          }
        }),
        
        canUndo: () => {
          const state = get()
          return state.historyIndex > 0
        },
        
        canRedo: () => {
          const state = get()
          return state.historyIndex < state.history.length - 1
        },
        
        // Acciones de la UI
        setActiveTab: (tab) => set((state) => {
          state.ui.activeTab = tab
        }),
        
        toggleSidebar: () => set((state) => {
          state.ui.sidebarOpen = !state.ui.sidebarOpen
        }),
        
        togglePreview: () => set((state) => {
          state.ui.showPreview = !state.ui.showPreview
        }),
        
        setDirty: (dirty) => set((state) => {
          state.ui.isDirty = dirty
        }),
        
        // Acciones para plantillas
        setTemplates: (templates) => set((state) => {
          state.templates = templates
        }),
        
        setTemplatesLoading: (loading) => set((state) => {
          state.templatesLoading = loading
        }),
        
        // Acciones para configuración
        setConfig: (config) => set((state) => {
          state.config = { ...state.config, ...config }
        }),
        
        // Acción para resetear el store
        reset: () => set((state) => {
          state.currentDesign = null
          state.designId = null
          state.isLoading = false
          state.error = null
          state.selectedElement = null
          state.selectedSection = null
          state.history = []
          state.historyIndex = -1
          state.sections = []
          state.ui.isDirty = false
          state.ui.activeTab = 'templates'
          state.canvas = {
            width: 600,
            height: 800,
            zoom: 1,
            showGrid: false,
            backgroundColor: '#ffffff'
          }
        }),
        
        // Utilidades
        getSelectedSectionData: () => {
          const state = get()
          if (!state.selectedSection) return null
          return state.sections.find(s => s.id === state.selectedSection.id)
        },
        
        getSectionByType: (type) => {
          const state = get()
          return state.sections.find(s => s.type === type)
        },
        
        getEnabledSections: () => {
          const state = get()
          return state.sections.filter(s => s.is_enabled).sort((a, b) => a.sort_order - b.sort_order)
        }
      }))
    ),
    {
      name: 'editor-store',
      partialize: (state) => ({
        // Solo persistir ciertos campos
        canvas: state.canvas,
        ui: {
          activeTab: state.ui.activeTab,
          sidebarOpen: state.ui.sidebarOpen
        }
      })
    }
  )
)

export default useEditorStore
