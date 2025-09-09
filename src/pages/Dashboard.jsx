import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { apiClient } from '../lib/api';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
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
  Clock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import '../App.css';

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getEvents();
      setEvents(response.events);
    } catch (error) {
      setError('Error al cargar los eventos');
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
      case 'PENDING_PAYMENT':
        return 'Pendiente de Pago';
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
      case 'PENDING_PAYMENT':
        return 'bg-yellow-100 text-yellow-800';
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
    
    if (event.status === 'DRAFT') {
      actions.push({
        label: 'Publicar',
        icon: CreditCard,
        onClick: () => navigate(`/events/${event.id}/checkout`),
        variant: 'default'
      });
    }
    
    if (event.status === 'PENDING_PAYMENT') {
      actions.push({
        label: 'Ver Pago',
        icon: Clock,
        onClick: () => navigate(`/events/${event.id}/payment-status`),
        variant: 'outline'
      });
    }
    
    if (event.status === 'PUBLISHED') {
      actions.push({
        label: 'Ver Invitación',
        icon: Eye,
        onClick: () => window.open(`/invitations/${event.slug}`, '_blank'),
        variant: 'outline'
      });
    }
    
    return actions;
  };

  const handleDuplicateEvent = async (eventId) => {
    try {
      await apiClient.duplicateEvent(eventId);
      loadEvents(); // Recargar la lista
    } catch (error) {
      console.error('Error al duplicar evento:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      try {
        await apiClient.deleteEvent(eventId);
        loadEvents(); // Recargar la lista
      } catch (error) {
        console.error('Error al eliminar evento:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventStatusColor = (event) => {
    const eventDate = new Date(event.fecha_evento);
    const today = new Date();
    
    if (eventDate < today) {
      return 'bg-gray-100 text-gray-800';
    } else if (eventDate.toDateString() === today.toDateString()) {
      return 'bg-green-100 text-green-800';
    } else {
      return 'bg-blue-100 text-blue-800';
    }
  };

  const getEventStatus = (event) => {
    const eventDate = new Date(event.fecha_evento);
    const today = new Date();
    
    if (eventDate < today) {
      return 'Finalizado';
    } else if (eventDate.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else {
      return 'Próximo';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
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
          <Button onClick={() => navigate('/events/new')} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nueva Invitación
          </Button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Eventos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invitados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {events.reduce((total, event) => total + (event.stats?.total_guests || 0), 0)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {events.reduce((total, event) => total + (event.stats?.confirmed_guests || 0), 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de eventos */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tus Eventos</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {events.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tienes eventos aún
              </h3>
              <p className="text-gray-600 mb-4 text-center">
                Crea tu primera invitación y comienza a gestionar tus eventos
              </p>
              <Button onClick={() => navigate('/events/new')}>
                <Plus className="h-4 w-4 mr-2" />
                Crear Primera Invitación
              </Button>
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
                            <DropdownMenuItem onClick={() => navigate(`/events/${event.id}/edit`)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicateEvent(event.id)}>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicar
                            </DropdownMenuItem>
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
                            {event.stats?.total_guests || 0}
                          </span>
                          <span className="text-green-600">
                            {event.stats?.confirmed_guests || 0} confirmados
                          </span>
                        </div>
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
                            onClick={() => navigate(`/events/${event.id}/manage`)}
                          >
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
      </div>
    </div>
  );
}

export default Dashboard;
