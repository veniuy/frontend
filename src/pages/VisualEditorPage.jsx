// src/pages/VisualEditorPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InvitationEditor from "./InvitationEditor";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Save,
  Eye,
  Share2,
  Palette,
} from "lucide-react";
import { api } from "../lib/api";
// ❗ Quitamos el import roto de ../utils/formatters
// import { formatDate } from "../utils/formatters";
import { CountdownTimer } from "../components/CountdownTimer";

// ---- Utilidades locales ----
function formatDate(input) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return String(input);
  // Ajusta a tu formato preferido
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function VisualEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) loadEventAndDesign();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadEventAndDesign = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1) Evento
      const eventResponse = await api.get(`/events/${id}`);
      const eventData =
        eventResponse.event ||
        eventResponse.data?.event ||
        eventResponse.data ||
        eventResponse;
      if (!eventData || !eventData.id) {
        throw new Error("Evento no encontrado");
      }
      setEvent(eventData);

      // 2) Diseño existente (si hay)
      let designData = null;
      try {
        const designResponse = await api.get(
          `/editor/designs/by-event/${id}`
        );
        designData =
          designResponse.design || designResponse.data?.design || null;
      } catch {
        // no design yet
      }

      // 3) Crear si no existe
      if (!designData) {
        designData = await createDesignFromEvent(eventData);
      }
      setDesign(designData);
    } catch (err) {
      console.error("Error cargando evento/diseño:", err);
      setError("Error al cargar el evento o el diseño.");
    } finally {
      setLoading(false);
    }
  };

  // Crea diseño base a partir del evento (y lo guarda vía API si es posible)
  const createDesignFromEvent = async (ev) => {
    const primaryColor = ev.primary_color || "#000000";
    const secondaryColor = ev.secondary_color || "#f4f2ed";

    const designData = {
      canvas: {
        width: 800,
        height: 1200,
        background: secondaryColor,
      },
      elements: [
        {
          id: "title",
          type: "text",
          content: ev.title || "Mi Evento",
          x: 100,
          y: 100,
          width: 600,
          height: 80,
          fontSize: 48,
          fontFamily: "Playfair Display, serif",
          fontWeight: "700",
          color: primaryColor,
          textAlign: "center",
        },
        {
          id: "date",
          type: "text",
          content: ev.event_date ? formatDate(ev.event_date) : "",
          x: 100,
          y: 200,
          width: 600,
          height: 40,
          fontSize: 24,
          fontFamily: "Inter, sans-serif",
          fontWeight: "400",
          color: primaryColor,
          textAlign: "center",
        },
        {
          id: "countdown",
          type: "component",
          component: "CountdownTimer",
          props: {
            targetDate: ev.event_date || null,
            color: primaryColor,
          },
          x: 100,
          y: 300,
          width: 600,
          height: 100,
        },
      ],
    };

    try {
      const response = await api.post("/editor/designs", {
        event_id: ev.id,
        design_name: `Invitación de ${ev.title || "Evento"}`,
        design_data: designData,
      });
      return (
        response.design || response.data?.design || response.data || response
      );
    } catch (err) {
      console.error("Error creando diseño vía API. Usando fallback local:", err);
      return {
        id: `local_${ev.id}`,
        design_name: `Diseño para ${ev.title || "Evento"}`,
        event_id: ev.id,
        design_data: designData,
      };
    }
  };

  const handleSave = async () => {
    if (!design || !event) return;
    setSaving(true);
    setError(null);
    try {
      if (design.id && !String(design.id).startsWith("local_")) {
        const resp = await api.put(`/editor/designs/${design.id}`, {
          design_name:
            design.design_name || `Invitación de ${event.title || "Evento"}`,
          design_data: design.design_data || design,
        });
        const saved = resp.design || resp.data?.design || resp.data || resp;
        setDesign(saved);
      } else {
        const resp = await api.post("/editor/designs", {
          event_id: event.id,
          design_name:
            design.design_name || `Invitación de ${event.title || "Evento"}`,
          design_data: design.design_data || design,
        });
        const saved = resp.design || resp.data?.design || resp.data || resp;
        setDesign(saved);
      }
    } catch (err) {
      console.error("Error guardando diseño:", err);
      setError("No se pudo guardar el diseño.");
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    if (!id) return;
    navigate(`/app/events/${id}/preview`);
  };

  const handlePublish = async () => {
    if (!event || !design) return;
    setError(null);
    try {
      await handleSave();

      if (design.id && !String(design.id).startsWith("local_")) {
        await api.post(`/editor/designs/${design.id}/publish`, {});
        const eventResp = await api.post(`/publish/event/${event.id}`, {});
        const publishData = eventResp.data || eventResp || {};
        if (publishData.payment_url) {
          window.location.href = publishData.payment_url;
          return;
        }
      } else {
        alert("Invitación publicada (modo local)");
      }

      navigate(`/app/events/${id}/preview`);
    } catch (err) {
      console.error("Error al publicar:", err);
      setError("Error al publicar la invitación.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-3 text-gray-700">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Cargando editor…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/app/dashboard")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>

            <div>
              <h1 className="text-xl font-semibold">Editor de Invitaciones</h1>
              {event && (
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline">{event.title}</Badge>
                  {design?.design_name && (
                    <Badge variant="secondary">{design.design_name}</Badge>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/app/events/${id}/theme`)}
              title="Colores y paleta"
            >
              <Palette className="w-4 h-4 mr-2" />
              Paleta
            </Button>
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye className="w-4 h-4 mr-2" />
              Previsualizar
            </Button>
            <Button onClick={handleSave} disabled={saving} size="sm">
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando…
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar
                </>
              )}
            </Button>
            <Button variant="secondary" size="sm" onClick={handlePublish}>
              <Share2 className="w-4 h-4 mr-2" />
              Publicar
            </Button>
          </div>
        </div>
      </div>

      {/* Errores críticos */}
      {error && !design && (
        <div className="px-6 py-3">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Advertencia si hay error pero tenemos diseño local */}
      {error && design && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-2">
          <p className="text-yellow-800 text-sm">
            ⚠️ {error} — Trabajando en modo local
          </p>
        </div>
      )}

      {/* Editor */}
      <div className="h-[calc(100vh-80px)]">
        {design ? (
          <InvitationEditor
            initialDesign={design}
            event={event}
            onDesignChange={setDesign}
            onSave={handleSave}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No se pudo cargar el diseño</p>
              <Button onClick={loadEventAndDesign}>Reintentar</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
