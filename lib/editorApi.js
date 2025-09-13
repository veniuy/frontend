// Cliente de API específico para el editor de invitaciones v2

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class EditorApiClient {
  constructor() {
    this.baseURL = `${API_BASE_URL}/editor`;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API Error [${options.method || 'GET'}] ${url}:`, error);
      throw error;
    }
  }

  // Plantillas
  async getTemplates(category = null) {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    
    const endpoint = `/templates${params.toString() ? `?${params.toString()}` : ''}`;
    return this.request(endpoint);
  }

  async getTemplate(templateId) {
    return this.request(`/templates/${templateId}`);
  }

  // Diseños
  async createDesign(templateId, eventId = null, designName = null) {
    return this.request('/designs', {
      method: 'POST',
      body: {
        template_id: templateId,
        event_id: eventId,
        design_name: designName
      }
    });
  }

  async getDesign(designId) {
    return this.request(`/designs/${designId}`);
  }

  async updateDesign(designId, updates) {
    return this.request(`/designs/${designId}`, {
      method: 'PUT',
      body: updates
    });
  }

  async getUserDesigns(includeUnpublished = true) {
    const params = new URLSearchParams();
    params.append('include_unpublished', includeUnpublished.toString());
    
    return this.request(`/designs?${params.toString()}`);
  }

  async publishDesign(designId) {
    return this.request(`/designs/${designId}/publish`, {
      method: 'POST'
    });
  }

  async duplicateDesign(designId, newName = null) {
    return this.request(`/designs/${designId}/duplicate`, {
      method: 'POST',
      body: newName ? { new_name: newName } : {}
    });
  }

  async deleteDesign(designId) {
    return this.request(`/designs/${designId}`, {
      method: 'DELETE'
    });
  }

  // Secciones
  async updateSection(designId, sectionId, updates) {
    return this.request(`/designs/${designId}/sections/${sectionId}`, {
      method: 'PUT',
      body: updates
    });
  }

  // Previsualización
  async getDesignPreview(designId) {
    return this.request(`/designs/${designId}/preview`);
  }

  // Assets
  async uploadAsset(designId, file, type = 'image') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    return this.request(`/designs/${designId}/assets`, {
      method: 'POST',
      headers: {}, // Eliminar Content-Type para FormData
      body: formData
    });
  }

  // Exportación
  async exportToPDF(designId, options = {}) {
    return this.request(`/designs/${designId}/export/pdf`, {
      method: 'POST',
      body: options
    });
  }

  async exportToImage(designId, format = 'png', options = {}) {
    return this.request(`/designs/${designId}/export/image`, {
      method: 'POST',
      body: { format, ...options }
    });
  }

  // Configuración
  async getEditorConfig() {
    return this.request('/config');
  }

  // Utilidades
  async saveDesignData(designId, designData) {
    return this.updateDesign(designId, { design_data: designData });
  }

  async autoSave(designId, designData) {
    // Implementar lógica de auto-guardado con debounce
    if (this.autoSaveTimeout) {
      clearTimeout(this.autoSaveTimeout);
    }

    this.autoSaveTimeout = setTimeout(async () => {
      try {
        await this.saveDesignData(designId, designData);
        console.log('Auto-guardado exitoso');
      } catch (error) {
        console.error('Error en auto-guardado:', error);
      }
    }, 2000); // Auto-guardar después de 2 segundos de inactividad
  }
}

// Hook personalizado para usar el cliente de API del editor
export function useEditorApi() {
  const [client] = React.useState(() => new EditorApiClient());
  return client;
}

// Instancia singleton del cliente
export const editorApi = new EditorApiClient();

export default editorApi;
