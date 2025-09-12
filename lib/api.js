// API client para comunicarse con el backend
// Usa variable de entorno en prod; si no existe, apunta al backend de Render.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://backend-xtqe.onrender.com/api";

class ApiClient {
  /**
   * request(endpoint, { method, headers, body, expect })
   * - expect: 'json' (default), 'text', 'blob'  → auto-parse segun content-type
   */
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders = { Accept: "application/json" };
    const config = {
      method: options.method || "GET",
      credentials: "include", // envía cookies de sesión
      headers: { ...defaultHeaders, ...(options.headers || {}) },
      body: options.body,
    };

    // Normaliza el body:
    // - Si es FormData: no tocar (y quitar Content-Type para que lo ponga el navegador).
    // - Si es objeto plano: JSON.stringify y 'Content-Type: application/json'.
    // - Si es string/Blob/etc.: dejar tal cual.
    if (config.body instanceof FormData) {
      if (config.headers && config.headers["Content-Type"]) {
        delete config.headers["Content-Type"];
      }
    } else if (config.body && typeof config.body === "object") {
      config.headers["Content-Type"] = "application/json";
      config.body = JSON.stringify(config.body);
    }

    let res;
    try {
      res = await fetch(url, config);
    } catch (err) {
      console.error("API Network Error:", err);
      throw new Error("No se pudo conectar con el servidor");
    }

    // 204: sin body
    if (res.status === 204) return null;

    // Parseo según expect o content-type
    const expect = options.expect || "auto";
    const ct = (res.headers.get("content-type") || "").toLowerCase();

    let data;
    try {
      if (expect === "blob" || ct.includes("application/pdf") || ct.startsWith("image/") || ct.includes("octet-stream")) {
        data = await res.blob();
      } else if (expect === "text" || ct.startsWith("text/")) {
        data = await res.text();
      } else {
        // default/json
        data = await res.json();
      }
    } catch {
      // Si no se pudo parsear, intenta como texto
      try {
        data = await res.text();
      } catch {
        data = null;
      }
    }

    if (!res.ok) {
      const msg =
        (data && (data.error || data.message)) ||
        res.statusText ||
        `HTTP ${res.status}`;
      const err = new Error(msg);
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return data;
  }

  // =================== Autenticación ===================
  async register(userData) {
    return this.request("/auth/register", { method: "POST", body: userData });
  }

  async login(credentials) {
    return this.request("/auth/login", { method: "POST", body: credentials });
  }

  async logout() {
    return this.request("/auth/logout", { method: "POST" });
  }

  async getCurrentUser() {
    return this.request("/auth/me", { method: "GET" });
  }

  // =================== Eventos ===================
  async getEvents() {
    return this.request("/events", { method: "GET" });
  }

  async createEvent(eventData) {
    return this.request("/events", { method: "POST", body: eventData });
  }

  async getEvent(eventId) {
    return this.request(`/events/${eventId}`, { method: "GET" });
  }

  async updateEvent(eventId, eventData) {
    return this.request(`/events/${eventId}`, {
      method: "PUT",
      body: eventData,
    });
  }

  async deleteEvent(eventId) {
    return this.request(`/events/${eventId}`, { method: "DELETE" });
  }

  async duplicateEvent(eventId) {
    return this.request(`/events/${eventId}/duplicate`, { method: "POST" });
  }

  async getEventGuests(eventId) {
    return this.request(`/events/${eventId}/guests`, { method: "GET" });
  }

  async getEventStats(eventId) {
    return this.request(`/events/${eventId}/stats`, { method: "GET" });
  }

  // =================== Invitaciones públicas ===================
  async getInvitation(urlSlug, password = null) {
    const params = password ? `?password=${encodeURIComponent(password)}` : "";
    return this.request(`/invitations/${urlSlug}${params}`, { method: "GET" });
  }

  async submitRSVP(urlSlug, rsvpData) {
    return this.request(`/invitations/${urlSlug}/rsvp`, {
      method: "POST",
      body: rsvpData,
    });
  }

