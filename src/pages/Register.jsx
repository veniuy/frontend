// src/pages/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Mail, Lock, User, Phone, Sparkles, Heart, Calendar, ArrowLeft } from 'lucide-react';
import elegantBackground from '../assets/elegant-background.jpg';
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Lado Izquierdo - Información y Branding (Desktop) / Header (Mobile) */}
      <div className="lg:w-1/2 bg-gradient-to-br from-warm-gray-50 to-warm-gray-100 relative overflow-hidden">
        {/* Imagen de fondo con overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${elegantBackground})` }}
        />
        
        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-warm-gray-50/90 to-warm-gray-100/90" />
        
        {/* Contenido Desktop */}
        <div className="hidden lg:flex relative z-10 flex-col justify-center px-12 py-16 text-center h-full">
          {/* Logo y marca */}
          <div className="mb-8">
            <div className="font-display text-6xl font-black tracking-wide text-warm-gray-900 mb-4">
              Venite
            </div>
            <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
            <p className="text-xl text-warm-gray-600 font-ui leading-relaxed">
              Crea invitaciones digitales únicas que reflejen la elegancia de tus momentos especiales
            </p>
          </div>

          {/* Características destacadas */}
          <div className="space-y-6 mb-8">
            <div className="flex items-center justify-center space-x-4 text-warm-gray-700">
              <div className="flex items-center justify-center w-12 h-12 bg-sage-100 rounded-full">
                <Sparkles className="w-6 h-6 text-sage-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Diseños Elegantes</h3>
                <p className="text-sm text-warm-gray-600">Plantillas profesionales y personalizables</p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 text-warm-gray-700">
              <div className="flex items-center justify-center w-12 h-12 bg-sage-100 rounded-full">
                <Heart className="w-6 h-6 text-sage-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Momentos Únicos</h3>
                <p className="text-sm text-warm-gray-600">Para bodas, cumpleaños y eventos especiales</p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 text-warm-gray-700">
              <div className="flex items-center justify-center w-12 h-12 bg-sage-100 rounded-full">
                <Calendar className="w-6 h-6 text-sage-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Envío Instantáneo</h3>
                <p className="text-sm text-warm-gray-600">Comparte tus invitaciones al instante</p>
              </div>
            </div>
          </div>

          {/* Testimonial o estadística */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-warm">
            <p className="text-warm-gray-700 italic mb-2">
              "La plataforma más elegante para crear invitaciones digitales"
            </p>
            <p className="text-sm text-warm-gray-600">
              Más de 10,000 eventos creados con éxito
            </p>
          </div>
        </div>

        {/* Header Mobile */}
        <div className="lg:hidden relative z-10 px-6 py-8 text-center">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center text-warm-gray-700 hover:text-warm-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Volver</span>
            </Link>
          </div>
          
          <div className="font-display text-4xl font-black tracking-wide text-warm-gray-900 mb-3">
            Venite
          </div>
          <div className="w-16 h-1 bg-gold-500 mx-auto mb-4"></div>
          <p className="text-lg text-warm-gray-600 font-ui leading-relaxed px-4">
            Crea invitaciones digitales únicas y elegantes
          </p>
        </div>
      </div>

      {/* Lado Derecho - Formulario de Registro */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center bg-white px-6 py-8 lg:py-16">
        <div className="w-full max-w-md space-y-6 lg:space-y-8">
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
          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6" noValidate>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Nombre de Usuario */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground font-medium text-sm lg:text-base">
                Nombre de Usuario
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 lg:h-5 lg:w-5 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="pl-10 lg:pl-11 h-11 lg:h-12 border-warm-gray-300 focus:border-gold-500 focus:ring-gold-500 text-sm lg:text-base"
                  placeholder="usuario123"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium text-sm lg:text-base">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 lg:h-5 lg:w-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10 lg:pl-11 h-11 lg:h-12 border-warm-gray-300 focus:border-gold-500 focus:ring-gold-500 text-sm lg:text-base"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Nombre Completo */}
            <div className="space-y-2">
              <Label htmlFor="nombre_completo" className="text-foreground font-medium text-sm lg:text-base">
                Nombre Completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 lg:h-5 lg:w-5 text-muted-foreground" />
                <Input
                  id="nombre_completo"
                  name="nombre_completo"
                  type="text"
                  className="pl-10 lg:pl-11 h-11 lg:h-12 border-warm-gray-300 focus:border-gold-500 focus:ring-gold-500 text-sm lg:text-base"
                  placeholder="Tu nombre y apellido"
                  value={formData.nombre_completo}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <Label htmlFor="telefono" className="text-foreground font-medium text-sm lg:text-base">
                Teléfono
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 lg:h-5 lg:w-5 text-muted-foreground" />
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  className="pl-10 lg:pl-11 h-11 lg:h-12 border-warm-gray-300 focus:border-gold-500 focus:ring-gold-500 text-sm lg:text-base"
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
              <Label htmlFor="password" className="text-foreground font-medium text-sm lg:text-base">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 lg:h-5 lg:w-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10 lg:pl-11 h-11 lg:h-12 border-warm-gray-300 focus:border-gold-500 focus:ring-gold-500 text-sm lg:text-base"
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
              className="w-full h-11 lg:h-12 bg-warm-gray-900 hover:bg-warm-gray-800 text-white font-medium text-sm lg:text-base transition-all-300 mt-6"
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

          {/* Features móvil */}
          <div className="lg:hidden space-y-4 pt-4 border-t border-warm-gray-200">
            <div className="flex items-center space-x-3 text-warm-gray-700">
              <div className="flex items-center justify-center w-8 h-8 bg-sage-100 rounded-full">
                <Sparkles className="w-4 h-4 text-sage-400" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Diseños Elegantes</h4>
                <p className="text-xs text-warm-gray-600">Plantillas profesionales</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-warm-gray-700">
              <div className="flex items-center justify-center w-8 h-8 bg-sage-100 rounded-full">
                <Heart className="w-4 h-4 text-sage-400" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Momentos Únicos</h4>
                <p className="text-xs text-warm-gray-600">Para eventos especiales</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-warm-gray-700">
              <div className="flex items-center justify-center w-8 h-8 bg-sage-100 rounded-full">
                <Calendar className="w-4 h-4 text-sage-400" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Envío Instantáneo</h4>
                <p className="text-xs text-warm-gray-600">Comparte al instante</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
