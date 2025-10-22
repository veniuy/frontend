import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Edit, PlusCircle, Search } from 'lucide-react';
import { toast } from 'sonner';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    nombre_completo: '',
    telefono: '',
    tipo_suscripcion: 'gratuita',
    role: 'cliente',
    activo: true,
    email_verificado: false,
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/users?page=${page}&per_page=${perPage}&search=${searchTerm}`);
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
        setTotalPages(data.pagination.pages);
      } else {
        toast.error('Error fetching users: ' + data.error);
      }
    } catch (error) {
      toast.error('Network error fetching users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, perPage, searchTerm]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('User created successfully');
        setIsModalOpen(false);
        fetchUsers();
      } else {
        toast.error('Error creating user: ' + data.error);
      }
    } catch (error) {
      toast.error('Network error creating user: ' + error.message);
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`/api/admin/users/${currentUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('User updated successfully');
        setIsModalOpen(false);
        fetchUsers();
      } else {
        toast.error('Error updating user: ' + data.error);
      }
    } catch (error) {
      toast.error('Network error updating user: ' + error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`/api/admin/users/${userId}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          toast.success('User deleted successfully');
          fetchUsers();
        } else {
          toast.error('Error deleting user: ' + data.error);
        }
      } catch (error) {
        toast.error('Network error deleting user: ' + error.message);
      }
    }
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: '', // Password should not be pre-filled for security
      nombre_completo: user.nombre_completo || '',
      telefono: user.telefono || '',
      tipo_suscripcion: user.tipo_suscripcion,
      role: user.role,
      activo: user.activo,
      email_verificado: user.email_verificado,
    });
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setCurrentUser(null);
    setFormData({
      username: '',
      email: '',
      password: '',
      nombre_completo: '',
      telefono: '',
      tipo_suscripcion: 'gratuita',
      role: 'cliente',
      activo: true,
      email_verificado: false,
    });
    setIsModalOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Gestión de Usuarios</CardTitle>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button onClick={openCreateModal}><PlusCircle className="mr-2 h-4 w-4" /> Nuevo Usuario</Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Cargando usuarios...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Suscripción</TableHead>
                <TableHead>Activo</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.tipo_suscripcion}</TableCell>
                  <TableCell>{user.activo ? 'Sí' : 'No'}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditModal(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(user.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <div className="flex justify-between items-center mt-4">
          <Button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>Anterior</Button>
          <span>Página {page} de {totalPages}</span>
          <Button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>Siguiente</Button>
        </div>
      </CardContent>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">Usuario</Label>
              <Input id="username" name="username" value={formData.username} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" name="email" value={formData.email} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">Contraseña</Label>
              <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} className="col-span-3" placeholder={currentUser ? 'Dejar vacío para no cambiar' : ''} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre_completo" className="text-right">Nombre Completo</Label>
              <Input id="nombre_completo" name="nombre_completo" value={formData.nombre_completo} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="telefono" className="text-right">Teléfono</Label>
              <Input id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tipo_suscripcion" className="text-right">Suscripción</Label>
              <Select name="tipo_suscripcion" value={formData.tipo_suscripcion} onValueChange={(value) => handleSelectChange('tipo_suscripcion', value)} className="col-span-3">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar tipo de suscripción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gratuita">Gratuita</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">Rol</Label>
              <Select name="role" value={formData.role} onValueChange={(value) => handleSelectChange('role', value)} className="col-span-3">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cliente">Cliente</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="soporte">Soporte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="activo" className="text-right">Activo</Label>
              <input type="checkbox" id="activo" name="activo" checked={formData.activo} onChange={handleInputChange} className="col-span-3 w-4 h-4" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email_verificado" className="text-right">Email Verificado</Label>
              <input type="checkbox" id="email_verificado" name="email_verificado" checked={formData.email_verificado} onChange={handleInputChange} className="col-span-3 w-4 h-4" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button onClick={currentUser ? handleUpdateUser : handleCreateUser}>
              {currentUser ? 'Guardar Cambios' : 'Crear Usuario'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default UserManagement;
