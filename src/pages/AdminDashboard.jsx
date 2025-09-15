// src/pages/AdminDashboard.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { api } from '../lib/api'; // usa el cliente que envía cookies y baseURL /api

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardStats, setDashboardStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [userDesigns, setUserDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // form estado para nueva plantilla
  const [newTemplate, setNewTemplate] = useState({
    key: '',
    name: '',
    description: '',
    category: '',
    is_premium: false,
    is_active: true,
    sort_order: 0
  });

  // helper: intenta GET y no rompe si 401/403/404
  const safeGet = useCallback(async (endpoint) => {
    try {
      return await api.get(endpoint);
    } catch (e) {
      if ([401, 403, 404].includes(e?.status)) return null;
      console.error('API error', endpoint, e);
      return null;
    }
  }, []);

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      // Stats: endpoint confirmado /api/admin/dashboard/stats
      const statsData = await api.getAdminStats();
      // Acepta tanto {stats: {...}} como {...}
      setDashboardStats(statsData?.stats || statsData || null);

      // Los siguientes pueden no existir aún en backend. Se tolera null.
      const usersData = await safeGet('/admin/users');
      setUsers(usersData?.users || usersData || []);

      const templatesData = await safeGet('/admin/templates');
      setTemplates(templatesData?.templates || templatesData || []);

      const designsData = await safeGet('/admin/user-designs');
      setUserDesigns(designsData?.designs || designsData || []);
    } finally {
      setLoading(false);
    }
  }, [safeGet]);

  useEffect(() => { loadDashboardData(); }, [loadDashboardData]);

  const handleUpdateUserSubscription = async (userId, newSubscription) => {
    try {
      await api.put(`/admin/users/${userId}/subscription`, { tipo_suscripcion: newSubscription });
      loadDashboardData();
    } catch (e) {
      console.error('Error updating user subscription:', e);
    }
  };

  const handleToggleUserStatus = async (userId) => {
    try {
      await api.put(`/admin/users/${userId}/toggle-status`);
      loadDashboardData();
    } catch (e) {
      console.error('Error toggling user status:', e);
    }
  };

  const handleCreateTemplate = async () => {
    try {
      const payload = { ...newTemplate };
      await api.post('/admin/templates', payload);
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
    } catch (e) {
      console.error('Error creating template:', e);
    }
  };

  const handleDeleteTemplate = async (templateId) => {
    try {
      await api.delete(`/admin/templates/${templateId}`);
      loadDashboardData();
    } catch (e) {
      console.error('Error deleting template:', e);
    }
  };

  const getSubscriptionBadge = (subscription) => {
    const variants = {
      gratuita: 'secondary',
      premium: 'default',
      admin: 'destructive'
    };
    const icons = {
      gratuita: null,
      premium: <Crown className="w-3 h-3 mr-1" />,
      admin: <Shield className="w-3 h-3 mr-1" />
    };
    return (
      <Badge variant={variants[subscription] || 'secondary'} className="flex items-center">
        {icons[subscription]}
        {subscription}
      </Badge>
    );
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      [user?.username, user?.email, user?.nombre_completo]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [users, searchTerm]);

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) =>
      [template?.name, template?.category]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [templates, searchTerm]);

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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2" disabled={!users?.length}>
            <Users className="w-4 h-4" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2" disabled={!templates?.length}>
            <FileText className="w-4 h-4" />
            Plantillas
          </TabsTrigger>
          <TabsTrigger value="designs" className="flex items-center gap-2" disabled={!userDesigns?.length}>
            <Settings className="w-4 h-4" />
            Diseños
          </TabsTrigger>
        </TabsList>

        {/* DASHBOARD */}
        <TabsContent value="dashboard" className="space-y-6">
          {!dashboardStats ? (
            <Card>
              <CardHeader>
                <CardTitle>Sin datos</CardTitle>
                <CardDescription>No se recibieron estadísticas del backend.</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats?.users?.total ?? 0}</div>
                    <p className="text-xs text-muted-foreground">
                      +{dashboardStats?.users?.new_30d ?? 0} en los últimos 30 días
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Usuarios Premium</CardTitle>
                    <Crown className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats?.users?.premium ?? 0}</div>
                    <p className="text-xs text-muted-foreground">
                      {dashboardStats?.users?.total
                        ? `${((dashboardStats.users.premium / dashboardStats.users.total) * 100).toFixed(1)}% del total`
                        : '0% del total'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Plantillas Activas</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats?.templates?.active ?? 0}</div>
                    <p className="text-xs text-muted-foreground">
                      {dashboardStats?.templates?.premium ?? 0} premium
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Diseños Publicados</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats?.designs?.published ?? 0}</div>
                    <p className="text-xs text-muted-foreground">
                      +{dashboardStats?.designs?.new_30d ?? 0} nuevos este mes
                    </p>
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
                      {(dashboardStats?.popular_templates || []).map((template, index) => (
                        <div key={template.id ?? index} className="flex items-center justify-between">
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
                      {(dashboardStats?.active_users || []).map((u, index) => (
                        <div key={u.user_id ?? index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{u.username}</p>
                            <p className="text-sm text-muted-foreground">{u.email}</p>
                          </div>
                          <Badge variant="outline">{u.design_count} diseños</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        {/* USERS */}
        <TabsContent value="users" className="space-y-6">
          {!users?.length ? (
            <Card>
              <CardHeader>
                <CardTitle>Usuarios</CardTitle>
                <CardDescription>No disponible en el backend (aún).</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4" />
                  <Input
                    placeholder="Buscar usuarios..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuario</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Suscripción</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Estadísticas</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{user.username}</p>
                              <p className="text-sm text-muted-foreground">{user.nombre_completo}</p>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{getSubscriptionBadge(user.tipo_suscripcion)}</TableCell>
                          <TableCell>
                            <Badge variant={user.activo ? 'default' : 'secondary'}>
                              {user.activo ? 'Activo' : 'Inactivo'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>{user.stats?.total_events || 0} eventos</p>
                              <p>{user.stats?.total_designs || 0} diseños</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Select
                                value={user.tipo_suscripcion}
                                onValueChange={(value) => handleUpdateUserSubscription(user.id, value)}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="gratuita">Gratuita</SelectItem>
                                  <SelectItem value="premium">Premium</SelectItem>
                                  <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button variant="outline" size="sm" onClick={() => handleToggleUserStatus(user.id)}>
                                {user.activo ? 'Desactivar' : 'Activar'}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* TEMPLATES */}
        <TabsContent value="templates" className="space-y-6">
          {!templates?.length ? (
            <Card>
              <CardHeader>
                <CardTitle>Plantillas</CardTitle>
                <CardDescription>No disponible en el backend (aún).</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <>
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
                      <DialogDescription>Añade una nueva plantilla al sistema de editor.</DialogDescription>
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
                            <SelectItem value="birthday">Cumpleaños</SelectItem>
                            <SelectItem value="quince">Quinceañera</SelectItem>
                            <SelectItem value="corporate">Corporativo</SelectItem>
                            <SelectItem value="kids">Infantil</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="template-premium"
                          checked={newTemplate.is_premium}
                          onCheckedChange={(checked) => setNewTemplate({ ...newTemplate, is_premium: checked })}
                        />
                        <Label htmlFor="template-premium">Plantilla Premium</Label>
                      </div>
                      <Button onClick={handleCreateTemplate} className="w-full">
                        Crear Plantilla
                      </Button>
                    </div>
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
                        <TableHead>Tipo</TableHead>
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
                          <TableCell>
                            <Badge variant="outline">{template.category}</Badge>
                          </TableCell>
                          <TableCell>
                            {template.is_premium ? (
                              <Badge className="flex items-center w-fit">
                                <Crown className="w-3 h-3 mr-1" />
                                Premium
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Gratuita</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={template.is_active ? 'default' : 'secondary'}>
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
            </>
          )}
        </TabsContent>

        {/* DESIGNS */}
        <TabsContent value="designs" className="space-y-6">
          {!userDesigns?.length ? (
            <Card>
              <CardHeader>
                <CardTitle>Diseños</CardTitle>
                <CardDescription>No disponible en el backend (aún).</CardDescription>
              </CardHeader>
            </Card>
          ) : (
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
                        <TableCell>{design.template ? design.template.name : 'Diseño personalizado'}</TableCell>
                        <TableCell>
                          <Badge variant={design.is_published ? 'default' : 'secondary'}>
                            {design.is_published ? 'Publicado' : 'Borrador'}
                          </Badge>
                        </TableCell>
                        <TableCell>{design.last_saved_at ? new Date(design.last_saved_at).toLocaleDateString() : '-'}</TableCell>
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
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button variant="outline" onClick={loadDashboardData}>Actualizar</Button>
      </div>
    </div>
  );
};

export default AdminDashboard;

