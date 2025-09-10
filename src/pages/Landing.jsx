// Landing.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { CartIcon, ShoppingCartSidebar } from '../components/ShoppingCart'
import { 
  Heart, 
  Users, 
  Send, 
  FileText, 
  Edit, 
  Share,
  Check,
  Star,
  Sparkles,
  ArrowRight,
  Play,
  ChevronDown,
  Search,
  ShoppingCart,
  User,
  Menu,
  Phone,
  Leaf,
  Recycle,
  Award,
  Instagram,
  Facebook,
  Twitter,
  Smartphone,
  Globe,
  Zap,
  Clock,
  Crown
} from 'lucide-react'

import { asset, ph, onImgError } from '../utils/assets';

function Landing() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('Todas')

  const categories = [
    { name: 'Bodas', image: asset('/src/assets/cotton_bird_images/categoria_boda_grid.webp') },
    { name: 'Quinceañeras', image: asset('/src/assets/cotton_bird_images/categoria_bebes_ninos.webp') },
    { name: 'Cumpleaños Infantiles', image: asset('/src/assets/cotton_bird_images/categoria_cumpleanos.webp') },
    { name: 'Eventos Corporativos', image: asset('/src/assets/cotton_bird_images/categoria_productos_fotos.webp') },
    { name: 'Baby Shower', image: asset('/src/assets/cotton_bird_images/categoria_bautizo.webp') },
    { name: 'Graduaciones', image: asset('/src/assets/cotton_bird_images/categoria_invitaciones_digitales.webp') }
  ]

  const featuredProducts = [
    {
      id: 1,
      name: "Invitación Digital Elegante",
      category: "Bodas",
      image: asset('/src/assets/cotton_bird_images/album_le_petit_quotidien.webp'),
      price: "Desde 25,00 €",
      badge: "Nuevo"
    },
    {
      id: 2,
      name: "Invitación Quinceañera Premium",
      category: "Quinceañeras", 
      image: asset('/src/assets/cotton_bird_images/invitacion_creacion_propia.webp'),
      price: "Desde 20,00 €",
      badge: "Popular"
    },
    {
      id: 3,
      name: "Invitación Infantil Animada",
      category: "Cumpleaños Infantiles",
      image: asset('/src/assets/cotton_bird_images/novedades_boda.webp'),
      price: "Desde 15,00 €",
      badge: null
    },
    {
      id: 4,
      name: "Invitación Corporativa",
      category: "Eventos Corporativos",
      image: asset('/src/assets/cotton_bird_images/producto_jazmin_cuadro.webp'),
      price: "Desde 30,00 €",
      badge: null
    }
  ]

  const values = [
    {
      icon: Smartphone,
      title: "100% Digital y Ecológico",
      description: "Invitaciones completamente digitales que cuidan el medio ambiente"
    },
    {
      icon: Zap,
      title: "Entrega Instantánea",
      description: "Recibe tu invitación en minutos, no en días"
    },
    {
      icon: Globe,
      title: "Comparte en Cualquier Lugar",
      description: "WhatsApp, email, redes sociales - llega a todos tus invitados"
    },
    {
      icon: Edit,
      title: "Personalización Total",
      description: "Diseños únicos adaptados a tu estilo y evento especial"
    }
  ]

  const digitalFeatures = [
    {
      title: "Invitaciones Interactivas",
      description: "Incluye mapas, confirmación de asistencia, música de fondo y animaciones que sorprenderán a tus invitados."
    },
    {
      title: "Gestión de Invitados",
      description: "Panel de control para ver quién ha visto la invitación, confirmaciones de asistencia y gestión completa de tu lista."
    },
    {
      title: "Diseños Responsivos",
      description: "Perfectas en cualquier dispositivo: móvil, tablet o computadora. Tus invitados las verán siempre perfectas."
    },
    {
      title: "Actualizaciones en Tiempo Real",
      description: "¿Cambió algo? Actualiza la información y todos tus invitados verán los cambios automáticamente."
    }
  ]

  return (
    <div className="min-h-screen bg-background font-ui">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Contact Info */}
            <div className="hidden md:flex items-center text-sm text-muted-foreground">
              <Phone className="w-4 h-4 mr-2" />
              +34 919 03 36 08
            </div>
            
            {/* Logo */}
            <div className="font-display text-2xl font-medium text-foreground tracking-wide cursor-pointer" onClick={() => navigate('/')}>
              Venite
              <span className="text-xs text-muted-foreground ml-2">invitaciones digitales que enamoran</span>
            </div>
            
            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
              <Heart className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
              <User className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" onClick={() => navigate('/login')} />
              <CartIcon />
              <Menu className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors md:hidden" />
            </div>
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center justify-center space-x-8 py-4 border-t border-border">
            <a href="#bodas" className="text-muted-foreground hover:text-primary transition-colors font-medium" onClick={() => navigate('/products')}>Bodas</a>
            <a href="#quinceaneras" className="text-muted-foreground hover:text-primary transition-colors font-medium" onClick={() => navigate('/products')}>Quinceañeras</a>
            <a href="#infantiles" className="text-muted-foreground hover:text-primary transition-colors font-medium" onClick={() => navigate('/products')}>Cumpleaños Infantiles</a>
            <a href="#baby-shower" className="text-muted-foreground hover:text-primary transition-colors font-medium" onClick={() => navigate('/products')}>Baby Shower</a>
            <a href="#corporativos" className="text-muted-foreground hover:text-primary transition-colors font-medium" onClick={() => navigate('/products')}>Eventos Corporativos</a>
            <a href="#graduaciones" className="text-muted-foreground hover:text-primary transition-colors font-medium" onClick={() => navigate('/products')}>Graduaciones</a>
            <a href="#plantillas" className="text-muted-foreground hover:text-primary transition-colors font-medium" onClick={() => navigate('/products')}>Todas las Plantillas</a>
          </nav>
        </div>
      </header>

      {/* Hero Section - Digital Focus */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[500px]">
          {/* Wedding Section */}
          <div className="relative bg-gradient-warm flex items-center justify-center p-8">
            <div className="text-center lg:text-left max-w-md">
              <h1 className="font-display text-3xl lg:text-4xl font-medium text-foreground leading-tight mb-4">
                Invitaciones digitales para tu boda perfecta
              </h1>
              <p className="text-muted-foreground mb-6">
                Diseños elegantes, interactivos y completamente personalizables. Sorprende a tus invitados desde el primer momento.
              </p>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                onClick={() => navigate('/products')}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Ver Invitaciones de Boda
              </Button>
            </div>
          </div>
          
          {/* Quinceañera Section */}
          <div className="relative bg-gradient-sage flex items-center justify-center p-8">
            <div className="text-center lg:text-left max-w-md">
              <h1 className="font-display text-3xl lg:text-4xl font-medium text-foreground leading-tight mb-4">
                ¡Quinceañeras que brillan!
              </h1>
              <p className="text-muted-foreground mb-6">
                Invitaciones digitales únicas para celebrar sus 15 años con estilo y elegancia.
              </p>
              <Button 
                size="lg" 
                className="bg-sage-400 hover:bg-sage-400/90 text-white px-8"
                onClick={() => navigate('/products')}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Descubre Quinceañeras
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-medium text-foreground mb-4">
              Nuestras invitaciones más populares
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Diseños digitales que combinan elegancia, interactividad y personalización para hacer de tu evento algo inolvidable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover-lift shadow-warm border-border" onClick={() => navigate(`/product/${product.id}`)}>
                <div className="aspect-square overflow-hidden rounded-t-lg relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover-scale"
                    onError={(e) => onImgError(e, product.name)}
                  />
                  {product.badge && (
                    <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                      {product.badge}
                    </Badge>
                  )}
                  <div className="absolute top-2 right-2">
                    <Heart className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      <Globe className="w-3 h-3 mr-1" />
                      Digital
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-foreground mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                  <p className="font-semibold text-foreground">{product.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-medium text-foreground mb-4">
              Invitaciones para cada ocasión especial
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Desde bodas elegantes hasta cumpleaños infantiles llenos de diversión. Tenemos el diseño perfecto para tu evento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="group cursor-pointer hover-lift shadow-warm border-border overflow-hidden" onClick={() => navigate('/products')}>
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover hover-scale"
                    onError={(e) => onImgError(e, category.name)}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-xl font-medium text-white mb-2">
                      {category.name}
                    </h3>
                    <Button variant="secondary" size="sm" className="bg-white/90 text-foreground hover:bg-white">
                      <Globe className="w-3 h-3 mr-2" />
                      Ver Diseños
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Advantages Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-medium text-foreground mb-4">
              ¿Por qué elegir invitaciones digitales?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              La evolución natural de las invitaciones tradicionales. Más interactivas, ecológicas y convenientes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-sage-400" />
                </div>
                <h3 className="font-medium text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-medium text-foreground mb-4">
            ¡Únete a la revolución digital!
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Suscríbete y recibe plantillas exclusivas, descuentos especiales y las últimas tendencias en invitaciones digitales. 
            ¡Además obtén un 20% de descuento en tu primera invitación!
          </p>
          
          <div className="max-w-md mx-auto space-y-4">
            <Input 
              type="email" 
              placeholder="Correo electrónico"
              className="border-border"
            />
            <Input 
              type="email" 
              placeholder="Repetir correo"
              className="border-border"
            />
            <Select>
              <SelectTrigger className="border-border">
                <SelectValue placeholder="Tipo de evento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="boda">Boda</SelectItem>
                <SelectItem value="quinceanera">Quinceañera</SelectItem>
                <SelectItem value="infantil">Cumpleaños Infantil</SelectItem>
                <SelectItem value="baby-shower">Baby Shower</SelectItem>
                <SelectItem value="corporativo">Evento Corporativo</SelectItem>
                <SelectItem value="graduacion">Graduación</SelectItem>
                <SelectItem value="otro">Otro evento</SelectItem>
              </SelectContent>
            </Select>
            <Input 
              type="date" 
              placeholder="Fecha del evento"
              className="border-border"
            />
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Send className="w-4 h-4 mr-2" />
              Quiero mi descuento del 20%
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-4">
            Al suscribirte aceptas recibir emails promocionales. Puedes darte de baja en cualquier momento.
          </p>
        </div>
      </section>

      {/* Digital Features Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={asset('/src/assets/cotton_bird_images/taller_produccion_cotton_bird.webp')} 
                alt="Diseño de invitaciones digitales"
                className="w-full rounded-lg shadow-warm-lg"
                onError={(e) => onImgError(e, "Diseño de invitaciones digitales")}
              />
            </div>
            <div className="space-y-8">
              <div className="mb-8">
                <h2 className="font-display text-3xl font-medium text-foreground mb-4">
                  Tecnología al servicio de tus eventos
                </h2>
                <p className="text-muted-foreground">
                  Nuestras invitaciones digitales van más allá del diseño. Son experiencias interactivas que conectan con tus invitados.
                </p>
              </div>
              
              {digitalFeatures.map((feature, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/10"
                  onClick={() => navigate('/demo/boda')}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Demo Boda
                </Button>
                <Button 
                  variant="outline" 
                  className="border-sage-400 text-sage-400 hover:bg-sage-100"
                  onClick={() => navigate('/demo/quinceanera')}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Demo Quinceañera
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="font-display text-xl font-medium mb-4">Venite</h3>
              <p className="text-muted text-sm mb-4">
                invitaciones digitales que enamoran
              </p>
              <div className="flex space-x-4">
                <Instagram className="w-5 h-5 text-muted hover:text-background cursor-pointer transition-colors" />
                <Facebook className="w-5 h-5 text-muted hover:text-background cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-muted hover:text-background cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-medium mb-4">Nuestros Servicios</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#" className="hover:text-background transition-colors">Invitaciones de Boda</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Quinceañeras</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Cumpleaños Infantiles</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Baby Shower</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Eventos Corporativos</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Graduaciones</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Diseño Personalizado</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-medium mb-4">Soporte y Ayuda</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#" className="hover:text-background transition-colors">Cómo funciona</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Guía de personalización</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Gestión de invitados</a></li>
                <li><a href="/faq" className="hover:text-background transition-colors">Preguntas frecuentes</a></li>
                <li><a href="/contact" className="hover:text-background transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Soporte técnico</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-medium mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#" className="hover:text-background transition-colors">Sobre nosotros</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Nuestro equipo</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Términos de servicio</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Política de privacidad</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Afiliados</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-muted mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted">
                © 2024 Venite. Todos los derechos reservados.
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="text-sm text-muted">Métodos de pago:</span>
                <div className="flex space-x-2">
                  <div className="w-8 h-5 bg-muted rounded text-xs flex items-center justify-center text-foreground">VISA</div>
                  <div className="w-8 h-5 bg-muted rounded text-xs flex items-center justify-center text-foreground">MC</div>
                  <div className="w-8 h-5 bg-muted rounded text-xs flex items-center justify-center text-foreground">PP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Sidebar */}
      <ShoppingCartSidebar />
    </div>
  )
}

export default Landing
