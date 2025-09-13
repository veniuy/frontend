// utils/assets.js
const MAP = import.meta.glob('/src/assets/**/*.{png,jpg,jpeg,webp,svg,gif}', { as: 'url', eager: true });

export function asset(p) {
  if (!p) return '';
  // probar variantes: con y sin slash inicial, con y sin 'src/'
  const candidates = [
    p,
    p.replace(/^\/+/, ''),                         // quita slash inicial
    p.startsWith('src/') ? '/' + p : '/'+p.replace(/^\/?/, ''),
    p.replace(/^\/?src\//, '/src/'),               // fuerza prefijo /src/
  ];
  for (const c of candidates) {
    const k = c.startsWith('/') ? c : '/' + c;
    if (MAP[k]) return MAP[k];
  }
  return p; // deja el original (útil en dev)
}

export function ph(w=600,h=800,text='Imagen') {
  const t = encodeURIComponent(text);
  return `https://placehold.co/${w}x${h}?text=${t}`;
}

export function onImgError(e, text='Imagen') {
  e.currentTarget.src = ph(600, 800, text);
}
