import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Search, Heart, User, ShoppingCart } from 'lucide-react';

/**
 * PublicHeader - Componente de navegación estilo getguestlist.app
 * 
 * Características:
 * - Desktop: Header horizontal con fondo beige (#F4F2ED)
 * - Mobile: Menú hamburguesa con overlay a pantalla completa
 * - Tipografía: Poppins para navegación, Playfair Display para logo
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
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    // Prevenir scroll cuando el menú está abierto
    if (newState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Limpiar el overflow al desmontar el componente
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Cerrar menú con tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  return (
    <>
      {/* Header Principal */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: '#f4f2ed', borderBottom: '1px solid #e1ddd6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Navegación Desktop - A la izquierda */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.title}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    fontWeight: '400',
                    textTransform: 'uppercase',
                    letterSpacing: '0.72px',
                    color: '#000000',
                    transition: 'opacity 200ms ease',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.6'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  {link.title}
                </button>
              ))}
            </nav>

            {/* Logo - Centrado absoluto en desktop, centrado en móvil */}
            <div
              className="text-2xl md:text-3xl font-normal cursor-pointer select-none flex-1 lg:flex-none text-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2"
              style={{ fontFamily: "'Playfair Display', serif", color: '#000000', letterSpacing: '0.02em', fontWeight: '500' }}
              onClick={() => navigate('/')}
            >
              Mantra
            </div>

            {/* Acciones del Usuario - Solo Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
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
                className="hidden lg:block text-sm px-6 py-2"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  fontWeight: '500',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '0',
                  cursor: 'pointer',
                  transition: 'background-color 200ms ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#333333'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#000000'}
              >
                Crear Cuenta
              </button>

            </div>

            {/* Menú Hamburguesa - Solo Mobile/Tablet con animación */}
            <button
              onClick={toggleMenu}
              className="lg:hidden absolute right-4 w-6 h-6 text-foreground flex items-center justify-center"
              aria-label="Menú"
              aria-expanded={isMenuOpen}
              style={{ transition: 'transform 300ms ease' }}
            >
              <div 
                style={{
                  position: 'relative',
                  width: '24px',
                  height: '24px',
                  transition: 'transform 300ms ease',
                  transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)'
                }}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" style={{ transition: 'opacity 200ms ease' }} />
                ) : (
                  <Menu className="w-6 h-6" style={{ transition: 'opacity 200ms ease' }} />
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Menú Overlay Mobile - Estilo getguestlist.app */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center lg:hidden" style={{ backgroundColor: '#f4f2ed' }}>
          {/* Botón Cerrar (X) - Esquina superior derecha */}
          <button
            onClick={toggleMenu}
            className="absolute top-6 right-6 p-2"
            aria-label="Cerrar menú"
            style={{ transition: 'opacity 200ms ease' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <X className="w-7 h-7 text-foreground" />
          </button>

          {/* Enlaces de Navegación */}
          <nav className="flex flex-col items-center space-y-6 mt-16">
            {navLinks.map((link) => (
              <button
                key={link.title}
                onClick={() => handleNavClick(link.href)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '34px',
                  fontWeight: '400',
                  textTransform: 'uppercase',
                  letterSpacing: '1.23px',
                  color: '#000000',
                  margin: '12px 20px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 200ms ease'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.7'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                {link.title}
              </button>
            ))}

            {/* Iconos de Acción en Mobile - Centrados debajo de los enlaces */}
            <div className="flex items-center justify-center space-x-8 mt-8 mb-4">
              {/* Search */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  document.body.style.overflow = '';
                  onSearchClick();
                }}
                className="w-6 h-6 text-foreground hover:opacity-70 transition-opacity"
                aria-label="Buscar"
              >
                <Search className="w-6 h-6" />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  document.body.style.overflow = '';
                  onWishlistClick();
                }}
                className="relative w-6 h-6 text-foreground hover:opacity-70 transition-opacity"
                aria-label="Favoritos"
              >
                <Heart 
                  className="w-6 h-6" 
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
                onClick={() => {
                  setIsMenuOpen(false);
                  document.body.style.overflow = '';
                  navigate('/login');
                }}
                className="w-6 h-6 text-foreground hover:opacity-70 transition-opacity"
                aria-label="Cuenta"
              >
                <User className="w-6 h-6" />
              </button>

              {/* Cart - Solo si hay items */}
              {cartCount > 0 && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    document.body.style.overflow = '';
                    onCartClick();
                  }}
                  className="relative w-6 h-6 text-foreground hover:opacity-70 transition-opacity"
                  aria-label="Carrito"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span className="absolute -top-2 -right-3 text-[10px] px-1.5 py-0.5 rounded-full bg-black text-white">
                    {cartCount}
                  </span>
                </button>
              )}
            </div>

            {/* Botón CTA en Mobile */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                document.body.style.overflow = '';
                navigate('/register');
              }}
              className="mt-4 px-10 py-3"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '18px',
                fontWeight: '500',
                backgroundColor: '#000000',
                color: '#ffffff',
                border: 'none',
                borderRadius: '0',
                cursor: 'pointer',
                transition: 'background-color 200ms ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#333333'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#000000'}
            >
              Crear Cuenta
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
