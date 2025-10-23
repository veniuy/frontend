import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Mail, ArrowLeft } from 'lucide-react';
// Asume que tienes un servicio de autenticación o una función para manejar las llamadas a la API
// import { useAuth } from '../hooks/useAuth'; // O un nuevo hook/servicio para recuperación

export function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Aquí deberías llamar a tu API de backend para solicitar la recuperación
      // Ejemplo: await authService.requestPasswordReset(email);
      // O si usas fetch directamente:
      const response = await fetch('/api/auth/request-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Se ha enviado un enlace de recuperación a tu correo electrónico.');
      } else {
        setError(data.message || 'Error al solicitar la recuperación de contraseña.');
      }
    } catch (err) {
      setError('Ocurrió un error de red o del servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="absolute top-4 left-4 z-50">
        <Link to="/auth" className="flex items-center text-white hover:text-gray-200 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Volver al inicio de sesión</span>
        </Link>
      </div>
      <div className="auth-form-section">
        <div className="max-w-md w-full space-y-8 p-4 md:p-0">
          <Card className="border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-foreground">Recuperar Contraseña</CardTitle>
              <CardDescription className="text-foreground">
                Ingresa tu correo electrónico para recibir un enlace de recuperación.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {message && <p className="text-green-500 text-sm">{message}</p>}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="floating-label-container">
                  <Mail className="floating-icon" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={`floating-input has-icon ${email ? 'has-value' : ''}`}
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                  <label htmlFor="email" className="floating-label has-icon">
                    Correo electrónico
                  </label>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordScreen;
