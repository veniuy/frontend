import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Copy, 
  Trash2,
  Calendar,
  Users,
  Heart,
  Star,
  Sparkles,
  Gift,
  Crown,
  Cake,
  Briefcase,
  GraduationCap,
  Baby,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

import { designApi, templateApi } from '../services/editorApi'
import useEditorStore from '../stores/editorStore'

const DashboardV2 = () => {
  const navigate = useNavigate()
  const { setTemplates, setTemplatesLoading } = useEditorStore()
  
  // Estados locales
  const [userDesigns, setUserDesigns] = useState([])
  const [templates, setTemplatesState] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [activeTab, setActiveTab] = useState('designs')

  // Cargar datos al montar el componente
  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Cargar diseños del usuario y plantillas en paralelo
      const [designs, templatesData] = await Promise.all([
        designApi.getUserDesigns(true),
        templateApi.getAll()
      ])
      
      setUserDesigns(designs)
      setTemplatesState(templatesData)
      setTemplates(templatesData) // Actualizar store global
      
    } catch (err) {
      console.error('Error loading dashboard data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNewDesign = async (templateId) => {
    try {
      const design = await designApi.create(templateId)
      navigate(`/editor/${design.id}`)
    } catch (err) {
      console.error('Error creating design:', err)
      setError('Error al crear el diseño')
    }
  }

  const handleEditDesign = (designId) => {
    navigate(`/editor/${designId}`)
  }

  const handleDuplicateDesign = async (designId) => {
    try {
      const duplicatedDesign = await designApi.duplicate(designId)
      setUserDesigns(prev => [duplicatedDesign, ...prev])
    } catch (err) {
      console.error('Error duplicating design:', err)
      setError('Error al duplicar el diseño')
    }
  }

  const handleDeleteDesign = async (designId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este diseño?')) {
      return
    }

    try {
      await designApi.delete(designId)
      setUserDesigns(prev => prev.filter(d => d.id !== designId))
    } catch (err) {
      console.error('Error deleting design:', err)
      setError('Error al eliminar el diseño')
    }
  }

  // Filtrar plantillas por categoría y búsqueda
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  // Filtrar diseños por búsqueda
  const filteredDesigns = userDesigns.filter(design => 
    design.design_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Gestiona tus invitaciones y diseños</p>
            </div>
            
            <Button 
              onClick={() => setActiveTab('templates')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva Invitación
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="designs">Mis Diseños</TabsTrigger>
            <TabsTrigger value="templates">Plantillas</TabsTrigger>
            <TabsTrigger value="analytics">Estadísticas</TabsTrigger>
          </TabsList>

          {/* Barra de búsqueda y filtros */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar diseños o plantillas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {activeTab === 'templates' && (
              <CategoryFilter 
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            )}
          </div>

          <TabsContent value="designs">
            <DesignsGrid 
              designs={filteredDesigns}
              onEdit={handleEditDesign}
              onDuplicate={handleDuplicateDesign}
              onDelete={handleDeleteDesign}
            />
          </TabsContent>

          <TabsContent value="templates">
            <TemplatesGrid 
              templates={filteredTemplates}
              onSelectTemplate={handleCreateNewDesign}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsPanel designs={userDesigns} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Componente de filtro de categorías
const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'Todas', icon: Star },
    { id: 'wedding', name: 'Bodas', icon: Heart },
    { id: 'quince', name: 'Quinceañeras', icon: Crown },
    { id: 'birthday', name: 'Cumpleaños', icon: Cake },
    { id: 'corporate', name: 'Corporativo', icon: Briefcase },
    { id: 'graduation', name: 'Graduación', icon: GraduationCap },
    { id: 'baby', name: 'Baby Shower', icon: Baby }
  ]

  return (
    <div className="flex space-x-2 overflow-x-auto">
      {categories.map(category => {
        const Icon = category.icon
        return (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className="whitespace-nowrap"
          >
            <Icon className="w-4 h-4 mr-2" />
            {category.name}
          </Button>
        )
      })}
    </div>
  )
}

// Grid de diseños del usuario
const DesignsGrid = ({ designs, onEdit, onDuplicate, onDelete }) => {
  if (designs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Edit className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes diseños aún</h3>
        <p className="text-gray-600 mb-4">Crea tu primera invitación seleccionando una plantilla</p>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Crear Primera Invitación
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {designs.map(design => (
        <DesignCard
          key={design.id}
          design={design}
          onEdit={() => onEdit(design.id)}
          onDuplicate={() => onDuplicate(design.id)}
          onDelete={() => onDelete(design.id)}
        />
      ))}
    </div>
  )
}

