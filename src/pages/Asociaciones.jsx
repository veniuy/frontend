import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import PublicHeader from '../components/PublicHeader'
import { 
  Search,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Camera,
  Music,
  Utensils,
  Car,
  Flower,
  Cake,
  Palette,
  Users,
  Heart,
  ExternalLink,
  Filter,
  Award,
  Clock,
  CheckCircle
} from 'lucide-react'

function Asociaciones() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [selectedLocation, setSelectedLocation] = useState('Todas')

  const categories = [
    'Todas',
    'Fotografía',
    'Música y DJ',
    'Catering',
    'Transporte',
    'Floristería',
    'Repostería',
    'Decoración',
    'Wedding Planner',
    'Hoteles'
  ]

  const locations = [
    'Todas',
    'Madrid',
    'Barcelona',
    'Valencia',
    'Sevilla',
    'Bilbao',
    'Málaga',
    'Zaragoza',
    'Murcia',
    'Palma'
  ]

  const providers = [
    {
      id: 1,
      name: "Estudio Fotográfico Luna",
      category: "Fotografía",
      location: "Madrid",
      rating: 4.9,
      reviews: 127,
      description: "Especialistas en fotografía de bodas con estilo natural y emotivo. Más de 10 años de experiencia capturando momentos únicos.",
      services: ["Fotografía de boda", "Pre-boda", "Álbumes personalizados", "Fotografía digital"],
      price: "Desde 1.200€",
      phone: "+34 912 345 678",
      email: "info@estudioluna.com",
      website: "www.estudioluna.com",
      image: "/src/assets/cotton_bird_images/categoria_productos_fotos.webp",
      verified: true,
      featured: true
    },
    {
      id: 2,
      name: "DJ Marcos Beats",
      category: "Música y DJ",
      location: "Barcelona",
      rating: 4.8,
      reviews: 89,
      description: "DJ profesional con amplia experiencia en bodas y eventos. Música personalizada para cada momento de tu celebración.",
      services: ["DJ para bodas", "Sonido profesional", "Iluminación", "Música en vivo"],
      price: "Desde 800€",
      phone: "+34 934 567 890",
      email: "marcos@djbeats.com",
      website: "www.djmarcosbeats.com",
      image: "/src/assets/cotton_bird_images/categoria_boda_grid.webp",
      verified: true,
      featured: false
    },
    {
      id: 3,
      name: "Catering Delicioso",
      category: "Catering",
      location: "Valencia",
      rating: 4.7,
      reviews: 156,
      description: "Catering gourmet para eventos especiales. Menús personalizados con ingredientes frescos y presentación exquisita.",
      services: ["Menú completo", "Cóctel de bienvenida", "Barra libre", "Servicio de mesa"],
      price: "Desde 45€/persona",
      phone: "+34 963 789 012",
      email: "eventos@cateringdelicioso.com",
      website: "www.cateringdelicioso.com",
      image: "/src/assets/cotton_bird_images/taller_produccion_cotton_bird.webp",
      verified: true,
      featured: true
    },
    {
      id: 4,
      name: "Transporte VIP Eventos",
      category: "Transporte",
      location: "Madrid",
      rating: 4.6,
      reviews: 73,
      description: "Servicio de transporte de lujo para novios e invitados. Flota de vehículos elegantes con conductor profesional.",
      services: ["Coche de novios", "Transporte invitados", "Limusinas", "Coches clásicos"],
      price: "Desde 300€",
      phone: "+34 915 432 109",
      email: "reservas@transportevip.com",
      website: "www.transportevipeventos.com",
      image: "/src/assets/cotton_bird_images/categoria_boda_grid.webp",
      verified: false,
      featured: false
    },
    {
      id: 5,
      name: "Flores Románticas",
      category: "Floristería",
      location: "Sevilla",
      rating: 4.9,
      reviews: 94,
      description: "Arreglos florales únicos para bodas y eventos. Diseños personalizados que reflejan tu estilo y personalidad.",
      services: ["Ramo de novia", "Decoración floral", "Centros de mesa", "Arcos florales"],
      price: "Desde 400€",
      phone: "+34 954 876 543",
      email: "info@floresromanticas.com",
      website: "www.floresromanticas.com",
      image: "/src/assets/cotton_bird_images/categoria_productos_fotos.webp",
      verified: true,
      featured: true
    },
    {
      id: 6,
      name: "Dulces Momentos",
      category: "Repostería",
      location: "Barcelona",
      rating: 4.8,
      reviews: 112,
      description: "Tartas de boda artesanales y mesa dulce personalizada. Sabores únicos y diseños espectaculares.",
      services: ["Tarta de boda", "Mesa dulce", "Cupcakes", "Macarons personalizados"],
      price: "Desde 250€",
      phone: "+34 932 109 876",
      email: "pedidos@dulcesmomentos.com",
      website: "www.dulcesmomentos.com",
      image: "/src/assets/cotton_bird_images/taller_produccion_cotton_bird.webp",
      verified: true,
      featured: false
    },
    {
      id: 7,
      name: "Decoración Elegante",
      category: "Decoración",
      location: "Valencia",
      rating: 4.7,
      reviews: 68,
      description: "Decoración integral para bodas y eventos. Transformamos espacios en ambientes mágicos y únicos.",
      services: ["Decoración completa", "Mobiliario", "Iluminación", "Textiles"],
      price: "Desde 1.500€",
      phone: "+34 961 234 567",
      email: "info@decoracionelegante.com",
      website: "www.decoracionelegante.com",
      image: "/src/assets/cotton_bird_images/categoria_boda_grid.webp",
      verified: true,
      featured: true
    },
    {
      id: 8,
      name: "Perfect Wedding Planner",
      category: "Wedding Planner",
      location: "Madrid",
      rating: 5.0,
      reviews: 45,
      description: "Organización integral de bodas. Nos encargamos de cada detalle para que tu día sea perfecto.",
      services: ["Planificación completa", "Coordinación del día", "Gestión proveedores", "Timeline personalizado"],
      price: "Desde 2.000€",
      phone: "+34 917 654 321",
      email: "hola@perfectweddingplanner.com",
      website: "www.perfectweddingplanner.com",
      image: "/src/assets/cotton_bird_images/categoria_productos_fotos.webp",
      verified: true,
      featured: true
    },
    {
      id: 9,
      name: "Hotel Boutique Maravilla",
      category: "Hoteles",
      location: "Málaga",
      rating: 4.6,
      reviews: 203,
      description: "Hotel boutique con espacios únicos para celebraciones. Jardines, salones elegantes y servicio personalizado.",
      services: ["Salón de eventos", "Jardín para ceremonias", "Alojamiento invitados", "Menú personalizado"],
      price: "Desde 80€/persona",
      phone: "+34 952 345 678",
      email: "eventos@hotelmaravilla.com",
      website: "www.hotelmaravilla.com",
      image: "/src/assets/cotton_bird_images/taller_produccion_cotton_bird.webp",
      verified: true,
      featured: false
    }
  ]

  const getCategoryIcon = (category) => {
    const icons = {
      'Fotografía': Camera,
      'Música y DJ': Music,
      'Catering': Utensils,
      'Transporte': Car,
      'Floristería': Flower,
      'Repostería': Cake,
      'Decoración': Palette,
      'Wedding Planner': Users,
      'Hoteles': MapPin
    }
    return icons[category] || Heart
  }

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'Todas' || provider.category === selectedCategory
    const matchesLocation = selectedLocation === 'Todas' || provider.location === selectedLocation
    
    return matchesSearch && matchesCategory && matchesLocation
  })

  const featuredProviders = filteredProviders.filter(provider => provider.featured)
  const regularProviders = filteredProviders.filter(provider => !provider.featured)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PublicHeader />

      {/* Hero Section */}
      <section className="bg-gradient-warm py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-display font-medium text-foreground mb-4">
            Asociaciones y Proveedores
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Encuentra los mejores profesionales para hacer de tu evento algo inolvidable
          </p>
          
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar proveedores, servicios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 bg-background border-border">
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

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full md:w-48 bg-background border-border">
                  <SelectValue placeholder="Ubicación" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              {filteredProviders.length} proveedor{filteredProviders.length !== 1 ? 'es' : ''} encontrado{filteredProviders.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Verificado</span>
              <Award className="w-4 h-4 text-gold-500 ml-4" />
              <span>Destacado</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      {featuredProviders.length > 0 && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-display font-medium text-foreground mb-8 flex items-center">
              <Award className="w-6 h-6 text-gold-500 mr-3" />
              Proveedores Destacados
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProviders.map((provider) => {
                const IconComponent = getCategoryIcon(provider.category)
                return (
                  <Card key={provider.id} className="group hover:shadow-warm transition-all duration-300 border-border overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img 
                        src={provider.image} 
                        alt={provider.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 flex space-x-2">
                        {provider.verified && (
                          <Badge className="bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verificado
                          </Badge>
                        )}
                        <Badge className="bg-gold-500 text-white">
                          <Award className="w-3 h-3 mr-1" />
                          Destacado
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <IconComponent className="w-8 h-8 text-white bg-black/50 p-1.5 rounded-full" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-display text-xl font-medium text-foreground mb-1">
                            {provider.name}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {provider.location}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                          <span className="text-sm font-medium">{provider.rating}</span>
                          <span className="text-xs text-muted-foreground ml-1">({provider.reviews})</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {provider.description}
                      </p>
                      
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1 mb-3">
                          {provider.services.slice(0, 3).map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {provider.services.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{provider.services.length - 3} más
                            </Badge>
                          )}
                        </div>
                        <p className="text-primary font-medium">{provider.price}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-3">
                          <Button variant="outline" size="sm" className="p-2">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="p-2">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="p-2">
                            <Globe className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          Ver detalles
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Regular Providers */}
      {regularProviders.length > 0 && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {featuredProviders.length > 0 && (
              <h2 className="text-2xl font-display font-medium text-foreground mb-8">
                Todos los Proveedores
              </h2>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularProviders.map((provider) => {
                const IconComponent = getCategoryIcon(provider.category)
                return (
                  <Card key={provider.id} className="group hover:shadow-warm transition-all duration-300 border-border overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img 
                        src={provider.image} 
                        alt={provider.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        {provider.verified && (
                          <Badge className="bg-green-600 text-white">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verificado
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-4 right-4">
                        <IconComponent className="w-8 h-8 text-white bg-black/50 p-1.5 rounded-full" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-display text-xl font-medium text-foreground mb-1">
                            {provider.name}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {provider.location}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                          <span className="text-sm font-medium">{provider.rating}</span>
                          <span className="text-xs text-muted-foreground ml-1">({provider.reviews})</span>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {provider.description}
                      </p>
                      
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1 mb-3">
                          {provider.services.slice(0, 3).map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {provider.services.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{provider.services.length - 3} más
                            </Badge>
                          )}
                        </div>
                        <p className="text-primary font-medium">{provider.price}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-3">
                          <Button variant="outline" size="sm" className="p-2">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="p-2">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="p-2">
                            <Globe className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          Ver detalles
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredProviders.length === 0 && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No se encontraron proveedores
            </h3>
            <p className="text-muted-foreground mb-6">
              No encontramos proveedores que coincidan con tu búsqueda. 
              Intenta con otros términos o ajusta los filtros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('Todas')
                  setSelectedLocation('Todas')
                }}
                variant="outline"
              >
                Limpiar filtros
              </Button>
              <Button 
                onClick={() => navigate('/contact')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Contactar para ayuda
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-display font-medium text-foreground mb-4">
            ¿Eres un proveedor de servicios?
          </h2>
          <p className="text-muted-foreground mb-8">
            Únete a nuestra red de proveedores verificados y llega a más clientes
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">Verificación</h3>
              <p className="text-muted-foreground text-sm">
                Proceso de verificación para garantizar calidad
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">Más clientes</h3>
              <p className="text-muted-foreground text-sm">
                Acceso a nuestra base de clientes activos
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <Award className="w-8 h-8 text-gold-500 mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">Destacar</h3>
              <p className="text-muted-foreground text-sm">
                Opciones para destacar tu negocio
              </p>
            </Card>
          </div>
          
          <Button 
            onClick={() => navigate('/contact')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
          >
            Solicitar información
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Asociaciones
