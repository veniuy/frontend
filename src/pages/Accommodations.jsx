import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Building,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  MapPin,
  Phone,
  Mail,
  Star,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Dumbbell,
  Waves,
  ArrowLeft,
  Save,
  Eye,
  Users,
  DollarSign,
  Calendar,
  Clock,
  Navigation
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';

const Accommodations = () => {
  const navigate = useNavigate();
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('hotels');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form state for new/edit accommodation
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    priceRange: 'medium',
    rating: 4,
    amenities: [],
    image: '',
    notes: '',
    type: 'hotel',
    distance: '',
    bookingUrl: ''
  });

  const accommodationTypes = [
    { value: 'hotel', label: 'Hotel', icon: Building },
    { value: 'resort', label: 'Resort', icon: Waves },
    { value: 'bnb', label: 'Bed & Breakfast', icon: Coffee },
    { value: 'apartment', label: 'Apartamento', icon: Building },
    { value: 'other', label: 'Otro', icon: Building }
  ];

  const priceRanges = [
    { value: 'budget', label: 'Económico ($)', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medio ($$)', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'luxury', label: 'Lujo ($$$)', color: 'bg-purple-100 text-purple-800' }
  ];

  const amenitiesList = [
    { id: 'wifi', label: 'WiFi Gratis', icon: Wifi },
    { id: 'parking', label: 'Estacionamiento', icon: Car },
    { id: 'breakfast', label: 'Desayuno', icon: Coffee },
    { id: 'restaurant', label: 'Restaurante', icon: Utensils },
    { id: 'gym', label: 'Gimnasio', icon: Dumbbell },
    { id: 'pool', label: 'Piscina', icon: Waves }
  ];

  // Sample data
  useEffect(() => {
    setAccommodations([
      {
        id: 1,
        name: 'Hotel Lyle Nashville',
        description: 'Hotel boutique en el corazón de Nashville con diseño moderno y servicios de lujo.',
        address: '221 Baker Street, Nashville, TN, 37201',
        phone: '+1 (615) 555-0123',
        email: 'reservations@lylenashville.com',
        website: 'https://lylenashville.com',
        priceRange: 'luxury',
        rating: 5,
        amenities: ['wifi', 'parking', 'restaurant', 'gym'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
        notes: 'Hemos reservado un bloque de habitaciones con descuento especial.',
        type: 'hotel',
        distance: '0.5 millas del venue',
        bookingUrl: 'https://lylenashville.com/book'
      },
      {
        id: 2,
        name: 'Downtown Suites',
        description: 'Apartamentos completamente equipados ideales para estancias largas.',
        address: '456 Music Row, Nashville, TN, 37203',
        phone: '+1 (615) 555-0456',
        email: 'info@downtownsuites.com',
        website: 'https://downtownsuites.com',
        priceRange: 'medium',
        rating: 4,
        amenities: ['wifi', 'parking', 'breakfast'],
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600',
        notes: 'Perfecto para familias que prefieren cocinar.',
        type: 'apartment',
        distance: '1.2 millas del venue',
        bookingUrl: 'https://downtownsuites.com/reserve'
      },
      {
        id: 3,
        name: 'Budget Inn Nashville',
        description: 'Opción económica con servicios básicos pero cómodos.',
        address: '789 Broadway, Nashville, TN, 37204',
        phone: '+1 (615) 555-0789',
        email: 'reservas@budgetinn.com',
        website: 'https://budgetinn.com',
        priceRange: 'budget',
        rating: 3,
        amenities: ['wifi', 'parking'],
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600',
        notes: 'Opción más económica para presupuestos ajustados.',
        type: 'hotel',
        distance: '2.1 millas del venue',
        bookingUrl: 'https://budgetinn.com/book'
      }
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingItem) {
      setAccommodations(items => 
        items.map(item => 
          item.id === editingItem.id 
            ? { ...formData, id: editingItem.id }
            : item
        )
      );
    } else {
      const newItem = {
        ...formData,
        id: Date.now(),
        rating: parseInt(formData.rating) || 4
      };
      setAccommodations(items => [...items, newItem]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      priceRange: 'medium',
      rating: 4,
      amenities: [],
      image: '',
      notes: '',
      type: 'hotel',
      distance: '',
      bookingUrl: ''
    });
    setEditingItem(null);
    setShowAddDialog(false);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingItem(item);
    setShowAddDialog(true);
  };

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar este alojamiento?')) {
      setAccommodations(items => items.filter(item => item.id !== id));
    }
  };

  const copyAccommodationsLink = () => {
    const link = `${window.location.origin}/accommodations/public/123`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getPriceRangeColor = (priceRange) => {
    const range = priceRanges.find(p => p.value === priceRange);
    return range ? range.color : 'bg-gray-100 text-gray-800';
  };

  const getPriceRangeLabel = (priceRange) => {
    const range = priceRanges.find(p => p.value === priceRange);
    return range ? range.label : 'Medio';
  };

  const getTypeIcon = (type) => {
    const typeObj = accommodationTypes.find(t => t.value === type);
    return typeObj ? typeObj.icon : Building;
  };

  const getTypeLabel = (type) => {
    const typeObj = accommodationTypes.find(t => t.value === type);
    return typeObj ? typeObj.label : 'Hotel';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const totalAccommodations = accommodations.length;
  const averageRating = accommodations.length > 0 
    ? (accommodations.reduce((sum, acc) => sum + acc.rating, 0) / accommodations.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" onClick={() => navigate('/app/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Dashboard
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Building className="h-8 w-8 text-blue-600" />
                Alojamientos
              </h1>
              <p className="text-gray-600 mt-1">
                Gestiona las opciones de hospedaje para tus invitados
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={copyAccommodationsLink}>
                {copiedLink ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar Enlace
                  </>
                )}
              </Button>
              <Button onClick={() => window.open('/accommodations/public/123', '_blank')}>
                <Eye className="h-4 w-4 mr-2" />
                Vista Previa
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Alojamientos</CardTitle>
              <Building className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAccommodations}</div>
              <p className="text-xs text-gray-600">Opciones disponibles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating Promedio</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageRating}</div>
              <div className="flex items-center gap-1 mt-1">
                {renderStars(Math.round(averageRating))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visitas</CardTitle>
              <Eye className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-gray-600">En los últimos 30 días</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reservas</CardTitle>
              <Calendar className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-gray-600">Confirmadas</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="hotels">Alojamientos</TabsTrigger>
            <TabsTrigger value="map">Mapa</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          {/* Hotels Tab */}
          <TabsContent value="hotels" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Opciones de Hospedaje</h2>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Alojamiento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingItem ? 'Editar Alojamiento' : 'Agregar Nuevo Alojamiento'}
                    </DialogTitle>
                    <DialogDescription>
                      Completa la información del alojamiento para tus invitados.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nombre del Alojamiento</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Ej: Hotel Lyle Nashville"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="type">Tipo</Label>
                        <select
                          id="type"
                          value={formData.type}
                          onChange={(e) => setFormData({...formData, type: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {accommodationTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Describe el alojamiento..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Dirección Completa</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        placeholder="221 Baker Street, Nashville, TN, 37201"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+1 (615) 555-0123"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="info@hotel.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Sitio Web</Label>
                        <Input
                          id="website"
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData({...formData, website: e.target.value})}
                          placeholder="https://hotel.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="priceRange">Rango de Precio</Label>
                        <select
                          id="priceRange"
                          value={formData.priceRange}
                          onChange={(e) => setFormData({...formData, priceRange: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {priceRanges.map(range => (
                            <option key={range.value} value={range.value}>
                              {range.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="rating">Rating (1-5)</Label>
                        <Input
                          id="rating"
                          type="number"
                          min="1"
                          max="5"
                          value={formData.rating}
                          onChange={(e) => setFormData({...formData, rating: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="distance">Distancia al Venue</Label>
                        <Input
                          id="distance"
                          value={formData.distance}
                          onChange={(e) => setFormData({...formData, distance: e.target.value})}
                          placeholder="0.5 millas"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Amenidades</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {amenitiesList.map(amenity => {
                          const Icon = amenity.icon;
                          return (
                            <label key={amenity.id} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={formData.amenities.includes(amenity.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFormData({
                                      ...formData,
                                      amenities: [...formData.amenities, amenity.id]
                                    });
                                  } else {
                                    setFormData({
                                      ...formData,
                                      amenities: formData.amenities.filter(a => a !== amenity.id)
                                    });
                                  }
                                }}
                                className="rounded"
                              />
                              <Icon className="h-4 w-4" />
                              <span className="text-sm">{amenity.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bookingUrl">URL de Reserva</Label>
                      <Input
                        id="bookingUrl"
                        type="url"
                        value={formData.bookingUrl}
                        onChange={(e) => setFormData({...formData, bookingUrl: e.target.value})}
                        placeholder="https://hotel.com/book"
                      />
                    </div>

                    <div>
                      <Label htmlFor="image">URL de Imagen</Label>
                      <Input
                        id="image"
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        placeholder="https://..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Notas Especiales</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="Información adicional para los invitados..."
                        rows={2}
                      />
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancelar
                      </Button>
                      <Button type="submit">
                        <Save className="h-4 w-4 mr-2" />
                        {editingItem ? 'Actualizar' : 'Agregar'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {accommodations.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Building className="h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    No tienes alojamientos aún
                  </h3>
                  <p className="text-gray-600 mb-6 text-center max-w-md">
                    Agrega opciones de hospedaje para ayudar a tus invitados a encontrar el lugar perfecto para quedarse
                  </p>
                  <Button onClick={() => setShowAddDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Primer Alojamiento
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {accommodations.map((accommodation) => {
                  const TypeIcon = getTypeIcon(accommodation.type);
                  return (
                    <Card key={accommodation.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-6">
                          {/* Image */}
                          <div className="flex-shrink-0">
                            {accommodation.image ? (
                              <img
                                src={accommodation.image}
                                alt={accommodation.name}
                                className="w-48 h-32 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-48 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                                <TypeIcon className="h-12 w-12 text-gray-400" />
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                  {accommodation.name}
                                  <Badge className={getPriceRangeColor(accommodation.priceRange)}>
                                    {getPriceRangeLabel(accommodation.priceRange)}
                                  </Badge>
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex items-center gap-1">
                                    {renderStars(accommodation.rating)}
                                  </div>
                                  <span className="text-sm text-gray-600">
                                    {getTypeLabel(accommodation.type)}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" onClick={() => handleEdit(accommodation)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDelete(accommodation.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <p className="text-gray-600 mb-3">{accommodation.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="h-4 w-4" />
                                {accommodation.address}
                              </div>
                              {accommodation.distance && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Navigation className="h-4 w-4" />
                                  {accommodation.distance}
                                </div>
                              )}
                              {accommodation.phone && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Phone className="h-4 w-4" />
                                  {accommodation.phone}
                                </div>
                              )}
                              {accommodation.email && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Mail className="h-4 w-4" />
                                  {accommodation.email}
                                </div>
                              )}
                            </div>

                            {/* Amenities */}
                            {accommodation.amenities.length > 0 && (
                              <div className="mb-4">
                                <div className="flex flex-wrap gap-2">
                                  {accommodation.amenities.map(amenityId => {
                                    const amenity = amenitiesList.find(a => a.id === amenityId);
                                    if (!amenity) return null;
                                    const Icon = amenity.icon;
                                    return (
                                      <div key={amenityId} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs">
                                        <Icon className="h-3 w-3" />
                                        {amenity.label}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Notes */}
                            {accommodation.notes && (
                              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-800">{accommodation.notes}</p>
                              </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2">
                              {accommodation.bookingUrl && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => window.open(accommodation.bookingUrl, '_blank')}
                                >
                                  <Calendar className="h-4 w-4 mr-1" />
                                  Reservar
                                </Button>
                              )}
                              {accommodation.website && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => window.open(accommodation.website, '_blank')}
                                >
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  Sitio Web
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Map Tab */}
          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mapa de Alojamientos</CardTitle>
                <CardDescription>
                  Ubicación de los alojamientos en relación al venue del evento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Mapa interactivo próximamente</p>
                    <p className="text-sm text-gray-500">Integración con Google Maps</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Alojamientos</CardTitle>
                <CardDescription>
                  Personaliza cómo se muestran las opciones de hospedaje a tus invitados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="accommodationsTitle">Título de la Sección</Label>
                  <Input
                    id="accommodationsTitle"
                    defaultValue="Opciones de Hospedaje"
                    placeholder="Título personalizado"
                  />
                </div>

                <div>
                  <Label htmlFor="accommodationsMessage">Mensaje de Bienvenida</Label>
                  <Textarea
                    id="accommodationsMessage"
                    defaultValue="Hemos seleccionado estas opciones de hospedaje para tu comodidad. Reserva pronto para obtener las mejores tarifas."
                    placeholder="Mensaje para tus invitados"
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Mostrar precios</h3>
                    <p className="text-sm text-gray-600">Los invitados podrán ver los rangos de precio</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Mostrar disponibilidad</h3>
                    <p className="text-sm text-gray-600">Integrar con sistemas de reserva en tiempo real</p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>

                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Configuración
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Accommodations;
