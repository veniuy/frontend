// src/pages/Landing.jsx
import React, { useMemo } from 'react'
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
  CreditCard,
  Gift,
  Bell,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Phone,
  Star,
  Shield,
  Clock,
  Mail,
  Globe2,
  Instagram,
  Facebook,
  Youtube,
  ChevronRight,
} from 'lucide-react'

// 🔗 Importa el helper para assets
// Asegúrate de tener este archivo en: src/utils/assets.js
import { asset, onImgError } from '../utils/assets'

// --------- Datos (usa rutas reales en /src/assets/...) ----------
const NAV_CATEGORIES = [
  { label: 'Bodas', slug: 'bodas' },
  { label: 'Quinceañeras', slug: 'quince' },
  { label: 'Infantiles', slug: 'infantil' },
  { label: 'Cumpleaños', slug: 'cumples' },
  { label: 'Aniversarios', slug: 'aniversarios' },
  { label: 'Corporativo', slug: 'corporativo' },
]

const HERO_SLIDES = [
  {
    title: 'Invitaciones digitales elegantes',
    text: 'Crea, personaliza y comparte tu invitación en minutos.',
    img: 'src/assets/hero/hero_elegante.webp',
    cta: 'Crear invitación',
  },
  {
    title: 'Plantillas premium listas para usar',
    text: 'Diseños modernos, tipografías cuidadas y fotos a toda pantalla.',
    img: 'src/assets/hero/hero_premium.webp',
    cta: 'Ver plantillas',
  },
  {
    title: 'Comparte por WhatsApp, mail o enlace',
    text: 'Tus invitados confirman asistencia y guardan la fecha.',
    img: 'src/assets/hero/hero_compartir.webp',
    cta: 'Empezar ahora',
  },
]

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: 'Invitación Digital Elegante',
    category: 'Bodas',
    image: 'src/assets/cotton_bird_images/album_le_petit_quotidien.webp',
    price: 'Desde UYU 650',
    badge: 'Nuevo',
  },
  {
    id: 2,
    name: 'Invitación Quinceañera Premium',
    category: 'Quinceañeras',
    image: 'src/assets/cotton_bird_images/faire_part_mariage_colombe.webp',
    price: 'Desde UYU 690',
    badge: 'Top ventas',
  },
  {
    id: 3,
    name: 'Infantil – Safari',
    category: 'Infantiles',
    image: 'src/assets/cotton_bird_images/faire_part_mariage_raymone.webp',
    price: 'Desde UYU 520',
    badge: 'Tendencia',
  },
  {
    id: 4,
    name: 'Cumpleaños Minimal',
    category: 'Cumpleaños',
    image: 'src/assets/cotton_bird_images/livre_photo_automne.webp',
    price: 'Desde UYU 540',
  },
]

const COLLECTIONS = [
  {
    title: 'Bodas Clásicas',
    image: 'src/assets/collections/boda_clasica.webp',
    href: '/coleccion/bodas',
  },
  {
    title: 'Quince Aesthetic',
    image: 'src/assets/collections/quince_aesthetic.webp',
    href: '/coleccion/quince',
  },
  {
    title: 'Infantiles Ilustrados',
    image: 'src/assets/collections/infantil_ilustrado.webp',
    href: '/coleccion/infantiles',
  },
  {
    title: 'Corporativo',
    image: 'src/assets/collections/corporativo.webp',
    href: '/coleccion/corporativo',
  },
]

const BENEFITS = [
  {
    icon: Sparkles,
    title: 'Plantillas Premium',
    description: 'Diseños curados y tipografías de alta calidad.',
  },
  {
    icon: Edit,
    title: 'Personaliza Todo',
    description: 'Textos, fotos, colores y bloques de información.',
  },
  {
    icon: Share,
    title: 'Comparte Fácil',
    description: 'Enlace, QR, WhatsApp, email o redes.',
  },
  {
    icon: Check,
    title: 'RSVP y Recordatorios',
    description: 'Lista de invitados, confirmaciones y alertas.',
  },
]

