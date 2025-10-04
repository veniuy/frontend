// src/pages/RegisterNew.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Mail, Lock, User, Phone, Sparkles, Heart, Calendar } from 'lucide-react';
import elegantBackground from '../assets/elegant-background.jpg';

export function RegisterNew() {
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
      {/* Lado Izquierdo - Información y Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-warm-gray-50 to-warm-gray-100 relative overflow-hidden">
        {/* Imagen de fondo con overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${elegantBackground})` }}
        />
        
        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-warm-gray-50/90 to-warm-gray-100/90" />
        
        {/* Contenido */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-center">
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
      </div>

      {/* Lado Derecho - Formulario de Registro */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header del formulario */}
          <div className="text-center lg:text-left">
            {/* Logo móvil */}
            <div className="lg:hidden mb-6">
              <div className="font-display text-4xl font-black tracking-wide text-foreground">Venite</div>
            </div>
            
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Crear Cuenta
            </h1>
            <p className="text-muted-foreground">
              Únete y comienza a crear invitaciones únicas
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="pl-11 h-12 border-warm-gray-300 focus:border-gold-500 focus:ring-gold-500"
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
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-11 h-12 border-warm-gray-300 focus:border-gold-500 focus:ring-gold-500"
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
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="nombre_completo"
                  name="nombre_completo"
                  type="text"
                  className="pl-11 h-12 border-warm-gray-300 focus:border-gold-500 focus:ring-gold-500"
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
                <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  className="pl-11 h-12 border-warm-gray-300 focus:border-gold-500 focus:ring-gold-500"
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
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-11 h-12 border-warm-gray-300 focus:border-gold-500 focus:ring-gold-500"
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
              className="w-full h-12 bg-warm-gray-900 hover:bg-warm-gray-800 text-white font-medium text-base transition-all-300"
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
            <p className="text-xs text-muted-foreground">
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
  );
}

export default RegisterNew;
