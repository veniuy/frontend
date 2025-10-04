import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Search, Heart, User, ShoppingCart } from 'lucide-react';

/**
 * PublicHeader - Componente de navegación estilo getguestlist.app
 * 
 * Características:
 * - Desktop: Header horizontal con fondo beige (#F4F2ED)
 * - Mobile: Menú hamburguesa con overlay a pantalla completa
 * - Tipografía: Poppins para navegación, Cormorant Garamond para logo
 */
export default function PublicHeader({ 
  cartCount = 0, 
  wishlistCount = 0,
  onSearchClick,
  onWishlistClick,
  onCartClick 
}) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { title: 'Inicio', href: '/' },
    { title: 'Plantillas', href: '/products' },
    { title: 'Categorías', href: '#categorias' },
    { title: 'Preguntas', href: '/faq' },
    { title: 'Contacto', href: '/contact' },
  ];

  const handleNavClick = (href) => {
    setIsMenuOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevenir scroll cuando el menú está abierto
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  return (
    <>
      {/* Header Principal */}
      <header className="sticky top-0 z-50 header-guestlist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Información de contacto - Solo Desktop */}
            <div className="hidden md:flex items-center text-sm text-foreground">
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-ui">+34 919 03 36 08</span>
            </div>

            {/* Logo - Centro en móvil, izquierda en desktop */}
            <div
              className="font-display text-2xl md:text-3xl font-normal text-foreground tracking-wide cursor-pointer select-none flex-1 md:flex-none text-center md:text-left"
              onClick={() => navigate('/')}
            >
              Venite
            </div>

            {/* Navegación Desktop - Centrada */}
            <nav className="hidden lg:flex items-center justify-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              {navLinks.map((link) => (
                <button
                  key={link.title}
                  onClick={() => handleNavClick(link.href)}
                  className="nav-link-guestlist"
                >
                  {link.title}
                </button>
              ))}
            </nav>

            {/* Acciones del Usuario */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button
                onClick={onSearchClick}
                className="w-5 h-5 text-foreground hover:opacity-70 transition-opacity"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <button
                onClick={onWishlistClick}
                className="relative w-5 h-5 text-foreground hover:opacity-70 transition-opacity"
                aria-label="Favoritos"
              >
                <Heart 
                  className="w-5 h-5" 
                  fill={wishlistCount > 0 ? 'currentColor' : 'none'}
                />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-3 text-[10px] px-1.5 py-0.5 rounded-full bg-black text-white">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* User */}
              <button
                onClick={() => navigate('/login')}
                className="w-5 h-5 text-foreground hover:opacity-70 transition-opacity"
                aria-label="Cuenta"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Cart - Solo si hay items */}
              {cartCount > 0 && (
                <button
                  onClick={onCartClick}
                  className="relative w-5 h-5 text-foreground hover:opacity-70 transition-opacity"
                  aria-label="Carrito"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-2 -right-3 text-[10px] px-1.5 py-0.5 rounded-full bg-black text-white">
                    {cartCount}
                  </span>
                </button>
              )}

              {/* Botón CTA Desktop */}
              <button
                onClick={() => navigate('/register')}
                className="hidden lg:block btn-guestlist text-sm px-6 py-2"
              >
                Crear Cuenta
              </button>

              {/* Menú Hamburguesa - Solo Mobile/Tablet */}
              <button
                onClick={toggleMenu}
                className="lg:hidden w-6 h-6 text-foreground"
                aria-label="Menú"
                aria-expanded={isMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menú Overlay Mobile - Estilo getguestlist.app */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-beige-light z-50 flex flex-col items-center justify-center lg:hidden animate-in fade-in duration-300">
          {/* Botón Cerrar */}
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 p-2"
            aria-label="Cerrar menú"
          >
            <X className="w-7 h-7 text-foreground" />
          </button>

          {/* Enlaces de Navegación */}
          <nav className="flex flex-col items-center space-y-6">
            {navLinks.map((link) => (
              <button
                key={link.title}
                onClick={() => handleNavClick(link.href)}
                className="nav-link-mobile-guestlist hover:opacity-70 transition-opacity"
              >
                {link.title}
              </button>
            ))}

            {/* Botón CTA en Mobile */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                document.body.style.overflow = 'unset';
                navigate('/register');
              }}
              className="mt-8 btn-guestlist px-10 py-3 text-lg"
            >
              Crear Cuenta
            </button>
          </nav>

          {/* Información de Contacto en Mobile */}
          <div className="absolute bottom-8 flex items-center text-sm text-foreground font-ui">
            <Phone className="w-4 h-4 mr-2" />
            +34 919 03 36 08
          </div>
        </div>
      )}
    </>
  );
}
