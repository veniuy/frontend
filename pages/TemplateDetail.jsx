import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Palette, Type, Layers, Download, Share2, Heart, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

// Mock data (mismo que en TemplateGallery)
const mockTemplates = [
  {
    id: 1,
    name: 'Elegancia Dorada',
    category: 'boda',
    coverUrl: '/assets/templates/boda-elegante.jpg',
    size: 'A5',
    description: 'Una plantilla elegante y sofisticada perfecta para bodas clásicas. Combina tonos dorados con tipografías refinadas para crear una invitación memorable.',
    theme: {
      palette: ['#D4AF37', '#FFFFFF', '#F5F5DC', '#8B7355'],
      fonts: ['Playfair Display', 'Lato', 'Crimson Text']
    },
    tags: ['elegante', 'dorado', 'clásico', 'formal'],
    features: [
      'Diseño responsive',
      'Colores personalizables',
      'Tipografías premium',
      'Elementos decorativos',
      'Optimizado para impresión'
    ],
    layers: [
      { id: 1, type: 'background', name: 'Fondo dorado' },
      { id: 2, type: 'text', name: 'Título principal' },
      { id: 3, type: 'text', name: 'Nombres de los novios' },
      { id: 4, type: 'text', name: 'Fecha y hora' },
      { id: 5, type: 'text', name: 'Ubicación' },
      { id: 6, type: 'decoration', name: 'Ornamentos' }
    ],
    relatedTemplates: [2, 4, 6]
  },
  {
    id: 2,
    name: 'Quinceañera Rosa',
    category: 'quinceaneras',
    coverUrl: '/assets/templates/quince-rosa.jpg',
    size: 'A5',
    description: 'Diseño juvenil y romántico con tonos rosados, perfecto para celebrar los quince años con estilo y elegancia.',
    theme: {
      palette: ['#FF69B4', '#FFFFFF', '#FFB6C1', '#FF1493'],
      fonts: ['Dancing Script', 'Open Sans', 'Pacifico']
    },
    tags: ['rosa', 'juvenil', 'flores', 'romántico'],
    features: [
      'Elementos florales',
      'Tipografía script',
      'Colores vibrantes',
      'Diseño juvenil',
      'Fácil personalización'
    ],
    layers: [
      { id: 1, type: 'background', name: 'Fondo rosa' },
      { id: 2, type: 'decoration', name: 'Flores decorativas' },
      { id: 3, type: 'text', name: 'Título "Mis XV Años"' },
      { id: 4, type: 'text', name: 'Nombre de la quinceañera' },
      { id: 5, type: 'text', name: 'Fecha y lugar' }
    ],
    relatedTemplates: [1, 3, 5]
  }
];

const categories = {
  'boda': 'Bodas',
  'quinceaneras': 'Quinceañeras',
  'infantiles': 'Infantiles',
  'bautizo': 'Bautizos',
  'corporativos': 'Corporativos',
  'graduaciones': 'Graduaciones'
};

export default function TemplateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState(null);
  const [relatedTemplates, setRelatedTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    const templateId = parseInt(id);
    const foundTemplate = mockTemplates.find(t => t.id === templateId);
    
    if (foundTemplate) {
      setTemplate(foundTemplate);
      // Cargar plantillas relacionadas
      const related = mockTemplates.filter(t => 
        foundTemplate.relatedTemplates?.includes(t.id)
      );
      setRelatedTemplates(related);
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Plantilla no encontrada</h2>
          <Button asChild>
            <Link to="/plantillas">Volver a la galería</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <div className="text-sm text-gray-500">
              <Link to="/plantillas" className="hover:text-pink-600">Plantillas</Link>
              <span className="mx-2">/</span>
              <span>{template.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Preview de la plantilla */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-white shadow-lg">
                  <img
                    src={template.coverUrl}
                    alt={template.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x533/f3f4f6/6b7280?text=${encodeURIComponent(template.name)}`;
                    }}
                  />
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button className="flex-1" asChild>
                    <Link to={`/editor/${template.id}`}>
                      <Layers className="h-4 w-4 mr-2" />
                      Personalizar Ahora
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Información de la plantilla */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="capitalize">
                  {categories[template.category]}
                </Badge>
                <Badge variant="secondary">
                  {template.size}
                </Badge>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {template.name}
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                {template.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {template.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="features">Características</TabsTrigger>
                <TabsTrigger value="colors">Colores</TabsTrigger>
                <TabsTrigger value="layers">Capas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="features" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="h-5 w-5" />
                      Características
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {template.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="colors" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Paleta de Colores
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {template.theme.palette.map((color, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full border-2 border-gray-200"
                            style={{ backgroundColor: color }}
                          ></div>
                          <span className="text-sm font-mono text-gray-600">
                            {color}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Type className="h-4 w-4" />
                        Tipografías
                      </h4>
                      <div className="space-y-2">
                        {template.theme.fonts.map((font, index) => (
                          <div key={index} className="text-sm text-gray-600">
                            <span className="font-medium">{font}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="layers" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="h-5 w-5" />
                      Estructura de Capas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {template.layers.map((layer, index) => (
                        <div key={layer.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-medium text-pink-600">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">
                              {layer.name}
                            </div>
                            <div className="text-sm text-gray-500 capitalize">
                              {layer.type}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3">
              <Button className="flex-1" asChild>
                <Link to={`/editor/${template.id}`}>
                  Comenzar a Personalizar
                </Link>
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Descargar Preview
              </Button>
            </div>
          </div>
        </div>

        {/* Plantillas relacionadas */}
        {relatedTemplates.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Plantillas Relacionadas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTemplates.map((relatedTemplate) => (
                <Card key={relatedTemplate.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
                      <img
                        src={relatedTemplate.coverUrl}
                        alt={relatedTemplate.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/300x400/f3f4f6/6b7280?text=${encodeURIComponent(relatedTemplate.name)}`;
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {relatedTemplate.name}
                      </h3>
                      <Badge variant="outline" className="capitalize mb-3">
                        {categories[relatedTemplate.category]}
                      </Badge>
                      <Button asChild size="sm" className="w-full">
                        <Link to={`/plantilla/${relatedTemplate.id}`}>
                          Ver Detalle
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
