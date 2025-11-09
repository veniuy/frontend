
import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Gift, Plus, Trash2, Edit, Loader2, Link as LinkIcon, DollarSign, CheckCircle, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Badge } from '../components/ui/badge';

const GiftRegistry = ({ eventId }) => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newGift, setNewGift] = useState({ name: '', link: '', price: '', reserved: false });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (eventId) {
      loadGifts();
    }
  }, [eventId]);

  const loadGifts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Usar el nuevo endpoint: /api/events/:eventId/gifts
      const response = await api.get(`/events/${eventId}/gifts`);
      setGifts(response.gifts || []);
    } catch (err) {
      console.error('Error loading gifts:', err);
      setError('Error al cargar la lista de regalos.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddGift = async () => {
    if (!newGift.name || !newGift.link) {
      setError('El nombre y el link son obligatorios.');
      return;
    }
    setError(null);
    try {
      const response = await api.post(`/events/${eventId}/gifts`, newGift);
      setGifts([...gifts, response.gift]);
      setNewGift({ name: '', link: '', price: '', reserved: false });
    } catch (err) {
      console.error('Error adding gift:', err);
      setError('Error al agregar el regalo.');
    }
  };

  const handleDeleteGift = async (giftId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este regalo?')) return;
    try {
      await api.delete(`/events/${eventId}/gifts/${giftId}`);
      setGifts(gifts.filter(g => g.id !== giftId));
    } catch (err) {
      console.error('Error deleting gift:', err);
      setError('Error al eliminar el regalo.');
    }
  };

  const handleToggleReserved = async (gift) => {
    try {
      const updatedGift = { ...gift, reserved: !gift.reserved };
      // Asumiendo que hay un endpoint PUT para actualizar el regalo
      await api.put(`/events/${eventId}/gifts/${gift.id}`, updatedGift);
      setGifts(gifts.map(g => g.id === gift.id ? updatedGift : g));
    } catch (err) {
      console.error('Error updating gift status:', err);
      setError('Error al actualizar el estado del regalo.');
    }
  };

  const totalGifts = gifts.length;
  const reservedGifts = gifts.filter(g => g.reserved).length;
  const remainingGifts = totalGifts - reservedGifts;

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
          <Gift className="h-5 w-5" /> Gestión de Lista de Regalos
        </CardTitle>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Card className="text-center p-2">
            <p className="text-xl font-bold">{totalGifts}</p>
            <p className="text-sm text-gray-500">Total Regalos</p>
          </Card>
          <Card className="text-center p-2">
            <p className="text-xl font-bold text-green-600">{reservedGifts}</p>
            <p className="text-sm text-gray-500">Reservados</p>
          </Card>
          <Card className="text-center p-2">
            <p className="text-xl font-bold text-yellow-600">{remainingGifts}</p>
            <p className="text-sm text-gray-500">Pendientes</p>
          </Card>
        </div>
      </CardHeader>
      <CardContent>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
          <Input
            placeholder="Nombre del Regalo"
            value={newGift.name}
            onChange={(e) => setNewGift({ ...newGift, name: e.target.value })}
            className="col-span-2"
          />
          <Input
            placeholder="Link de Compra"
            value={newGift.link}
            onChange={(e) => setNewGift({ ...newGift, link: e.target.value })}
          />
          <Input
            placeholder="Precio (Opcional)"
            value={newGift.price}
            onChange={(e) => setNewGift({ ...newGift, price: e.target.value })}
          />
        </div>
        <div className="flex justify-end mb-4">
          <Button onClick={handleAddGift}>
            <Plus className="h-4 w-4 mr-2" /> Agregar Regalo
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Regalo</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {gifts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  No hay regalos en la lista aún.
                </TableCell>
              </TableRow>
            ) : (
              gifts.map((gift) => (
                <TableRow key={gift.id}>
                  <TableCell>{gift.name}</TableCell>
                  <TableCell>
                    {gift.price ? (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-gray-500" /> {gift.price}
                      </div>
                    ) : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {gift.link && (
                      <a href={gift.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                        <LinkIcon className="h-4 w-4" /> Comprar
                      </a>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={gift.reserved ? 'default' : 'secondary'}>
                      {gift.reserved ? 'Reservado' : 'Disponible'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleToggleReserved(gift)}>
                          <CheckCircle className="h-4 w-4 mr-2" /> 
                          {gift.reserved ? 'Marcar como Disponible' : 'Marcar como Reservado'}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => console.log('Edit gift', gift.id)}>
                          <Edit className="h-4 w-4 mr-2" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteGift(gift.id)} className="text-red-600">
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

export default GiftRegistry;

