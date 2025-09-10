// Mapea todo /src/assets/** a URLs del build de Vite
const MAP = import.meta.glob('../assets/**/*', { eager: true, as: 'url' });

export function asset(p) {
  // p viene como "/src/assets/xxx.jpg"
  const key = '../' + p.replace(/^\/src\//, ''); // -> "../assets/xxx.jpg"
  return MAP[key] || p.replace(/^\/src\/assets\//, '/'); // fallback a /public si existe
}

export function ph(w=600,h=800,text='Imagen'){ 
  return `https://placehold.co/${w}x${h}?text=${encodeURIComponent(text)}`;
}

export function onImgError(e, text='Imagen'){ 
  e.currentTarget.src = ph(600,800,text); 
}

// Función específica para las imágenes de Cotton Bird
export function cottonBirdImage(imageName) {
  const imagePath = `/src/assets/cotton_bird_images/${imageName}`;
  return asset(imagePath);
}

// Mapeo de imágenes de Cotton Bird para fácil acceso
export const COTTON_BIRD_IMAGES = {
  // Hero images
  heroBoda: '/src/assets/cotton_bird_images/hero_boda_invitaciones.webp',
  heroBautizo: '/src/assets/cotton_bird_images/hero_bautizo_productos.webp',
  
  // Category images
  categoriaBoda: '/src/assets/cotton_bird_images/categoria_boda_grid.webp',
  categoriaBebes: '/src/assets/cotton_bird_images/categoria_bebes_ninos.webp',
  categoriaBautizo: '/src/assets/cotton_bird_images/categoria_bautizo.webp',
  categoriaCumpleanos: '/src/assets/cotton_bird_images/categoria_cumpleanos.webp',
  categoriaProductosFotos: '/src/assets/cotton_bird_images/categoria_productos_fotos.webp',
  categoriaInvitacionesDigitales: '/src/assets/cotton_bird_images/categoria_invitaciones_digitales.webp',
  
  // Featured products
  albumPetitQuotidien: '/src/assets/cotton_bird_images/album_le_petit_quotidien.webp',
  invitacionCreacionPropia: '/src/assets/cotton_bird_images/invitacion_creacion_propia.webp',
  novedadesBoda: '/src/assets/cotton_bird_images/novedades_boda.webp',
  productoJazmin: '/src/assets/cotton_bird_images/producto_jazmin_cuadro.webp',
  
  // Workshop/production
  tallerProduccion: '/src/assets/cotton_bird_images/taller_produccion_cotton_bird.webp'
};
