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
  Share2
} from "lucide-react";

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
      // Cargar datos del evento
      const eventResponse = await fetch(`/api/events/${id}`);
      if (!eventResponse.ok) {
        throw new Error('No se pudo cargar el evento');
      }
      const eventData = await eventResponse.json();
      setEvent(eventData);

      // Cargar diseño asociado al evento
      const designResponse = await fetch(`/api/events/${id}/design`);
      if (designResponse.ok) {
        const designData = await designResponse.json();
        if (designData.design) {
          setDesign(designData.design);
        } else {
          // Si no hay diseño, crear uno por defecto
          await createDefaultDesign(id);
        }
      } else {
        // Si no hay diseño, crear uno por defecto
        await createDefaultDesign(id);
      }
    } catch (err) {
      console.error('Error loading event and design:', err);
      setError(err.message || 'Error al cargar los datos del evento');
    } finally {
      setLoading(false);
    }
  };

  const createDefaultDesign = async (eventId) => {
    try {
      const response = await fetch('/api/designs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_id: eventId,
          design_name: 'Mi Diseño',
          template_id: null // Diseño en blanco
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setDesign(data.design);
      }
    } catch (err) {
      console.error('Error creating default design:', err);
    }
  };

  const handleSave = async () => {
    if (!design) return;
    
    setSaving(true);
    try {
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
      } else {
        throw new Error('Error al guardar el diseño');
      }
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
      // Primero publicar el diseño
      const designResponse = await fetch(`/api/designs/${design.id}/publish`, {
        method: 'POST'
      });

      if (designResponse.ok) {
        // Luego publicar el evento
        const eventResponse = await fetch(`/api/publish/${event.id}`, {
          method: 'POST'
        });

        if (eventResponse.ok) {
          const publishData = await eventResponse.json();
          if (publishData.payment_url) {
            // Redirigir a la pasarela de pago
            window.location.href = publishData.payment_url;
          } else {
            // Publicación exitosa sin pago
            navigate(`/app/events/${id}/preview`);
          }
        }
      }
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

  if (error) {
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

      {/* Editor */}
      {design ? (
        <InvitationEditor 
          initialDesign={design}
          event={event}
          onDesignChange={setDesign}
          onSave={handleSave}
        />
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-600">No se pudo cargar el diseño</p>
        </div>
      )}
    </div>
  );
}

