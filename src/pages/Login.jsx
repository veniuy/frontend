// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Mail, Lock } from 'lucide-react';
import '../App.css';

/** Icono oficial “G” de Google (inline SVG, escalable) */
function GoogleIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 533.5 544.3" aria-hidden="true" focusable="false">
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

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get('redirect') || '/dashboard';

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(formData); // email/usuario + password
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
        await loginWithGoogle(); // integra tu OAuth/Firebase aquí
        navigate(redirectTo);
      } else {
        window.location.href = '/oauth/google';
      }
    } catch (error) {
      setError(error.message || 'No se pudo iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Marca */}
        <div className="text-center">
          <div className="font-display text-4xl font-black tracking-wide text-foreground">Venite</div>
          <p className="mt-1 text-sm text-muted-foreground">
            Accede a tu cuenta para gestionar tus invitaciones
          </p>
        </div>

        {/* Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Bienvenido de vuelta</CardTitle>
            <CardDescription className="text-muted-foreground">
              Ingresa tus credenciales para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Google */}
            <Button
              type="button"
              variant="outline"
              className="w-full bg-white text-foreground border gap-2"
              onClick={handleGoogle}
              disabled={loading}
              aria-label="Acceder con Google"
            >
              <GoogleIcon className="w-5 h-5" />
              Acceder con Google
            </Button>

            <div className="my-4 h-px bg-border" />

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="floating-label-container">
                <Mail className="floating-icon" />
                <input
                  id="username"
                  name="username"
                  type="email"
                  required
                  className={`floating-input has-icon ${formData.username ? 'has-value' : ''}`}
                  placeholder="tucorreo@ejemplo.com"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="email"
                />
                <label htmlFor="username" className="floating-label has-icon">
                  Correo electrónico
                </label>
              </div>

              <div className="floating-label-container">
                <Lock className="floating-icon" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`floating-input has-icon ${formData.password ? 'has-value' : ''}`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <label htmlFor="password" className="floating-label has-icon">
                  Contraseña
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                ¿No tienes una cuenta?{' '}
                <Link
                  to="/register"
                  className="font-medium underline underline-offset-4 text-foreground hover:opacity-80"
                >
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
