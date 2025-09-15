import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  Mail,
  Gift,
  Building,
  ClipboardList,
  Link as LinkIcon,
  Upload,
  Sparkles,
  MousePointer,
  Share2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';

export function DashboardImproved() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    total_events: 0,
    published_events: 0,
    draft_events: 0,
    pending_payment: 0,
    total_guests: 0,
    confirmed_guests: 0,
    pending_guests: 0,
    total_views: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener tab activo de URL params
  const activeTab = searchParams.get('tab') || 'overview';

  const setActiveTab = (tab) => {
    setSearchParams({ tab });
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [eventsResponse, statsResponse] = await Promise.all([
        api.get('/events'),
        api.get('/dashboard/stats')
      ]);
      
      setEvents(eventsResponse.data || []);
      setStats(statsResponse.data || stats);
    } catch (err) {
      console.error('Error loading dashboard:', err);
      setError('Error al cargar los datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este evento?')) return;
    
    try {
      await api.delete(`/events/${eventId}`);
      setEvents(events.filter(event => event.id !== eventId));
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventStatus = (event) => {
    if (event.status === 'PUBLISHED') return 'Publicado';
    if (event.status === 'DRAFT') return 'Borrador';
    if (event.status === 'PENDING_PAYMENT') return 'Pago Pendiente';
    return 'Desconocido';
  };

  const getEventStatusColor = (event) => {
    if (event.status === 'PUBLISHED') return 'bg-green-100 text-green-800';
    if (event.status === 'DRAFT') return 'bg-yellow-100 text-yellow-800';
    if (event.status === 'PENDING_PAYMENT') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  // Herramientas de personalización con navegación funcional
  const personalizationTools = [
    {
      icon: Palette,
      title: 'Paletas de Colores',
      description: 'Personaliza los colores de tu invitación',
      color: 'text-blue-500',
      action: () => navigate('/app/color-palette')
    },
    {
      icon: FileText,
      title: 'Tipografías',
      description: 'Elige la fuente perfecta para tu evento',
      color: 'text-green-500',
      action: () => navigate('/app/typography')
    },
    {
      icon: Image,
      title: 'Galería de Imágenes',
      description: 'Agrega fotos y crea galerías',
      color: 'text-purple-500',
      action: () => navigate('/app/gallery')
    },
    {
      icon: Settings,
      title: 'Editor Visual',
      description: 'Edición en tiempo real como Canva',
      color: 'text-gray-500',
      action: () => {
        if (events.length > 0) {
          navigate(`/app/events/${events[0].id}/editor`);
        } else {
          navigate('/app/events/wizard');
        }
      }
    }
  ];

  // Acciones rápidas mejoradas
  const quickActions = [
    {
      icon: Wand2,
      title: 'Crear Invitación',
      description: 'Usa nuestro wizard inteligente',
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => navigate('/app/events/wizard')
    },
    {
      icon: Eye,
      title: 'Ver Diseños',
      description: 'Explora templates disponibles',
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => setActiveTab('designs')
    },
    {
      icon: Users,
      title: 'Gestionar Invitados',
      description: 'Administra tu lista de invitados',
      color: 'bg-green-500 hover:bg-green-600',
      action: () => setActiveTab('guests')
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                ¡Hola, {user?.username}!
              </h1>
              <p className="text-gray-600 mt-1">
                Gestiona tus invitaciones y eventos desde aquí
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => navigate('/app/events/create')}
                className="hidden sm:flex"
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

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="events">Mis Eventos</TabsTrigger>
            <TabsTrigger value="designs">Diseños</TabsTrigger>
            <TabsTrigger value="guests">Invitados</TabsTrigger>
            <TabsTrigger value="analytics" className="hidden lg:flex">Analytics</TabsTrigger>
            <TabsTrigger value="tools" className="hidden lg:flex">Herramientas</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Eventos</CardTitle>
                  <Calendar className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total_events}</div>
                  <p className="text-xs text-gray-600">
                    {stats.published_events} publicados
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Invitados</CardTitle>
                  <Users className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total_guests}</div>
                  <p className="text-xs text-gray-600">
                    En todos tus eventos
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Confirmaciones</CardTitle>
                  <UserCheck className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.confirmed_guests}</div>
                  <p className="text-xs text-gray-600">
                    {stats.total_guests > 0 ? Math.round((stats.confirmed_guests / stats.total_guests) * 100) : 0}% de confirmación
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Visualizaciones</CardTitle>
                  <Eye className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total_views}</div>
                  <p className="text-xs text-gray-600">
                    Total de visitas
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>
                  Herramientas más utilizadas para gestionar tus eventos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <div
                        key={index}
                        onClick={action.action}
                        className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all duration-200 hover:border-blue-300"
                      >
                        <div className={`p-3 rounded-lg text-white ${action.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium">{action.title}</h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Events */}
            {events.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Eventos Recientes</CardTitle>
                  <CardDescription>
                    Tus últimos eventos creados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">{event.title}</h3>
                            <p className="text-sm text-gray-600">
                              {formatDate(event.event_date)} • {formatTime(event.event_date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getEventStatusColor(event)}>
                            {getEventStatus(event)}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/app/events/${event.id}/builder`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {events.length > 3 && (
                    <div className="mt-4 text-center">
                      <Button variant="outline" onClick={() => setActiveTab('events')}>
                        Ver todos los eventos
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
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
                {events.map((event) => (
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
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{event.guest_count || 0} invitados</span>
                        <span>{event.views || 0} vistas</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Template Classic */}
              <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/app/events/wizard')}>
                <CardHeader>
                  <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-12 w-12 text-blue-500" />
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

            {/* Personalización Avanzada */}
            <Card>
              <CardHeader>
                <CardTitle>Personalización Avanzada</CardTitle>
                <CardDescription>
                  Herramientas para personalizar completamente tus invitaciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {personalizationTools.map((tool, index) => {
                    const Icon = tool.icon;
                    return (
                      <div
                        key={index}
                        onClick={tool.action}
                        className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 hover:border-blue-300 transition-all duration-200"
                      >
                        <Icon className={`h-8 w-8 ${tool.color}`} />
                        <div>
                          <h3 className="font-medium">{tool.title}</h3>
                          <p className="text-sm text-gray-600">{tool.description}</p>
                        </div>
                        <MousePointer className="h-4 w-4 text-gray-400 ml-auto" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guests Tab */}
          <TabsContent value="guests" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Gestión de Invitados</h2>
              <Button onClick={() => navigate('/app/guest-manager')}>
                <Mail className="h-4 w-4 mr-2" />
                Gestionar Invitados
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
                  <p className="text-xs text-gray-600">En todos tus eventos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.confirmed_guests}</div>
                  <p className="text-xs text-gray-600">
                    {stats.total_guests > 0 ? Math.round((stats.confirmed_guests / stats.total_guests) * 100) : 0}% de confirmación
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pending_guests}</div>
                  <p className="text-xs text-gray-600">Sin respuesta aún</p>
                </CardContent>
              </Card>
            </div>

            {/* Acciones de invitados */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/app/guest-manager')}>
                <CardContent className="flex items-center gap-4 p-6">
                  <Users className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="font-medium">Gestionar Lista</h3>
                    <p className="text-sm text-gray-600">Administra tus invitados</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/app/custom-emails')}>
                <CardContent className="flex items-center gap-4 p-6">
                  <Mail className="h-8 w-8 text-green-500" />
                  <div>
                    <h3 className="font-medium">Enviar Invitaciones</h3>
                    <p className="text-sm text-gray-600">Emails personalizados</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/app/guest-surveys')}>
                <CardContent className="flex items-center gap-4 p-6">
                  <ClipboardList className="h-8 w-8 text-purple-500" />
                  <div>
                    <h3 className="font-medium">Encuestas</h3>
                    <p className="text-sm text-gray-600">Recopila información</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Analytics y Seguimiento</h2>
              <Button onClick={() => navigate('/app/tracking')}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Ver Detalles
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Visualizaciones</CardTitle>
                  <Eye className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total_views}</div>
                  <p className="text-xs text-gray-600">Total de visitas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasa de Apertura</CardTitle>
                  <Mail className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-gray-600">Emails abiertos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Compartidos</CardTitle>
                  <Share2 className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-gray-600">Veces compartido</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Conversión</CardTitle>
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">65%</div>
                  <p className="text-xs text-gray-600">Confirmaciones</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Herramientas</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalizationTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={tool.action}>
                    <CardContent className="flex items-center gap-4 p-6">
                      <Icon className={`h-8 w-8 ${tool.color}`} />
                      <div>
                        <h3 className="font-medium">{tool.title}</h3>
                        <p className="text-sm text-gray-600">{tool.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default DashboardImproved;
