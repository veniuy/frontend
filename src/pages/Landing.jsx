// Landing.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { CartIcon, ShoppingCartSidebar } from '../components/ShoppingCart'
import {
  Heart,
  Send,
  Sparkles,
  Search,
  User,
  Menu,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  Smartphone,
  Globe,
  Zap,
  Edit,
  X
} from 'lucide-react'

import { asset, onImgError } from '../utils/assets'

// ---------- Drawer simple reutilizable ----------
function Drawer({ open, onClose, title, children }) {
  return (
    <>
      {/* overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-200 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-[60]`}
        onClick={onClose}
        aria-hidden={!open}
      />
      {/* panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-xl transition-transform duration-300 z-[61] 
        ${open ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 id="drawer-title" className="text-lg font-semibold">{title}</h3>
          <button
            className="p-2 rounded hover:bg-muted"
            type="button"
            onClick={onClose}
            aria-label="Cerrar panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="h-[calc(100%-64px)] overflow-y-auto">{children}</div>
      </aside>
    </>
  )
}

function Landing() {
  const navigate = useNavigate()

  // --------- Menú móvil ----------
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // --------- Wishlist persistente ----------
  const LS_KEY = 'venite_wishlist_v1'
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(wishlist))
    } catch {}
  }, [wishlist])
  const isFav = (id) => wishlist.includes(id)
  const toggleFav = (id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }
  const removeFav = (id) => setWishlist((prev) => prev.filter((x) => x !== id))

  // --------- Buscador ----------
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  // --------- Data ----------
  const categories = useMemo(
    () => [
      { name: 'Bodas', image: asset('/src/assets/cotton_bird_images/categoria_boda_grid.webp') },
      { name: 'Quinceañeras', image: asset('/src/assets/cotton_bird_images/categoria_bebes_ninos.webp') },
      { name: 'Cumpleaños Infantiles', image: asset('/src/assets/cotton_bird_images/categoria_cumpleanos.webp') },
      { name: 'Eventos Corporativos', image: asset('/src/assets/cotton_bird_images/categoria_productos_fotos.webp') },
      { name: 'Baby Shower', image: asset('/src/assets/cotton_bird_images/categoria_bautizo.webp') },
      { name: 'Graduaciones', image: asset('/src/assets/cotton_bird_images/categoria_invitaciones_digitales.webp') }
    ],
    []
  )

  const featuredProducts = useMemo(
    () => [
      {
        id: 1,
        name: 'Invitación Digital Elegante',
        category: 'Bodas',
        image: asset('/src/assets/cotton_bird_images/album_le_petit_quotidien.webp'),
        price: 'Desde 25,00 €',
        badge: 'Nuevo'
      },
      {
        id: 2,
        name: 'Invitación Quinceañera Premium',
        category: 'Quinceañeras',
        image: asset('/src/assets/cotton_bird_images/invitacion_creacion_propia.webp'),
        price: 'Desde 20,00 €',
        badge: 'Popular'
      },
      {
        id: 3,
        name: 'Invitación Infantil Animada',
        category: 'Cumpleaños Infantiles',
        image: asset('/src/assets/cotton_bird_images/novedades_boda.webp'),
        price: 'Desde 15,00 €',
        badge: null
      },
      {
        id: 4,
        name: 'Invitación Corporativa',
        category: 'Eventos Corporativos',
        image: asset('/src/assets/cotton_bird_images/producto_jazmin_cuadro.webp'),
        price: 'Desde 30,00 €',
        badge: null
      }
    ],
    []
  )

  const values = useMemo(
    () => [
      {
        icon: Smartphone,
        title: '100% Digital y Ecológico',
        description: 'Invitaciones completamente digitales que cuidan el medio ambiente'
      },
      {
        icon: Zap,
        title: 'Entrega Instantánea',
        description: 'Recibe tu invitación en minutos, no en días'
      },
      {
        icon: Globe,
        title: 'Comparte en Cualquier Lugar',
        description: 'WhatsApp, email, redes sociales - llega a todos tus invitados'
      },
      {
        icon: Edit,
        title: 'Personalización Total',
        description: 'Diseños únicos adaptados a tu estilo y evento especial'
      }
    ],
    []
  )

  // --------- Búsqueda (filtro en vivo) ----------
  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return featuredProducts
    return featuredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.badge && p.badge.toLowerCase().includes(q))
    )
  }, [featuredProducts, query])

  // --------- Helpers ----------
  const NavLinks = ({ onClick }) => (
    <>
      <a className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors" onClick={onClick} href="#bodas">Bodas</a>
      <a className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors" onClick={onClick} href="#quinceaneras">Quinceañeras</a>
      <a className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors" onClick={onClick} href="#infantiles">Cumpleaños Infantiles</a>
      <a className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors" onClick={onClick} href="#baby-shower">Baby Shower</a>
      <a className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors" onClick={onClick} href="#corporativos">Eventos Corporativos</a>
      <a className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors" onClick={onClick} href="#graduaciones">Graduaciones</a>
      <a className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors" onClick={onClick} href="#plantillas">Todas las Plantillas</a>
    </>
  )

  // Productos almacenados por id para wishlist
  const productById = useMemo(() => {
    const map = new Map()
    featuredProducts.forEach((p) => map.set(p.id, p))
    return map
  }, [featuredProducts])

  const wishlistItems = useMemo(() => wishlist.map((id) => productById.get(id)).filter(Boolean), [wishlist, productById])

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
            <div
              className="font-display text-2xl font-medium text-foreground tracking-wide cursor-pointer select-none"
              onClick={() => navigate('/')}
            >
              Venite
              <span className="text-xs text-muted-foreground ml-2">invitaciones digitales que enamoran</span>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Lupa: abre buscador inline */}
              <Search
                className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Buscar"
                aria-expanded={searchOpen}
              />
              {/* Wishlist: abre panel */}
              <div className="relative">
                <Heart
                  className={`w-5 h-5 cursor-pointer transition-colors ${wishlist.length ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setWishlistOpen(true)}
                  fill={wishlist.length ? 'currentColor' : 'none'}
                  aria-label="Favoritos"
                />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-3 text-[10px] px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground">
                    {wishlist.length}
                  </span>
                )}
              </div>

              <User
                className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => navigate('/login')}
              />
              <CartIcon />
              {/* Mobile menu toggle */}
              <Menu
                className="w-6 h-6 text-muted-foreground cursor-pointer hover:text-foreground transition-colors md:hidden"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Menú"
                aria-expanded={mobileMenuOpen}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center space-x-8 py-4 border-t border-border">
            <NavLinks onClick={() => navigate('/products')} />
          </nav>

          {/* Buscador desplegable */}
          <div
            className={`overflow-hidden transition-all duration-200 border-t border-border ${searchOpen ? 'max-h-28 py-3' : 'max-h-0 py-0'}`}
            aria-hidden={!searchOpen}
          >
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Buscar por nombre, categoría o etiqueta…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-border"
                autoFocus={searchOpen}
              />
              <Button variant="outline" onClick={() => setQuery('')}>
                Limpiar
              </Button>
            </div>
            {query && (
              <p className="text-xs text-muted-foreground mt-2">
                Resultados filtrados por: <span className="font-medium">{query}</span>
              </p>
            )}
          </div>

          {/* Mobile Navigation (desplegable) */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border py-2 animate-in fade-in slide-in-from-top-2">
              <div className="flex flex-col">
                <NavLinks onClick={() => { setMobileMenuOpen(false); navigate('/products') }} />
              </div>
            </div>
          )}
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

      {/* Featured Products Section (filtrable) */}
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

          {filteredProducts.length === 0 ? (
            <p className="text-center text-muted-foreground">No encontramos resultados para “{query}”.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const fav = isFav(product.id)
                return (
                  <Card
                    key={product.id}
                    className="group cursor-pointer hover-lift shadow-warm border-border"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {/* Contenedor con relación y IMG a full altura sin franjas */}
                    <div className="aspect-square relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover block will-change-transform transition-transform duration-300 group-hover:scale-[1.03]"
                        onError={(e) => onImgError(e, product.name)}
                        loading="lazy"
                        decoding="async"
                      />
                      {product.badge && (
                        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                          {product.badge}
                        </Badge>
                      )}
                      {/* Botón wishlist (no navegar) */}
                      <button
                        type="button"
                        className="absolute top-2 right-2 p-1 rounded-full bg-white/85 hover:bg-white shadow"
                        aria-pressed={fav}
                        aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                        onClick={(e) => { e.stopPropagation(); toggleFav(product.id) }}
                      >
                        <Heart
                          className={`w-5 h-5 ${fav ? 'text-primary' : 'text-muted-foreground'}`}
                          fill={fav ? 'currentColor' : 'none'}
                        />
                      </button>

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
                )
              })}
            </div>
          )}
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
              <Card
                key={index}
                className="group cursor-pointer hover-lift shadow-warm border-border overflow-hidden"
                onClick={() => navigate('/products')}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  {/* IMG a altura completa sin franjas */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover block transition-transform duration-300 group-hover:scale-[1.03]"
                    onError={(e) => onImgError(e, category.name)}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
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
                <h3 className="font-medium text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
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
            <Input type="email" placeholder="Correo electrónico" className="border-border" />
            <Input type="email" placeholder="Repetir correo" className="border-border" />
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
            <Input type="date" placeholder="Fecha del evento" className="border-border" />
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

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="font-display text-xl font-medium mb-4">Venite</h3>
              <p className="text-muted text-sm mb-4">invitaciones digitales que enamoran</p>
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

      {/* Shopping Cart Sidebar existente */}
      <ShoppingCartSidebar />

      {/* Wishlist Drawer */}
      <Drawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} title="Tus favoritos">
        {wishlistItems.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">Aún no tienes favoritos.</div>
        ) : (
          <ul className="divide-y divide-border">
            {wishlistItems.map((item) => (
              <li key={item.id} className="p-4 flex gap-4 items-center">
                <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover block"
                    onError={(e) => onImgError(e, item.name)}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => { setWishlistOpen(false); navigate(`/product/${item.id}`) }}
                  >
                    Ver
                  </Button>
                  <Button variant="destructive" onClick={() => removeFav(item.id)}>
                    Quitar
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Drawer>
    </div>
  )
}

export default Landing
