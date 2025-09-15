import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { api } from '../lib/api';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import {
  Plus,
  Calendar,
  Users,
  Eye,
  MoreHorizontal,
  Copy,
  Edit,
  Trash2,
  CreditCard,
  Clock,
  Palette,
  FileText,
  BarChart3,
  Settings,
  Wand2,
  Image,
  Globe,
  CheckCircle,
  AlertCircle,
  UserCheck,
  TrendingUp,
  Heart,
  Mail
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

export function DashboardFixed() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    total_events: 0,
    published_events: 0,
    draft_events: 0,
    pending_payment: 0,
    total_guests: 0,
    confirmed_guests: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Cargar eventos del usuario
      const eventsResponse = await api.get('/events/my-events');
      const userEvents = eventsResponse.data?.events || eventsResponse.events || [];
      setEvents(userEvents);
      
      // Calcular estadísticas enfocadas en gestión de eventos
      const calculatedStats = {
        total_events: userEvents.length,
        published_events: userEvents.filter(e => e.status === 'PUBLISHED').length,
        draft_events: userEvents.filter(e => e.status === 'DRAFT' || e.status === 'READY').length,
        pending_payment: userEvents.filter(e => e.status === 'PENDING_PAYMENT').length,
        total_guests: userEvents.reduce((sum, e) => sum + (e.guest_count || 0), 0),
        confirmed_guests: userEvents.reduce((sum, e) => sum + (e.confirmed_count || 0), 0)
      };
      
      setStats(calculatedStats);
    } catch (error) {
      setError('Error al cargar los datos del dashboard');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no definida';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventStatus = (event) => {
    switch (event.status) {
      case 'DRAFT':
        return 'Borrador';
      case 'READY':
        return 'Listo';
      case 'PENDING_PAYMENT':
        return 'Pendiente de Pago';
      case 'PAID':
        return 'Pagado';
      case 'PUBLISHED':
        return 'Publicado';
      case 'CANCELLED':
        return 'Cancelado';
      default:
        return 'Desconocido';
    }
  };

  const getEventStatusColor = (event) => {
    switch (event.status) {
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800';
      case 'READY':
        return 'bg-blue-100 text-blue-800';
      case 'PENDING_PAYMENT':
        return 'bg-yellow-100 text-yellow-800';
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'PUBLISHED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventActions = (event) => {
    const actions = [];

    if (event.status === 'DRAFT' || event.status === 'READY') {
      actions.push({
        label: 'Editar',
        icon: Edit,
        onClick: () => navigate(`/app/events/${event.id}/builder`),
        variant: 'default'
      });
    }

    if (event.status === 'READY') {
      actions.push({
        label: 'Publicar',
        icon: CreditCard,
        onClick: () => navigate(`/app/events/${event.id}/builder`),
        variant: 'default'
      });
    }

    if (event.status === 'PENDING_PAYMENT') {
      actions.push({
        label: 'Ver Pago',
        icon: Clock,
        onClick: () => navigate(`/app/events/${event.id}/builder`),
        variant: 'outline'
      });
    }

    if (event.status === 'PAID') {
      actions.push({
        label: 'Finalizar',
        icon: CheckCircle,
        onClick: () => navigate(`/app/events/${event.id}/builder`),
        variant: 'default'
      });
    }

    if (event.status === 'PUBLISHED') {
      actions.push({
        label: 'Ver Público',
        icon: Eye,
        onClick: () => window.open(`/p/${event.slug}`, '_blank'),
        variant: 'outline'
      });
    }

    return actions;
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      try {
        await api.delete(`/events/${eventId}`);
        loadDashboardData();
      } catch (error) {
        console.error('Error al eliminar evento:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              ¡Hola, {user?.name || user?.username}!
            </h1>
            <p className="text-gray-600 mt-1">
              Gestiona tus invitaciones y eventos desde aquí
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate('/app/events/create')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Método Clásico
            </Button>
            <Button onClick={() => navigate('/app/events/wizard')}>
              <Wand2 className="h-4 w-4 mr-2" />
              Crear con Wizard
            </Button>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="events">Mis Eventos</TabsTrigger>
          <TabsTrigger value="designs">Diseños</TabsTrigger>
          <TabsTrigger value="guests">Invitados</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Estadísticas principales enfocadas en gestión de eventos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Eventos</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_events}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.published_events} publicados
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.draft_events + stats.pending_payment}</div>
                <p className="text-xs text-muted-foreground">
                  Borradores y pendientes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Invitados</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_guests}</div>
                <p className="text-xs text-muted-foreground">
                  En todos tus eventos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Confirmaciones</CardTitle>
                <UserCheck className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.confirmed_guests}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.total_guests > 0 ? Math.round((stats.confirmed_guests / stats.total_guests) * 100) : 0}% de confirmación
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Acciones rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>
                Herramientas más utilizadas para gestionar tus eventos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => navigate('/app/events/wizard')}
                >
                  <Wand2 className="h-6 w-6" />
                  <span>Crear Invitación</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => setActiveTab('designs')}
                >
                  <Palette className="h-6 w-6" />
                  <span>Ver Diseños</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2"
                  onClick={() => setActiveTab('guests')}
                >
                  <Users className="h-6 w-6" />
                  <span>Gestionar Invitados</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Eventos recientes */}
          <Card>
            <CardHeader>
              <CardTitle>Eventos Recientes</CardTitle>
              <CardDescription>
                Tus últimos eventos creados
              </CardDescription>
            </CardHeader>
            <CardContent>
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(event.event_date)} • {formatTime(event.event_date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getEventStatusColor(event)}>
                      {getEventStatus(event)}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/app/events/${event.id}/builder`)}
                    >
                      Ver
                    </Button>
                  </div>
                </div>
              ))}
              
              {events.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No tienes eventos aún</p>
                  <Button 
                    className="mt-4"
                    onClick={() => navigate('/app/events/wizard')}
                  >
                    Crear tu primer evento
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Mis Eventos</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => navigate('/app/events/create')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Método Clásico
              </Button>
              <Button onClick={() => navigate('/app/events/wizard')}>
                <Wand2 className="h-4 w-4 mr-2" />
                Wizard
              </Button>
            </div>
          </div>

          {events.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No tienes eventos aún
                </h3>
                <p className="text-gray-600 mb-6 text-center max-w-md">
                  Crea tu primera invitación web y comienza a gestionar tus eventos de manera profesional
                </p>
                <div className="flex gap-2">
                  <Button onClick={() => navigate('/app/events/wizard')}>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Crear con Wizard
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/app/events/create')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Método Clásico
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => {
                const actions = getEventActions(event);
                return (
                  <Card key={event.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {formatDate(event.event_date)} • {formatTime(event.event_date)}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getEventStatusColor(event)}>
                            {getEventStatus(event)}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => navigate(`/app/events/${event.id}/builder`)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigate(`/app/events/${event.id}/preview`)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Vista Previa
                              </DropdownMenuItem>
                              {event.status === 'PUBLISHED' && (
                                <DropdownMenuItem onClick={() => window.open(`/p/${event.slug}`, '_blank')}>
                                  <Globe className="h-4 w-4 mr-2" />
                                  Ver Público
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                onClick={() => handleDeleteEvent(event.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {event.description || 'Sin descripción'}
                        </p>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {event.guest_count || 0}
                            </span>
                            <span className="text-green-600">
                              {event.confirmed_count || 0} confirmados
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {event.template_id || 'classic'}
                          </span>
                        </div>

                        <div className="flex gap-2 pt-2">
                          {actions.map((action, index) => {
                            const Icon = action.icon;
                            return (
                              <Button
                                key={index}
                                variant={action.variant}
                                size="sm"
                                className="flex-1"
                                onClick={action.onClick}
                              >
                                <Icon className="h-4 w-4 mr-1" />
                                {action.label}
                              </Button>
                            );
                          })}
                          {actions.length === 0 && (
                            <Button
                              size="sm"
                              className="flex-1"
                              onClick={() => navigate(`/app/events/${event.id}/builder`)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Gestionar
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Designs Tab */}
        <TabsContent value="designs" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Diseños y Templates</h2>
            <Button onClick={() => navigate('/app/events/wizard')}>
              <Plus className="h-4 w-4 mr-2" />
              Usar Template
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Template Classic */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/app/events/wizard')}>
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                  <Palette className="h-12 w-12 text-blue-500" />
                </div>
                <CardTitle>Clásico</CardTitle>
                <CardDescription>
                  Diseño elegante y atemporal, perfecto para bodas y eventos formales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/app/events/wizard');
                    }}
                  >
                    Usar Template
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/demo/clasica');
                    }}
                  >
                    Vista Previa
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Template Elegant */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/app/events/wizard')}>
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg flex items-center justify-center">
                  <Heart className="h-12 w-12 text-purple-500" />
                </div>
                <CardTitle>Elegante</CardTitle>
                <CardDescription>
                  Estilo sofisticado y minimalista, ideal para eventos exclusivos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/app/events/wizard');
                    }}
                  >
                    Usar Template
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/demo/premium');
                    }}
                  >
                    Vista Previa
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Template Modern */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/app/events/wizard')}>
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-12 w-12 text-green-500" />
                </div>
                <CardTitle>Moderno</CardTitle>
                <CardDescription>
                  Diseño contemporáneo y vibrante, perfecto para eventos juveniles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/app/events/wizard');
                    }}
                  >
                    Usar Template
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/demo/black');
                    }}
                  >
                    Vista Previa
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Personalización */}
          <Card>
            <CardHeader>
              <CardTitle>Personalización Avanzada</CardTitle>
              <CardDescription>
                Herramientas para personalizar completamente tus invitaciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Palette className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="font-medium">Paletas de Colores</h3>
                    <p className="text-sm text-gray-600">Personaliza los colores de tu invitación</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <FileText className="h-8 w-8 text-green-500" />
                  <div>
                    <h3 className="font-medium">Tipografías</h3>
                    <p className="text-sm text-gray-600">Elige la fuente perfecta para tu evento</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Image className="h-8 w-8 text-purple-500" />
                  <div>
                    <h3 className="font-medium">Galería de Imágenes</h3>
                    <p className="text-sm text-gray-600">Agrega fotos y crea galerías</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <Settings className="h-8 w-8 text-gray-500" />
                  <div>
                    <h3 className="font-medium">Editor Visual</h3>
                    <p className="text-sm text-gray-600">Edición en tiempo real como Canva</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Guests Tab */}
        <TabsContent value="guests" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Gestión de Invitados</h2>
            <Button>
              <Mail className="h-4 w-4 mr-2" />
              Enviar Invitaciones
            </Button>
          </div>

          {/* Estadísticas de invitados */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Invitados</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_guests}</div>
                <p className="text-xs text-muted-foreground">
                  En todos tus eventos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
                <UserCheck className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.confirmed_guests}</div>
                <p className="text-xs text-muted-foreground">
                  Han confirmado asistencia
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasa de Confirmación</CardTitle>
                <BarChart3 className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.total_guests > 0 ? Math.round((stats.confirmed_guests / stats.total_guests) * 100) : 0}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Promedio de confirmación
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Lista de eventos con invitados */}
          <Card>
            <CardHeader>
              <CardTitle>Invitados por Evento</CardTitle>
              <CardDescription>
                Gestiona los invitados de cada uno de tus eventos
              </CardDescription>
            </CardHeader>
            <CardContent>
              {events.length > 0 ? (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(event.event_date)}
                        </p>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="font-medium">{event.guest_count || 0}</p>
                          <p className="text-gray-500">Invitados</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{event.confirmed_count || 0}</p>
                          <p className="text-gray-500">Confirmados</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">
                            {event.guest_count > 0 ? Math.round((event.confirmed_count / event.guest_count) * 100) : 0}%
                          </p>
                          <p className="text-gray-500">Tasa</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigate(`/app/events/${event.id}/guests`)}
                        >
                          Gestionar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No hay eventos para gestionar invitados</p>
                  <p className="text-sm text-gray-400">Crea un evento para comenzar a invitar personas</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DashboardFixed;
