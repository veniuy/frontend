// Landing.jsx
import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react'
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
  Edit,
  Smartphone,
  Globe,
  Zap,
  Search,
  User,
  Menu,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  X as CloseIcon,
  Trash2,
  Crown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

import { asset, onImgError } from '../utils/assets'
import PublicHeader from '../components/PublicHeader'

function Landing() {
  const navigate = useNavigate()

  // -----------------------------
  // Estado UI
  // -----------------------------
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // -----------------------------
  // Wishlist (persistente)
  // -----------------------------
  const LS_KEY = 'venite_wishlist_v1'
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

  const isFav = useCallback((id) => wishlist.includes(id), [wishlist])
  const toggleFav = useCallback((id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  // -----------------------------
  // Carrito: ocultar icono si no hay items
  // -----------------------------
  const [cartCount, setCartCount] = useState(0)
  const readCartCount = useCallback(() => {
    try {
      const rawCount = localStorage.getItem('venite_cart_count')
      const rawItems = localStorage.getItem('venite_cart_items')
      if (rawCount != null) return Number(rawCount) || 0
      if (rawItems) {
        const arr = JSON.parse(rawItems)
        return Array.isArray(arr) ? arr.length : 0
      }
      return 0
    } catch {
      return 0
    }
  }, [])
  useEffect(() => {
    setCartCount(readCartCount())
    const onStorage = () => setCartCount(readCartCount())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [readCartCount])

  // -----------------------------
  // Datos
  // -----------------------------
  const categories = useMemo(
    () => [
      { id: 'cat-bodas', slug: 'boda',          href: '/categorias/boda',          name: 'Bodas',                 image: asset('/src/assets/cotton_bird_images/categoria_boda_grid.webp') },
      { id: 'cat-quince', slug: 'quinceaneras', href: '/categorias/quinceaneras',  name: 'Quinceañeras',          image: asset('/src/assets/cotton_bird_images/categoria_bebes_ninos.webp') },
      { id: 'cat-infant', slug: 'infantiles',   href: '/categorias/infantiles',    name: 'Cumpleaños Infantiles', image: asset('/src/assets/cotton_bird_images/categoria_cumpleanos.webp') },
      { id: 'cat-baby',   slug: 'bautizo',      href: '/categorias/bautizo',       name: 'Baby Shower / Bautizo', image: asset('/src/assets/cotton_bird_images/categoria_bautizo.webp') },
      { id: 'cat-corp',   slug: 'corporativos', href: '/categorias/corporativos',  name: 'Eventos Corporativos',  image: asset('/src/assets/cotton_bird_images/categoria_productos_fotos.webp') },
      { id: 'cat-grad',   slug: 'graduaciones', href: '/categorias/graduaciones',  name: 'Graduaciones',          image: asset('/src/assets/cotton_bird_images/categoria_invitaciones_digitales.webp') }
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
        price: '$75',
        badge: 'Nuevo'
      },
      {
        id: 2,
        name: 'Invitación Quinceañera Premium',
        category: 'Quinceañeras',
        image: asset('/src/assets/cotton_bird_images/invitacion_creacion_propia.webp'),
        price: '$65',
        badge: 'Popular'
      },
      {
        id: 3,
        name: 'Invitación Infantil Animada',
        category: 'Cumpleaños Infantiles',
        image: asset('/src/assets/cotton_bird_images/novedades_boda.webp'),
        price: '$50',
        badge: null
      },
      {
        id: 4,
        name: 'Invitación Corporativa',
        category: 'Eventos Corporativos',
        image: asset('/src/assets/cotton_bird_images/producto_jazmin_cuadro.webp'),
        price: '$90',
        badge: null
      }
    ],
    []
  )

  // --------- Ventajas digitales (con iconos) ---------
  const digitalFeatures = useMemo(() => [
    {
      icon: Smartphone,
      title: 'Invitaciones Interactivas',
      description: 'Incluye mapas, confirmación de asistencia, música de fondo y animaciones que sorprenderán a tus invitados.'
    },
    {
      icon: Zap,
      title: 'Entrega Instantánea',
      description: 'Recibe tu invitación en minutos, no en días.'
    },
    {
      icon: Globe,
      title: 'Comparte en Cualquier Lugar',
      description: 'WhatsApp, email, redes sociales: llega a todos tus invitados.'
    },
    {
      icon: Edit,
      title: 'Personalización Total',
      description: 'Diseños únicos adaptados a tu estilo y evento especial.'
    }
  ], [])

  // Para mapear IDs de wishlist a objetos
  const productById = useMemo(() => {
    const map = new Map()
    featuredProducts.forEach((p) => map.set(p.id, p))
    return map
  }, [featuredProducts])

  // -----------------------------
  // Panel Wishlist
  // -----------------------------
  const [wishOpen, setWishOpen] = useState(false)
  const favItems = useMemo(() => wishlist.map((id) => productById.get(id)).filter(Boolean), [wishlist, productById])
  const removeFav = (id) => setWishlist((prev) => prev.filter((x) => x !== id))
  const clearFavs = () => setWishlist([])

  // Cerrar con Esc
  useEffect(() => {
    if (!wishOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setWishOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [wishOpen])

  // -----------------------------
  // Buscador (overlay)
  // -----------------------------
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  const openSearch = () => {
    setSearchOpen(true)
    setTimeout(() => {
      const el = document.getElementById('landing-search-input')
      if (el) el.focus()
    }, 0)
  }
  const closeSearch = () => { setSearchOpen(false); setQuery('') }

  // Abrir con tecla "/"
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && !searchOpen) { e.preventDefault(); openSearch() }
      else if (e.key === 'Escape' && searchOpen) { closeSearch() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searchOpen])

  const normalized = (s) => (s || '').toString().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
  const q = normalized(query)

  const searchResults = useMemo(() => {
    if (!q) return { products: [], categories: [] }
    const prod = featuredProducts.filter(
      (p) => normalized(p.name).includes(q) || normalized(p.category).includes(q)
    )
    const cats = categories.filter((c) => normalized(c.name).includes(q))
    return { products: prod, categories: cats }
  }, [q, featuredProducts, categories])

  const submitSearch = (e) => {
    e?.preventDefault()
    if (searchResults.products.length) {
      const first = searchResults.products[0]
      closeSearch()
      navigate(`/product/${first.id}`)
    } else {
      closeSearch()
      navigate(`/products?q=${encodeURIComponent(query)}`)
    }
  }

  // -----------------------------
  // HERO SLIDER (2 paneles desktop / 1 móvil)
  // -----------------------------
  const heroPanels = useMemo(() => ([
    {
      key: 'boda',
      bg: asset('/src/assets/cotton_bird_images/categoria_boda_grid.webp'),
      headline: 'Una papelería de boda única',
      sub: '› DESCUBRE LAS INVITACIONES',
      to: '/categorias/boda',
    },
    {
      key: 'quince',
      bg: asset('/src/assets/cotton_bird_images/categoria_bebes_ninos.webp'),
      headline: '¡Quinceañeras que brillan!',
      sub: '› DESCUBRE NUESTRA COLECCIÓN',
      to: '/categorias/quinceaneras',
    },
    {
      key: 'infantiles',
      bg: asset('/src/assets/cotton_bird_images/categoria_cumpleanos.webp'),
      headline: 'Cumpleaños infantiles inolvidables',
      sub: '› VER DISEÑOS',
      to: '/categorias/infantiles',
    },
    {
      key: 'baby',
      bg: asset('/src/assets/cotton_bird_images/categoria_bautizo.webp'),
      headline: '¡Para el bautizo de tu peque!',
      sub: '› DESCUBRE NUESTRA COLECCIÓN',
      to: '/categorias/bautizo',
    }
  ]), [])

  // Desktop: 2 paneles por slide
  const desktopSlides = useMemo(() => {
    const pairs = []
    for (let i = 0; i < heroPanels.length; i += 2) pairs.push(heroPanels.slice(i, i + 2))
    return pairs
  }, [heroPanels])

  const [slide, setSlide] = useState(0)
  const totalDesktopSlides = desktopSlides.length
  const nextSlide = useCallback(() => setSlide((s) => (s + 1) % totalDesktopSlides), [totalDesktopSlides])
  const prevSlide = useCallback(() => setSlide((s) => (s - 1 + totalDesktopSlides) % totalDesktopSlides), [totalDesktopSlides])

  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (paused) return
    const id = setInterval(nextSlide, 6000)
    return () => clearInterval(id)
  }, [paused, nextSlide])

  // Mobile (1 panel por slide) con swipe
  const [mSlide, setMSlide] = useState(0)
  const totalMobileSlides = heroPanels.length
  const mNext = () => setMSlide((s) => (s + 1) % totalMobileSlides)
  const mPrev = () => setMSlide((s) => (s - 1 + totalMobileSlides) % totalMobileSlides)

  const touchStartX = useRef(0)
  const touchDeltaX = useRef(0)
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; touchDeltaX.current = 0 }
  const onTouchMove = (e) => { touchDeltaX.current = e.touches[0].clientX - touchStartX.current }
  const onTouchEnd = () => {
    const dx = touchDeltaX.current
    if (Math.abs(dx) > 50) { if (dx < 0) mNext(); else mPrev() }
  }

  // -----------------------------
  // Render
  // -----------------------------
  const NavLinks = ({ onClick }) => (
    <>
      <a
        className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        href="/categorias/boda"
        onClick={(e) => { e.preventDefault(); onClick?.(); navigate('/categorias/boda') }}
      >Bodas</a>
      <a
        className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        href="/categorias/quinceaneras"
        onClick={(e) => { e.preventDefault(); onClick?.(); navigate('/categorias/quinceaneras') }}
      >Quinceañeras</a>
      <a
        className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        href="/categorias/infantiles"
        onClick={(e) => { e.preventDefault(); onClick?.(); navigate('/categorias/infantiles') }}
      >Cumpleaños Infantiles</a>
      <a
        className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        href="/categorias/bautizo"
        onClick={(e) => { e.preventDefault(); onClick?.(); navigate('/categorias/bautizo') }}
      >Baby Shower</a>
      <a
        className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        href="/categorias/corporativos"
        onClick={(e) => { e.preventDefault(); onClick?.(); navigate('/categorias/corporativos') }}
      >Eventos Corporativos</a>
      <a
        className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        href="/categorias/graduaciones"
        onClick={(e) => { e.preventDefault(); onClick?.(); navigate('/categorias/graduaciones') }}
      >Graduaciones</a>
      <a
        className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        href="/products"
        onClick={(e) => { e.preventDefault(); onClick?.(); navigate('/products') }}
      >Todas las Plantillas</a>
    </>
  )

  return (
    <div className="min-h-screen bg-background font-ui">
      {/* Header - Estilo getguestlist.app */}
      <PublicHeader 
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onSearchClick={openSearch}
        onWishlistClick={() => setWishOpen(true)}
        onCartClick={() => setCartOpen(true)}
      />

      {/* Hero Slider: desktop (2 paneles por slide, sin botón interno) */}
      <section
        className="relative overflow-hidden hidden lg:block"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
        aria-label="Promociones principales"
      >
        <div className="relative">
          <div
            className="whitespace-nowrap transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            {desktopSlides.map((pair, idx) => (
              <div
                key={`desk-slide-${idx}`}
                className="inline-block align-top w-full"
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} de ${totalDesktopSlides}`}
              >
                <div className="grid lg:grid-cols-2 min-h-[520px]">
                  {pair.map((p) => (
                    <div key={p.key} className="relative flex items-end justify-center">
                      <img
                        src={p.bg}
                        alt={p.headline}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => onImgError(e, p.headline)}
                        loading="eager"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                      {/* Tarjeta blanca clickeable: más pequeña, sin bordes redondeados, título bold */}
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => navigate(p.to)}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(p.to)}
                        className="relative z-[1] mb-8 w-[68%] max-w-[520px] bg-white/95 backdrop-blur-[1px] text-center shadow-xl px-5 py-4 cursor-pointer select-none border border-black/10"
                      >
                        <h2 className="font-display font-bold text-[22px] leading-snug text-foreground">
                          {p.headline}
                        </h2>
                        <div className="mt-1.5 text-[12px] tracking-[0.12em] text-muted-foreground">
                          {p.sub}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Controles */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow"
            onClick={prevSlide}
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow"
            onClick={nextSlide}
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Bullets */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {Array.from({ length: totalDesktopSlides }).map((_, i) => (
              <button
                key={`dot-${i}`}
                onClick={() => setSlide(i)}
                aria-label={`Ir al slide ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full ${i === slide ? 'bg-white' : 'bg-white/50 hover:bg-white/80'} transition-colors`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Hero Slider: móvil/tablet (sin botón interno) */}
      <section
        className="relative overflow-hidden lg:hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        aria-roledescription="carousel"
        aria-label="Promociones principales móviles"
      >
        <div
          className="whitespace-nowrap transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${mSlide * 100}%)` }}
        >
          {heroPanels.map((p, idx) => (
            <div
              key={`mob-${p.key}`}
              className="inline-block align-top w-full"
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} de ${totalMobileSlides}`}
            >
              <div className="relative min-h-[520px] flex items-end justify-center">
                <img
                  src={p.bg}
                  alt={p.headline}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => onImgError(e, p.headline)}
                  loading="eager"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/12" />
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(p.to)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && navigate(p.to)}
                  className="relative z-[1] mb-7 w-[82%] max-w-[520px] bg-white/95 backdrop-blur-[1px] text-center shadow-xl px-4 py-3 cursor-pointer select-none border border-black/10"
                >
                  <h2 className="font-display font-bold text-[20px] sm:text-[22px] leading-snug text-foreground">
                    {p.headline}
                  </h2>
                  <div className="mt-1 text-[11px] tracking-[0.12em] text-muted-foreground">
                    {p.sub}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controles */}
        <button
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow"
          onClick={mPrev}
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow"
          onClick={mNext}
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bullets */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {Array.from({ length: totalMobileSlides }).map((_, i) => (
            <button
              key={`mdot-${i}`}
              onClick={() => setMSlide(i)}
              aria-label={`Ir al slide ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full ${i === mSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/80'} transition-colors`}
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '400', lineHeight: '1.1', color: '#000000' }} className="mb-4">
              Nuestras invitaciones más populares
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', fontWeight: '400', lineHeight: '1.4' }} className="text-muted-foreground max-w-2xl mx-auto">
              Diseños digitales que combinan elegancia, interactividad y personalización para hacer de tu evento algo inolvidable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => {
              const fav = isFav(product.id)
              return (
                <Card
                  key={product.id}
                  className="group cursor-pointer hover-lift shadow-warm overflow-hidden rounded-lg p-0"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="aspect-square relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover object-center block will-change-transform transition-transform duration-300 group-hover:scale-[1.03]"
                      onError={(e) => onImgError(e, product.name)}
                      loading="lazy"
                      decoding="async"
                    />
                    {product.badge && (
                      <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                        {product.badge}
                      </Badge>
                    )}
                    {/* Wishlist button */}
                    <button
                      type="button"
                      className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white shadow"
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
                    <p className="text-foreground" style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: '400' }}>{product.price}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories -> ahora navega a /categorias/... */}
      <section id="categorias" className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '400', lineHeight: '1.1', color: '#000000' }} className="mb-4">
              Invitaciones para cada ocasión especial
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', fontWeight: '400', lineHeight: '1.4' }} className="text-muted-foreground max-w-2xl mx-auto">
              Desde bodas elegantes hasta cumpleaños infantiles llenos de diversión. Tenemos el diseño perfecto para tu evento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="group cursor-pointer hover-lift shadow-warm overflow-hidden rounded-lg p-0"
                onClick={() => navigate(category.href)}
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover object-center block transition-transform duration-300 group-hover:scale-[1.03]"
                    onError={(e) => onImgError(e, category.name)}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-xl font-medium text-white mb-2">
                      {category.name}
                    </h3>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white/90 text-foreground hover:bg-white"
                      onClick={(e) => { e.stopPropagation(); navigate(category.href) }}
                    >
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

      {/* Digital Advantages (con iconos) */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '400', lineHeight: '1.1', color: '#000000' }} className="mb-4">
              ¿Por qué elegir invitaciones digitales?
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', fontWeight: '400', lineHeight: '1.5', color: '#6b7280' }} className="max-w-2xl mx-auto">
              La evolución natural de las invitaciones tradicionales. Más interactivas, ecológicas y convenientes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {digitalFeatures.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-sage-400" />
                </div>
                <h3 
                  style={{ 
                    fontFamily: "'Playfair Display', serif", 
                    fontSize: '24px', 
                    fontWeight: '500',
                    lineHeight: '1.3',
                    marginBottom: '12px',
                    color: '#000000'
                  }}
                >
                  {value.title}
                </h3>
                <p 
                  style={{ 
                    fontFamily: "'Inter', sans-serif", 
                    fontSize: '15px', 
                    fontWeight: '400',
                    lineHeight: '1.6',
                    color: '#6b7280'
                  }}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '400', lineHeight: '1.1', color: '#000000' }} className="mb-4">
            ¡Únete a la revolución digital!
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', fontWeight: '400', lineHeight: '1.5', color: '#6b7280' }} className="mb-8 max-w-2xl mx-auto">
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

      {/* Sección informativa con demos */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative overflow-hidden rounded-lg shadow-warm-lg">
              <img 
                src={asset('/src/assets/fiestamanos.webp')} 
                alt="Diseño de invitaciones digitales"
                className="block w-full h-full object-cover"
                onError={(e) => onImgError(e, 'Diseño de invitaciones digitales')}
                loading="lazy"
                decoding="async"
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
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
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
              <p className="text-muted text-sm mb-4">Invitaciones que enamoran</p>
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
                <li><a href="/categorias/boda" className="hover:text-background transition-colors">Invitaciones de Boda</a></li>
                <li><a href="/categorias/quinceaneras" className="hover:text-background transition-colors">Quinceañeras</a></li>
                <li><a href="/categorias/infantiles" className="hover:text-background transition-colors">Cumpleaños Infantiles</a></li>
                <li><a href="/categorias/bautizo" className="hover:text-background transition-colors">Baby Shower</a></li>
                <li><a href="/categorias/corporativos" className="hover:text-background transition-colors">Eventos Corporativos</a></li>
                <li><a href="/categorias/graduaciones" className="hover:text-background transition-colors">Graduaciones</a></li>
                <li><a href="/products" className="hover:text-background transition-colors">Diseño Personalizado</a></li>
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

      {/* -------------------- WISHLIST PANEL -------------------- */}
      {wishOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/40"
            onClick={() => setWishOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="fixed right-0 top-0 bottom-0 z-[61] w-full sm:w-[420px] bg-background border-l border-border shadow-xl flex flex-col"
            role="dialog"
            aria-label="Favoritos"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold">Tus favoritos</h3>
              <div className="flex items-center gap-2">
                {wishlist.length > 0 && (
                  <button
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive"
                    onClick={clearFavs}
                    title="Vaciar todos"
                  >
                    <Trash2 className="w-4 h-4" /> Vaciar
                  </button>
                )}
                <button
                  className="p-2 rounded hover:bg-muted"
                  onClick={() => setWishOpen(false)}
                  aria-label="Cerrar favoritos"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {favItems.length === 0 ? (
                <div className="p-6 text-sm text-muted-foreground">
                  Aún no tienes favoritos. Toca el corazón en cualquier diseño para guardarlo aquí.
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {favItems.map((item) => (
                    <li key={item.id} className="flex gap-3 p-4">
                      <div className="relative w-20 h-20 rounded overflow-hidden bg-muted">
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
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                        <p className="text-sm mt-1">{item.price}</p>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => { setWishOpen(false); navigate(`/product/${item.id}`) }}>
                            Ver
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => removeFav(item.id)}>
                            Quitar
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="p-4 border-t border-border">
              <Button className="w-full" onClick={() => { setWishOpen(false); navigate('/wishlist') }}>
                Ver lista completa
              </Button>
            </div>
          </aside>
        </>
      )}

      {/* -------------------- SEARCH OVERLAY -------------------- */}
      {searchOpen && (
        <>
          <div className="fixed inset-0 z-[70] bg-black/50" onClick={closeSearch} />
          <div className="fixed inset-0 z-[71] flex items-start justify-center p-4 sm:p-8">
            <div className="w-full max-w-2xl bg-background rounded-xl shadow-2xl border border-border overflow-hidden">
              <div className="flex items-center gap-2 p-3 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <form onSubmit={submitSearch} className="flex-1">
                  <input
                    id="landing-search-input"
                    type="text"
                    placeholder="Busca plantillas, categorías… (atajo: /)"
                    className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </form>
                <button className="p-2 rounded hover:bg-muted" onClick={closeSearch} aria-label="Cerrar búsqueda">
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto">
                {/* Productos */}
                <div className="p-3">
                  <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Diseños</h4>
                  {query && searchResults.products.length === 0 ? (
                    <div className="text-sm text-muted-foreground px-1">Sin resultados para “{query}”.</div>
                  ) : (
                    <ul className="space-y-2">
                      {searchResults.products.slice(0, 6).map((p) => (
                        <li
                          key={p.id}
                          className="flex items-center gap-3 p-2 rounded hover:bg-muted cursor-pointer"
                          onClick={() => { closeSearch(); navigate(`/product/${p.id}`) }}
                        >
                          <div className="relative w-12 h-12 rounded overflow-hidden bg-muted">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="absolute inset-0 w-full h-full object-cover block"
                              onError={(e) => onImgError(e, p.name)}
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{p.name}</p>
                            <p className="text-xs text-muted-foreground">{p.category}</p>
                          </div>
                          <span className="ml-auto text-xs text-muted-foreground">{p.price}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Categorías -> ahora van a /categorias/... */}
                <div className="p-3 border-t border-border">
                  <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Categorías</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {(q ? searchResults.categories : categories).slice(0, 6).map((c) => (
                      <button
                        key={c.id}
                        className="relative h-20 rounded overflow-hidden border border-border group"
                        onClick={() => { closeSearch(); navigate(c.href) }}
                      >
                        <img
                          src={c.image}
                          alt={c.name}
                          className="absolute inset-0 w-full h-full object-cover block transition-transform duration-300 group-hover:scale-[1.03]"
                          onError={(e) => onImgError(e, c.name)}
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                        <span className="absolute inset-x-2 bottom-2 text-left text-white text-xs font-medium drop-shadow">
                          {c.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 border-t border-border flex justify-between text-xs text-muted-foreground">
                <span>Usa “/” para abrir • “Esc” para cerrar • Enter para ir al primer resultado</span>
                <button className="underline hover:text-foreground" onClick={() => { closeSearch(); navigate('/products') }}>
                  Ver todos
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Shopping Cart Sidebar existente */}
      <ShoppingCartSidebar />
    </div>
  )
}

export default Landing
