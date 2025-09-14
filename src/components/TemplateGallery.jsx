import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  Filter, 
  Crown, 
  Heart, 
  Eye, 
  Sparkles,
  Calendar,
  Users,
  Building,
  Baby,
  Gift,
  Star,
  Palette,
  Type
} from 'lucide-react';

const TemplateGallery = ({ onTemplateSelect, selectedTemplate }) => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const categories = [
    { id: 'all', name: 'Todas', icon: Sparkles },
    { id: 'wedding', name: 'Bodas', icon: Heart },
    { id: 'birthday', name: 'Cumpleaños', icon: Gift },
    { id: 'quince', name: 'Quinceañera', icon: Star },
    { id: 'corporate', name: 'Corporativo', icon: Building },
    { id: 'kids', name: 'Infantil', icon: Baby },
    { id: 'party', name: 'Fiestas', icon: Users }
  ];

  useEffect(() => {
    loadTemplates();
  }, []);

  useEffect(() => {
    filterTemplates();
  }, [templates, searchTerm, selectedCategory, showPremiumOnly]);

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/templates");
      setTemplates(response.templates);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTemplates = () => {
    let filtered = templates;

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.designer_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar solo premium
    if (showPremiumOnly) {
      filtered = filtered.filter(template => template.is_premium);
    }

    setFilteredTemplates(filtered);
  };

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : Type;
  };

  const handleTemplatePreview = (template) => {
    setPreviewTemplate(template);
  };

  const handleTemplateSelect = (template) => {
    onTemplateSelect(template);
    setPreviewTemplate(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header y controles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Galería de Plantillas</h2>
            <p className="text-gray-600">Elige una plantilla para comenzar tu diseño</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={showPremiumOnly ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowPremiumOnly(!showPremiumOnly)}
              className="flex items-center"
            >
              <Crown className="w-4 h-4 mr-2" />
              Solo Premium
            </Button>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar plantillas por nombre, descripción o diseñador..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtros por categoría */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-7">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex items-center space-x-2"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      {/* Estadísticas */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{filteredTemplates.length} plantillas encontradas</span>
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Crown className="w-4 h-4 mr-1 text-yellow-500" />
            {filteredTemplates.filter(t => t.is_premium).length} Premium
          </span>
          <span className="flex items-center">
            <Sparkles className="w-4 h-4 mr-1 text-blue-500" />
            {filteredTemplates.filter(t => !t.is_premium).length} Gratuitas
          </span>
        </div>
      </div>

      {/* Grid de plantillas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => {
          const IconComponent = getCategoryIcon(template.category);
          const isSelected = selectedTemplate?.id === template.id;
          
          return (
            <Card 
              key={template.id}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
            >
              <CardContent className="p-0">
                {/* Imagen de preview */}
                <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
                  {template.preview_image_url ? (
                    <img 
                      src={template.preview_image_url} 
                      alt={template.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <IconComponent className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                        <Palette className="w-8 h-8 mx-auto text-gray-300" />
                      </div>
                    </div>
                  )}
                  
                  {/* Overlay con acciones */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTemplatePreview(template);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Vista previa
                      </Button>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTemplateSelect(template);
                        }}
                      >
                        Usar plantilla
                      </Button>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    {template.is_premium && (
                      <Badge className="bg-yellow-500 text-white flex items-center">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                    {template.usage_count > 100 && (
                      <Badge variant="secondary" className="flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Información de la plantilla */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg leading-tight">{template.name}</h3>
                    {template.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {template.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="flex items-center">
                        <IconComponent className="w-3 h-3 mr-1" />
                        {template.category}
                      </Badge>
                    </div>
                    
                    {template.designer_name && (
                      <div className="text-xs text-gray-500">
                        por {template.designer_name}
                      </div>
                    )}
                  </div>

                  {template.usage_count > 0 && (
                    <div className="text-xs text-gray-500 flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      Usado {template.usage_count} veces
                    </div>
                  )}

                  <Button 
                    className="w-full"
                    onClick={() => handleTemplateSelect(template)}
                    variant={isSelected ? 'default' : 'outline'}
                  >
                    {isSelected ? 'Plantilla seleccionada' : 'Seleccionar plantilla'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Mensaje cuando no hay resultados */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron plantillas</h3>
          <p className="text-gray-600 mb-4">
            Intenta ajustar tus filtros o términos de búsqueda
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setShowPremiumOnly(false);
            }}
          >
            Limpiar filtros
          </Button>
        </div>
      )}

      {/* Modal de vista previa */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          {previewTemplate && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <span>{previewTemplate.name}</span>
                  {previewTemplate.is_premium && (
                    <Crown className="w-5 h-5 text-yellow-500" />
                  )}
                </DialogTitle>
                <DialogDescription>
                  {previewTemplate.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Vista previa de la plantilla */}
                <div className="space-y-4">
                  <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                    {previewTemplate.preview_image_url ? (
                      <img 
                        src={previewTemplate.preview_image_url} 
                        alt={previewTemplate.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Palette className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Información detallada */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Detalles de la plantilla</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Categoría:</span>
                        <Badge variant="outline">{previewTemplate.category}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tipo:</span>
                        <span>{previewTemplate.is_premium ? 'Premium' : 'Gratuita'}</span>
                      </div>
                      {previewTemplate.designer_name && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Diseñador:</span>
                          <span>{previewTemplate.designer_name}</span>
                        </div>
                      )}
                      {previewTemplate.usage_count > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Popularidad:</span>
                          <span>{previewTemplate.usage_count} usos</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {previewTemplate.tags && previewTemplate.tags.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Etiquetas</h4>
                      <div className="flex flex-wrap gap-2">
                        {previewTemplate.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <Button 
                      className="flex-1"
                      onClick={() => handleTemplateSelect(previewTemplate)}
                    >
                      Usar esta plantilla
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setPreviewTemplate(null)}
                    >
                      Cerrar
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplateGallery;
