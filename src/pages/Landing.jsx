import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { asset, onImgError } from '../utils/assets';
import { 
  Palette, 
  Users, 
  Send, 
  FileText, 
  Edit, 
  Share,
  Check,
  Star,
  Heart,
  Sparkles,
  ArrowRight,
  Play,
  ChevronDown
} from 'lucide-react'

function Landing() {
  const navigate = useNavigate()

  const templates = [
    {
      id: 1,
      name: "Elegancia Floral",
      category: "Boda",
      image: "/api/placeholder/300/400",
      badge: "Popular"
    },
    {
      id: 2,
      name: "Minimalista Moderna",
      category: "Boda", 
      image: "/api/placeholder/300/400",
      badge: "Nuevo"
    },
    {
      id: 3,
      name: "Corte Láser",
      category: "Boda",
      image: "/api/placeholder/300/400",
      badge: null
    }
  ]

  const features = [
    {
      icon: Palette,
      title: "Personalización Total",
      description: "Colores, tipografías, imágenes. Todo a tu medida para reflejar tu estilo único."
    },
    {
      icon: Users,
      title: "RSVP Inteligente",
      description: "Confirmaciones automáticas y gestión completa de invitados en tiempo real."
    },
    {
      icon: Send,
      title: "Envío Instantáneo",
      description: "WhatsApp, email, redes sociales. Tu invitación llega al instante."
    }
  ]

  const steps = [
    {
      icon: FileText,
      title: "Elige tu diseño",
      description: "Selecciona entre nuestras plantillas elegantes"
    },
    {
      icon: Edit,
      title: "Personaliza",
      description: "Añade tu toque personal con colores y textos"
    },
    {
      icon: Share,
      title: "Envía y gestiona",
      description: "Comparte y recibe confirmaciones automáticamente"
    }
  ]

  const testimonials = [
    {
      name: "María González",
      event: "Boda",
      rating: 5,
      quote: "¡Increíble! Mis invitados quedaron encantados con la invitación digital. Súper fácil de usar.",
      avatar: "MG"
    },
    {
      name: "Carlos Ruiz",
      event: "Bautizo",
      rating: 5,
      quote: "Perfecto para el bautizo de mi hijo. El RSVP automático me ahorró muchísimo tiempo.",
      avatar: "CR"
    },
    {
      name: "Ana Martín",
      event: "Cumpleaños",
      rating: 5,
      quote: "Diseños preciosos y muy profesionales. Definitivamente lo recomiendo.",
      avatar: "AM"
    }
  ]

  return (
    <div className="min-h-screen bg-white font-ui">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-warm-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="font-display text-2xl font-medium text-warm-gray-900 tracking-wide">
              InvitaElegante
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#plantillas" className="text-warm-gray-600 hover:text-warm-gray-900 transition-colors">
                Plantillas
              </a>
              <a href="#caracteristicas" className="text-warm-gray-600 hover:text-warm-gray-900 transition-colors">
                Características
              </a>
              <a href="#precios" className="text-warm-gray-600 hover:text-warm-gray-900 transition-colors">
                Precios
              </a>
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="border-warm-gray-300"
              >
                Iniciar Sesión
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                className="bg-gold-500 hover:bg-gold-400 text-white"
              >
                Empezar Gratis
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="font-display text-5xl lg:text-6xl font-medium text-warm-gray-900 leading-tight mb-6">
                Invitaciones digitales que 
                <span className="text-gold-500"> enamoran</span>
              </h1>
              <p className="text-xl text-warm-gray-600 mb-8 leading-relaxed">
                Crea, personaliza y envía invitaciones elegantes para tus eventos más especiales. 
                Sin papel, sin esperas, solo momentos únicos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/register')}
                  className="bg-gold-500 hover:bg-gold-400 text-white px-8 py-4 text-lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Crear mi invitación gratis
                </Button>
                <Button size="lg" variant="outline" className="border-warm-gray-300 px-8 py-4 text-lg">
                  <Play className="w-5 h-5 mr-2" />
                  Ver ejemplos
                </Button>
              </div>
              <p className="text-sm text-warm-gray-600 mt-4">
                ✨ Sin tarjeta de crédito requerida
              </p>
            </div>
            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-warm-lg p-8 max-w-md mx-auto">
                <img 
                  src="/src/assets/elegant-floral.jpg" 
                  alt="Invitación elegante" 
                  className="w-full rounded-lg shadow-warm"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-display text-lg font-medium text-warm-gray-900">
                    María & Carlos
                  </h3>
                  <p className="text-warm-gray-600">15 de Junio, 2024</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-sage-100/50 to-gold-400/20 rounded-3xl transform rotate-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Gallery */}
      <section id="plantillas" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-medium text-warm-gray-900 mb-4">
              Diseños que reflejan tu estilo
            </h2>
            <p className="text-xl text-warm-gray-600 max-w-2xl mx-auto">
              Elige entre nuestra colección de plantillas elegantes, cada una diseñada 
              para hacer de tu evento algo memorable.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap gap-2">
              {['Todas', 'Boda', 'Bautizo', 'Cumpleaños', 'Comunión'].map((category) => (
                <Button 
                  key={category}
                  variant={category === 'Todas' ? 'default' : 'outline'}
                  className={category === 'Todas' ? 'bg-gold-500 hover:bg-gold-400' : 'border-warm-gray-300'}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card key={template.id} className="group cursor-pointer hover-lift shadow-warm border-warm-gray-300">
                <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
                  <img 
                    src={template.image} 
                    alt={template.name}
                    className="w-full h-full object-cover hover-scale"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-display text-lg font-medium text-warm-gray-900">
                        {template.name}
                      </h3>
                      <p className="text-warm-gray-600">{template.category}</p>
                    </div>
                    {template.badge && (
                      <Badge variant="secondary" className="bg-sage-100 text-sage-400">
                        {template.badge}
                      </Badge>
                    )}
                  </div>
                  <Button variant="outline" className="w-full border-warm-gray-300 mt-4">
                    Ver plantilla
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-warm-gray-300">
              Ver todas las plantillas
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="caracteristicas" className="py-20 bg-gradient-sage">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-medium text-warm-gray-900 mb-4">
              Todo lo que necesitas para el evento perfecto
            </h2>
            <p className="text-xl text-warm-gray-600 max-w-2xl mx-auto">
              Herramientas poderosas y fáciles de usar para crear invitaciones 
              que impresionen a tus invitados.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-8 shadow-warm border-warm-gray-300 bg-white">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-sage-400" />
                </div>
                <h3 className="font-display text-xl font-medium text-warm-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-warm-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-medium text-warm-gray-900 mb-4">
              En 3 pasos simples
            </h2>
            <p className="text-xl text-warm-gray-600 max-w-2xl mx-auto">
              Crear tu invitación perfecta nunca fue tan fácil. 
              Sigue estos pasos y tendrás tu evento organizado en minutos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-display text-xl font-medium text-warm-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-warm-gray-600 leading-relaxed">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full">
                    <ArrowRight className="w-6 h-6 text-warm-gray-300 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precios" className="py-20 bg-gradient-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-medium text-warm-gray-900 mb-4">
              Precios justos y transparentes
            </h2>
            <p className="text-xl text-warm-gray-600 max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a tu evento. 
              Sin sorpresas, sin costos ocultos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="shadow-warm border-warm-gray-300 bg-white">
              <CardHeader className="text-center pb-8">
                <CardTitle className="font-display text-2xl font-medium text-warm-gray-900">
                  Gratuito
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-warm-gray-900">€0</span>
                  <span className="text-warm-gray-600">/evento</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-warm-gray-600">5 invitaciones</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-warm-gray-600">Plantillas básicas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-warm-gray-600">RSVP incluido</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full border-warm-gray-300"
                  onClick={() => navigate('/register')}
                >
                  Empezar gratis
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="shadow-warm-lg border-gold-500 bg-white relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gold-500 text-white px-4 py-1">
                  Más Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="font-display text-2xl font-medium text-warm-gray-900">
                  Premium
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-warm-gray-900">€9.99</span>
                  <span className="text-warm-gray-600">/evento</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-warm-gray-600">Invitaciones ilimitadas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-warm-gray-600">Todas las plantillas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-warm-gray-600">Personalización avanzada</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-warm-gray-600">Galería de fotos</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-gold-500 hover:bg-gold-400 text-white"
                  onClick={() => navigate('/register')}
                >
                  Elegir Premium
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="shadow-warm border-warm-gray-300 bg-white">
              <CardHeader className="text-center pb-8">
                <CardTitle className="font-display text-2xl font-medium text-warm-gray-900">
                  Pro
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-warm-gray-900">€19.99</span>
                  <span className="text-warm-gray-600">/evento</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-warm-gray-600">Todo Premium +</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-warm-gray-600">Dominio personalizado</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-warm-gray-600">Soporte prioritario</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-warm-gray-600">Análisis detallados</span>
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full border-warm-gray-300"
                  onClick={() => navigate('/register')}
                >
                  Elegir Pro
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-medium text-warm-gray-900 mb-4">
              Miles de eventos exitosos
            </h2>
            <p className="text-xl text-warm-gray-600 max-w-2xl mx-auto">
              Descubre por qué miles de personas confían en nosotros 
              para sus momentos más especiales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-warm border-warm-gray-300 bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-warm-gray-600 mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-medium">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-warm-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-warm-gray-600 text-sm">
                        {testimonial.event}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="flex justify-center items-center space-x-8 text-warm-gray-600">
              <div className="text-center">
                <div className="text-3xl font-bold text-warm-gray-900">10,000+</div>
                <div className="text-sm">Eventos creados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warm-gray-900">95%</div>
                <div className="text-sm">Satisfacción</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warm-gray-900">3h</div>
                <div className="text-sm">Tiempo ahorrado</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-gold-500 to-gold-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-medium text-white mb-4">
            ¿Listo para crear tu invitación perfecta?
          </h2>
          <p className="text-xl text-gold-100 mb-8">
            Únete a miles de personas que ya confían en nosotros para sus eventos especiales
          </p>
          <Button 
            size="lg" 
            className="bg-white text-gold-600 hover:bg-gray-50 px-8 py-4 text-lg"
            onClick={() => navigate('/register')}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Empezar gratis ahora
          </Button>
          <p className="text-gold-100 mt-4">
            ✨ Sin tarjeta de crédito requerida
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-warm-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="font-display text-2xl font-medium mb-4">
                InvitaElegante
              </div>
              <p className="text-warm-gray-400 leading-relaxed">
                Creando momentos únicos con invitaciones digitales elegantes.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Producto</h3>
              <ul className="space-y-2 text-warm-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Plantillas</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Soporte</h3>
              <ul className="space-y-2 text-warm-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Centro de ayuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-warm-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-warm-gray-800 mt-8 pt-8 text-center text-warm-gray-400">
            <p>&copy; 2024 InvitaElegante. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
