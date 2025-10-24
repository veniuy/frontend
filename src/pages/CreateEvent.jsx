import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Calendar, MapPin, Sparkles, ArrowLeft } from 'lucide-react';
import { api } from '../lib/api';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    template_id: 'classic'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!eventData.title || !eventData.event_date) {
      setError('Por favor completa el nombre y la fecha del evento');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Crear evento en DRAFT - GRATIS (sin plan_id)
      const response = await api.post('/events', eventData);
      
      if (response.success && response.event) {
        const eventId = response.event.id;
        
        // Redirigir al editor
        navigate(`/app/events/${eventId}/editor`, {
          state: { isNew: true, message: '¡Evento creado! Ahora puedes personalizarlo.' }
        });
      } else {
        throw new Error('Error al crear el evento');
      }
      
    } catch (err) {
      console.error('Error creating event:', err);
      setError(err.message || 'Error al crear el evento. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/app/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Dashboard
          </Button>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Crea tu Evento
            </h1>
            <p className="text-lg text-gray-600">
              ¡Completamente GRATIS! Personaliza después y paga solo al publicar
            </p>
          </div>
        </div>

        {/* Formulario */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Información Básica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Título del Evento */}
              <div>
                <Label htmlFor="title" className="text-base font-semibold">
                  Nombre del Evento *
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={eventData.title}
                  onChange={handleInputChange}
                  placeholder="Ej: Boda de María y Juan"
                  className="mt-2"
                  required
                />
              </div>

              {/* Descripción */}
              <div>
                <Label htmlFor="description" className="text-base font-semibold">
                  Descripción (opcional)
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={eventData.description}
                  onChange={handleInputChange}
                  placeholder="Describe tu evento especial..."
                  className="mt-2"
                  rows={3}
                />
              </div>

              {/* Fecha y Hora */}
              <div>
                <Label htmlFor="event_date" className="text-base font-semibold">
                  Fecha y Hora *
                </Label>
                <Input
                  id="event_date"
                  name="event_date"
                  type="datetime-local"
                  value={eventData.event_date}
                  onChange={handleInputChange}
                  className="mt-2"
                  required
                />
              </div>

              {/* Ubicación */}
              <div>
                <Label htmlFor="location" className="text-base font-semibold">
                  Ubicación (opcional)
                </Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="location"
                    name="location"
                    value={eventData.location}
                    onChange={handleInputChange}
                    placeholder="Ej: Salón de Eventos Paradise"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Plantilla */}
              <div>
                <Label htmlFor="template_id" className="text-base font-semibold">
                  Plantilla (opcional)
                </Label>
                <select
                  id="template_id"
                  name="template_id"
                  value={eventData.template_id}
                  onChange={handleInputChange}
                  className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="classic">Clásica</option>
                  <option value="modern">Moderna</option>
                  <option value="elegant">Elegante</option>
                  <option value="minimal">Minimalista</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Puedes cambiar la plantilla después en el editor
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900">¡Sin pagos ahora!</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Crea tu evento gratis. Edita, personaliza y agrega invitados sin costo. 
                      Solo pagarás cuando decidas publicarlo para tus invitados.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/app/dashboard')}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Crear Evento Gratis
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-3xl mb-2">✨</div>
            <p className="font-semibold text-gray-900">Crea Gratis</p>
            <p className="text-sm text-gray-600">Sin costos iniciales</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-3xl mb-2">🎨</div>
            <p className="font-semibold text-gray-900">Personaliza</p>
            <p className="text-sm text-gray-600">Edita a tu gusto</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-3xl mb-2">🚀</div>
            <p className="font-semibold text-gray-900">Publica</p>
            <p className="text-sm text-gray-600">Paga solo al publicar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;

