import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { api } from '../lib/api';

const EventPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPreview();
  }, [id]);

  const fetchPreview = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/events/${id}/preview`);
      setPreview(response.data || response);
    } catch (err) {
      setError('Error cargando vista previa');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando vista previa...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header de Preview */}
      <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate(`/dashboard/events/${id}/builder`)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Editor
            </Button>
            
            <Alert className="border-yellow-300 bg-yellow-100 py-2 px-3">
              <EyeOff className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800 text-sm">
                Vista previa privada - No indexada por buscadores
              </AlertDescription>
            </Alert>
          </div>

          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Vista Previa</span>
          </div>
        </div>
      </div>

      {/* Contenido del Preview */}
      <div className="w-full">
        {preview?.html ? (
          <div 
            dangerouslySetInnerHTML={{ __html: preview.html }}
            className="w-full"
          />
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Vista previa no disponible
              </h2>
              <p className="text-gray-600 mb-6">
                Complete la información del evento para generar la vista previa.
              </p>
              <Button onClick={() => navigate(`/dashboard/events/${id}/builder`)}>
                Ir al Editor
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPreview;
