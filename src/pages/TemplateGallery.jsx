import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

// Mock data de plantillas
const mockTemplates = [
  {
    id: 1,
    name: 'Elegancia Dorada',
    category: 'boda',
    coverUrl: '/assets/templates/boda-elegante.jpg',
    size: 'A5',
    theme: {
      palette: ['#D4AF37', '#FFFFFF', '#F5F5DC'],
      fonts: ['Playfair Display', 'Lato']
    },
    tags: ['elegante', 'dorado', 'clásico']
  },
  {
    id: 2,
    name: 'Quinceañera Rosa',
    category: 'quinceaneras',
    coverUrl: '/assets/templates/quince-rosa.jpg',
    size: 'A5',
    theme: {
      palette: ['#FF69B4', '#FFFFFF', '#FFB6C1'],
      fonts: ['Dancing Script', 'Open Sans']
    },
    tags: ['rosa', 'juvenil', 'flores']
  },
  {
    id: 3,
    name: 'Fiesta Infantil',
    category: 'infantiles',
    coverUrl: '/assets/templates/infantil-colores.jpg',
    size: 'A6',
    theme: {
      palette: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'],
      fonts: ['Comic Neue', 'Nunito']
    },
    tags: ['colorido', 'divertido', 'niños']
  },
  {
    id: 4,
    name: 'Bautizo Celestial',
    category: 'bautizo',
    coverUrl: '/assets/templates/bautizo-azul.jpg',
    size: 'A5',
    theme: {
      palette: ['#87CEEB', '#FFFFFF', '#F0F8FF'],
      fonts: ['Merriweather', 'Source Sans Pro']
    },
    tags: ['celestial', 'azul', 'suave']
  },
  {
    id: 5,
    name: 'Corporativo Moderno',
    category: 'corporativos',
    coverUrl: '/assets/templates/corporativo-moderno.jpg',
    size: 'A4',
    theme: {
      palette: ['#2C3E50', '#3498DB', '#FFFFFF'],
      fonts: ['Roboto', 'Open Sans']
    },
    tags: ['moderno', 'profesional', 'minimalista']
  },
  {
    id: 6,
    name: 'Graduación Académica',
    category: 'graduaciones',
    coverUrl: '/assets/templates/graduacion-academica.jpg',
    size: 'A5',
    theme: {
      palette: ['#8B4513', '#DAA520', '#FFFFFF'],
      fonts: ['Crimson Text', 'Lato']
    },
    tags: ['académico', 'formal', 'dorado']
  }
];

const categories = [
  { value: 'all', label: 'Todas las categorías' },
  { value: 'boda', label: 'Bodas' },
  { value: 'quinceaneras', label: 'Quinceañeras' },
  { value: 'infantiles', label: 'Infantiles' },
  { value: 'bautizo', label: 'Bautizos' },
  { value: 'corporativos', label: 'Corporativos' },
  { value: 'graduaciones', label: 'Graduaciones' }
];

const TemplateCard = ({ template }) => (
  <div className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
    <div className="aspect-[3/4] relative overflow-hidden">
      <img
        src={template.coverUrl}
        alt={template.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          e.target.src = `https://via.placeholder.com/300x400/f3f4f6/6b7280?text=${encodeURIComponent(template.name)}`;
        }}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      <div className="absolute top-3 right-3">
        <Badge variant="secondary" className="bg-white/90 text-gray-800">
          {template.size}
        </Badge>
      </div>
    </div>
    
    <div className="p-4">
      <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
        {template.name}
      </h3>
      
      <div className="flex items-center justify-between mb-3">
        <Badge variant="outline" className="capitalize">
          {categories.find(c => c.value === template.category)?.label || template.category}
        </Badge>
        <div className="flex gap-1">
          {template.theme.palette.slice(0, 3).map((color, index) => (
            <div
              key={index}
              className="w-4 h-4 rounded-full border border-gray-200"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {template.tags.slice(0, 2).map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Button asChild size="sm" className="flex-1">
          <Link to={`/plantilla/${template.id}`}>
            Ver Detalle
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link to={`/editor/${template.id}`}>
            Personalizar
          </Link>
        </Button>
      </div>
    </div>
  </div>
);

export default function TemplateGallery() {
  const [templates, setTemplates] = useState(mockTemplates);
  const [filteredTemplates, setFilteredTemplates] = useState(mockTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    let filtered = templates;

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    setFilteredTemplates(filtered);
  }, [templates, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Galería de Plantillas
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra colección de plantillas elegantes y personalizables para cada ocasión especial
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar plantillas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estadísticas */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando {filteredTemplates.length} de {templates.length} plantillas
          </p>
        </div>

        {/* Grid de plantillas */}
        {filteredTemplates.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron plantillas
            </h3>
            <p className="text-gray-600">
              Intenta con otros términos de búsqueda o cambia los filtros
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
