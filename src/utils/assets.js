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

export function onImgError(e, text='Imagen'){ e.currentTarget.src = ph(600,800,text); }
