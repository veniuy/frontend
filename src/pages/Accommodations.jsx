
import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Home, Plus, Trash2, Edit, Loader2, MapPin, Link as LinkIcon, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';

// Este componente ahora es un módulo dentro del DashboardImproved, no una página completa.
const Accommodations = ({ eventId }) => {
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAcc, setNewAcc] = useState({ name: '', address: '', link: '', notes: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (eventId) {
      loadAccommodations();
    }
  }, [eventId]);

  const loadAccommodations = async () => {
    setLoading(true);
    setError(null);
    try {
      // Usar el nuevo endpoint: /api/events/:eventId/accommodations
      const response = await api.get(`/events/${eventId}/accommodations`);
      setAccommodations(response.accommodations || []);
    } catch (err) {
      console.error('Error loading accommodations:', err);
      setError('Error al cargar la lista de alojamientos.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccommodation = async () => {
    if (!newAcc.name || !newAcc.address) {
      setError('El nombre y la dirección son obligatorios.');
      return;
    }
    setError(null);
    try {
      const response = await api.post(`/events/${eventId}/accommodations`, newAcc);
      setAccommodations([...accommodations, response.accommodation]);
      setNewAcc({ name: '', address: '', link: '', notes: '' });
    } catch (err) {
      console.error('Error adding accommodation:', err);
      setError('Error al agregar el alojamiento.');
    }
  };

  const handleDeleteAccommodation = async (accId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este alojamiento?')) return;
    try {
      await api.delete(`/events/${eventId}/accommodations/${accId}`);
      setAccommodations(accommodations.filter(a => a.id !== accId));
    } catch (err) {
      console.error('Error deleting accommodation:', err);
      setError('Error al eliminar el alojamiento.');
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
          <Home className="h-5 w-5" /> Gestión de Alojamientos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
          <Input
            placeholder="Nombre (Ej: Hotel Hilton)"
            value={newAcc.name}
            onChange={(e) => setNewAcc({ ...newAcc, name: e.target.value })}
          />
          <Input
            placeholder="Dirección"
            value={newAcc.address}
            onChange={(e) => setNewAcc({ ...newAcc, address: e.target.value })}
          />
          <Input
            placeholder="Link de Reserva (Opcional)"
            value={newAcc.link}
            onChange={(e) => setNewAcc({ ...newAcc, link: e.target.value })}
          />
        </div>
        <div className="flex gap-2 mb-4">
          <Textarea
            placeholder="Notas o Código de Descuento (Opcional)"
            value={newAcc.notes}
            onChange={(e) => setNewAcc({ ...newAcc, notes: e.target.value })}
            className="flex-1"
          />
          <Button onClick={handleAddAccommodation} className="self-start">
            <Plus className="h-4 w-4 mr-2" /> Agregar
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead>Link</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accommodations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  No hay alojamientos sugeridos aún.
                </TableCell>
              </TableRow>
            ) : (
              accommodations.map((acc) => (
                <TableRow key={acc.id}>
                  <TableCell>{acc.name}</TableCell>
                  <TableCell className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-500" /> {acc.address}
                  </TableCell>
                  <TableCell>
                    {acc.link && (
                      <a href={acc.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                        <LinkIcon className="h-4 w-4" /> Enlace
                      </a>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => console.log('Edit accommodation', acc.id)}>
                          <Edit className="h-4 w-4 mr-2" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteAccommodation(acc.id)} className="text-red-600">
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

export default Accommodations;

