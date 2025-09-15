import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Clock,
  MapPin,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  ArrowLeft,
  Download,
  RefreshCw,
  Calendar,
  Share2,
  Mail,
  MessageSquare,
  ExternalLink,
  Filter,
  Search,
  ChevronDown,
  Activity,
  MousePointer,
  Timer,
  UserCheck,
  Heart,
  Star
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Input } from '../components/ui/input';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Tracking = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('7d');
  const [selectedEvent, setSelectedEvent] = useState('all');

  // Sample analytics data
  const [analytics] = useState({
    overview: {
      totalViews: 2847,
      uniqueVisitors: 1923,
      rsvpRate: 73.2,
      shareRate: 28.5,
      averageTimeOnPage: '2:34',
      bounceRate: 24.1,
      conversionRate: 68.7,
      mobileTraffic: 67.3
    },
    dailyStats: [
      { date: '2024-01-09', views: 234, visitors: 189, rsvps: 45, shares: 12 },
      { date: '2024-01-10', views: 312, visitors: 267, rsvps: 67, shares: 18 },
      { date: '2024-01-11', views: 289, visitors: 234, rsvps: 52, shares: 15 },
      { date: '2024-01-12', views: 456, visitors: 378, rsvps: 89, shares: 24 },
      { date: '2024-01-13', views: 398, visitors: 334, rsvps: 76, shares: 21 },
      { date: '2024-01-14', views: 523, visitors: 445, rsvps: 98, shares: 31 },
      { date: '2024-01-15', views: 635, visitors: 567, rsvps: 134, shares: 42 }
    ],
    deviceBreakdown: [
      { name: 'Mobile', value: 67.3, count: 1294, color: '#3B82F6' },
      { name: 'Desktop', value: 24.8, count: 477, color: '#10B981' },
      { name: 'Tablet', value: 7.9, count: 152, color: '#F59E0B' }
    ],
    trafficSources: [
      { source: 'WhatsApp', visits: 856, percentage: 44.5, growth: '+12.3%' },
      { source: 'Direct', visits: 423, percentage: 22.0, growth: '+8.7%' },
      { source: 'Email', visits: 312, percentage: 16.2, growth: '+15.2%' },
      { source: 'Facebook', visits: 234, percentage: 12.2, growth: '+5.1%' },
      { source: 'Instagram', visits: 98, percentage: 5.1, growth: '+22.8%' }
    ],
    geographicData: [
      { country: 'México', city: 'Ciudad de México', visits: 567, percentage: 29.5 },
      { country: 'México', city: 'Guadalajara', visits: 234, percentage: 12.2 },
      { country: 'México', city: 'Monterrey', visits: 189, percentage: 9.8 },
      { country: 'Estados Unidos', city: 'Los Angeles', visits: 156, percentage: 8.1 },
      { country: 'España', city: 'Madrid', visits: 134, percentage: 7.0 },
      { country: 'Colombia', city: 'Bogotá', visits: 98, percentage: 5.1 }
    ],
    realtimeData: {
      activeUsers: 23,
      currentPageViews: 8,
      topPages: [
        { page: '/invitacion', users: 12, title: 'Invitación Principal' },
        { page: '/rsvp', users: 6, title: 'Confirmar Asistencia' },
        { page: '/registry', users: 3, title: 'Lista de Regalos' },
        { page: '/accommodations', users: 2, title: 'Alojamientos' }
      ]
    },
    events: [
      {
        id: 1,
        name: 'Boda María & Juan',
        slug: 'boda-maria-juan-2024',
        views: 1847,
        visitors: 1234,
        rsvps: 89,
        date: '2024-03-15'
      },
      {
        id: 2,
        name: 'XV Años Sofía',
        slug: 'xv-sofia-2024',
        views: 756,
        visitors: 567,
        rsvps: 45,
        date: '2024-02-28'
      },
      {
        id: 3,
        name: 'Graduación Carlos',
        slug: 'graduacion-carlos-2024',
        views: 244,
        visitors: 122,
        rsvps: 23,
        date: '2024-04-10'
      }
    ]
  });

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const formatPercentage = (num) => {
    return `${num.toFixed(1)}%`;
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getGrowthColor = (growth) => {
    if (growth.startsWith('+')) return 'text-green-600';
    if (growth.startsWith('-')) return 'text-red-600';
    return 'text-gray-600';
  };

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
                <BarChart3 className="h-8 w-8 text-blue-600" />
                Analytics y Tracking
              </h1>
              <p className="text-gray-600 mt-1">
                Monitorea el rendimiento de tus invitaciones
              </p>
            </div>
            <div className="flex gap-3">
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Seleccionar evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los eventos</SelectItem>
                  {analytics.events.map(event => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Hoy</SelectItem>
                  <SelectItem value="7d">7 días</SelectItem>
                  <SelectItem value="30d">30 días</SelectItem>
                  <SelectItem value="90d">90 días</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
              
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Vistas</CardTitle>
              <Eye className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(analytics.overview.totalViews)}</div>
              <p className="text-xs text-green-600">+12.3% vs período anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(analytics.overview.uniqueVisitors)}</div>
              <p className="text-xs text-green-600">+8.7% vs período anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa de RSVP</CardTitle>
              <UserCheck className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPercentage(analytics.overview.rsvpRate)}</div>
              <p className="text-xs text-green-600">+5.2% vs período anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.overview.averageTimeOnPage}</div>
              <p className="text-xs text-green-600">+15.4% vs período anterior</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="realtime">Tiempo Real</TabsTrigger>
            <TabsTrigger value="audience">Audiencia</TabsTrigger>
            <TabsTrigger value="behavior">Comportamiento</TabsTrigger>
            <TabsTrigger value="acquisition">Adquisición</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Traffic Trend */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Tendencia de Tráfico</CardTitle>
                  <CardDescription>
                    Vistas y visitantes en los últimos 7 días
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={analytics.dailyStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString('es-ES')}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="views" 
                        stackId="1" 
                        stroke="#3B82F6" 
                        fill="#3B82F6" 
                        fillOpacity={0.6}
                        name="Vistas"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="visitors" 
                        stackId="2" 
                        stroke="#10B981" 
                        fill="#10B981" 
                        fillOpacity={0.6}
                        name="Visitantes"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Device Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Dispositivos</CardTitle>
                  <CardDescription>
                    Distribución por tipo de dispositivo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={analytics.deviceBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {analytics.deviceBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    {analytics.deviceBreakdown.map((device) => (
                      <div key={device.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: device.color }}
                          />
                          <span>{device.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-medium">{device.value}%</span>
                          <span className="text-gray-500 ml-2">({device.count})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Traffic Sources */}
              <Card>
                <CardHeader>
                  <CardTitle>Fuentes de Tráfico</CardTitle>
                  <CardDescription>
                    De dónde vienen tus visitantes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.trafficSources.map((source, index) => (
                      <div key={source.source} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{source.source}</div>
                            <div className="text-sm text-gray-500">{source.percentage}% del tráfico</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{source.visits}</div>
                          <div className={`text-sm ${getGrowthColor(source.growth)}`}>
                            {source.growth}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Tasa de Rebote</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPercentage(analytics.overview.bounceRate)}</div>
                  <p className="text-xs text-green-600">-3.2% vs período anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPercentage(analytics.overview.conversionRate)}</div>
                  <p className="text-xs text-green-600">+7.8% vs período anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Tasa de Compartir</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPercentage(analytics.overview.shareRate)}</div>
                  <p className="text-xs text-green-600">+12.1% vs período anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Tráfico Móvil</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPercentage(analytics.overview.mobileTraffic)}</div>
                  <p className="text-xs text-blue-600">+2.3% vs período anterior</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Real-time Tab */}
          <TabsContent value="realtime" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-500" />
                    Usuarios Activos
                  </CardTitle>
                  <CardDescription>
                    Visitantes en este momento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {analytics.realtimeData.activeUsers}
                  </div>
                  <p className="text-sm text-gray-600">
                    {analytics.realtimeData.currentPageViews} viendo páginas ahora
                  </p>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Páginas Más Visitadas Ahora</CardTitle>
                  <CardDescription>
                    Actividad en tiempo real por página
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.realtimeData.topPages.map((page, index) => (
                      <div key={page.page} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm">
                            {page.users}
                          </div>
                          <div>
                            <div className="font-medium">{page.title}</div>
                            <div className="text-sm text-gray-500">{page.page}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-gray-600">En vivo</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Actividad en Tiempo Real</CardTitle>
                <CardDescription>
                  Últimas interacciones de usuarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Eye className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Usuario de México visitó la invitación principal</span>
                    <span className="text-xs text-gray-500 ml-auto">Hace 2 segundos</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <UserCheck className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Nuevo RSVP confirmado desde WhatsApp</span>
                    <span className="text-xs text-gray-500 ml-auto">Hace 15 segundos</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Share2 className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Invitación compartida en Facebook</span>
                    <span className="text-xs text-gray-500 ml-auto">Hace 32 segundos</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <Heart className="h-4 w-4 text-orange-600" />
                    <span className="text-sm">Usuario agregó regalo a la lista</span>
                    <span className="text-xs text-gray-500 ml-auto">Hace 1 minuto</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audience Tab */}
          <TabsContent value="audience" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ubicación Geográfica</CardTitle>
                  <CardDescription>
                    Distribución de visitantes por ubicación
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.geographicData.map((location, index) => (
                      <div key={`${location.country}-${location.city}`} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{location.city}</div>
                            <div className="text-sm text-gray-500">{location.country}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{location.visits}</div>
                          <div className="text-sm text-gray-500">{location.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Demografía de Dispositivos</CardTitle>
                  <CardDescription>
                    Detalles por tipo de dispositivo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-6 w-6 text-blue-600" />
                        <div>
                          <div className="font-medium">Móvil</div>
                          <div className="text-sm text-gray-500">iOS y Android</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">67.3%</div>
                        <div className="text-sm text-gray-500">1,294 usuarios</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Monitor className="h-6 w-6 text-green-600" />
                        <div>
                          <div className="font-medium">Escritorio</div>
                          <div className="text-sm text-gray-500">Windows, Mac, Linux</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">24.8%</div>
                        <div className="text-sm text-gray-500">477 usuarios</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Tablet className="h-6 w-6 text-purple-600" />
                        <div>
                          <div className="font-medium">Tablet</div>
                          <div className="text-sm text-gray-500">iPad, Android tablets</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">7.9%</div>
                        <div className="text-sm text-gray-500">152 usuarios</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Behavior Tab */}
          <TabsContent value="behavior" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Páginas Más Visitadas</CardTitle>
                  <CardDescription>
                    Contenido más popular de tu evento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Invitación Principal</div>
                        <div className="text-sm text-gray-500">/invitacion</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">1,847</div>
                        <div className="text-sm text-gray-500">64.9% del tráfico</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Confirmar Asistencia</div>
                        <div className="text-sm text-gray-500">/rsvp</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">756</div>
                        <div className="text-sm text-gray-500">26.6% del tráfico</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Lista de Regalos</div>
                        <div className="text-sm text-gray-500">/registry</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">244</div>
                        <div className="text-sm text-gray-500">8.6% del tráfico</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Flujo de Usuarios</CardTitle>
                  <CardDescription>
                    Cómo navegan los usuarios por tu evento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Eye className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="text-sm font-medium">Entrada</div>
                        <div className="text-xs text-gray-500">100%</div>
                      </div>
                      
                      <div className="flex-1 h-px bg-gray-300"></div>
                      
                      <div className="w-24 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <UserCheck className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="text-sm font-medium">RSVP</div>
                        <div className="text-xs text-gray-500">73.2%</div>
                      </div>
                      
                      <div className="flex-1 h-px bg-gray-300"></div>
                      
                      <div className="w-24 text-center">
                        <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Heart className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="text-sm font-medium">Regalos</div>
                        <div className="text-xs text-gray-500">28.5%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Métricas de Engagement</CardTitle>
                <CardDescription>
                  Cómo interactúan los usuarios con tu contenido
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">2:34</div>
                    <div className="text-sm text-gray-600">Tiempo promedio en página</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">3.2</div>
                    <div className="text-sm text-gray-600">Páginas por sesión</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">24.1%</div>
                    <div className="text-sm text-gray-600">Tasa de rebote</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">68.7%</div>
                    <div className="text-sm text-gray-600">Tasa de conversión</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Acquisition Tab */}
          <TabsContent value="acquisition" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Canales de Adquisición</CardTitle>
                <CardDescription>
                  Rendimiento detallado por canal de marketing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.trafficSources}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="visits" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rendimiento por Canal</CardTitle>
                  <CardDescription>
                    Métricas detalladas de cada fuente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.trafficSources.map((source) => (
                      <div key={source.source} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{source.source}</h3>
                          <Badge className={getGrowthColor(source.growth).replace('text-', 'bg-').replace('-600', '-100')}>
                            {source.growth}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500">Visitas</div>
                            <div className="font-semibold">{source.visits}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">% del Total</div>
                            <div className="font-semibold">{source.percentage}%</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Conversión</div>
                            <div className="font-semibold">
                              {Math.round(Math.random() * 30 + 50)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Campañas Activas</CardTitle>
                  <CardDescription>
                    Estado de tus campañas de marketing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">WhatsApp Broadcast</h3>
                        <Badge className="bg-green-100 text-green-800">Activa</Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        Invitación enviada a lista de contactos
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Enviados</div>
                          <div className="font-semibold">234</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Clicks</div>
                          <div className="font-semibold">156</div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Email Campaign</h3>
                        <Badge className="bg-blue-100 text-blue-800">Programada</Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        Recordatorio 1 semana antes del evento
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Programado</div>
                          <div className="font-semibold">15 Mar</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Destinatarios</div>
                          <div className="font-semibold">189</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Comparación de Eventos</CardTitle>
                <CardDescription>
                  Rendimiento de todos tus eventos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.events.map((event) => (
                    <div key={event.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{event.name}</h3>
                          <p className="text-sm text-gray-600">/{event.slug}</p>
                          <p className="text-sm text-gray-500">
                            Fecha del evento: {new Date(event.date).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Ver Evento
                        </Button>
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{event.views}</div>
                          <div className="text-sm text-gray-600">Total Vistas</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{event.visitors}</div>
                          <div className="text-sm text-gray-600">Visitantes Únicos</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{event.rsvps}</div>
                          <div className="text-sm text-gray-600">Confirmaciones</div>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                        <span>Tasa de conversión: {((event.rsvps / event.visitors) * 100).toFixed(1)}%</span>
                        <span>CTR: {((event.visitors / event.views) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Tracking;
