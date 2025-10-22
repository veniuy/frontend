// Servicio de API para el editor de invitaciones
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://backend-xtqe.onrender.com/api'

class EditorApiService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/editor`
  }

  // Método auxiliar para hacer peticiones HTTP
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const defaultOptions = {
      credentials: 'include', // Incluir cookies de sesión
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    }

    const config = { ...defaultOptions, ...options }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'API request failed')
      }

      return data
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error)
      throw error
    }
  }

  // Gestión de plantillas
  async getTemplates(category = null) {
    const params = category ? `?category=${encodeURIComponent(category)}` : ''
    const response = await this.request(`/templates${params}`)
    return response.templates
  }

  async getTemplate(templateId) {
    const response = await this.request(`/templates/${templateId}`)
    return response.template
  }

  // Gestión de diseños
  async createDesign(templateId, eventId = null, designName = null) {
    const response = await this.request('/designs', {
      method: 'POST',
      body: JSON.stringify({
        template_id: templateId,
        event_id: eventId,
        design_name: designName
      })
    })
    return response.design
  }

  async getDesign(designId) {
    const response = await this.request(`/designs/${designId}`)
    return response.design
  }

  async updateDesign(designId, updates) {
    const response = await this.request(`/designs/${designId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    })
    return response.design
  }

  async deleteDesign(designId) {
    const response = await this.request(`/designs/${designId}`, {
      method: 'DELETE'
    })
    return response
  }

  async getUserDesigns(includeUnpublished = true) {
    const params = `?include_unpublished=${includeUnpublished}`
    const response = await this.request(`/designs${params}`)
    return response.designs
  }

  async publishDesign(designId) {
    const response = await this.request(`/designs/${designId}/publish`, {
      method: 'POST'
    })
    return response.design
  }

  async duplicateDesign(designId, newName = null) {
    const response = await this.request(`/designs/${designId}/duplicate`, {
      method: 'POST',
      body: JSON.stringify({
        new_name: newName
      })
    })
    return response.design
  }

  // Gestión de secciones
  async updateSection(designId, sectionId, updates) {
    const response = await this.request(`/designs/${designId}/sections/${sectionId}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    })
    return response.section
  }

  // Previsualización
  async getDesignPreview(designId) {
    const response = await this.request(`/designs/${designId}/preview`)
    return response.preview
  }

  // Configuración del editor
  async getEditorConfig() {
    const response = await this.request('/config')
    return response.config
  }

  // Exportación (placeholder para futuras implementaciones)
  async exportToPDF(designId) {
    const response = await this.request(`/designs/${designId}/export/pdf`, {
      method: 'POST'
    })
    return response
  }

  async exportToImage(designId, format = 'png') {
    const response = await this.request(`/designs/${designId}/export/image`, {
      method: 'POST',
      body: JSON.stringify({ format })
    })
    return response
  }

  // Subida de assets (placeholder)
  async uploadAsset(designId, file) {
    const formData = new FormData()
    formData.append('file', file)

    const response = await this.request(`/designs/${designId}/assets`, {
      method: 'POST',
      headers: {}, // Remover Content-Type para FormData
      body: formData
    })
    return response
  }
}

// Instancia singleton del servicio
const editorApi = new EditorApiService()

// Funciones de conveniencia para usar en los componentes
export const templateApi = {
  getAll: (category) => editorApi.getTemplates(category),
  getById: (id) => editorApi.getTemplate(id)
}

export const designApi = {
  create: (templateId, eventId, designName) => editorApi.createDesign(templateId, eventId, designName),
  get: (id) => editorApi.getDesign(id),
  update: (id, updates) => editorApi.updateDesign(id, updates),
  delete: (id) => editorApi.deleteDesign(id),
  getUserDesigns: (includeUnpublished) => editorApi.getUserDesigns(includeUnpublished),
  publish: (id) => editorApi.publishDesign(id),
  duplicate: (id, newName) => editorApi.duplicateDesign(id, newName),
  getPreview: (id) => editorApi.getDesignPreview(id)
}

export const sectionApi = {
  update: (designId, sectionId, updates) => editorApi.updateSection(designId, sectionId, updates)
}

export const configApi = {
  get: () => editorApi.getEditorConfig()
}

export const exportApi = {
  toPDF: (designId) => editorApi.exportToPDF(designId),
  toImage: (designId, format) => editorApi.exportToImage(designId, format)
}

export const assetApi = {
  upload: (designId, file) => editorApi.uploadAsset(designId, file)
}

export default editorApi
