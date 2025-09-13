// API client para comunicarse con el backend

// Usa variable de entorno en prod; si no existe, apunta al backend de Render.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://backend-xtqe.onrender.com/api';

class ApiClient {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    // Headers por defecto (JSON); se podrán eliminar si el body es FormData
    const defaultHeaders = { 'Content-Type': 'application/json' };

    const config = {
      credentials: 'include', // envía cookies de sesión
      headers: { ...defaultHeaders, ...(options.headers || {}) },
      ...options,
    };

    // Normaliza el body:
    // - Si es FormData: no tocar (y quitar Content-Type para que lo ponga el navegador).
    // - Si es objeto plano: JSON.stringify.
    // - Si es string/Blob/etc.: dejar tal cual.
    if (config.body instanceof FormData) {
      // El navegador setea 'Content-Type: multipart/form-data; boundary=...'
      if (config.headers && config.headers['Content-Type']) {
        delete config.headers['Content-Type'];
      }
    } else if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const res = await fetch(url, config);

      // Algunos endpoints pueden devolver 204 (sin body)
      if (res.status === 204) return null;

      // Intenta parsear JSON; si falla, devuelve texto
      let data;
      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        try {
          data = JSON.parse(text);
        } catch {
          data = { raw: text };
        }
      }

      if (!res.ok) {
        throw new Error(data?.error || data?.message || `HTTP ${res.status}`);
      }

      return data;
    } catch (err) {
      console.error('API Error:', err);
      throw err;
    }
  }

  // --------- Autenticación ----------
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
    return this.request('/auth/logout', { method: 'POST' });
  }

  async getCurrentUser() {
    return this.request('/auth/me', { method: 'GET' });
  }

  // --------- Eventos ----------
  async getEvents() {
    return this.request('/events', { method: 'GET' });
  }

  async createEvent(eventData) {
    return this.request('/events', { method: 'POST', body: eventData });
  }

  async getEvent(eventId) {
    return this.request(`/events/${eventId}`, { method: 'GET' });
  }

  async updateEvent(eventId, eventData) {
    return this.request(`/events/${eventId}`, { method: 'PUT', body: eventData });
  }

  async deleteEvent(eventId) {
    return this.request(`/events/${eventId}`, { method: 'DELETE' });
  }

  async duplicateEvent(eventId) {
    return this.request(`/events/${eventId}/duplicate`, { method: 'POST' });
  }

  async getEventGuests(eventId) {
    return this.request(`/events/${eventId}/guests`, { method: 'GET' });
  }

  async getEventStats(eventId) {
    return this.request(`/events/${eventId}/stats`, { method: 'GET' });
  }

  // --------- Invitaciones públicas ----------
  async getInvitation(urlSlug, password = null) {
    const params = password ? `?password=${encodeURIComponent(password)}` : '';
    return this.request(`/invitations/${urlSlug}${params}`, { method: 'GET' });
  }

  async submitRSVP(urlSlug, rsvpData) {
    return this.request(`/invitations/${urlSlug}/rsvp`, { method: 'POST', body: rsvpData });
  }

  async sendMessage(urlSlug, messageData) {
    return this.request(`/invitations/${urlSlug}/message`, { method: 'POST', body: messageData });
  }

  async getCalendarFile(urlSlug) {
    // Si el .ics es público, no hace falta credentials; si es privado, puedes añadirlas.
    const res = await fetch(`${API_BASE_URL}/invitations/${urlSlug}/calendar`, {
      credentials: 'include',
    });
    return res.text();
  }

  async getQRCode(urlSlug) {
    return this.request(`/invitations/${urlSlug}/qr`, { method: 'GET' });
  }

  async checkPassword(urlSlug, password) {
    return this.request(`/invitations/${urlSlug}/check-password`, {
      method: 'POST',
      body: { password },
    });
  }

  // --------- Cargas ----------
  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.request('/uploads/image', { method: 'POST', headers: {}, body: formData });
  }

  async uploadVideo(file) {
    const formData = new FormData();
    formData.append('file', file);
    return this.request('/uploads/video', { method: 'POST', headers: {}, body: formData });
  }

  async deleteFile(fileUrl) {
    return this.request('/uploads/delete', { method: 'POST', body: { file_url: fileUrl } });
  }

  // --------- Planes ----------
  async getPlans() {
    return this.request('/plans', { method: 'GET' });
  }

  // --------- Pagos ----------
  async createCheckout(eventId, checkoutData) {
    return this.request(`/events/${eventId}/checkout`, { method: 'POST', body: checkoutData });
  }

  async createMercadoPagoPreference(eventId) {
    return this.request('/payments/mercadopago/create-preference', {
      method: 'POST',
      body: { event_id: eventId },
    });
  }

  async getPaymentStatus(paymentReference) {
    return this.request(`/payments/status/${paymentReference}`, { method: 'GET' });
  }

  // --------- Métodos genéricos ----------
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
