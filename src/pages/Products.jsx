// Products.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import PublicHeader from '../components/PublicHeader'
import ImageScrollSection from './ImageScrollSection';
import { 
  Search,
  Grid3X3,
  List,
  Heart,
  Smartphone,
  Globe,
  Zap,
  Crown,
  Leaf,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react'

import { asset, onImgError } from '../utils/assets';

function Products() {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState('grid')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [sortBy, setSortBy] = useState('popular')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Estados para el carrito y lista de deseos
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)

  // Handlers para el PublicHeader
  const handleSearchClick = () => {
    // Enfocar el campo de búsqueda existente
    document.querySelector('input[placeholder="Buscar plantillas..."]')?.focus()
  }

  const handleWishlistClick = () => {
    // Navegar a la lista de deseos (implementar según necesidades)
    console.log('Abrir lista de deseos')
  }

  const handleCartClick = () => {
    // Navegar al carrito (implementar según necesidades)
    console.log('Abrir carrito')
  }

  const categories = [
    'Todas',
    'Bodas',
    'Quinceañeras', 
    'Cumpleaños Infantiles',
    'Baby Shower',
    'Eventos Corporativos',
    'Graduaciones'
  ]

  const products = [
    {
      id: 1,
      name: "Elegancia Dorada",
      category: "Bodas",
      image: asset('/src/assets/cotton_bird_images/categoria_boda_grid.webp'),
      price: "Desde 25,00 €",
      originalPrice: "35,00 €",
      badge: "Más Popular",
      features: ["Música de fondo", "Mapa interactivo", "RSVP", "Galería de fotos"],
      description: "Diseño elegante con detalles dorados, perfecto para bodas sofisticadas."
    },
    {
      id: 2,
      name: "Princesa de Ensueño",
      category: "Quinceañeras",
      image: asset('/src/assets/cotton_bird_images/categoria_bebes_ninos.webp'),
      price: "Desde 20,00 €",
      badge: "Nuevo",
      features: ["Animaciones", "Música personalizada", "Cuenta regresiva", "RSVP"],
      description: "Diseño mágico con animaciones especiales para quinceañeras."
    },
    {
      id: 3,
      name: "Fiesta Arcoíris",
      category: "Cumpleaños Infantiles",
      image: asset('/src/assets/cotton_bird_images/categoria_cumpleanos.webp'),
      price: "Desde 15,00 €",
      badge: null,
      features: ["Juegos interactivos", "Música divertida", "Animaciones", "Lista de regalos"],
      description: "Colorida y divertida, perfecta para cumpleaños infantiles llenos de alegría."
    },
    {
      id: 4,
      name: "Dulce Espera",
      category: "Baby Shower",
      image: asset('/src/assets/cotton_bird_images/categoria_bautizo.webp'),
      price: "Desde 18,00 €",
      badge: null,
      features: ["Música suave", "Galería de fotos", "Lista de regalos", "RSVP"],
      description: "Diseño tierno y delicado para celebrar la llegada del bebé."
    },
    {
      id: 5,
      name: "Corporativo Elegante",
      category: "Eventos Corporativos",
      image: asset('/src/assets/cotton_bird_images/categoria_productos_fotos.webp'),
      price: "Desde 30,00 €",
      badge: null,
      features: ["Diseño profesional", "Agenda del evento", "Networking", "RSVP"],
      description: "Diseño profesional y sofisticado para eventos empresariales."
    },
    {
      id: 6,
      name: "Graduación Triunfal",
      category: "Graduaciones",
      image: asset('/src/assets/cotton_bird_images/categoria_invitaciones_digitales.webp'),
      price: "Desde 22,00 €",
      badge: null,
      features: ["Música inspiradora", "Galería de logros", "Mensaje personalizado", "RSVP"],
      description: "Celebra este logro importante con un diseño que refleje el éxito."
    },
    {
      id: 7,
      name: "Boda Minimalista",
      category: "Bodas",
      image: asset('/src/assets/cotton_bird_images/album_le_petit_quotidien.webp'),
      price: "Desde 28,00 €",
      badge: null,
      features: ["Diseño limpio", "Tipografía elegante", "Mapa", "RSVP"],
      description: "Elegancia en la simplicidad, perfecto para bodas modernas."
    },
    {
      id: 8,
      name: "Quinceañera Real",
      category: "Quinceañeras",
      image: asset('/src/assets/cotton_bird_images/invitacion_creacion_propia.webp'),
      price: "Desde 24,00 €",
      badge: "Premium",
      features: ["Corona animada", "Música de vals", "Protocolo", "RSVP"],
      description: "Diseño real con detalles de corona y elementos de princesa."
    }
  ]

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory
    const q = searchTerm.toLowerCase()
    const matchesSearch =
      product.name.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const num = (s) => parseFloat(s.replace(/[^\d,]/g, '').replace(',', '.'))
    switch (sortBy) {
      case 'price-low':  return num(a.price) - num(b.price)
      case 'price-high': return num(b.price) - num(a.price)
      case 'newest':     return b.id - a.id
      default:           return 0 // popular (sin ratings)
    }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PublicHeader 
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onSearchClick={handleSearchClick}
        onWishlistClick={handleWishlistClick}
        onCartClick={handleCartClick}
      />

      {/* Image Scroll Section */}
      <ImageScrollSection />

      {/* Hero Section */}
      <section className="bg-gradient-warm py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-medium text-foreground mb-4">
              Plantillas de Invitaciones Digitales
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Diseños únicos, interactivos y completamente personalizables para hacer de tu evento algo inolvidable
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar plantillas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Más Popular</SelectItem>
                  <SelectItem value="newest">Más Nuevo</SelectItem>
                  <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                {sortedProducts.length} plantilla{sortedProducts.length !== 1 ? 's' : ''} encontrada{sortedProducts.length !== 1 ? 's' : ''}
              </p>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group cursor-pointer hover-lift shadow-warm border-border overflow-hidden rounded-lg p-0"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="relative aspect-square">
                    {/* Imagen sin franjas: posición absoluta + object-cover */}
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover object-center block transition-transform duration-300 group-hover:scale-[1.03]"
                      onError={(e) => onImgError(e, product.name)}
                      loading="lazy"
                      decoding="async"
                    />
                    {product.badge && (
                      <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                        {product.badge}
                      </Badge>
                    )}
                    <div className="absolute bottom-2 left-2 flex space-x-1">
                      <Badge variant="secondary" className="bg-black/70 text-white text-xs">
                        <Globe className="w-3 h-3 mr-1" />
                        Digital
                      </Badge>
                      <Badge variant="secondary" className="bg-black/70 text-white text-xs">
                        <Zap className="w-3 h-3 mr-1" />
                        Interactiva
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-medium text-foreground mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-foreground">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                      {/* Minimalista: sin botón "Ver" */}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group cursor-pointer hover:shadow-warm transition-shadow border-border overflow-hidden"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="relative w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                        {/* Imagen sin franjas en vista lista */}
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover object-center block transition-transform duration-300 group-hover:scale-[1.03]"
                          onError={(e) => onImgError(e, product.name)}
                          loading="lazy"
                          decoding="async"
                        />
                        {product.badge && (
                          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="min-w-0 mb-2">
                          <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-2">{product.category}</p>
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.features.slice(0, 4).map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-foreground text-lg">{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through ml-2">
                                {product.originalPrice}
                              </span>
                            )}
                          </div>
                          {/* Minimalista: sin acciones adicionales */}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No se encontraron plantillas
              </h3>
              <p className="text-muted-foreground mb-6">
                Intenta con otros términos de búsqueda o cambia los filtros.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('Todas')
                }}
                variant="outline"
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-medium text-foreground mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nuestro equipo de diseñadores puede crear una invitación 100% personalizada para tu evento especial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => navigate('/contact')}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Solicitar Diseño Personalizado
            </Button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button size="lg" variant="outline" onClick={() => navigate('/demo/black')}>
                <Globe className="w-4 h-4 mr-2" />
                Demo Black
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/demo/premium')}>
                <Heart className="w-4 h-4 mr-2" />
                Demo Premium
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/demo/clasica')}>
                <Leaf className="w-4 h-4 mr-2" />
                Demo Clásica
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/demo/boda')}>
                <Heart className="w-4 h-4 mr-2" />
                Demo Romántica
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/demo/quinceanera')}>
                <Crown className="w-4 h-4 mr-2" />
                Demo Quinceañera
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-display text-xl font-medium mb-4">Venite</h3>
              <p className="text-muted text-sm mb-4">invitaciones digitales que enamoran</p>
              <div className="flex space-x-4">
                <Instagram className="w-5 h-5 text-muted hover:text-background cursor-pointer transition-colors" />
                <Facebook className="w-5 h-5 text-muted hover:text-background cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-muted hover:text-background cursor-pointer transition-colors" />
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4">Nuestros Servicios</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><button type="button" onClick={() => navigate('/products?c=Bodas')} className="hover:text-background transition-colors">Invitaciones de Boda</button></li>
                <li><button type="button" onClick={() => navigate('/products?c=Quinceañeras')} className="hover:text-background transition-colors">Quinceañeras</button></li>
                <li><button type="button" onClick={() => navigate('/products?c=Cumpleaños')} className="hover:text-background transition-colors">Cumpleaños Infantiles</button></li>
                <li><button type="button" onClick={() => navigate('/products?c=Baby%20Shower')} className="hover:text-background transition-colors">Baby Shower</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Soporte y Ayuda</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><button type="button" onClick={() => navigate('/faq')} className="hover:text-background transition-colors">Preguntas frecuentes</button></li>
                <li><button type="button" onClick={() => navigate('/contact')} className="hover:text-background transition-colors">Contacto</button></li>
                <li><button type="button" onClick={() => navigate('/support')} className="hover:text-background transition-colors">Soporte técnico</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><button type="button" onClick={() => navigate('/about')} className="hover:text-background transition-colors">Sobre nosotros</button></li>
                <li><button type="button" onClick={() => navigate('/terms')} className="hover:text-background transition-colors">Términos de servicio</button></li>
                <li><button type="button" onClick={() => navigate('/privacy')} className="hover:text-background transition-colors">Política de privacidad</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-muted mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted">© 2024 Venite. Todos los derechos reservados.</p>
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
    </div>
  )
}

export default Products

