// src/pages/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react';
import weddingCake from '../assets/wedding-cake.webp';
import '../App.css';

export function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    nombre_completo: '',
    telefono: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.password || formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'No se pudo crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado Izquierdo - Solo Desktop */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-warm-gray-50 to-warm-gray-100 relative overflow-hidden">
        {/* Imagen de fondo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${weddingCake})` }}
        />
        
        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-warm-gray-50/80 to-warm-gray-100/80" />
        
        {/* Contenido centrado */}
        <div className="relative z-10 flex flex-col justify-center items-center px-12 py-16 text-center h-full">
          {/* Logo y marca */}
          <div className="mb-8">
            <div className="font-display text-6xl font-black tracking-wide text-warm-gray-900 mb-4">
              Venite
            </div>
            <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
            <p className="text-xl text-warm-gray-600 font-ui leading-relaxed max-w-md">
              Crea invitaciones digitales únicas que reflejen la elegancia de tus momentos especiales
            </p>
          </div>
        </div>
      </div>

      {/* Lado Derecho - Formulario */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Header móvil */}
        <div className="lg:hidden bg-gradient-to-r from-warm-gray-50 to-warm-gray-100 px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="flex items-center text-warm-gray-700 hover:text-warm-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Volver</span>
            </Link>
          </div>
          
          <div className="text-center">
            <div className="font-display text-3xl font-black tracking-wide text-warm-gray-900 mb-2">
              Venite
            </div>
            <div className="w-16 h-1 bg-gold-500 mx-auto mb-3"></div>
            <p className="text-base text-warm-gray-600 font-ui">
              Invitaciones digitales elegantes
            </p>
          </div>
        </div>

        {/* Contenedor del formulario */}
        <div className="flex-1 flex items-center justify-center bg-white px-6 py-8">
          <div className="w-full max-w-md space-y-6">
            {/* Header del formulario */}
            <div className="text-center lg:text-left">
              <h1 className="text-2xl lg:text-3xl font-semibold text-foreground mb-2">
                Crear Cuenta
              </h1>
              <p className="text-muted-foreground text-sm lg:text-base">
                Únete y comienza a crear invitaciones únicas
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Nombre de Usuario */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground font-medium">
                  Nombre de Usuario
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="pl-10 h-12 border-warm-gray-300 focus:border-gold-500 focus:ring-gold-500"
                    placeholder="usuario123"
                    value={formData.username}
                    onChange={handleChange}
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="pl-10 h-12 border-warm-gray-300 focus:border-gold-500 focus:ring-gold-500"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Nombre Completo */}
              <div className="space-y-2">
                <Label htmlFor="nombre_completo" className="text-foreground font-medium">
                  Nombre Completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="nombre_completo"
                    name="nombre_completo"
                    type="text"
                    className="pl-10 h-12 border-warm-gray-300 focus:border-gold-500 focus:ring-gold-500"
                    placeholder="Tu nombre y apellido"
                    value={formData.nombre_completo}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Teléfono */}
              <div className="space-y-2">
                <Label htmlFor="telefono" className="text-foreground font-medium">
                  Teléfono
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    className="pl-10 h-12 border-warm-gray-300 focus:border-gold-500 focus:ring-gold-500"
                    placeholder="+598 099123456"
                    value={formData.telefono}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Ejemplo: +598 099123456
                </p>
              </div>

              {/* Contraseña */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="pl-10 h-12 border-warm-gray-300 focus:border-gold-500 focus:ring-gold-500"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Mínimo 6 caracteres
                </p>
              </div>

              {/* Botón de registro */}
              <Button
                type="submit"
                className="w-full h-12 bg-warm-gray-900 hover:bg-warm-gray-800 text-white font-medium transition-all duration-300 mt-6"
                disabled={loading}
              >
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>
            </form>

            {/* Link de login */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                ¿Ya tienes una cuenta?{' '}
                <Link
                  to="/login"
                  className="font-medium text-warm-gray-900 hover:text-gold-500 underline underline-offset-4 transition-colors"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>

            {/* Footer legal */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Al crear una cuenta, aceptas nuestros{' '}
                <Link to="/terms" className="underline hover:text-gold-500">
                  Términos de Servicio
                </Link>{' '}
                y{' '}
                <Link to="/privacy" className="underline hover:text-gold-500">
                  Política de Privacidad
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
