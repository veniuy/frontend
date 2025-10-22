import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserManagement from '@/components/UserManagement';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Download,
  Crown,
  Shield,
  Activity
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'https://backend-xtqe.onrender.com';

const api = (path, options = {}) =>
  fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options,
  });

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardStats, setDashboardStats] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [userDesigns, setUserDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [newTemplate, setNewTemplate] = useState({
    key: '',
    name: '',
    description: '',
    category: '',
    is_premium: false,
    is_active: true,
    sort_order: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, templatesRes] = await Promise.all([
        api('/api/admin/dashboard/stats'),
        api('/api/admin/templates')
        // TODO: Agregar api('/api/admin/user-designs') cuando exista en backend
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setDashboardStats(statsData.stats);
      }
      if (templatesRes.ok) {
        const templatesData = await templatesRes.json();
        setTemplates(templatesData.templates || []);
      }
      // TODO: Cargar user designs cuando exista el endpoint
      // if (designsRes.ok) {
      //   const designsData = await designsRes.json();
      //   setUserDesigns(designsData.designs || []);
      // }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTemplate = async () => {
    try {
      const response = await api('/api/admin/admin/templates', {
        method: 'POST',
        body: JSON.stringify(newTemplate),
      });
      if (response.ok) {
        setNewTemplate({
          key: '',
          name: '',
          description: '',
          category: '',
          is_premium: false,
          is_active: true,
          sort_order: 0
        });
        loadDashboardData();
      }
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  const handleDeleteTemplate = async (templateId) => {
    try {
      const response = await api(`/api/admin/templates/${templateId}`, {
        method: 'DELETE',
      });
      if (response.ok) loadDashboardData();
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  const filteredTemplates = templates.filter((template) =>
    (template.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (template.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <Badge variant="outline" className="flex items-center">
          <Shield className="w-4 h-4 mr-2" />
          Administrador
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Eventos
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Plantillas
          </TabsTrigger>
          <TabsTrigger value="designs" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Diseños
          </TabsTrigger>
        </TabsList>

        {/* Dashboard */}
        <TabsContent value="dashboard" className="space-y-6">
          {dashboardStats && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.users.total}</div>
                    <p className="text-xs text-muted-foreground">+{dashboardStats.users.new_30d} en los últimos 30 días</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Usuarios Premium</CardTitle>
                    <Crown className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.users.premium}</div>
                    <p className="text-xs text-muted-foreground">
                      {((dashboardStats.users.premium / dashboardStats.users.total) * 100).toFixed(1)}% del total
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Plantillas Activas</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.templates.active}</div>
                    <p className="text-xs text-muted-foreground">{dashboardStats.templates.premium} premium</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Diseños Publicados</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats.designs.published}</div>
                    <p className="text-xs text-muted-foreground">+{dashboardStats.designs.new_30d} nuevos este mes</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Plantillas Más Populares</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardStats.popular_templates.map((template, index) => (
                        <div key={template.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{template.name}</p>
                            <p className="text-sm text-muted-foreground">{template.category}</p>
                          </div>
                          <Badge variant="outline">#{index + 1}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Usuarios Más Activos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardStats.active_users.map((user) => (
                        <div key={user.user_id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{user.username}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <Badge variant="outline">{user.design_count} diseños</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        {/* Users */}
        <TabsContent value="users" className="space-y-6">
          <UserManagement />
        </TabsContent>

        {/* Templates */}
        <TabsContent value="templates" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <Input
                placeholder="Buscar plantillas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Plantilla
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Crear Nueva Plantilla</DialogTitle>
                  <DialogDescription>
                    Añade una nueva plantilla al sistema de editor.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="template-key">Clave</Label>
                    <Input
                      id="template-key"
                      value={newTemplate.key}
                      onChange={(e) => setNewTemplate({ ...newTemplate, key: e.target.value })}
                      placeholder="wedding-elegant"
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-name">Nombre</Label>
                    <Input
                      id="template-name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                      placeholder="Boda Elegante"
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-description">Descripción</Label>
                    <Textarea
                      id="template-description"
                      value={newTemplate.description}
                      onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                      placeholder="Descripción de la plantilla..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-category">Categoría</Label>
                    <Select
                      value={newTemplate.category}
                      onValueChange={(value) => setNewTemplate({ ...newTemplate, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding">Boda</SelectItem>
                        <SelectItem value="quince">Quinceañera</SelectItem>
                        <SelectItem value="kids">Infantil</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="template-premium">Premium</Label>
                    <Switch
                      id="template-premium"
                      checked={newTemplate.is_premium}
                      onCheckedChange={(checked) => setNewTemplate({ ...newTemplate, is_premium: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="template-active">Activa</Label>
                    <Switch
                      id="template-active"
                      checked={newTemplate.is_active}
                      onCheckedChange={(checked) => setNewTemplate({ ...newTemplate, is_active: checked })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-sort">Orden</Label>
                    <Input
                      id="template-sort"
                      type="number"
                      value={newTemplate.sort_order}
                      onChange={(e) => setNewTemplate({ ...newTemplate, sort_order: parseInt(e.target.value, 10) || 0 })}
                    />
                  </div>
                </div>
                <Button onClick={handleCreateTemplate} className="w-full mt-4">Crear Plantilla</Button>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plantilla</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Orden</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{template.name}</p>
                          <p className="text-sm text-muted-foreground">{template.key}</p>
                        </div>
                      </TableCell>
                      <TableCell>{template.category}</TableCell>
                      <TableCell>
                        <Badge variant={template.is_premium ? 'default' : 'secondary'}>
                          {template.is_premium ? 'Premium' : 'Estándar'}
                        </Badge>
                        <Badge variant={template.is_active ? 'default' : 'secondary'} className="ml-2">
                          {template.is_active ? 'Activa' : 'Inactiva'}
                        </Badge>
                      </TableCell>
                      <TableCell>{template.sort_order}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar plantilla?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción desactivará la plantilla. No se podrá deshacer.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteTemplate(template.id)}>
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Designs */}
        <TabsContent value="designs" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <Input
                placeholder="Buscar diseños..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Diseño</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Plantilla</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Última Modificación</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userDesigns.map((design) => (
                    <TableRow key={design.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{design.design_name}</p>
                          <p className="text-sm text-muted-foreground">ID: {design.id}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {design.user ? (
                          <div>
                            <p className="font-medium">{design.user.username}</p>
                            <p className="text-sm text-muted-foreground">{design.user.email}</p>
                          </div>
                        ) : (
                          'Usuario eliminado'
                        )}
                      </TableCell>
                      <TableCell>
                        {design.template ? design.template.name : 'Diseño personalizado'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={design.is_published ? 'default' : 'secondary'}>
                          {design.is_published ? 'Publicado' : 'Borrador'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {design.last_saved_at ? new Date(design.last_saved_at).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default AdminDashboard;
