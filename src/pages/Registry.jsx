import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import {
  Gift,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  DollarSign,
  ShoppingCart,
  Heart,
  Star,
  Package,
  Link as LinkIcon,
  Image,
  ArrowLeft,
  Save,
  Eye,
  Share2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';

const Registry = () => {
  const navigate = useNavigate();
  const [registryItems, setRegistryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('items');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form state for new/edit item
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    url: '',
    image: '',
    category: 'home',
    priority: 'medium',
    purchased: false,
    purchasedBy: ''
  });

  const categories = [
    { value: 'home', label: 'Hogar', icon: '🏠' },
    { value: 'kitchen', label: 'Cocina', icon: '🍳' },
    { value: 'bedroom', label: 'Dormitorio', icon: '🛏️' },
    { value: 'bathroom', label: 'Baño', icon: '🛁' },
    { value: 'electronics', label: 'Electrónicos', icon: '📱' },
    { value: 'decor', label: 'Decoración', icon: '🎨' },
    { value: 'other', label: 'Otros', icon: '📦' }
  ];

  const priorities = [
    { value: 'high', label: 'Alta', color: 'bg-red-100 text-red-800' },
    { value: 'medium', label: 'Media', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'low', label: 'Baja', color: 'bg-green-100 text-green-800' }
  ];

  // Sample data
  useEffect(() => {
    setRegistryItems([
      {
        id: 1,
        name: 'Juego de Sábanas Premium',
        description: 'Sábanas de algodón egipcio 100%, suaves y duraderas',
        price: 150,
        url: 'https://example.com/sabanas',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        category: 'bedroom',
        priority: 'high',
        purchased: false,
        purchasedBy: ''
      },
      {
        id: 2,
        name: 'Cafetera Espresso',
        description: 'Cafetera automática con molinillo integrado',
        price: 299,
        url: 'https://example.com/cafetera',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
        category: 'kitchen',
        priority: 'medium',
        purchased: true,
        purchasedBy: 'María González'
      },
      {
        id: 3,
        name: 'Set de Toallas',
        description: 'Juego de 6 toallas de bambú ultra absorbentes',
        price: 89,
        url: 'https://example.com/toallas',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400',
        category: 'bathroom',
        priority: 'medium',
        purchased: false,
        purchasedBy: ''
      }
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingItem) {
      setRegistryItems(items => 
        items.map(item => 
          item.id === editingItem.id 
            ? { ...formData, id: editingItem.id }
            : item
        )
      );
    } else {
      const newItem = {
        ...formData,
        id: Date.now(),
        price: parseFloat(formData.price) || 0
      };
      setRegistryItems(items => [...items, newItem]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      url: '',
      image: '',
      category: 'home',
      priority: 'medium',
      purchased: false,
      purchasedBy: ''
    });
    setEditingItem(null);
    setShowAddDialog(false);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingItem(item);
    setShowAddDialog(true);
  };

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar este artículo?')) {
      setRegistryItems(items => items.filter(item => item.id !== id));
    }
  };

  const handleMarkPurchased = (id, purchasedBy = '') => {
    setRegistryItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, purchased: !item.purchased, purchasedBy }
          : item
      )
    );
  };

  const copyRegistryLink = () => {
    const link = `${window.location.origin}/registry/public/123`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : '📦';
  };

  const getCategoryLabel = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : 'Otros';
  };

  const getPriorityColor = (priority) => {
    const prio = priorities.find(p => p.value === priority);
    return prio ? prio.color : 'bg-gray-100 text-gray-800';
  };

  const getPriorityLabel = (priority) => {
    const prio = priorities.find(p => p.value === priority);
    return prio ? prio.label : 'Media';
  };

  const totalItems = registryItems.length;
  const purchasedItems = registryItems.filter(item => item.purchased).length;
  const totalValue = registryItems.reduce((sum, item) => sum + item.price, 0);
  const purchasedValue = registryItems.filter(item => item.purchased).reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" onClick={() => navigate('/app/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Dashboard
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Gift className="h-8 w-8 text-blue-600" />
                Lista de Regalos
              </h1>
              <p className="text-gray-600 mt-1">
                Gestiona tu registro de regalos y comparte con tus invitados
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={copyRegistryLink}>
                {copiedLink ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar Enlace
                  </>
                )}
              </Button>
              <Button onClick={() => window.open('/registry/public/123', '_blank')}>
                <Eye className="h-4 w-4 mr-2" />
                Vista Previa
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Artículos</CardTitle>
              <Package className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalItems}</div>
              <p className="text-xs text-gray-600">En tu lista</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comprados</CardTitle>
              <ShoppingCart className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{purchasedItems}</div>
              <p className="text-xs text-gray-600">
                {totalItems > 0 ? Math.round((purchasedItems / totalItems) * 100) : 0}% completado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue}</div>
              <p className="text-xs text-gray-600">Valor estimado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Comprado</CardTitle>
              <Heart className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${purchasedValue}</div>
              <p className="text-xs text-gray-600">Ya recibido</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="items">Artículos</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Items Tab */}
          <TabsContent value="items" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Mis Artículos</h2>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Artículo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingItem ? 'Editar Artículo' : 'Agregar Nuevo Artículo'}
                    </DialogTitle>
                    <DialogDescription>
                      Completa la información del artículo que deseas agregar a tu lista de regalos.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nombre del Artículo</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Ej: Juego de sábanas"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="price">Precio Estimado</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({...formData, price: e.target.value})}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Describe el artículo..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Categoría</Label>
                        <select
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>
                              {cat.icon} {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="priority">Prioridad</Label>
                        <select
                          id="priority"
                          value={formData.priority}
                          onChange={(e) => setFormData({...formData, priority: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {priorities.map(prio => (
                            <option key={prio.value} value={prio.value}>
                              {prio.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="url">Enlace de Compra (Opcional)</Label>
                      <Input
                        id="url"
                        type="url"
                        value={formData.url}
                        onChange={(e) => setFormData({...formData, url: e.target.value})}
                        placeholder="https://..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="image">URL de Imagen (Opcional)</Label>
                      <Input
                        id="image"
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        placeholder="https://..."
                      />
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancelar
                      </Button>
                      <Button type="submit">
                        <Save className="h-4 w-4 mr-2" />
                        {editingItem ? 'Actualizar' : 'Agregar'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {registryItems.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Gift className="h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    No tienes artículos aún
                  </h3>
                  <p className="text-gray-600 mb-6 text-center max-w-md">
                    Comienza agregando artículos a tu lista de regalos para que tus invitados sepan qué regalarte
                  </p>
                  <Button onClick={() => setShowAddDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Primer Artículo
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {registryItems.map((item) => (
                  <Card key={item.id} className={`hover:shadow-md transition-shadow ${item.purchased ? 'opacity-75' : ''}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getCategoryIcon(item.category)}</span>
                          <Badge className={getPriorityColor(item.priority)}>
                            {getPriorityLabel(item.priority)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {item.image && (
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {item.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-lg font-semibold text-green-600">
                          ${item.price}
                        </div>
                        <Badge variant="outline">
                          {getCategoryLabel(item.category)}
                        </Badge>
                      </div>

                      {item.purchased ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-green-600">
                            <Check className="h-4 w-4" />
                            <span className="text-sm font-medium">Comprado</span>
                          </div>
                          {item.purchasedBy && (
                            <p className="text-sm text-gray-600">
                              Por: {item.purchasedBy}
                            </p>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleMarkPurchased(item.id)}
                          >
                            Marcar como No Comprado
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            {item.url && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1"
                                onClick={() => window.open(item.url, '_blank')}
                              >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Ver
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleMarkPurchased(item.id, 'Administrador')}
                            >
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Marcar Comprado
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Registro</CardTitle>
                <CardDescription>
                  Personaliza cómo se muestra tu lista de regalos a los invitados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="registryTitle">Título del Registro</Label>
                  <Input
                    id="registryTitle"
                    defaultValue="Lista de Regalos de Boda"
                    placeholder="Título personalizado"
                  />
                </div>

                <div>
                  <Label htmlFor="registryMessage">Mensaje Personal</Label>
                  <Textarea
                    id="registryMessage"
                    defaultValue="Tu presencia es el regalo más importante, pero si deseas obsequiarnos algo, aquí tienes algunas ideas."
                    placeholder="Mensaje para tus invitados"
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Mostrar precios</h3>
                    <p className="text-sm text-gray-600">Los invitados podrán ver los precios de los artículos</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Permitir contribuciones parciales</h3>
                    <p className="text-sm text-gray-600">Varios invitados pueden contribuir a un mismo regalo</p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Configuración
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Visitas al Registro</CardTitle>
                  <Eye className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">247</div>
                  <p className="text-xs text-gray-600">En los últimos 30 días</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Enlaces Compartidos</CardTitle>
                  <Share2 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-gray-600">Veces compartido</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Artículos Favoritos</CardTitle>
                  <Star className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-gray-600">Marcados como favoritos</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Artículos Más Populares</CardTitle>
                <CardDescription>
                  Los artículos que más han visto tus invitados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {registryItems.slice(0, 3).map((item, index) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-600 font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">{Math.floor(Math.random() * 50) + 10} visualizaciones</p>
                      </div>
                      <div className="text-lg font-semibold text-green-600">
                        ${item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Registry;
