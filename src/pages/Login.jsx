// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Sparkles, Mail, Lock } from 'lucide-react';
import '../App.css';

/** Icono oficial “G” de Google (inline SVG, escalable) */
function GoogleIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 533.5 544.3"
      aria-hidden="true"
      focusable="false"
    >
      <path fill="#4285F4" d="M533.5 278.4c0-17.3-1.6-34-4.7-50.2H272v95.1h146.9c-6.4 34.7-25.7 64.1-54.7 83.7l88.4 68.7c51.6-47.6 80.9-117.8 80.9-197.3z"/>
      <path fill="#34A853" d="M272 544.3c73.7 0 135.4-24.4 180.5-66l-88.4-68.7c-24.5 16.6-55.8 26.2-92.1 26.2-70.8 0-131-47.8-152.5-111.9l-91.3 73.9C72.1 484.8 162.1 544.3 272 544.3z"/>
      <path fill="#FBBC05" d="M119.5 323.9c-10.4-30.9-10.4-64.2 0-95.1l-91.3-82.3C-9.4 220.9-9.4 323.4 28.2 397.8l91.3-73.9z"/>
      <path fill="#EA4335" d="M272 107.7c38.1-.6 74.7 13.7 102.6 39.7l77-74.6C404 28.9 343 0 272 0 162.3 0 72.3 59.5 28.2 146.5l91.3 82.3c21.5-64.1 81.7-111.1 152.5-111.1z"/>
    </svg>
  );
}

export function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Hook de auth de tu app
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get('redirect') || '/dashboard';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(formData);          // email/usuario + password
      navigate(redirectTo);
    } catch (error) {
      setError(error.message || 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      setError('');
      if (typeof loginWithGoogle === 'function') {
        await loginWithGoogle();      // integra tu OAuth/Firebase aquí
        navigate(redirectTo);
      } else {
        // Fallback si aún no está implementado en el hook
        window.location.href = '/oauth/google';
      }
    } catch (error) {
      setError(error.message || 'No se pudo iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo y título */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-full">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Inicia Sesión</h2>
          <p className="mt-2 text-sm text-gray-600">Accede a tu cuenta para gestionar tus invitaciones</p>
        </div>

        {/* Card */}
        <Card>
          <CardHeader>
            <CardTitle>Bienvenido de vuelta</CardTitle>
            <CardDescription>Ingresa tus credenciales para continuar</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Google */}
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white text-gray-900 border gap-2"
              onClick={handleGoogle}
              disabled={loading}
              aria-label="Acceder con Google"
            >
              <GoogleIcon className="w-5 h-5" />
              Acceder con Google
            </Button>

            <div className="my-4 h-px bg-gray-200" />

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    name="username"
                    type="email"
                    required
                    className="pl-10"
                    placeholder="tucorreo@ejemplo.com"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="pl-10"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;
