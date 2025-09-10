import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  Search,
  Filter,
  Grid3X3,
  List,
  Heart,
  Star,
  ArrowUpDown,
  Smartphone,
  Globe,
  Play,
  Eye,
  Zap,
  Crown,
  Leaf
} from 'lucide-react'

import { asset, ph, onImgError } from '../utils/assets';

function Products() {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState('grid')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [sortBy, setSortBy] = useState('popular')
  const [searchTerm, setSearchTerm] = useState('')

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
      image: '/src/assets/cotton_bird_images/categoria_boda_grid.webp',
      price: "Desde 25,00 €",
      originalPrice: "35,00 €",
      rating: 4.9,
      reviews: 127,
      badge: "Más Popular",
      features: ["Música de fondo", "Mapa interactivo", "RSVP", "Galería de fotos"],
      description: "Diseño elegante con detalles dorados, perfecto para bodas sofisticadas."
    },
    {
      id: 2,
      name: "Princesa de Ensueño",
      category: "Quinceañeras",
      image: '/src/assets/cotton_bird_images/categoria_bebes_ninos.webp',
      price: "Desde 20,00 €",
      rating: 4.8,
      reviews: 89,
      badge: "Nuevo",
      features: ["Animaciones", "Música personalizada", "Cuenta regresiva", "RSVP"],
      description: "Diseño mágico con animaciones especiales para quinceañeras."
    },
    {
      id: 3,
      name: "Fiesta Arcoíris",
      category: "Cumpleaños Infantiles",
      image: '/src/assets/cotton_bird_images/categoria_cumpleanos.webp',
      price: "Desde 15,00 €",
      rating: 4.7,
      reviews: 156,
      badge: null,
      features: ["Juegos interactivos", "Música divertida", "Animaciones", "Lista de regalos"],
      description: "Colorida y divertida, perfecta para cumpleaños infantiles llenos de alegría."
    },
    {
      id: 4,
      name: "Dulce Espera",
      category: "Baby Shower",
      image: '/src/assets/cotton_bird_images/categoria_bautizo.webp',
      price: "Desde 18,00 €",
      rating: 4.9,
      reviews: 73,
      badge: null,
      features: ["Música suave", "Galería de fotos", "Lista de regalos", "RSVP"],
      description: "Diseño tierno y delicado para celebrar la llegada del bebé."
    },
    {
      id: 5,
      name: "Corporativo Elegante",
      category: "Eventos Corporativos",
      image: '/src/assets/cotton_bird_images/categoria_productos_fotos.webp',
      price: "Desde 30,00 €",
      rating: 4.6,
      reviews: 45,
      badge: null,
      features: ["Diseño profesional", "Agenda del evento", "Networking", "RSVP"],
      description: "Diseño profesional y sofisticado para eventos empresariales."
    },
    {
      id: 6,
      name: "Graduación Triunfal",
      category: "Graduaciones",
      image: '/src/assets/cotton_bird_images/categoria_invitaciones_digitales.webp',
      price: "Desde 22,00 €",
      rating: 4.8,
      reviews: 92,
      badge: null,
      features: ["Música inspiradora", "Galería de logros", "Mensaje personalizado", "RSVP"],
      description: "Celebra este logro importante con un diseño que refleje el éxito."
    },
    {
      id: 7,
      name: "Boda Minimalista",
      category: "Bodas",
      image: '/src/assets/cotton_bird_images/album_le_petit_quotidien.webp',
      price: "Desde 28,00 €",
      rating: 4.7,
      reviews: 68,
      badge: null,
      features: ["Diseño limpio", "Tipografía elegante", "Mapa", "RSVP"],
      description: "Elegancia en la simplicidad, perfecto para bodas modernas."
    },
    {
      id: 8,
      name: "Quinceañera Real",
      category: "Quinceañeras",
      image: '/src/assets/cotton_bird_images/invitacion_creacion_propia.webp',
      price: "Desde 24,00 €",
      rating: 4.9,
      reviews: 134,
      badge: "Premium",
      features: ["Corona animada", "Música de vals", "Protocolo", "RSVP"],
      description: "Diseño real con detalles de corona y elementos de princesa."
    }
  ]

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price.replace(/[^\d,]/g, '').replace(',', '.')) - 
               parseFloat(b.price.replace(/[^\d,]/g, '').replace(',', '.'))
      case 'price-high':
        return parseFloat(b.price.replace(/[^\d,]/g, '').replace(',', '.')) - 
               parseFloat(a.price.replace(/[^\d,]/g, '').replace(',', '.'))
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return b.id - a.id
      default: // popular
        return b.reviews - a.reviews
    }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="font-display text-2xl font-medium text-foreground tracking-wide cursor-pointer" onClick={() => navigate('/')}>
              Venite
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-muted-foreground hover:text-primary transition-colors">Inicio</a>
              <a href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a>
              <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contacto</a>
            </nav>
          </div>
        </div>
      </header>

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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
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
                  <SelectItem value="rating">Mejor Valorado</SelectItem>
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
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <Button size="sm" variant="secondary" className="w-8 h-8 p-0 bg-white/90">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="w-8 h-8 p-0 bg-white/90">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
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
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground ml-1">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>
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
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Smartphone className="w-3 h-3 mr-1" />
                        Ver
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedProducts.map((product) => (
                <Card key={product.id} className="group cursor-pointer hover:shadow-warm transition-shadow border-border" onClick={() => navigate(`/product/${product.id}`)}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="w-48 h-32 overflow-hidden rounded-lg relative flex-shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover hover-scale"
                          onError={(e) => onImgError(e, product.name)}
                        />
                        {product.badge && (
                          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs">
                            {product.badge}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground text-lg mb-1">
                              {product.name}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-2">{product.category}</p>
                            <div className="flex items-center mb-3">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-muted-foreground ml-1">
                                {product.rating} ({product.reviews} reseñas)
                              </span>
                            </div>
                          </div>
                          <Heart className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
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
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Vista previa
                            </Button>
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                              <Smartphone className="w-4 h-4 mr-2" />
                              Personalizar
                            </Button>
                          </div>
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
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/demo/black')}
              >
                <Globe className="w-4 h-4 mr-2" />
                Demo Black
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/demo/premium')}
              >
                <Heart className="w-4 h-4 mr-2" />
                Demo Premium
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/demo/clasica')}
              >
                <Leaf className="w-4 h-4 mr-2" />
                Demo Clásica
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/demo/boda')}
              >
                <Heart className="w-4 h-4 mr-2" />
                Demo Romántica
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/demo/quinceanera')}
              >
                <Crown className="w-4 h-4 mr-2" />
                Demo Quinceañera
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Products
