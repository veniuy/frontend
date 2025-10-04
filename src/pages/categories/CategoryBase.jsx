// CategoryBase.jsx - Componente base para páginas de categoría
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Phone, Instagram, Facebook, Twitter, User, Search, Heart, Menu } from 'lucide-react'
import { CartIcon, ShoppingCartSidebar } from '../../components/ShoppingCart'
import PublicHeader from '../../components/PublicHeader'
import SEOHead from '../../components/common/SEOHead'
import Breadcrumbs from '../../components/common/Breadcrumbs'
import CategoryHero from '../../components/category/CategoryHero'
import CategoryGallery from '../../components/category/CategoryGallery'
import FeaturedProducts from '../../components/category/FeaturedProducts'
import { getCategoryData, getBreadcrumbs } from '../../data/categories'

const CategoryBase = ({ categorySlug }) => {
  const navigate = useNavigate()
  const categoryData = getCategoryData(categorySlug)
  
  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Categoría no encontrada</h1>
          <Button onClick={() => navigate('/')}>Volver al inicio</Button>
        </div>
      </div>
    )
  }

  const breadcrumbs = getBreadcrumbs(categorySlug)
  const canonicalUrl = `${window.location.origin}${categoryData.route}`

  return (
    <div className="min-h-screen bg-background font-ui">
        {/* SEO Head */}
        <SEOHead
          title={categoryData.seo.title}
          description={categoryData.seo.description}
          keywords={categoryData.seo.keywords}
          ogImage={categoryData.seo.ogImage}
          canonicalUrl={canonicalUrl}
          breadcrumbs={breadcrumbs}
          products={categoryData.featuredProducts}
        />

        {/* Header */}
        <PublicHeader />

        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Hero Section */}
        <CategoryHero
          title={categoryData.hero.title}
          subtitle={categoryData.hero.subtitle}
          image={categoryData.hero.image}
          ctaText={categoryData.hero.ctaText}
          ctaLink={categoryData.hero.ctaLink}
        />

        {/* Gallery Section */}
        <CategoryGallery
          images={categoryData.gallery}
          title={`Galería de ${categoryData.name}`}
        />

        {/* Featured Products */}
        <FeaturedProducts
          products={categoryData.featuredProducts}
          categoryName={categoryData.name}
          viewAllLink={categoryData.hero.ctaLink}
          title={`Diseños Destacados de ${categoryData.name}`}
        />

        {/* Newsletter Section */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl font-medium text-foreground mb-4">
              ¿Listo para crear tu invitación perfecta?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Únete a miles de personas que ya han elegido Venite para sus eventos especiales. 
              Obtén un 20% de descuento en tu primera invitación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate(categoryData.hero.ctaLink)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              >
                Ver Todas las Plantillas
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/contact')}
                className="border-primary text-primary hover:bg-primary/10 px-8"
              >
                Diseño Personalizado
              </Button>
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
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-medium mb-4">Soporte y Ayuda</h4>
                <ul className="space-y-2 text-sm text-muted">
                  <li><a href="/faq" className="hover:text-background transition-colors">Preguntas frecuentes</a></li>
                  <li><a href="/contact" className="hover:text-background transition-colors">Contacto</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Soporte técnico</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Guía de uso</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="font-medium mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-muted">
                  <li><a href="#" className="hover:text-background transition-colors">Términos de uso</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Política de privacidad</a></li>
                  <li><a href="#" className="hover:text-background transition-colors">Cookies</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-muted mt-12 pt-8 text-center text-sm text-muted">
              <p>&copy; 2024 Venite. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>

        {/* Shopping Cart Sidebar */}
        <ShoppingCartSidebar />
      </div>
  )
}

export default CategoryBase
