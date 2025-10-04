import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
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
  Flower,
  Cake,
  Palette,
  Users,
  Heart,
  Award,
  CheckCircle,
  Building
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
    'Floristería',
    'Repostería',
    'Decoración',
    'Hoteles y Salones'
  ]

  const locations = [
    'Todas',
    'Montevideo',
    'Canelones',
    'Maldonado',
    'Punta del Este',
    'José Ignacio',
    'Melo',
    'Paysandú'
  ]

  const providers = [
    {
      id: 1,
      name: "Pablo Denis Fotografía",
      category: "Fotografía",
      location: "Montevideo",
      rating: 4.9,
      reviews: 145,
      description: "Fotografía y video documental de bodas. Especialistas en contar historias únicas con un estilo natural y emotivo. Más de 10 años capturando momentos inolvidables.",
      services: ["Fotografía de boda", "Video 360", "Pre-boda", "Álbumes personalizados"],
      price: "Consultar",
      phone: "+598 99 123 456",
      email: "info@pablodenis.com",
      website: "pablodenis.com",
      address: "Isla de Flores 1766, Parque Rodó",
      instagram: "@almaestudiouy",
      verified: true,
      featured: true
    },
    {
      id: 2,
      name: "Gonzalo Rivero Fotografías",
      category: "Fotografía",
      location: "Melo",
      rating: 4.8,
      reviews: 98,
      description: "Fotógrafo documentalista y diseñador. Fotos divertidas, naturales y creativas que reflejan cada momento de tu día especial.",
      services: ["Fotografía de bodas", "Cumpleaños", "Eventos sociales", "Diseño gráfico"],
      price: "Consultar",
      phone: "+598 99 234 567",
      email: "gonzalo@gonzalorivero.uy",
      website: "gonzalorivero.uy",
      address: "Melo, Cerro Largo",
      instagram: "@gonza_rivero30",
      verified: true,
      featured: true
    },    
    {
      id: 4,
      name: "La Baguala Hotel & Chacras",
      category: "Hoteles y Salones",
      location: "Montevideo",
      rating: 4.8,
      reviews: 203,
      description: "Hotel de campo con salones para eventos de hasta 400 personas. Entorno natural único con cabalgatas, restaurante y chacras. Perfecto para bodas y eventos especiales.",
      services: ["Salón de eventos", "Catering completo", "Alojamiento", "Cabalgatas", "Día de campo"],
      price: "Consultar",
      phone: "2315 9000",
      email: "eventos@labagualahotel.com",
      website: "labagualahotel.com",
      address: "Montevideo",
      instagram: "@labagualachacras",
      verified: true,
      featured: true
    },
    {
      id: 5,
      name: "Radisson Montevideo Victoria Plaza",
      category: "Hoteles y Salones",
      location: "Montevideo",
      rating: 4.7,
      reviews: 189,
      description: "Hotel 5 estrellas con elegantes salones para eventos. Servicio premium y ubicación céntrica en Montevideo.",
      services: ["Ballroom", "Catering gourmet", "Alojamiento invitados", "Coordinación de eventos"],
      price: "Desde $1.590/persona",
      phone: "+598 2902 0111",
      email: "eventos@radisson.com.uy",
      website: "radissonhotels.com",
      address: "Plaza Independencia, Montevideo",
      instagram: "@radissonmontevideo",
      verified: true,
      featured: true
    },
    {
      id: 6,
      name: "Bodega Spinoglio",
      category: "Hoteles y Salones",
      location: "Canelones",
      rating: 4.9,
      reviews: 156,
      description: "Espectacular salón de fiestas en bodega con servicio integral diseñado a medida. Ambiente único entre viñedos.",
      services: ["Salón de eventos", "Catering personalizado", "Tours de bodega", "Cata de vinos"],
      price: "Consultar",
      phone: "+598 2288 8888",
      email: "eventos@spinoglio.com.uy",
      website: "spinoglio.com.uy",
      address: "Canelones",
      instagram: "@bodegaspinoglio",
      verified: true,
      featured: false
    },
    {
      id: 7,
      name: "Alquimia Catering Gourmet",
      category: "Catering",
      location: "Montevideo",
      rating: 4.8,
      reviews: 134,
      description: "Servicio de alta gastronomía para fiestas y eventos. Transformamos tu evento en una experiencia culinaria única con ingredientes de primera calidad.",
      services: ["Menú completo", "Cóctel de bienvenida", "Barra libre", "Servicio personalizado"],
      price: "Desde $1.200/persona",
      phone: "+598 99 456 789",
      email: "info@alquimiacatering.uy",
      website: "alquimiacatering.uy",
      address: "Montevideo, Canelones, Maldonado",
      instagram: "@alquimiacatering",
      verified: true,
      featured: true
    },
    {
      id: 8,
      name: "Flavia Catering",
      category: "Catering",
      location: "Montevideo",
      rating: 4.7,
      reviews: 112,
      description: "Vasta experiencia en catering para bodas, cumpleaños de 15 y eventos empresariales. Servicio para salones y fiestas particulares.",
      services: ["Catering para bodas", "Eventos de 15", "Eventos corporativos", "Menú personalizado"],
      price: "Consultar",
      phone: "+598 99 567 890",
      email: "info@flaviacatering.com",
      website: "flaviacatering.com",
      address: "Montevideo",
      instagram: "@flaviacatering",
      verified: true,
      featured: false
    },
    {
      id: 9,
      name: "Florería La Fleur",
      category: "Floristería",
      location: "Montevideo",
      rating: 4.9,
      reviews: 87,
      description: "Ramos y tocados de novia en flores naturales. Arreglos para iglesias, centros de mesa y decoración floral completa para bodas.",
      services: ["Ramo de novia", "Decoración floral", "Centros de mesa", "Arreglos para iglesia"],
      price: "Desde $8.000",
      phone: "+598 99 678 901",
      email: "info@lafleur.com.uy",
      website: "florerialafleur.com",
      address: "Montevideo",
      instagram: "@florerialafleur",
      verified: true,
      featured: false
    },
    {
      id: 10,
      name: "Luis Javier Estudio Floral",
      category: "Floristería",
      location: "Montevideo",
      rating: 4.8,
      reviews: 93,
      description: "Florista y ambientador de bodas y eventos. Creatividad entre flores con diseños únicos que reflejan tu personalidad.",
      services: ["Ambientación de bodas", "Arreglos florales", "Decoración floral", "Diseño personalizado"],
      price: "Consultar",
      phone: "+598 99 789 012",
      email: "info@luisjavier.uy",
      website: "luisjavier.uy",
      address: "Montevideo",
      instagram: "@luisjavier_estudiofloral",
      verified: true,
      featured: true
    },
    {
      id: 11,
      name: "Delbo DJ Eventos",
      category: "Música y DJ",
      location: "Montevideo",
      rating: 4.7,
      reviews: 76,
      description: "Llevamos música, luces y diversión a tus fiestas y eventos. Discoteca móvil, efectos especiales y karaoke para hacer de tu celebración algo inolvidable.",
      services: ["DJ profesional", "Discoteca móvil", "Iluminación", "Efectos especiales", "Karaoke"],
      price: "Consultar",
      phone: "+598 99 890 123",
      email: "info@delbo dj.com.uy",
      website: "delbodj.com.uy",
      address: "Montevideo y Canelones",
      instagram: "@delbodj",
      verified: true,
      featured: false
    },
    {
      id: 12,
      name: "Cielo Fiestas y Eventos",
      category: "Hoteles y Salones",
      location: "Montevideo",
      rating: 4.6,
      reviews: 145,
      description: "Salón de eventos con capacidad para grandes celebraciones. Espacios versátiles y servicio integral para bodas y fiestas.",
      services: ["Salón de eventos", "Catering", "Decoración", "Coordinación"],
      price: "Consultar",
      phone: "+598 2600 1234",
      email: "info@cieloeventos.com.uy",
      website: "cieloeventos.com.uy",
      address: "Montevideo",
      instagram: "@cieloeventos",
      verified: true,
      featured: false
    }
  ]

  const getCategoryIcon = (category) => {
    const icons = {
      'Fotografía': Camera,
      'Música y DJ': Music,
      'Catering': Utensils,
      'Floristería': Flower,
      'Repostería': Cake,
      'Decoración': Palette,
      'Hoteles y Salones': Building
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
            Asociaciones en Uruguay
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Los mejores proveedores uruguayos para hacer de tu evento algo inolvidable
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
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <IconComponent className="w-6 h-6 text-primary" />
                            {provider.verified && (
                              <Badge className="bg-green-600 text-white text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verificado
                              </Badge>
                            )}
                            <Badge className="bg-gold-500 text-white text-xs">
                              <Award className="w-3 h-3 mr-1" />
                              Destacado
                            </Badge>
                          </div>
                          <h3 className="font-display text-xl font-medium text-foreground mb-1">
                            {provider.name}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {provider.location}
                          </div>
                          <div className="flex items-center mb-3">
                            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                            <span className="text-sm font-medium">{provider.rating}</span>
                            <span className="text-xs text-muted-foreground ml-1">({provider.reviews} reseñas)</span>
                          </div>
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
                        <p className="text-primary font-medium text-sm">{provider.price}</p>
                      </div>
                      
                      <div className="space-y-2 text-xs text-muted-foreground mb-4">
                        {provider.phone && (
                          <div className="flex items-center">
                            <Phone className="w-3 h-3 mr-2" />
                            {provider.phone}
                          </div>
                        )}
                        {provider.website && (
                          <div className="flex items-center">
                            <Globe className="w-3 h-3 mr-2" />
                            {provider.website}
                          </div>
                        )}
                        {provider.instagram && (
                          <div className="flex items-center">
                            <Heart className="w-3 h-3 mr-2" />
                            {provider.instagram}
                          </div>
                        )}
                      </div>
                      
                      <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Ver más detalles
                      </Button>
                    </div>
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
            <h2 className="text-2xl font-display font-medium text-foreground mb-8">
              Todos los Proveedores
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularProviders.map((provider) => {
                const IconComponent = getCategoryIcon(provider.category)
                return (
                  <Card key={provider.id} className="group hover:shadow-warm transition-all duration-300 border-border overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <IconComponent className="w-6 h-6 text-primary" />
                            {provider.verified && (
                              <Badge className="bg-green-600 text-white text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verificado
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-display text-xl font-medium text-foreground mb-1">
                            {provider.name}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {provider.location}
                          </div>
                          <div className="flex items-center mb-3">
                            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                            <span className="text-sm font-medium">{provider.rating}</span>
                            <span className="text-xs text-muted-foreground ml-1">({provider.reviews} reseñas)</span>
                          </div>
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
                        <p className="text-primary font-medium text-sm">{provider.price}</p>
                      </div>
                      
                      <div className="space-y-2 text-xs text-muted-foreground mb-4">
                        {provider.phone && (
                          <div className="flex items-center">
                            <Phone className="w-3 h-3 mr-2" />
                            {provider.phone}
                          </div>
                        )}
                        {provider.website && (
                          <div className="flex items-center">
                            <Globe className="w-3 h-3 mr-2" />
                            {provider.website}
                          </div>
                        )}
                        {provider.instagram && (
                          <div className="flex items-center">
                            <Heart className="w-3 h-3 mr-2" />
                            {provider.instagram}
                          </div>
                        )}
                      </div>
                      
                      <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Ver más detalles
                      </Button>
                    </div>
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
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">
              No se encontraron proveedores
            </h3>
            <p className="text-muted-foreground mb-6">
              Intentá con otros términos de búsqueda o filtros diferentes
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('Todas')
                setSelectedLocation('Todas')
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-medium text-foreground mb-4">
            ¿Sos proveedor de eventos?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Unite a nuestra red de proveedores destacados y llegá a más clientes en Uruguay
          </p>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => navigate('/contact')}
          >
            Contactanos
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted">
            © 2024 Venite. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Asociaciones

