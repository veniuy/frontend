// SEOHead.jsx - Componente para meta tags y SEO
import React, { useEffect } from 'react'

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  ogImage, 
  ogType = 'website',
  canonicalUrl,
  breadcrumbs = [],
  products = []
}) => {
  // Generar JSON-LD para breadcrumbs
  const breadcrumbJsonLd = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": crumb.href ? `${window.location.origin}${crumb.href}` : undefined
    }))
  } : null

  // Generar JSON-LD para lista de productos
  const productListJsonLd = products.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "numberOfItems": products.length,
    "itemListElement": products.map((product, index) => ({
      "@type": "Product",
      "position": index + 1,
      "name": product.name,
      "description": product.description,
      "image": product.image,
      "offers": {
        "@type": "Offer",
        "price": product.price.replace(/[^0-9,]/g, '').replace(',', '.'),
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      }
    }))
  } : null

  useEffect(() => {
    // Actualizar título
    document.title = title

    // Función helper para actualizar meta tags
    const updateMetaTag = (name, content, property = false) => {
      if (!content) return
      
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let meta = document.querySelector(selector)
      
      if (!meta) {
        meta = document.createElement('meta')
        if (property) {
          meta.setAttribute('property', name)
        } else {
          meta.setAttribute('name', name)
        }
        document.head.appendChild(meta)
      }
      
      meta.setAttribute('content', content)
    }

    // Actualizar meta tags básicos
    updateMetaTag('description', description)
    if (keywords) updateMetaTag('keywords', keywords)

    // Open Graph
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:type', ogType, true)
    if (ogImage) updateMetaTag('og:image', ogImage, true)
    if (canonicalUrl) updateMetaTag('og:url', canonicalUrl, true)
    updateMetaTag('og:site_name', 'Venite - Invitaciones Digitales', true)

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', title)
    updateMetaTag('twitter:description', description)
    if (ogImage) updateMetaTag('twitter:image', ogImage)

    // Canonical URL
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', canonicalUrl)
    }

    // JSON-LD Structured Data
    if (breadcrumbJsonLd) {
      let script = document.querySelector('script[data-type="breadcrumb"]')
      if (!script) {
        script = document.createElement('script')
        script.setAttribute('type', 'application/ld+json')
        script.setAttribute('data-type', 'breadcrumb')
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(breadcrumbJsonLd)
    }

    if (productListJsonLd) {
      let script = document.querySelector('script[data-type="products"]')
      if (!script) {
        script = document.createElement('script')
        script.setAttribute('type', 'application/ld+json')
        script.setAttribute('data-type', 'products')
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(productListJsonLd)
    }

  }, [title, description, keywords, ogImage, ogType, canonicalUrl, breadcrumbJsonLd, productListJsonLd])

  return null
}

export default SEOHead
