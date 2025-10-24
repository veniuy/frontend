import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Mail, Lock, User, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import '../App.css';
import backgroundImage from '../assets/wedding-cake.webp';

// Icono oficial “G” de Google (inline SVG, escalable)
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

export function AuthScreen() {
  const [isLoginView, setIsLoginView] = useState(true); // true = login, false = registro
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get('redirect') || '/dashboard';

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setFormData({ username: '', email: '', password: '' });
    setError('');
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isLoginView) {
        await login({ username: formData.email, password: formData.password });
      } else {
        if (!formData.password || formData.password.length < 6) {
          setError('La contraseña debe tener al menos 6 caracteres');
          setLoading(false);
          return;
        }
        await register({
          username: formData.username || formData.email.split('@')[0],
          email: formData.email,
          password: formData.password,
        });
      }
      navigate(redirectTo);
    } catch (err) {
      setError(err?.message || `No se pudo ${isLoginView ? 'iniciar sesión' : 'crear la cuenta'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      setError('');
      if (typeof loginWithGoogle === 'function') {
        await loginWithGoogle();
        navigate(redirectTo);
      } else {
        window.location.href = '/oauth/google';
      }
    } catch (err) {
      setError(err?.message || 'No se pudo iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container relative flex flex-col md:flex-row min-h-screen">
      {/* Volver */}
      <div className="absolute top-4 left-4 z-50 md:top-8 md:left-8">
        <Link to="/" className="flex items-center text-white hover:text-gray-200 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Volver</span>
        </Link>
      </div>

      {/* Imagen (visible en mobile, 100% ancho) */}
      <div
        className="auth-image-section w-full h-64 bg-cover bg-center md:w-1/2 md:h-screen"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Formulario (100% en mobile, 50% en desktop) */}
      <div className="auth-form-section w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="max-w-md w-full space-y-8">
          {/* Título mobile */}
          <div className="text-center md:hidden">
            <div className="font-display text-4xl font-black tracking-wide text-foreground">Invitaciones</div>
            <p className="mt-1 text-sm text-foreground">
              {isLoginView ? 'Accede a tu cuenta para gestionar tus invitaciones' : 'Únete y comienza a crear invitaciones únicas'}
            </p>
          </div>

          <Card className="border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-foreground">
                {isLoginView ? 'Bienvenido de vuelta' : 'Crear Cuenta'}
              </CardTitle>
              <CardDescription className="text-foreground">
                {isLoginView ? 'Ingresa tus credenciales para continuar' : 'Ingresa tus datos para crear una cuenta'}
              </CardDescription>
            </CardHeader>

            <CardContent>
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

                {!isLoginView && (
                  <div className="floating-label-container">
                    <User className="floating-icon" />
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      className={`floating-input has-icon ${formData.username ? 'has-value' : ''}`}
                      placeholder=" "
                      value={formData.username}
                      onChange={handleChange}
                      autoComplete="username"
                      style={{ height: '48px', lineHeight: '48px' }}
                    />
                    <label htmlFor="username" className="floating-label has-icon">
                      Nombre de Usuario
                    </label>
                  </div>
                )}

                <div className="floating-label-container">
                  <Mail className="floating-icon" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={`floating-input has-icon ${formData.email ? 'has-value' : ''}`}
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    style={{ height: '48px', lineHeight: '48px' }}
                  />
                  <label htmlFor="email" className="floating-label has-icon">
                    Correo electrónico
                  </label>
                </div>

                <div className="floating-label-container relative">
                  <Lock className="floating-icon" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className={`floating-input has-icon ${formData.password ? 'has-value' : ''}`}
                    placeholder=" "
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete={isLoginView ? 'current-password' : 'new-password'}
                    style={{ height: '48px', lineHeight: '48px', paddingRight: '2.5rem' }}
                  />
                  <label htmlFor="password" className="floating-label has-icon">
                    Contraseña
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground z-30"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Textos auxiliares fuera del input para no alterar la altura */}
                {isLoginView && (
                  <div className="text-right -mt-2">
                    <Link to="/forgot-password" className="text-sm font-medium underline underline-offset-4 text-foreground hover:opacity-80">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                )}
                {!isLoginView && (
                  <p className="text-xs text-muted-foreground -mt-2">
                    Mínimo 6 caracteres
                  </p>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading
                    ? (isLoginView ? 'Iniciando sesión...' : 'Creando cuenta...')
                    : (isLoginView ? 'Iniciar Sesión' : 'Crear Cuenta')}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-foreground">
                  {isLoginView ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
                  <button
                    onClick={toggleView}
                    className="font-medium underline underline-offset-4 text-foreground hover:opacity-80"
                  >
                    {isLoginView ? 'Regístrate aquí' : 'Inicia sesión aquí'}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AuthScreen;