// Tarjeta de diseño individual
const DesignCard = ({ design, onEdit, onDuplicate, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false)

  const getStatusBadge = () => {
    if (design.is_published) {
      return <Badge variant="success" className="text-xs">Publicado</Badge>
    }
    return <Badge variant="secondary" className="text-xs">Borrador</Badge>
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="p-0">
        <div className="aspect-[4/5] bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg relative overflow-hidden">
          {design.preview_image_url ? (
            <img 
              src={design.preview_image_url} 
              alt={design.design_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <Edit className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Vista previa</p>
              </div>
            </div>
          )}
          
          {/* Overlay con acciones */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex space-x-2">
              <Button size="sm" variant="secondary" onClick={onEdit}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setShowMenu(!showMenu)}>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Menú contextual */}
          {showMenu && (
            <div className="absolute top-2 right-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button 
                onClick={onEdit}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </button>
              <button 
                onClick={onDuplicate}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
              >
                <Copy className="w-4 h-4 mr-2" />
                Duplicar
              </button>
              <button 
                onClick={onDelete}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar
              </button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-gray-900 truncate flex-1">
            {design.design_name}
          </h3>
          {getStatusBadge()}
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Clock className="w-4 h-4 mr-1" />
          {formatDate(design.last_saved_at)}
        </div>
        
        {design.template && (
          <div className="flex items-center text-xs text-gray-400">
            <span>Basado en: {design.template.name}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Grid de plantillas
const TemplatesGrid = ({ templates, onSelectTemplate }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {templates.map(template => (
        <TemplateCard
          key={template.id}
          template={template}
          onSelect={() => onSelectTemplate(template.id)}
        />
      ))}
    </div>
  )
}

// Tarjeta de plantilla individual
const TemplateCard = ({ template, onSelect }) => {
  const getCategoryIcon = (category) => {
    const iconMap = {
      wedding: Heart,
      quince: Crown,
      birthday: Cake,
      corporate: Briefcase,
      graduation: GraduationCap,
      baby: Baby
    }
    return iconMap[category] || Star
  }

  const CategoryIcon = getCategoryIcon(template.category)

  return (
    <Card className="group hover:shadow-lg transition-shadow cursor-pointer" onClick={onSelect}>
      <CardHeader className="p-0">
        <div className="aspect-[4/5] bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-lg relative overflow-hidden">
          {template.preview_image_url ? (
            <img 
              src={template.preview_image_url} 
              alt={template.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <CategoryIcon className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 font-medium">{template.name}</p>
              </div>
            </div>
          )}
          
          {/* Overlay con botón de selección */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button size="sm" variant="secondary">
              <ArrowRight className="w-4 h-4 mr-2" />
              Usar Plantilla
            </Button>
          </div>

          {/* Badge premium */}
          {template.is_premium && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <h3 className="font-medium text-gray-900 mb-1">{template.name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{template.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <CategoryIcon className="w-3 h-3 mr-1" />
            {template.category}
          </div>
          
          {template.can_access === false && (
            <Badge variant="outline" className="text-xs">
              Requiere Premium
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Panel de estadísticas
const AnalyticsPanel = ({ designs }) => {
  const stats = {
    total: designs.length,
    published: designs.filter(d => d.is_published).length,
    drafts: designs.filter(d => !d.is_published).length,
    thisMonth: designs.filter(d => {
      const designDate = new Date(d.created_at)
      const now = new Date()
      return designDate.getMonth() === now.getMonth() && designDate.getFullYear() === now.getFullYear()
    }).length
  }

  return (
    <div className="space-y-6">
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Edit className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Diseños</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Publicados</p>
                <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Borradores</p>
                <p className="text-2xl font-bold text-gray-900">{stats.drafts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Este Mes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.thisMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actividad reciente */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {designs.slice(0, 5).map(design => (
              <div key={design.id} className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <Edit className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{design.design_name}</p>
                    <p className="text-sm text-gray-500">
                      Modificado {new Date(design.last_saved_at).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
                <Badge variant={design.is_published ? 'success' : 'secondary'}>
                  {design.is_published ? 'Publicado' : 'Borrador'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardV2
