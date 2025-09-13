// categories.js - Datos centralizados de categorías
import { asset } from '../utils/assets'

export const categoryData = {
  boda: {
    id: 'boda',
    name: 'Boda',
    slug: 'boda',
    route: '/categorias/boda',
    hero: {
      title: 'Una papelería de boda única',
      subtitle: '› DESCUBRE LAS INVITACIONES',
      image: asset('/src/assets/cotton_bird_images/categoria_boda_grid.webp'),
      ctaText: 'Ver Invitaciones de Boda',
      ctaLink: '/products?category=Bodas'
    },
    seo: {
      title: 'Invitaciones de Boda Digitales Elegantes | Venite',
      description: 'Descubre nuestras invitaciones de boda digitales únicas. Diseños elegantes, interactivos y personalizables para tu día especial.',
      keywords: 'invitaciones boda digital, papelería boda, invitaciones elegantes, boda digital',
      ogImage: asset('/src/assets/cotton_bird_images/categoria_boda_grid.webp')
    },
    gallery: [
      {
        id: 'boda-1',
        src: asset('/src/assets/cotton_bird_images/album_le_petit_quotidien.webp'),
        alt: 'Invitación de boda elegante con flores',
        title: 'Diseño Clásico Elegante'
      },
      {
        id: 'boda-2',
        src: asset('/src/assets/cotton_bird_images/invitacion_creacion_propia.webp'),
        alt: 'Invitación de boda moderna',
        title: 'Diseño Moderno Minimalista'
      },
      {
        id: 'boda-3',
        src: asset('/src/assets/cotton_bird_images/novedades_boda.webp'),
        alt: 'Invitación de boda vintage',
        title: 'Diseño Vintage Romántico'
      },
      {
        id: 'boda-4',
        src: asset('/src/assets/cotton_bird_images/producto_jazmin_cuadro.webp'),
        alt: 'Invitación de boda con jazmín',
        title: 'Diseño Floral Jazmín'
      }
    ],
    featuredProducts: [
      {
        id: 'boda-prod-1',
        name: 'Invitación Digital Elegante Rosa',
        category: 'Bodas',
        image: asset('/src/assets/cotton_bird_images/album_le_petit_quotidien.webp'),
        price: 'Desde 25,00 €',
        badge: 'Nuevo',
        description: 'Diseño elegante con tonos rosados y tipografía clásica'
      },
      {
        id: 'boda-prod-2',
        name: 'Invitación Minimalista Moderna',
        category: 'Bodas',
        image: asset('/src/assets/cotton_bird_images/invitacion_creacion_propia.webp'),
        price: 'Desde 30,00 €',
        badge: 'Popular',
        description: 'Diseño minimalista con líneas limpias y elegancia moderna'
      },
      {
        id: 'boda-prod-3',
        name: 'Invitación Vintage Romántica',
        category: 'Bodas',
        image: asset('/src/assets/cotton_bird_images/novedades_boda.webp'),
        price: 'Desde 28,00 €',
        badge: null,
        description: 'Diseño vintage con detalles románticos y florales'
      },
      {
        id: 'boda-prod-4',
        name: 'Invitación Floral Jazmín',
        category: 'Bodas',
        image: asset('/src/assets/cotton_bird_images/producto_jazmin_cuadro.webp'),
        price: 'Desde 32,00 €',
        badge: null,
        description: 'Diseño con motivos florales de jazmín y elegancia natural'
      }
    ]
  },

  quinceaneras: {
    id: 'quinceaneras',
    name: 'Quinceañeras',
    slug: 'quinceaneras',
    route: '/categorias/quinceaneras',
    hero: {
      title: '¡Quinceañeras que brillan!',
      subtitle: '› DESCUBRE NUESTRA COLECCIÓN',
      image: asset('/src/assets/cotton_bird_images/categoria_bebes_ninos.webp'),
      ctaText: 'Ver Invitaciones de Quinceañeras',
      ctaLink: '/products?category=Quinceañeras'
    },
    seo: {
      title: 'Invitaciones de Quinceañeras Digitales | Venite',
      description: 'Invitaciones digitales para quinceañeras que brillan. Diseños únicos, elegantes y personalizables para celebrar sus 15 años.',
      keywords: 'invitaciones quinceañeras, 15 años digital, invitaciones elegantes quinceañeras',
      ogImage: asset('/src/assets/cotton_bird_images/categoria_bebes_ninos.webp')
    },
    gallery: [
      {
        id: 'quince-1',
        src: asset('/src/assets/cotton_bird_images/categoria_bebes_ninos.webp'),
        alt: 'Invitación de quinceañera elegante',
        title: 'Diseño Princesa Elegante'
      },
      {
        id: 'quince-2',
        src: asset('/src/assets/cotton_bird_images/invitacion_creacion_propia.webp'),
        alt: 'Invitación de quinceañera moderna',
        title: 'Diseño Moderno Chic'
      }
    ],
    featuredProducts: [
      {
        id: 'quince-prod-1',
        name: 'Invitación Quinceañera Princesa',
        category: 'Quinceañeras',
        image: asset('/src/assets/cotton_bird_images/categoria_bebes_ninos.webp'),
        price: 'Desde 22,00 €',
        badge: 'Popular',
        description: 'Diseño elegante para una quinceañera princesa'
      },
      {
        id: 'quince-prod-2',
        name: 'Invitación Quinceañera Moderna',
        category: 'Quinceañeras',
        image: asset('/src/assets/cotton_bird_images/invitacion_creacion_propia.webp'),
        price: 'Desde 25,00 €',
        badge: 'Nuevo',
        description: 'Diseño moderno y chic para quinceañeras actuales'
      }
    ]
  },

  infantiles: {
    id: 'infantiles',
    name: 'Cumpleaños Infantiles',
    slug: 'infantiles',
    route: '/categorias/infantiles',
    hero: {
      title: 'Cumpleaños infantiles inolvidables',
      subtitle: '› VER DISEÑOS',
      image: asset('/src/assets/cotton_bird_images/categoria_cumpleanos.webp'),
      ctaText: 'Ver Invitaciones Infantiles',
      ctaLink: '/products?category=Cumpleaños Infantiles'
    },
    seo: {
      title: 'Invitaciones de Cumpleaños Infantiles Digitales | Venite',
      description: 'Invitaciones digitales para cumpleaños infantiles inolvidables. Diseños divertidos, coloridos y animados para los más pequeños.',
      keywords: 'invitaciones cumpleaños infantiles, invitaciones niños digital, cumpleaños divertidos',
      ogImage: asset('/src/assets/cotton_bird_images/categoria_cumpleanos.webp')
    },
    gallery: [
      {
        id: 'infantil-1',
        src: asset('/src/assets/cotton_bird_images/categoria_cumpleanos.webp'),
        alt: 'Invitación de cumpleaños infantil colorida',
        title: 'Diseño Colorido Divertido'
      }
    ],
    featuredProducts: [
      {
        id: 'infantil-prod-1',
        name: 'Invitación Infantil Animada',
        category: 'Cumpleaños Infantiles',
        image: asset('/src/assets/cotton_bird_images/categoria_cumpleanos.webp'),
        price: 'Desde 15,00 €',
        badge: 'Popular',
        description: 'Diseño animado y colorido para cumpleaños infantiles'
      }
    ]
  },

  bautizo: {
    id: 'bautizo',
    name: 'Bautizo / Baby Shower',
    slug: 'bautizo',
    route: '/categorias/bautizo',
    hero: {
      title: '¡Para el bautizo de tu peque!',
      subtitle: '› DESCUBRE NUESTRA COLECCIÓN',
      image: asset('/src/assets/cotton_bird_images/categoria_bautizo.webp'),
      ctaText: 'Ver Invitaciones de Bautizo',
      ctaLink: '/products?category=Baby Shower'
    },
    seo: {
      title: 'Invitaciones de Bautizo y Baby Shower Digitales | Venite',
      description: 'Invitaciones digitales para bautizos y baby showers. Diseños tiernos y elegantes para celebrar la llegada de tu bebé.',
      keywords: 'invitaciones bautizo digital, baby shower invitaciones, invitaciones bebé',
      ogImage: asset('/src/assets/cotton_bird_images/categoria_bautizo.webp')
    },
    gallery: [
      {
        id: 'bautizo-1',
        src: asset('/src/assets/cotton_bird_images/categoria_bautizo.webp'),
        alt: 'Invitación de bautizo tierna',
        title: 'Diseño Tierno y Elegante'
      }
    ],
    featuredProducts: [
      {
        id: 'bautizo-prod-1',
        name: 'Invitación Bautizo Angelical',
        category: 'Baby Shower',
        image: asset('/src/assets/cotton_bird_images/categoria_bautizo.webp'),
        price: 'Desde 18,00 €',
        badge: 'Nuevo',
        description: 'Diseño angelical y tierno para bautizos'
      }
    ]
  },

  corporativos: {
    id: 'corporativos',
    name: 'Eventos Corporativos',
    slug: 'corporativos',
    route: '/categorias/corporativos',
    hero: {
      title: 'Eventos corporativos con estilo',
      subtitle: '› VER PLANTILLAS',
      image: asset('/src/assets/cotton_bird_images/categoria_productos_fotos.webp'),
      ctaText: 'Ver Plantillas Corporativas',
      ctaLink: '/products?category=Eventos Corporativos'
    },
    seo: {
      title: 'Invitaciones Corporativas Digitales Profesionales | Venite',
      description: 'Invitaciones digitales para eventos corporativos con estilo. Diseños profesionales y elegantes para tu empresa.',
      keywords: 'invitaciones corporativas digital, eventos empresa, invitaciones profesionales',
      ogImage: asset('/src/assets/cotton_bird_images/categoria_productos_fotos.webp')
    },
    gallery: [
      {
        id: 'corp-1',
        src: asset('/src/assets/cotton_bird_images/categoria_productos_fotos.webp'),
        alt: 'Invitación corporativa profesional',
        title: 'Diseño Profesional Elegante'
      }
    ],
    featuredProducts: [
      {
        id: 'corp-prod-1',
        name: 'Invitación Corporativa Premium',
        category: 'Eventos Corporativos',
        image: asset('/src/assets/cotton_bird_images/categoria_productos_fotos.webp'),
        price: 'Desde 35,00 €',
        badge: 'Premium',
        description: 'Diseño profesional y elegante para eventos corporativos'
      }
    ]
  },

  graduaciones: {
    id: 'graduaciones',
    name: 'Graduaciones',
    slug: 'graduaciones',
    route: '/categorias/graduaciones',
    hero: {
      title: 'Celebra tu logro a lo grande',
      subtitle: '› VER INVITACIONES',
      image: asset('/src/assets/cotton_bird_images/categoria_invitaciones_digitales.webp'),
      ctaText: 'Ver Invitaciones de Graduación',
      ctaLink: '/products?category=Graduaciones'
    },
    seo: {
      title: 'Invitaciones de Graduación Digitales | Venite',
      description: 'Invitaciones digitales para graduaciones. Celebra tu logro a lo grande con diseños elegantes y personalizables.',
      keywords: 'invitaciones graduación digital, celebrar graduación, invitaciones logro',
      ogImage: asset('/src/assets/cotton_bird_images/categoria_invitaciones_digitales.webp')
    },
    gallery: [
      {
        id: 'grad-1',
        src: asset('/src/assets/cotton_bird_images/categoria_invitaciones_digitales.webp'),
        alt: 'Invitación de graduación elegante',
        title: 'Diseño Elegante de Logro'
      }
    ],
    featuredProducts: [
      {
        id: 'grad-prod-1',
        name: 'Invitación Graduación Elegante',
        category: 'Graduaciones',
        image: asset('/src/assets/cotton_bird_images/categoria_invitaciones_digitales.webp'),
        price: 'Desde 20,00 €',
        badge: 'Popular',
        description: 'Diseño elegante para celebrar tu graduación'
      }
    ]
  }
}

// Función helper para obtener datos de una categoría
export const getCategoryData = (categorySlug) => {
  return categoryData[categorySlug] || null
}

// Lista de todas las categorías
export const getAllCategories = () => {
  return Object.values(categoryData)
}

// Breadcrumb data
export const getBreadcrumbs = (categorySlug) => {
  const category = getCategoryData(categorySlug)
  if (!category) return []
  
  return [
    { label: 'Home', href: '/' },
    { label: 'Categorías', href: '/products' },
    { label: category.name, href: category.route, current: true }
  ]
}
