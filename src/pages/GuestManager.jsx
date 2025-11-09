
import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Users, Plus, Trash2, Edit, Loader2, CheckCircle, XCircle, Clock, UserCheck, UserX, Download, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';

// Este componente ahora es un módulo dentro del DashboardImproved, no una página completa.
const GuestManager = ({ eventId }) => {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestEmail, setNewGuestEmail] = useState('');
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ total: 0, confirmed: 0, declined: 0, pending: 0 });

  useEffect(() => {
    if (eventId) {
      loadGuests();
    }
  }, [eventId]);

  const loadGuests = async () => {
    setLoading(true);
    setError(null);
    try {
      // Usar el nuevo endpoint: /api/events/:eventId/guests
      const response = await api.get(`/events/${eventId}/guests`);
      const loadedGuests = response.guests || [];
      setGuests(loadedGuests);
      calculateStats(loadedGuests);
    } catch (err) {
      console.error('Error loading guests:', err);
      setError('Error al cargar la lista de invitados.');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (guestList) => {
    const total = guestList.length;
    const confirmed = guestList.filter(g => g.status === 'CONFIRMED').length;
    const declined = guestList.filter(g => g.status === 'DECLINED').length;
    const pending = total - confirmed - declined;
    setStats({ total, confirmed, declined, pending });
  };

  const handleAddGuest = async () => {
    if (!newGuestName || !newGuestEmail) {
      setError('El nombre y el email son obligatorios.');
      return;
    }
    setError(null);
    try {
      const response = await api.post(`/events/${eventId}/guests`, {
        name: newGuestName,
        email: newGuestEmail,
        status: 'PENDING'
      });
      const newGuest = response.guest;
      const updatedGuests = [...guests, newGuest];
      setGuests(updatedGuests);
      calculateStats(updatedGuests);
      setNewGuestName('');
      setNewGuestEmail('');
    } catch (err) {
      console.error('Error adding guest:', err);
      setError('Error al agregar el invitado.');
    }
  };

  const handleDeleteGuest = async (guestId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar a este invitado?')) return;
    try {
      await api.delete(`/events/${eventId}/guests/${guestId}`);
      const updatedGuests = guests.filter(g => g.id !== guestId);
      setGuests(updatedGuests);
      calculateStats(updatedGuests);
    } catch (err) {
      console.error('Error deleting guest:', err);
      setError('Error al eliminar el invitado.');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'CONFIRMED': return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Confirmado</Badge>;
      case 'DECLINED': return <Badge variant="destructive">Declinado</Badge>;
      case 'PENDING': return <Badge variant="secondary">Pendiente</Badge>;
      default: return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" /> Gestión de Invitados
        </CardTitle>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <Card className="text-center p-2">
            <p className="text-xl font-bold">{stats.total}</p>
            <p className="text-sm text-gray-500">Total</p>
          </Card>
          <Card className="text-center p-2">
            <p className="text-xl font-bold text-green-600">{stats.confirmed}</p>
            <p className="text-sm text-gray-500">Confirmados</p>
          </Card>
          <Card className="text-center p-2">
            <p className="text-xl font-bold text-red-600">{stats.declined}</p>
            <p className="text-sm text-gray-500">Declinados</p>
          </Card>
          <Card className="text-center p-2">
            <p className="text-xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-sm text-gray-500">Pendientes</p>
          </Card>
        </div>
      </CardHeader>
      <CardContent>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Nombre del Invitado"
            value={newGuestName}
            onChange={(e) => setNewGuestName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email del Invitado"
            value={newGuestEmail}
            onChange={(e) => setNewGuestEmail(e.target.value)}
          />
          <Button onClick={handleAddGuest}>
            <Plus className="h-4 w-4 mr-2" /> Agregar
          </Button>
        </div>

        <div className="flex justify-end gap-2 mb-4">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Exportar</Button>
          <Button size="sm"><Send className="h-4 w-4 mr-2" /> Enviar Invitaciones</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  No hay invitados aún.
                </TableCell>
              </TableRow>
            ) : (
              guests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>{guest.name}</TableCell>
                  <TableCell>{guest.email}</TableCell>
                  <TableCell>{getStatusBadge(guest.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => console.log('Edit guest', guest.id)}>
                          <Edit className="h-4 w-4 mr-2" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteGuest(guest.id)} className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" /> Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default GuestManager;

