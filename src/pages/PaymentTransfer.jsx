import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Copy, Building, CreditCard, CheckCircle } from 'lucide-react';

const PaymentTransfer = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { bankInfo, paymentReference } = location.state || {};

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copiado al portapapeles');
  };

  if (!bankInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center p-6">
            <p>Información de pago no disponible</p>
            <Button onClick={() => navigate('/dashboard')} className="mt-4">
              Volver al Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Building className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Transferencia Bancaria</CardTitle>
            <p className="text-gray-600">
              Realiza la transferencia con los siguientes datos
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Importante</span>
              </div>
              <p className="text-yellow-700 text-sm">
                Incluye la referencia de pago en el concepto de la transferencia para identificar tu pago automáticamente.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Referencia de Pago</p>
                  <p className="font-mono font-bold text-lg">{paymentReference}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(paymentReference)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid gap-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Banco</p>
                    <p className="font-medium">{bankInfo.bank_name}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Titular de la Cuenta</p>
                    <p className="font-medium">{bankInfo.account_name}</p>
                  </div>
                </div>
                
                {bankInfo.account_number && (
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Número de Cuenta</p>
                      <p className="font-mono font-medium">{bankInfo.account_number}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(bankInfo.account_number)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                {bankInfo.cbu && (
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">CBU</p>
                      <p className="font-mono font-medium">{bankInfo.cbu}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(bankInfo.cbu)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                {bankInfo.alias && (
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Alias</p>
                      <p className="font-medium">{bankInfo.alias}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(bankInfo.alias)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">Instrucciones</h3>
              <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
                <li>Realiza la transferencia con los datos proporcionados</li>
                <li>Incluye la referencia de pago en el concepto</li>
                <li>Envía el comprobante a pagos@venite.com</li>
                <li>Tu evento será publicado una vez confirmado el pago</li>
              </ol>
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

export default PaymentTransfer;

