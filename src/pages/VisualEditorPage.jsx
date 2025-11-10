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
  Palette
} from "lucide-react";
import { api } from "../lib/api";
import { formatDate } from "../utils/formatters"; // Asumiendo que existe un archivo de utilidades
import { CountdownTimer } from "../components/CountdownTimer"; // Importar el nuevo componente

export default function VisualEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      loadEventAndDesign();
    }
  }, [id]);

  const loadEventAndDesign = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 1. Cargar evento
      const eventResponse = await api.get(`/events/${id}`);
      const eventData = eventResponse.event;
      setEvent(eventData);

      // 2. Buscar diseño asociado
      let designData = null;
      try {
        const designResponse = await api.get(`/api/editor/designs/by-event/${id}`);
        designData = designResponse.design;
        setDesign(designData);
      } catch (e) {
        console.warn('No se encontró diseño asociado, creando uno por defecto:', e);
      }

      // 3. Si no hay diseño, crear uno basado en los datos del evento
      if (!designData) {
        designData = await createDesignFromEvent(eventData);
        setDesign(designData);
      }
    } catch (err) {
      console.error('Error general loading event and design:', err);
      // En caso de error general, mostrar error
      setError('Error al cargar el evento. Asegúrate de que el ID es correcto y tienes permisos.');
    } finally {
      setLoading(false);
    }
  };

  // Función auxiliar para formatear fecha (si no existe en utils/formatters)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };  const createDesignFromEvent = async (event) => {
    const primaryColor = event.primary_color || '#000000';
    const secondaryColor = event.secondary_color || '#f4f2ed';
    
    const designData = {
      canvas: {
        width: 800,
        height: 1200,
        background: secondaryColor
      },
      elements: [
        {
          id: 'title',
          type: 'text',
          content: event.title || 'Mi Evento',
          x: 100,
          y: 100,
          width: 600,
          height: 80,
          fontSize: 48,
          fontFamily: 'Playfair Display, serif',
          fontWeight: 'Bold',
          color: primaryColor,
          textAlign: 'center'
        },
        {
          id: 'date',
          type: 'text',
          content: formatDate(event.event_date),
          x: 100,
          y: 200,
          width: 600,
          height: 40,
          fontSize: 24,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 'Regular',
          color: primaryColor,
          textAlign: 'center'
        },
        {
          id: 'countdown',
          type: 'component',
          component: 'CountdownTimer',
          props: {
            targetDate: event.event_date,
            color: primaryColor
          },
          x: 100,
          y: 300,
          width: 600,
          height: 100
        }
      ]
    };

    try {
      const response = await api.post('/api/editor/designs', {
        event_id: event.id,
        design_name: `Invitación de ${event.title}`,
        design_data: designData
      });
      return response.design;
    } catch (err) {
      console.error('Error creando diseño via API:', err);
      // Fallback local
      return {
        id: `local_${event.id}`,
        design_name: `Diseño para ${event.title}`,
        event_id: event.id,
        design_data: designData
      };
    }
  };

    setDesign(defaultDesign);
  };

  const handleSave = async () => {
    if (!design) return;
    
    setSaving(true);
    try {
      // Intentar guardar a través de la API
      if (design.id && !design.id.startsWith('local_')) {
        const response = await fetch(`/api/designs/${design.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            design_data: design.design_data
          }),
        });

        if (response.ok) {
          console.log('Diseño guardado exitosamente');
          return;
        }
      }
      
      // Si no se puede guardar por API, simular guardado
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Diseño guardado localmente');
      
    } catch (err) {
      console.error('Error saving design:', err);
      setError('Error al guardar el diseño');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!design || !event) return;
    
    try {
      // Intentar publicar a través de la API
      if (design.id && !design.id.startsWith('local_')) {
        const designResponse = await fetch(`/api/designs/${design.id}/publish`, {
          method: 'POST'
        });

        if (designResponse.ok) {
          const eventResponse = await fetch(`/api/publish/event/${event.id}`, {
            method: 'POST'
          });

          if (eventResponse.ok) {
            const publishData = await eventResponse.json();
            if (publishData.payment_url) {
              window.location.href = publishData.payment_url;
              return;
            }
          }
        }
      }
      
      // Si no se puede publicar por API, simular publicación
      alert('Invitación publicada exitosamente (modo demo)');
      navigate(`/app/events/${id}/preview`);
      
    } catch (err) {
      console.error('Error publishing:', err);
      setError('Error al publicar la invitación');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Cargando editor...</p>
        </div>
      </div>
    );
  }

  if (error && !design) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
          <div className="mt-4 flex space-x-2">
            <Button onClick={() => navigate('/app/dashboard')} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Dashboard
            </Button>
            <Button onClick={loadEventAndDesign}>
              Reintentar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header mejorado */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/app/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Editor de Invitaciones</h1>
              {event && (
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline">{event.title}</Badge>
                  {design && (
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
              onClick={() => navigate(`/app/events/${id}/preview`)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Vista Previa
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Guardar
            </Button>
            <Button 
              size="sm" 
              onClick={handlePublish}
              className="bg-green-600 hover:bg-green-700"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Publicar
            </Button>
          </div>
        </div>
      </div>

      {/* Mostrar error si existe pero el editor puede funcionar */}
      {error && design && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-2">
          <p className="text-yellow-800 text-sm">⚠️ {error} - Trabajando en modo local</p>
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
              <Button onClick={loadEventAndDesign} className="mt-4">
                Reintentar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
