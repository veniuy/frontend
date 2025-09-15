// FeaturedProducts.jsx - Productos destacados para páginas de categoría
import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Heart, Globe } from 'lucide-react'
import { onImgError } from '../../utils/assets'

const FeaturedProducts = ({ 
  products = [], 
  categoryName,
  viewAllLink,
  title = "Productos Destacados",
  className = '' 
}) => {
  const navigate = useNavigate()

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

  if (!products || products.length === 0) return null

  return (
    <section className={`py-16 bg-secondary ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-medium text-foreground mb-4">
            {title}
          </h2>
          {categoryName && (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestros diseños más populares de {categoryName.toLowerCase()}. 
              Cada invitación está cuidadosamente diseñada para hacer de tu evento algo inolvidable.
            </p>
          )}
        </div>

        {/* Grid de productos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => {
            const fav = isFav(product.id)
            return (
              <Card
                key={product.id}
                className="group cursor-pointer hover-lift shadow-warm overflow-hidden rounded-lg p-0 transition-all duration-300"
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
                  
                  {/* Badge */}
                  {product.badge && (
                    <Badge className={`absolute top-2 left-2 ${
                      product.badge === 'Nuevo' ? 'bg-green-500 text-white' :
                      product.badge === 'Popular' ? 'bg-blue-500 text-white' :
                      product.badge === 'Premium' ? 'bg-purple-500 text-white' :
                      'bg-primary text-primary-foreground'
                    }`}>
                      {product.badge}
                    </Badge>
                  )}
                  
                  {/* Wishlist button */}
                  <button
                    type="button"
                    className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white shadow transition-all duration-200 hover:scale-110"
                    aria-pressed={fav}
                    aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    onClick={(e) => { e.stopPropagation(); toggleFav(product.id) }}
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${fav ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
                      fill={fav ? 'currentColor' : 'none'}
                    />
                  </button>

                  {/* Badge Digital */}
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
                  {product.description && (
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <p className="font-semibold text-foreground">{product.price}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Botón Ver todos */}
        {viewAllLink && (
          <div className="text-center">
            <Button
              onClick={() => navigate(viewAllLink)}
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10 px-8 py-3"
            >
              <Globe className="w-4 h-4 mr-2" />
              Ver todos los diseños de {categoryName}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedProducts
