
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
  Gift,
  Home,
  Palette,
  LayoutDashboard,
  Trash2,
  Upload,
  MapPin,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';

// Placeholder components for modules
const GuestManager = ({ eventId }) => (
  <div className="p-4 border rounded-lg bg-slate-50">
    <h3 className="font-bold text-lg">Gestor de Invitados</h3>
    <p className="text-sm text-gray-600 mt-2">Módulo para gestionar los invitados del evento con ID: {eventId}. Funcionalidad completa por implementar.</p>
  </div>
);

const Accommodations = ({ eventId }) => (
  <div className="p-4 border rounded-lg bg-slate-50">
    <h3 className="font-bold text-lg">Alojamientos Sugeridos</h3>
    <p className="text-sm text-gray-600 mt-2">Módulo para gestionar alojamientos para el evento con ID: {eventId}. Funcionalidad completa por implementar.</p>
  </div>
);

const GiftRegistry = ({ eventId }) => (
  <div className="p-4 border rounded-lg bg-slate-50">
    <h3 className="font-bold text-lg">Lista de Regalos</h3>
    <p className="text-sm text-gray-600 mt-2">Módulo para gestionar la lista de regalos del evento con ID: {eventId}. Funcionalidad completa por implementar.</p>
  </div>
);

export function DashboardImproved() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedEventId, setSelectedEventId] = useState(() => {
    const eventId = searchParams.get('event');
    return eventId ? parseInt(eventId) : null;
  });

  const activeTab = searchParams.get('tab') || 'overview';
  const activeModule = searchParams.get('module') || 'overview';

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    // Update selectedEventId if URL param changes
    const eventIdFromUrl = searchParams.get('event');
    const newSelectedId = eventIdFromUrl ? parseInt(eventIdFromUrl) : null;
    if (newSelectedId !== selectedEventId) {
      setSelectedEventId(newSelectedId);
    }
  }, [searchParams]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [eventsResponse, statsResponse] = await Promise.all([
        api.get('/events'),
        api.get('/dashboard/stats')
      ]);

      const loadedEvents = eventsResponse.events || eventsResponse.data || [];
      setEvents(loadedEvents);
      setStats(statsResponse.data || {});

      // If there's an event ID in the URL, keep it. Otherwise, select the first one.
      if (!selectedEventId && loadedEvents.length > 0) {
        const firstEventId = loadedEvents[0].id;
        setSelectedEventId(firstEventId);
        // Update URL without navigating
        setSearchParams({ tab: activeTab, event: firstEventId, module: activeModule }, { replace: true });
      }

    } catch (err) {
      console.error('Error loading dashboard:', err);
      setError('Error al cargar los datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  const setActiveTab = (tab) => {
    setSearchParams({ tab, event: selectedEventId, module: 'overview' });
  };

  const setActiveModule = (moduleName) => {
    setSearchParams({ tab: activeTab, event: selectedEventId, module: moduleName });
  };

  const handleSelectEvent = (eventId) => {
    setSelectedEventId(eventId);
    setSearchParams({ tab: 'events', event: eventId, module: 'overview' });
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este evento?')) return;
    try {
      await api.delete(`/events/${eventId}`);
      setEvents(events.filter(e => e.id !== eventId));
      if (selectedEventId === eventId) {
        const remainingEvents = events.filter(e => e.id !== eventId);
        if (remainingEvents.length > 0) {
          handleSelectEvent(remainingEvents[0].id);
        } else {
          setSelectedEventId(null);
          setSearchParams({ tab: 'events' });
        }
      }
    } catch (err) {
      console.error('Error deleting event:', err);
      setError('Error al eliminar el evento.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Sin fecha';
    return new Date(dateString).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getEventStatusColor = (status) => {
    switch (status) {
      case 'PUBLISHED': return 'default';
      case 'DRAFT': return 'secondary';
      case 'PENDING_PAYMENT': return 'warning';
      default: return 'outline';
    }
  };

  const getEventStatus = (status) => {
    switch (status) {
      case 'PUBLISHED': return 'Publicado';
      case 'DRAFT': return 'Borrador';
      case 'PENDING_PAYMENT': return 'Pendiente Pago';
      default: return 'Inactivo';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Dashboard</h1>
        <Button onClick={() => navigate('/app/events/create')}>
          <Plus className="h-4 w-4 mr-2" />
          Crear Evento
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="events">Mis Eventos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Resumen General</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Aquí se mostrarán las estadísticas generales de todos tus eventos.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <div className="space-y-4">
            <div className="grid gap-4">
              {events.length === 0 ? (
                <Card className="p-6 text-center">
                  <p className="text-gray-500">Aún no tienes eventos creados.</p>
                  <Button onClick={() => navigate('/app/events/create')} className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Crear mi primer Evento
                  </Button>
                </Card>
              ) : (
                events.map(event => (
                  <Card
                    key={event.id}
                    className={`p-4 cursor-pointer transition-all ${selectedEventId === event.id ? 'border-2 border-blue-500 shadow-lg' : 'hover:shadow-md'}`}
                    onClick={() => handleSelectEvent(event.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col flex-1">
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(event.event_date)}
                        </CardDescription>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location || 'Ubicación no definida'}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge variant={getEventStatusColor(event.status)}>{getEventStatus(event.status)}</Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/app/events/${event.id}/editor`); }}>
                              <Palette className="h-4 w-4 mr-2" /> Editar Diseño
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigate(`/app/events/${event.id}/publish`); }}>
                              <Upload className="h-4 w-4 mr-2" /> Publicar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.id); }} className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" /> Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>

            {selectedEventId && (
              <Card className="p-4 sm:p-6 mt-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
                  <LayoutDashboard className="h-6 w-6" />
                  Gestionar Evento
                </h2>
                <Tabs value={activeModule} onValueChange={setActiveModule} className="space-y-4">
                  <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full">
                    <TabsTrigger value="guests"><Users className="h-4 w-4 mr-2" />Invitados</TabsTrigger>
                    <TabsTrigger value="accommodations"><Home className="h-4 w-4 mr-2" />Alojamientos</TabsTrigger>
                    <TabsTrigger value="gifts"><Gift className="h-4 w-4 mr-2" />Regalos</TabsTrigger>
                    <TabsTrigger value="editor"><Palette className="h-4 w-4 mr-2" />Editor</TabsTrigger>
                  </TabsList>

                  <TabsContent value="guests"><GuestManager eventId={selectedEventId} /></TabsContent>
                  <TabsContent value="accommodations"><Accommodations eventId={selectedEventId} /></TabsContent>
                  <TabsContent value="gifts"><GiftRegistry eventId={selectedEventId} /></TabsContent>
                  <TabsContent value="editor">
                    <div className="p-4 border rounded-lg text-center">
                      <h3 className="font-bold text-lg">Editor Visual</h3>
                      <p className="text-sm text-gray-600 my-2">Personaliza el diseño de tu invitación.</p>
                      <Button onClick={() => navigate(`/app/events/${selectedEventId}/editor`)}>
                        <Palette className="h-4 w-4 mr-2" />
                        Abrir Editor
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}


export default DashboardImproved;