const STEPS = [
  { icon: FileText, title: 'Elige un diseño', description: 'Selecciona la plantilla ideal para tu evento.' },
  { icon: Edit, title: 'Personaliza', description: 'Modifica textos, imágenes, colores y secciones.' },
  { icon: Share, title: 'Comparte', description: 'Envía tu invitación por WhatsApp, mail o enlace.' },
  { icon: Users, title: 'Gestiona invitados', description: 'Recibe RSVP y envía recordatorios automáticos.' },
]

const FAQ = [
  {
    q: '¿Cómo comparto mi invitación?',
    a: 'Obtienes un enlace único y un QR para WhatsApp, email o redes sociales.',
  },
  { q: '¿Puedo cambiar luego?', a: 'Sí. Actualiza y tus invitados verán los cambios en tiempo real.' },
  { q: '¿Hay pagos locales?', a: 'Sí. Transferencia bancaria, Abitab y RedPagos.' },
  { q: '¿Puedo exportar?', a: 'Puedes descargar QR, enlace y datos de RSVP.' },
]

// --------------- Componente ----------------
export default function Landing() {
  const navigate = useNavigate()

  const hero0 = useMemo(() => HERO_SLIDES[0], [])

  return (
    <div className="min-h-screen bg-background font-ui">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Contacto */}
            <div className="hidden md:flex items-center text-sm text-muted-foreground">
              <Phone className="w-4 h-4 mr-2" />
              +598 • Soporte
            </div>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src={asset('src/assets/brand/logo.svg')}
                onError={(e) => onImgError(e, 'Logo')}
                alt="Logo"
                className="h-8 w-auto"
                loading="eager"
                fetchpriority="high"
              />
              <span className="font-semibold tracking-tight">Invitaciones</span>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="hidden sm:inline-flex" onClick={() => navigate('/login')}>
                Ingresar
              </Button>
              <Button onClick={() => navigate('/register')}>
                Crear cuenta
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <CartIcon />
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6 py-2">
            {NAV_CATEGORIES.map((c) => (
              <button
                key={c.slug}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => navigate(`/categorias/${c.slug}`)}
              >
                {c.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 grid lg:grid-cols-2 gap-6">
          <div className="flex flex-col justify-center">
            <Badge className="w-fit mb-3" variant="secondary">
              Nuevo • Invitaciones digitales Uruguay
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              {hero0.title}
            </h1>
            <p className="mt-3 text-muted-foreground text-lg">{hero0.text}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={() => navigate('/crear')}>
                {hero0.cta} <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/plantillas')}>
                Ver plantillas
              </Button>
            </div>

            {/* Beneficios */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {BENEFITS.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <b.icon className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{b.title}</p>
                    <p className="text-xs text-muted-foreground">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagen hero */}
          <div className="relative">
            <img
              src={asset(hero0.img)}
              onError={(e) => onImgError(e, 'Hero')}
              alt="Hero"
              className="w-full h-[420px] md:h-[520px] object-cover rounded-2xl shadow-sm"
              loading="eager"
              fetchpriority="high"
            />
          </div>
        </div>
      </section>

      {/* Colecciones */}
      <section className="py-10 lg:py-14 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Colecciones destacadas</h2>
            <Button variant="ghost" onClick={() => navigate('/colecciones')}>
              Ver todas <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {COLLECTIONS.map((c, i) => (
              <Card key={i} className="group overflow-hidden cursor-pointer" onClick={() => navigate(c.href)}>
                <CardContent className="p-0">
                  <img
                    src={asset(c.image)}
                    onError={(e) => onImgError(e, c.title)}
                    alt={c.title}
                    className="w-full h-40 md:h-48 object-cover transition-transform group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </CardContent>
                <CardHeader className="py-3">
                  <CardTitle className="text-base">{c.title}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Plantillas destacadas</h2>
            <Select defaultValue="todos">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                {NAV_CATEGORIES.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FEATURED_PRODUCTS.map((p) => (
              <Card key={p.id} className="overflow-hidden group">
                <CardContent className="p-0">
                  <div className="relative">
                    {p.badge && (
                      <Badge className="absolute left-2 top-2 z-10" variant="secondary">
                        {p.badge}
                      </Badge>
                    )}
                    <img
                      src={asset(p.image)}
                      onError={(e) => onImgError(e, p.name)}
                      alt={p.name}
                      className="w-full h-52 md:h-60 object-cover transition-transform group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                </CardContent>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-base">{p.name}</CardTitle>
                  <CardDescription>{p.category}</CardDescription>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-sm font-medium">{p.price}</span>
                    <Button size="sm" onClick={() => navigate(`/plantilla/${p.id}`)}>
                      Ver <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-10 lg:py-14 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">¿Cómo funciona?</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {STEPS.map((s, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-base">{s.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{s.description}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Lo que dicen</h2>
            <div className="flex gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                text:
                  'Muy fácil de usar. Enviamos por WhatsApp y recibimos todas las confirmaciones en el mismo día.',
                name: 'Sofía & Martín',
              },
              {
                text:
                  'Los diseños son hermosos y se ven perfectos en el celular. El RSVP fue clave.',
                name: 'Valentina',
              },
              {
                text: 'Pudimos cambiar horarios y la web se actualizó al instante. Excelente.',
                name: 'Carla',
              },
            ].map((t, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-base">★★★★★</CardTitle>
                  <CardDescription>{t.name}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{t.text}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA grande */}
      <section className="py-10 lg:py-14 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6">
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">Comienza gratis</h3>
            <p className="text-muted-foreground mt-2">
              Crea tu invitación ahora. Paga solo cuando la publiques para tus invitados.
            </p>
            <div className="mt-6 flex gap-3">
              <Button size="lg" onClick={() => navigate('/crear')}>
                Crear invitación
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/precios')}>
                Ver precios
              </Button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Seguridad y privacidad
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Cambios en tiempo real
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" />
                Transferencia, Abitab, RedPagos
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-primary" />
                Lista de regalos opcional
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src={asset('src/assets/cta/cta_preview.webp')}
              onError={(e) => onImgError(e, 'Vista previa')}
              alt="Vista previa de invitación"
              className="w-full h-[360px] md:h-[420px] object-cover rounded-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight">Recibe novedades y promociones</h3>
          <p className="text-muted-foreground mt-2">
            Te enviaremos ideas de diseño, nuevas plantillas y descuentos.
          </p>
          <div className="mt-4 flex gap-2 max-w-md mx-auto">
            <Input type="email" placeholder="tu@email.com" />
            <Button>Suscribirme</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <img
                src={asset('src/assets/brand/logo.svg')}
                onError={(e) => onImgError(e, 'Logo')}
                alt="Logo"
                className="h-6 w-auto"
                loading="lazy"
              />
              <span className="font-semibold">Invitaciones</span>
            </div>
            <p className="text-muted-foreground mt-2">
              Plataforma de invitaciones digitales. Diseña, comparte y gestiona tus eventos.
            </p>
            <div className="flex gap-3 mt-3">
              <a href="#" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">Explorar</p>
            <ul className="space-y-2 text-muted-foreground">
              {NAV_CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <button className="hover:text-foreground" onClick={() => navigate(`/categorias/${c.slug}`)}>
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-medium mb-2">Ayuda</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <button className="hover:text-foreground" onClick={() => navigate('/preguntas-frecuentes')}>
                  Preguntas frecuentes
                </button>
              </li>
              <li>
                <button className="hover:text-foreground" onClick={() => navigate('/soporte')}>
                  Soporte
                </button>
              </li>
              <li>
                <button className="hover:text-foreground" onClick={() => navigate('/privacidad')}>
                  Privacidad
                </button>
              </li>
              <li>
                <button className="hover:text-foreground" onClick={() => navigate('/terminos')}>
                  Términos
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-medium mb-2">Contacto</p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> soporte@tu-dominio.uy
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +598 • Uruguay
              </li>
              <li className="flex items-center gap-2">
                <Globe2 className="w-4 h-4" /> Montevideo • Melo
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Invitaciones. Todos los derechos reservados.
        </div>
      </footer>

      {/* Sidebar Carrito */}
      <ShoppingCartSidebar />
    </div>
  )
}


export default Landing