  async sendMessage(urlSlug, messageData) {
    return this.request(`/invitations/${urlSlug}/message`, {
      method: "POST",
      body: messageData,
    });
  }

  async getCalendarFile(urlSlug) {
    const res = await fetch(
      `${API_BASE_URL}/invitations/${urlSlug}/calendar`,
      { credentials: "include" }
    );
    return res.text();
  }

  async getQRCode(urlSlug) {
    return this.request(`/invitations/${urlSlug}/qr`, { method: "GET" });
  }

  async checkPassword(urlSlug, password) {
    return this.request(`/invitations/${urlSlug}/check-password`, {
      method: "POST",
      body: { password },
    });
  }

  // =================== Cargas (uploads) ===================
  async uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.request("/uploads/image", {
      method: "POST",
      headers: {},
      body: formData,
    });
  }

  async uploadVideo(file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.request("/uploads/video", {
      method: "POST",
      headers: {},
      body: formData,
    });
  }

  async deleteFile(fileUrl) {
    return this.request("/uploads/delete", {
      method: "POST",
      body: { file_url: fileUrl },
    });
  }

  // =================== Planes ===================
  async getPlans() {
    return this.request("/plans", { method: "GET" });
  }

  // =================== Pagos ===================
  async createCheckout(eventId, checkoutData) {
    return this.request(`/events/${eventId}/checkout`, {
      method: "POST",
      body: checkoutData,
    });
  }

  async createMercadoPagoPreference(eventId) {
    return this.request("/payments/mercadopago/create-preference", {
      method: "POST",
      body: { event_id: eventId },
    });
  }

  async getPaymentStatus(paymentReference) {
    return this.request(`/payments/status/${paymentReference}`, {
      method: "GET",
    });
  }

  // =================== Plantillas ===================
  async getTemplates() {
    // GET /api/templates
    return this.request("/templates", { method: "GET" });
  }

  async getTemplate(templateId) {
    return this.request(`/templates/${templateId}`, { method: "GET" });
  }

  // =================== Diseños / Editor ===================
  async getDesigns(params = {}) {
    // admite filtros opcionales: ?event_id=... etc. (si el backend los soporta)
    const qs = new URLSearchParams(params).toString();
    const suffix = qs ? `?${qs}` : "";
    return this.request(`/designs${suffix}`, { method: "GET" });
  }

  async getDesign(designId) {
    return this.request(`/designs/${designId}`, { method: "GET" });
  }

  async createDesign(payload) {
    return this.request("/designs", { method: "POST", body: payload });
  }

  async updateDesign(designId, payload) {
    return this.request(`/designs/${designId}`, {
      method: "PUT",
      body: payload,
    });
  }

  async deleteDesign(designId) {
    return this.request(`/designs/${designId}`, { method: "DELETE" });
  }

  async setEventDesign(eventId, payload) {
    // e.g. { design_id: ... } si tu backend lo define así
    return this.request(`/events/${eventId}/design`, {
      method: "PUT",
      body: payload,
    });
  }

  // =================== Exportación ===================
  async exportDesignPdf(designId) {
    // GET o POST depende del backend; usa 'blob' para devolver PDF
    return this.request(`/designs/${designId}/export/pdf`, {
      method: "GET",
      expect: "blob",
    });
  }

  async exportDesignImage(designId, format = "png") {
    // Si el backend expone /export/image?format=png
    const qs = new URLSearchParams({ format }).toString();
    return this.request(`/designs/${designId}/export/image?${qs}`, {
      method: "GET",
      expect: "blob",
    });
  }

  // =================== Administración (Dashboard) ===================
  async getAdminStats() {
    // GET /api/admin/dashboard/stats (requiere sesión y rol admin)
    return this.request("/admin/dashboard/stats", { method: "GET" });
  }

  // =================== Métodos genéricos ===================
  async get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }

  async post(endpoint, data) {
    return this.request(endpoint, { method: "POST", body: data });
  }

  async put(endpoint, data) {
    return this.request(endpoint, { method: "PUT", body: data });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
export const api = apiClient;
