import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Copy, Smartphone, Clock, MapPin } from 'lucide-react';

const PaymentCode = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentCode, method, expiresAt } = location.state || {};

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Código copiado al portapapeles');
  };

  const formatExpiryDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('es-UY', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMethodInfo = () => {
    if (method === 'abitab') {
      return {
        name: 'Abitab',
        color: 'bg-red-500',
        description: 'Paga en cualquier local Abitab de todo el país',
        locations: 'Más de 1000 locales en todo Uruguay'
      };
    } else if (method === 'redpagos') {
      return {
        name: 'Red Pagos',
        color: 'bg-blue-500',
        description: 'Paga en cualquier local Red Pagos',
        locations: 'Más de 800 locales en todo Uruguay'
      };
    }
    return {};
  };

  if (!paymentCode) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center p-6">
            <p>Código de pago no disponible</p>
            <Button onClick={() => navigate('/dashboard')} className="mt-4">
              Volver al Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const methodInfo = getMethodInfo();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className={`mx-auto w-16 h-16 ${methodInfo.color} rounded-full flex items-center justify-center mb-4`}>
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Pago en {methodInfo.name}</CardTitle>
            <p className="text-gray-600">
              {methodInfo.description}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {expiresAt && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-orange-800">Vencimiento</span>
                </div>
                <p className="text-orange-700">
                  Este código vence el {formatExpiryDate(expiresAt)}
                </p>
              </div>
            )}
            
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Tu código de pago es:</p>
              <div className="bg-gray-900 text-white rounded-lg p-6 mb-4">
                <div className="text-4xl font-mono font-bold tracking-wider">
                  {paymentCode}
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => copyToClipboard(paymentCode)}
                className="mb-6"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copiar Código
              </Button>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Cómo pagar
              </h3>
              <ol className="text-blue-700 text-sm space-y-2 list-decimal list-inside">
                <li>Dirígete a cualquier local {methodInfo.name}</li>
                <li>Proporciona el código de pago al cajero</li>
                <li>Realiza el pago en efectivo</li>
                <li>Guarda el comprobante de pago</li>
                <li>Tu evento será publicado automáticamente</li>
              </ol>
              <p className="text-blue-600 text-sm mt-3 font-medium">
                {methodInfo.locations}
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-800 mb-2">¿Qué sucede después?</h3>
              <p className="text-green-700 text-sm">
                Una vez realizado el pago, recibirás una confirmación automática y tu evento 
                será publicado inmediatamente. Podrás compartir la invitación con tus invitados.
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
                className="flex-1"
              >
                Ir al Dashboard
              </Button>
              <Button 
                onClick={() => navigate(`/events/${eventId}/status`)}
                className="flex-1"
              >
                Ver Estado del Pago
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentCode;

