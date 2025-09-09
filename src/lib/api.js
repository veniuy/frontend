// API client para comunicarse con el backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

class ApiClient {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Para incluir cookies de sesión
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en la solicitud');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Métodos de autenticación
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: userData,
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: credentials,
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Métodos de eventos
  async getEvents() {
    return this.request('/events');
  }

  async createEvent(eventData) {
    return this.request('/events', {
      method: 'POST',
      body: eventData,
    });
  }

  async getEvent(eventId) {
    return this.request(`/events/${eventId}`);
  }

  async updateEvent(eventId, eventData) {
    return this.request(`/events/${eventId}`, {
      method: 'PUT',
      body: eventData,
    });
  }

  async deleteEvent(eventId) {
    return this.request(`/events/${eventId}`, {
      method: 'DELETE',
    });
  }

  async duplicateEvent(eventId) {
    return this.request(`/events/${eventId}/duplicate`, {
      method: 'POST',
    });
  }

  async getEventGuests(eventId) {
    return this.request(`/events/${eventId}/guests`);
  }

  async getEventStats(eventId) {
    return this.request(`/events/${eventId}/stats`);
  }

  // Métodos de invitaciones públicas
  async getInvitation(urlSlug, password = null) {
    const params = password ? `?password=${encodeURIComponent(password)}` : '';
    return this.request(`/invitations/${urlSlug}${params}`);
  }

  async submitRSVP(urlSlug, rsvpData) {
    return this.request(`/invitations/${urlSlug}/rsvp`, {
      method: 'POST',
      body: rsvpData,
    });
  }

  async sendMessage(urlSlug, messageData) {
    return this.request(`/invitations/${urlSlug}/message`, {
      method: 'POST',
      body: messageData,
    });
  }

  async getCalendarFile(urlSlug) {
    const response = await fetch(`${API_BASE_URL}/invitations/${urlSlug}/calendar`);
    return response.text();
  }

  async getQRCode(urlSlug) {
    return this.request(`/invitations/${urlSlug}/qr`);
  }

  async checkPassword(urlSlug, password) {
    return this.request(`/invitations/${urlSlug}/check-password`, {
      method: 'POST',
      body: { password },
    });
  }

  // Métodos de carga de archivos
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);

    return this.request('/uploads/image', {
      method: 'POST',
      headers: {}, // Dejar que el navegador establezca el Content-Type para FormData
      body: formData,
    });
  }

  async uploadVideo(file) {
    const formData = new FormData();
    formData.append('file', file);

    return this.request('/uploads/video', {
      method: 'POST',
      headers: {}, // Dejar que el navegador establezca el Content-Type para FormData
      body: formData,
    });
  }

  async deleteFile(fileUrl) {
    return this.request('/uploads/delete', {
      method: 'POST',
      body: { file_url: fileUrl },
    });
  }

  // Métodos de planes
  async getPlans() {
    return this.request('/plans');
  }

  // Métodos de pagos
  async createCheckout(eventId, checkoutData) {
    return this.request(`/events/${eventId}/checkout`, {
      method: 'POST',
      body: checkoutData,
    });
  }

  async createMercadoPagoPreference(eventId) {
    return this.request('/payments/mercadopago/create-preference', {
      method: 'POST',
      body: { event_id: eventId },
    });
  }

  async getPaymentStatus(paymentReference) {
    return this.request(`/payments/status/${paymentReference}`);
  }

  // Métodos HTTP genéricos
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, { method: 'POST', body: data });
  }

  async put(endpoint, data) {
    return this.request(endpoint, { method: 'PUT', body: data });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
export const api = apiClient;

