import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { CheckCircle, CreditCard, Building, Smartphone, Calendar, MapPin, Users } from 'lucide-react';
import { api } from '../lib/api';

const PublishEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [priceInfo, setPriceInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEventAndPrice();
  }, [eventId]);

  const loadEventAndPrice = async () => {
    try {
      setLoading(true);
      
      // Obtener evento
      const eventRes = await api.get(`/events/${eventId}`);
      setEvent(eventRes.event);
      
      // Calcular precio
      const priceRes = await api.get(`/events/${eventId}/calculate-price`);
      setPriceInfo(priceRes);
      
    } catch (error) {
      console.error('Error loading event:', error);
      setError('Error al cargar el evento');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Si es gratis, publicar directamente
      if (priceInfo.is_free) {
        const response = await api.post(`/events/${eventId}/publish`);
        
        if (response.success) {
          alert('¡Evento publicado exitosamente! 🎉');
          navigate(`/events/${eventId}`);
        }
        return;
      }
      
      // Si tiene costo, validar método de pago
      if (!paymentMethod) {
        setError('Por favor selecciona un método de pago');
        return;
      }
      
      // Iniciar proceso de pago
      const response = await api.post(`/events/${eventId}/publish`, {
        payment_method: paymentMethod
      });
      
      if (response.success) {
        if (response.requires_redirect && response.payment_url) {
          // Redirigir a MercadoPago
          window.location.href = response.payment_url;
        } else {
          // Mostrar info de pago (transferencia, abitab, etc)
          navigate(`/payment/${response.payment_id}`, {
            state: {
              paymentMethod: response.payment_method,
              paymentCode: response.payment_code,
              bankInfo: response.bank_info,
              amount: response.amount,
              currency: response.currency,
              expiresAt: response.expires_at
            }
          });
        }
      }
      
    } catch (error) {
      console.error('Error publishing event:', error);
      setError(error.message || 'Error al publicar el evento');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !event) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando información del evento...</p>
        </div>
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
            <Button onClick={() => navigate('/events')} className="mt-4">
              Volver a mis eventos
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!event || !priceInfo) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Publicar Evento</h1>
        <p className="text-gray-600">
          Revisa los detalles y publica tu evento para que tus invitados puedan acceder
        </p>
      </div>

      {/* Información del Evento */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Detalles del Evento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
            {event.description && (
              <p className="text-gray-600 mt-2">{event.description}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Fecha</p>
                <p className="font-medium">
                  {new Date(event.event_date).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            
            {event.location && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Ubicación</p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Invitados</p>
                <p className="font-medium">
                  {priceInfo.guest_count || 0} invitados registrados
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumen de Precio */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Resumen de Precio
          </CardTitle>
        </CardHeader>
        <CardContent>
          {priceInfo.is_free ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                ¡Completamente GRATIS! 🎉
              </h3>
              <p className="text-gray-600">
                Tu evento cumple con las características del plan gratuito
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Desglose de precios */}
              <div className="space-y-2">
                {priceInfo.breakdown.map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div>
                      <p className="font-medium">{item.item}</p>
                      <Badge variant="outline" className="mt-1">
                        {item.type}
                      </Badge>
                    </div>
                    <span className="font-semibold">${item.price} UYU</span>
                  </div>
                ))}
              </div>
              
              {/* Descuentos si aplica */}
              {priceInfo.discount && priceInfo.discount.discount_amount > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-green-800">{priceInfo.discount.reason}</p>
                      <p className="text-sm text-green-600">
                        -{priceInfo.discount.discount_percent}%
                      </p>
                    </div>
                    <span className="font-semibold text-green-700">
                      -${priceInfo.discount.discount_amount} UYU
                    </span>
                  </div>
                </div>
              )}
              
              {/* Total */}
              <div className="border-t-2 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total a Pagar:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${priceInfo.final_total || priceInfo.total} UYU
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Método de Pago */}
      {!priceInfo.is_free && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Método de Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentMethod('mercadopago')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  paymentMethod === 'mercadopago'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className="h-6 w-6 mb-2" />
                <p className="font-semibold">MercadoPago</p>
                <p className="text-sm text-gray-600">Tarjetas de crédito/débito</p>
              </button>

              <button
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Building className="h-6 w-6 mb-2" />
                <p className="font-semibold">Transferencia Bancaria</p>
                <p className="text-sm text-gray-600">Banco República</p>
              </button>

              <button
                onClick={() => setPaymentMethod('abitab')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  paymentMethod === 'abitab'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Smartphone className="h-6 w-6 mb-2" />
                <p className="font-semibold">Abitab</p>
                <p className="text-sm text-gray-600">Pago en efectivo</p>
              </button>

              <button
                onClick={() => setPaymentMethod('redpagos')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  paymentMethod === 'redpagos'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Smartphone className="h-6 w-6 mb-2" />
                <p className="font-semibold">RedPagos</p>
                <p className="text-sm text-gray-600">Pago en efectivo</p>
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Botones de Acción */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/events/${eventId}/editor`)}
          className="flex-1"
        >
          Volver al Editor
        </Button>
        
        <Button
          onClick={handlePublish}
          disabled={loading || (!priceInfo.is_free && !paymentMethod)}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Procesando...
            </>
          ) : priceInfo.is_free ? (
            '¡Publicar Gratis!'
          ) : (
            'Continuar al Pago'
          )}
        </Button>
      </div>
    </div>
  );
};

export default PublishEvent;

