# Cotton Bird - Aplicación Web de Papelería Personalizada

Una aplicación web completa inspirada en Cotton Bird, especializada en productos de papelería personalizada para eventos especiales como bodas, bautizos, comuniones y cumpleaños.

## 🌟 Características Principales

### 📱 Páginas Implementadas
- **Landing Page** - Página de inicio con hero sections, productos destacados y categorías
- **Catálogo de Productos** - Vista completa con filtros, búsqueda y ordenamiento
- **Detalle de Producto** - Página individual con galería, personalización y carrito
- **FAQ** - Preguntas frecuentes organizadas por categorías
- **Contacto** - Formulario de contacto e información de la empresa

### 🛒 Funcionalidades
- **Carrito de Compras** - Sistema completo con sidebar y gestión de productos
- **Personalizador** - Herramienta para personalizar productos con imágenes y texto
- **Navegación Responsive** - Adaptado a todos los dispositivos
- **Búsqueda y Filtros** - Sistema avanzado de filtrado de productos
- **Newsletter** - Suscripción con descuento de bienvenida

### 🎨 Diseño
- **Paleta de Colores** - Tonos rosas, beiges y grises elegantes
- **Tipografía** - Fuentes serif para títulos y sans-serif para contenido
- **Animaciones** - Transiciones suaves y efectos hover
- **Componentes UI** - Basados en shadcn/ui para consistencia

## 🚀 Tecnologías Utilizadas

- **React 19** - Framework principal
- **Vite** - Build tool y desarrollo
- **Tailwind CSS** - Framework de estilos
- **shadcn/ui** - Biblioteca de componentes
- **Lucide React** - Iconos
- **React Router** - Navegación
- **Framer Motion** - Animaciones

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd cotton-bird-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install --legacy-peer-deps
   ```
   
   *Nota: Se usa `--legacy-peer-deps` para resolver conflictos de dependencias entre react-day-picker y date-fns*

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```
   
   La aplicación estará disponible en `http://localhost:5173`

4. **Construir para producción**
   ```bash
   npm run build
   ```

5. **Vista previa de producción**
   ```bash
   npm run preview
   ```

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── ui/              # Componentes base de shadcn/ui
│   ├── ShoppingCart.jsx # Sistema de carrito
│   └── ProductCustomizer.jsx # Personalizador de productos
├── pages/               # Páginas principales
│   ├── Landing.jsx      # Página de inicio
│   ├── Products.jsx     # Catálogo de productos
│   ├── ProductDetail.jsx # Detalle de producto
│   ├── FAQ.jsx          # Preguntas frecuentes
│   └── Contact.jsx      # Página de contacto
├── assets/              # Recursos estáticos
│   └── cotton_bird_images/ # Imágenes de Cotton Bird
├── hooks/               # Hooks personalizados
├── utils/               # Utilidades y helpers
└── lib/                 # Configuraciones y APIs
```

## 🎯 Funcionalidades Detalladas

### Carrito de Compras
- Añadir/eliminar productos
- Modificar cantidades
- Persistencia en sesión
- Cálculo automático de totales
- Sidebar deslizante

### Personalizador de Productos
- Subida de imágenes
- Añadir texto personalizado
- Selección de fuentes y colores
- Posicionamiento de elementos
- Vista previa en tiempo real

### Sistema de Navegación
- Menú principal responsive
- Breadcrumbs en páginas internas
- Enlaces a categorías
- Búsqueda de productos

### Páginas de Soporte
- FAQ con búsqueda y categorías
- Formulario de contacto funcional
- Información de la empresa
- Políticas y términos

## 🌱 Sostenibilidad y Valores

La aplicación refleja los valores de sostenibilidad de Cotton Bird:
- Información sobre materiales ecológicos
- Certificaciones FSC y CO2 neutral
- Tintas biodegradables
- Compromiso con RSE

## 📱 Responsive Design

- **Mobile First** - Diseñado primero para móviles
- **Breakpoints** - sm, md, lg, xl
- **Navegación móvil** - Menú hamburguesa
- **Imágenes optimizadas** - Diferentes tamaños según dispositivo

## 🔧 Configuración Adicional

### Variables de Entorno
Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=https://api.cottonbird.com
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

### Personalización de Colores
Los colores principales se pueden modificar en `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      pink: { /* colores personalizados */ },
      gray: { /* colores personalizados */ }
    }
  }
}
```

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Subir carpeta dist/ a Netlify
```

### Servidor Propio
```bash
npm run build
# Servir carpeta dist/ con nginx/apache
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

- **Email**: hello@cottonbird.es
- **Teléfono**: +34 919 03 36 08
- **Dirección**: 27 Rue Gustave Eiffel, 66280 Saleilles, Francia

## 🙏 Agradecimientos

- Inspirado en el diseño original de [Cotton Bird](https://www.cottonbird.es/)
- Componentes UI de [shadcn/ui](https://ui.shadcn.com/)
- Iconos de [Lucide](https://lucide.dev/)
- Estilos con [Tailwind CSS](https://tailwindcss.com/)

---

**Desarrollado con ❤️ para crear momentos especiales**
