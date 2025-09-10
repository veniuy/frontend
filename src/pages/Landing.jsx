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
  Shield,
  Music4,
  MapPin,
  Calendar as CalendarIcon,
  Smartphone,
  Globe,
  Zap,
  Clock,
  Crown
} from 'lucide-react'

import { asset, ph, onImgError } from '../utils/assets';

function Landing() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const categories = [
    { name: 'Bodas', image: '/src/assets/cotton_bird_images/categoria_boda_grid.webp' },
    { name: 'Bebés y Niños', image: '/src/assets/cotton_bird_images/categoria_bebes_ninos.webp' },
    { name: 'Cumpleaños', image: '/src/assets/cotton_bird_images/categoria_cumpleanos.webp' },
    { name: 'Productos con Foto', image: '/src/assets/cotton_bird_images/categoria_productos_fotos.webp' },
    { name: 'Baby Shower', image: '/src/assets/cotton_bird_images/categoria_bautizo.webp' },
    { name: 'Graduaciones', image: '/src/assets/cotton_bird_images/categoria_invitaciones_digitales.webp' }
  ]

  const featuredProducts = [
    {
      id: 1,
      name: "Invitación Digital Elegante",
      category: "Bodas",
      image: '/src/assets/cotton_bird_images/album_le_petit_quotidien.webp',
      price: "Desde 25,00 €",
      badge: "Nuevo"
    },
    {
      id: 2,
      name: "Invitación Quinceañera Premium",
      category: "Quinceañeras", 
      image: '/src/assets/cotton_bird_images/invitacion_creacion_propia.webp',
      price: "Desde 20,00 €",
      badge: "Popular"
    },
    {
      id: 3,
      name: "Save the Date Minimal",
      category: "Bodas",
      image: '/src/assets/cotton_bird_images/novedades_boda.webp',
      price: "Desde 10,00 €",
      badge: "-20%"
    },
    {
      id: 4,
      name: "Invitación con Foto Jazmín",
      category: "Cumpleaños",
      image: '/src/assets/cotton_bird_images/producto_jazmin_cuadro.webp',
      price: "Desde 14,00 €",
      badge: null
    }
  ]

  const sellingPoints = [
    {
      icon: Heart,
      title: "Diseños que Enamoran",
      description: "Estilos elegantes y contemporáneos, listos para personalizar"
    },
    {
      icon: Users,
      title: "Hecho para Compartir",
      description: "Comparte por WhatsApp, redes sociales o email en segundos"
    },
    {
      icon: Send,
      title: "Entrega Inmediata",
      description: "Tu invitación lista para enviar, sin demoras"
    },
    {
      icon: FileText,
      title: "Gestión de RSVP",
      description: "Recibe confirmaciones y organiza asistentes"
    },
    {
      icon: Share,
      title: "Multiplaformas",
      description: "Se ve perfecta en cualquier dispositivo"
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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={ph(40,40,'AF')} alt="Logo" className="w-10 h-10 rounded-full"/>
            <span className="font-semibold tracking-tight">AgendaLaFecha</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="hover:text-gray-700" href="#categorias">Categorías</a>
            <a className="hover:text-gray-700" href="#novedades">Novedades</a>
            <a className="hover:text-gray-700" href="#digitales">Invitaciones Digitales</a>
            <a className="hover:text-gray-700" href="#faq">Preguntas Frecuentes</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={()=>navigate('/login')}>Iniciar sesión</Button>
            <Button size="sm" onClick={()=>navigate('/register')}>Crear cuenta</Button>
            <CartIcon onClick={()=>setSidebarOpen(true)} />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium mb-4">
              <Crown className="w-4 h-4"/>
              <span>Nueva colección Premium 2025</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              Invitaciones digitales y de papel para celebrar <span className="text-emerald-700">momentos únicos</span>
            </h1>
            <p className="mt-4 text-gray-600 md:text-lg">
              Diseños elegantes, personalización total y envío inmediato. Creá tu invitación perfecta y compartila con un clic.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={()=>navigate('/create')}>Crear invitación</Button>
              <Button variant="outline" onClick={()=>document.getElementById('digitales')?.scrollIntoView({behavior:'smooth'})}>Ver cómo funciona</Button>
            </div>

            <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-3 text-xs text-gray-600">
              {sellingPoints.slice(0,6).map((s, i)=> (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600"/>
                  <span>{s.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] w-full max-w-md md:max-w-none md:w-4/5 ml-auto rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={asset('/src/assets/cotton_bird_images/taller_produccion_cotton_bird.webp')} 
                alt="Diseño de invitaciones digitales"
                className="w-full rounded-lg shadow-md"
                onError={(e)=> onImgError(e,'Hero')}
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white border border-gray-100 rounded-xl shadow p-3 flex items-center gap-3">
              <Shield className="w-5 h-5 text-emerald-600"/>
              <div>
                <p className="text-sm font-medium">Pago seguro</p>
                <p className="text-xs text-gray-500">ABITAB, RedPagos, transferencia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section id="categorias" className="py-14 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Explorá por categorías</h2>
              <p className="text-gray-600 mt-1">Todo lo que necesitás para tu evento, en un solo lugar</p>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map(c => (
                  <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories
              .filter(c => selectedCategory==='all' || c.name===selectedCategory)
              .map((category) => (
                <Card key={category.name} className="group cursor-pointer hover:shadow-md transition" onClick={()=>setSelectedCategory(category.name)}>
                  <div className="aspect-square overflow-hidden rounded-t-lg relative">
                    <img 
                    src={asset(category.image)} 
                    alt={category.name}
                    className="w-full h-full object-cover hover-scale"
                    onError={(e) => onImgError(e, category.name)}
                  />
                  </div>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-medium">{category.name}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Novedades / Destacados */}
      <section id="novedades" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Novedades</h2>
              <p className="text-gray-600 mt-1">Descubrí los últimos diseños añadidos</p>
            </div>
            <Button variant="outline" onClick={()=>navigate('/catalog')}>Ver todo</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden group">
                <div className="aspect-square overflow-hidden rounded-t-lg relative">
                  <img 
                    src={asset(product.image)} 
                    alt={product.name}
                    className="w-full h-full object-cover hover-scale"
                    onError={(e) => onImgError(e, product.name)}
                  />
                  {product.badge && (
                    <Badge className="absolute top-2 left-2 bg-primary text-white">{product.badge}</Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-base">{product.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">{product.category}</CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{product.price}</span>
                    <Button size="sm" onClick={()=>navigate(`/product/${product.id}`)}>Ver</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Invitaciones Digitales */}
      <section id="digitales" className="py-14 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium mb-4">
                <Smartphone className="w-4 h-4"/>
                <span>Invitaciones Digitales</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Sorprendé con una invitación web <span className="text-blue-700">interactiva</span>
              </h2>
              <p className="mt-3 text-gray-600">
                Añadí música, mapa con ubicación, confirmación de asistencia (RSVP), cuenta regresiva y más. Todo en un link que podés compartir.
              </p>

              <div className="mt-6 space-y-3">
                {digitalFeatures.map((f, i)=> (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-blue-700"/>
                    </div>
                    <div>
                      <p className="font-medium">{f.title}</p>
                      <p className="text-sm text-gray-600">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <Button onClick={()=>navigate('/create')}>Crear invitación web</Button>
                <Button variant="outline" onClick={()=>navigate('/demo')}>Ver demo</Button>
              </div>
            </div>

            <div className="relative">
              <Card className="p-0 overflow-hidden shadow-xl">
                <div className="aspect-[9/16] bg-black">
                  {/* mockup de teléfono */}
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0">
                      <img 
                        src={asset('/src/assets/cotton_bird_images/album_le_petit_quotidien.webp')}
                        alt="Demo"
                        className="w-full h-full object-cover"
                        onError={(e)=> onImgError(e,'Demo')}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/30"/>
                    <div className="absolute bottom-0 w-full p-4 text-white">
                      <p className="text-xs uppercase tracking-widest">Boda</p>
                      <h3 className="text-2xl font-semibold">Sofía & Ignacio</h3>
                      <div className="flex items-center gap-4 text-xs mt-1 opacity-90">
                        <div className="flex items-center gap-1"><CalendarIcon className="w-3 h-3"/> 23 Nov 2025</div>
                        <div className="flex items-center gap-1"><MapPin className="w-3 h-3"/> Montevideo</div>
                        <div className="flex items-center gap-1"><Music4 className="w-3 h-3"/> Música</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA intermedio */}
      <section className="py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-6 md:p-8 bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-100">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight">Probá gratis la creación de tu invitación digital</h3>
                <p className="text-gray-600 mt-2">Elegí un diseño, cargá tus datos y vista previa instantánea. Pagás solo al publicarla.</p>
                <div className="mt-4 flex gap-3">
                  <Button onClick={()=>navigate('/create')}>Empezar</Button>
                  <Button variant="outline" onClick={()=>navigate('/pricing')}>Precios</Button>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600"/> Publicación tras pago (Abitab / RedPagos / Transferencia)</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600"/> Link único para compartir</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600"/> Edición posterior sin costo</li>
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Preguntas frecuentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">¿Cómo publico mi invitación?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                Creás la invitación, la revisás y realizás el pago (Abitab/RedPagos/transferencia). Al acreditarse, tu invitación queda pública con su link único.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">¿Puedo editarla después?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                Sí. Podés modificar textos, fecha, lugar o música. Los cambios se reflejan al instante sin costo adicional.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">¿Cómo confirman asistencia mis invitados?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                Incluí un botón de RSVP que abre un formulario o integra WhatsApp. Verás quién confirmó en tu panel.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">¿Se puede agregar música y mapa?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">
                Sí. Podés subir una pista o usar un tema y añadir el mapa con la ubicación exacta del evento.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <img src={ph(36,36,'AF')} alt="Logo" className="w-9 h-9 rounded-full"/>
              <span className="font-semibold">AgendaLaFecha</span>
            </div>
            <p className="text-gray-600 mt-3">Invitaciones digitales y en papel hechas en Uruguay, con foco en diseño, simpleza y experiencia.</p>
          </div>
          <div>
            <p className="font-medium">Productos</p>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li>Invitaciones digitales</li>
              <li>Save the Date</li>
              <li>Tarjetas de agradecimiento</li>
              <li>Etiquetas y stickers</li>
            </ul>
          </div>
          <div>
            <p className="font-medium">Ayuda</p>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li>Centro de ayuda</li>
              <li>Soporte</li>
              <li>Privacidad</li>
              <li>Términos</li>
            </ul>
          </div>
          <div>
            <p className="font-medium">Seguinos</p>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-8">© {new Date().getFullYear()} AgendaLaFecha</div>
      </footer>

      <ShoppingCartSidebar open={sidebarOpen} onClose={()=>setSidebarOpen(false)} />
    </div>
  )
}

export default Landing
