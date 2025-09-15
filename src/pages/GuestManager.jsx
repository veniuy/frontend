import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Textarea } from '../components/ui/textarea';
import {
  ArrowLeft,
  Plus,
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Check,
  X,
  Clock,
  Download,
  Upload,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Send,
  Copy,
  UserCheck,
  UserX,
  FileText,
  Share2,
  QrCode,
  Heart,
  Gift
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { api } from '../lib/api';

const GuestManager = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estado del evento y invitados
  const [event, setEvent] = useState(null);
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado del formulario
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGuest, setEditingGuest] = useState(null);
  const [newGuest, setNewGuest] = useState({
    name: '',
    email: '',
    phone: '',
    group: '',
    notes: '',
    plus_ones: 0
  });
  
  // Estado de filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterGroup, setFilterGroup] = useState('all');
  
  // Estado de estadísticas
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    declined: 0,
    pending: 0,
    plus_ones: 0
  });

  useEffect(() => {
    if (id) {
      loadEventAndGuests();
    }
  }, [id]);

  useEffect(() => {
    calculateStats();
  }, [guests]);

  const loadEventAndGuests = async () => {
    try {
      setLoading(true);
      
      // Cargar evento
      const eventResponse = await api.get(`/events/${id}`);
      setEvent(eventResponse.data || eventResponse);
      
      // Cargar invitados (simulado por ahora)
      const mockGuests = [
        {
          id: 1,
          name: 'Ana García',
          email: 'ana@email.com',
          phone: '+598 99 123 456',
          group: 'Familia',
          status: 'confirmed',
          plus_ones: 1,
          notes: 'Vegetariana',
          invited_at: '2024-01-15',
          responded_at: '2024-01-16'
        },
        {
          id: 2,
          name: 'Carlos López',
          email: 'carlos@email.com',
          phone: '+598 99 654 321',
          group: 'Amigos',
          status: 'pending',
          plus_ones: 0,
          notes: '',
          invited_at: '2024-01-15',
          responded_at: null
        },
        {
          id: 3,
          name: 'María Rodríguez',
          email: 'maria@email.com',
          phone: '+598 99 789 123',
          group: 'Trabajo',
          status: 'declined',
          plus_ones: 0,
          notes: 'No puede asistir por viaje',
          invited_at: '2024-01-15',
          responded_at: '2024-01-17'
        }
      ];
      
      setGuests(mockGuests);
      
    } catch (err) {
      setError('Error cargando datos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const total = guests.length;
    const confirmed = guests.filter(g => g.status === 'confirmed').length;
    const declined = guests.filter(g => g.status === 'declined').length;
    const pending = guests.filter(g => g.status === 'pending').length;
    const plus_ones = guests.reduce((sum, g) => sum + (g.plus_ones || 0), 0);
    
    setStats({ total, confirmed, declined, pending, plus_ones });
  };

  const handleAddGuest = () => {
    if (!newGuest.name || !newGuest.email) {
      setError('Nombre y email son requeridos');
      return;
    }
    
    const guest = {
      id: Date.now(),
      ...newGuest,
      status: 'pending',
      invited_at: new Date().toISOString().split('T')[0],
      responded_at: null
    };
    
    setGuests([...guests, guest]);
    setNewGuest({
      name: '',
      email: '',
      phone: '',
      group: '',
      notes: '',
      plus_ones: 0
    });
    setShowAddForm(false);
  };

  const handleEditGuest = (guest) => {
    setEditingGuest(guest);
    setNewGuest({ ...guest });
    setShowAddForm(true);
  };

  const handleUpdateGuest = () => {
    setGuests(guests.map(g => 
      g.id === editingGuest.id ? { ...newGuest } : g
    ));
    setEditingGuest(null);
    setNewGuest({
      name: '',
      email: '',
      phone: '',
      group: '',
      notes: '',
      plus_ones: 0
    });
    setShowAddForm(false);
  };

  const handleDeleteGuest = (guestId) => {
    if (window.confirm('¿Estás seguro de eliminar este invitado?')) {
      setGuests(guests.filter(g => g.id !== guestId));
    }
  };

  const handleStatusChange = (guestId, newStatus) => {
    setGuests(guests.map(g => 
      g.id === guestId 
        ? { 
            ...g, 
            status: newStatus,
            responded_at: new Date().toISOString().split('T')[0]
          }
        : g
    ));
  };

  const sendInvitation = (guest) => {
    // Simular envío de invitación
    console.log('Sending invitation to:', guest.email);
    alert(`Invitación enviada a ${guest.name}`);
  };

  const sendBulkInvitations = () => {
    const pendingGuests = guests.filter(g => g.status === 'pending');
    console.log('Sending bulk invitations to:', pendingGuests.length, 'guests');
    alert(`Invitaciones enviadas a ${pendingGuests.length} invitados`);
  };

  const exportGuestList = () => {
    // Simular exportación
    const csvContent = guests.map(g => 
      `${g.name},${g.email},${g.phone},${g.group},${g.status},${g.plus_ones}`
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invitados-${event?.title || 'evento'}.csv`;
    a.click();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <UserCheck className="w-4 h-4" />;
      case 'declined':
        return <UserX className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || guest.status === filterStatus;
    const matchesGroup = filterGroup === 'all' || guest.group === filterGroup;
    
    return matchesSearch && matchesStatus && matchesGroup;
  });

  const uniqueGroups = [...new Set(guests.map(g => g.group).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando invitados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate(`/app/events/${id}/builder`)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Editor
            </Button>
            
            <div>
              <h1 className="text-2xl font-bold">{event?.title}</h1>
              <p className="text-gray-600">Gestión de Invitados</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={exportGuestList}>
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            
            <Button onClick={sendBulkInvitations}>
              <Send className="w-4 h-4 mr-2" />
              Enviar Invitaciones
            </Button>
            
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar Invitado
            </Button>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="mx-6 mt-4 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      <div className="p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="guests">Lista de Invitados</TabsTrigger>
            <TabsTrigger value="invitations">Invitaciones</TabsTrigger>
            <TabsTrigger value="analytics">Analíticas</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Invitados</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
                  <UserCheck className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.total > 0 ? Math.round((stats.confirmed / stats.total) * 100) : 0}%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Declinaron</CardTitle>
                  <UserX className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{stats.declined}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.total > 0 ? Math.round((stats.declined / stats.total) * 100) : 0}%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0}%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Acompañantes</CardTitle>
                  <Heart className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{stats.plus_ones}</div>
                  <p className="text-xs text-muted-foreground">
                    Total asistentes: {stats.confirmed + stats.plus_ones}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Gráfico de confirmaciones por grupo */}
            <Card>
              <CardHeader>
                <CardTitle>Confirmaciones por Grupo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uniqueGroups.map(group => {
                    const groupGuests = guests.filter(g => g.group === group);
                    const confirmed = groupGuests.filter(g => g.status === 'confirmed').length;
                    const total = groupGuests.length;
                    const percentage = total > 0 ? (confirmed / total) * 100 : 0;
                    
                    return (
                      <div key={group} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{group || 'Sin grupo'}</span>
                          <Badge variant="outline">{total} invitados</Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {confirmed}/{total} ({Math.round(percentage)}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Acciones rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={() => setShowAddForm(true)}
                  >
                    <Plus className="h-6 w-6" />
                    <span>Agregar Invitados</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={sendBulkInvitations}
                  >
                    <Send className="h-6 w-6" />
                    <span>Enviar Invitaciones</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2"
                    onClick={exportGuestList}
                  >
                    <Download className="h-6 w-6" />
                    <span>Exportar Lista</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guests Tab */}
          <TabsContent value="guests" className="space-y-6">
            {/* Filtros y búsqueda */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Buscar por nombre o email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="all">Todos los estados</option>
                    <option value="confirmed">Confirmados</option>
                    <option value="declined">Declinaron</option>
                    <option value="pending">Pendientes</option>
                  </select>
                  
                  <select
                    value={filterGroup}
                    onChange={(e) => setFilterGroup(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="all">Todos los grupos</option>
                    {uniqueGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Lista de invitados */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Lista de Invitados ({filteredGuests.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredGuests.map((guest) => (
                    <div key={guest.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {guest.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        
                        <div>
                          <h3 className="font-medium">{guest.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {guest.email}
                            </span>
                            {guest.phone && (
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {guest.phone}
                              </span>
                            )}
                            {guest.group && (
                              <Badge variant="outline" className="text-xs">
                                {guest.group}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(guest.status)}>
                          {getStatusIcon(guest.status)}
                          <span className="ml-1 capitalize">{guest.status}</span>
                        </Badge>
                        
                        {guest.plus_ones > 0 && (
                          <Badge variant="outline">
                            +{guest.plus_ones}
                          </Badge>
                        )}
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditGuest(guest)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => sendInvitation(guest)}>
                              <Send className="w-4 h-4 mr-2" />
                              Enviar Invitación
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(guest.id, 'confirmed')}>
                              <UserCheck className="w-4 h-4 mr-2" />
                              Marcar Confirmado
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(guest.id, 'declined')}>
                              <UserX className="w-4 h-4 mr-2" />
                              Marcar Declinado
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteGuest(guest.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                  
                  {filteredGuests.length === 0 && (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No se encontraron invitados</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invitations Tab */}
          <TabsContent value="invitations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Invitaciones</CardTitle>
                <p className="text-sm text-gray-600">
                  Personaliza y envía invitaciones a tus invitados
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Mensaje de Invitación</Label>
                  <Textarea
                    placeholder="Personaliza el mensaje que acompañará tu invitación..."
                    rows={4}
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="h-20 flex-col gap-2">
                    <QrCode className="h-6 w-6" />
                    <span>Generar Códigos QR</span>
                  </Button>
                  
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Share2 className="h-6 w-6" />
                    <span>Compartir Enlace</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analíticas de Invitados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Analíticas detalladas próximamente</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal para agregar/editar invitado */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>
                {editingGuest ? 'Editar Invitado' : 'Agregar Invitado'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Nombre *</Label>
                <Input
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({...newGuest, name: e.target.value})}
                  placeholder="Nombre completo"
                />
              </div>
              
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={newGuest.email}
                  onChange={(e) => setNewGuest({...newGuest, email: e.target.value})}
                  placeholder="email@ejemplo.com"
                />
              </div>
              
              <div>
                <Label>Teléfono</Label>
                <Input
                  value={newGuest.phone}
                  onChange={(e) => setNewGuest({...newGuest, phone: e.target.value})}
                  placeholder="+598 99 123 456"
                />
              </div>
              
              <div>
                <Label>Grupo</Label>
                <Input
                  value={newGuest.group}
                  onChange={(e) => setNewGuest({...newGuest, group: e.target.value})}
                  placeholder="Familia, Amigos, Trabajo..."
                />
              </div>
              
              <div>
                <Label>Acompañantes</Label>
                <Input
                  type="number"
                  min="0"
                  value={newGuest.plus_ones}
                  onChange={(e) => setNewGuest({...newGuest, plus_ones: parseInt(e.target.value) || 0})}
                />
              </div>
              
              <div>
                <Label>Notas</Label>
                <Textarea
                  value={newGuest.notes}
                  onChange={(e) => setNewGuest({...newGuest, notes: e.target.value})}
                  placeholder="Alergias, preferencias, etc."
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingGuest(null);
                    setNewGuest({
                      name: '',
                      email: '',
                      phone: '',
                      group: '',
                      notes: '',
                      plus_ones: 0
                    });
                  }}
                >
                  Cancelar
                </Button>
                <Button 
                  className="flex-1"
                  onClick={editingGuest ? handleUpdateGuest : handleAddGuest}
                >
                  {editingGuest ? 'Actualizar' : 'Agregar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GuestManager;
