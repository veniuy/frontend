import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import {
  Link as LinkIcon,
  Copy,
  Check,
  Share2,
  QrCode,
  Mail,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowLeft,
  Eye,
  Users,
  BarChart3,
  Globe,
  Smartphone,
  Download,
  RefreshCw,
  Settings,
  ExternalLink,
  Calendar,
  Clock,
  TrendingUp
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

const ShareableLink = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('links');
  const [copiedLink, setCopiedLink] = useState('');
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);

  // Sample data for shareable links
  const [shareableLinks] = useState([
    {
      id: 'main',
      title: 'Invitación Principal',
      url: 'https://invitaciones.com/p/boda-maria-juan-2024',
      shortUrl: 'https://inv.ly/abc123',
      description: 'Enlace principal de la invitación',
      type: 'invitation',
      clicks: 247,
      uniqueVisitors: 189,
      lastAccessed: '2024-01-15T10:30:00Z',
      isActive: true
    },
    {
      id: 'registry',
      title: 'Lista de Regalos',
      url: 'https://invitaciones.com/registry/boda-maria-juan-2024',
      shortUrl: 'https://inv.ly/reg456',
      description: 'Enlace directo a la lista de regalos',
      type: 'registry',
      clicks: 156,
      uniqueVisitors: 134,
      lastAccessed: '2024-01-15T09:15:00Z',
      isActive: true
    },
    {
      id: 'accommodations',
      title: 'Alojamientos',
      url: 'https://invitaciones.com/accommodations/boda-maria-juan-2024',
      shortUrl: 'https://inv.ly/acc789',
      description: 'Información de hospedaje para invitados',
      type: 'accommodations',
      clicks: 89,
      uniqueVisitors: 67,
      lastAccessed: '2024-01-14T16:45:00Z',
      isActive: true
    },
    {
      id: 'rsvp',
      title: 'Confirmar Asistencia',
      url: 'https://invitaciones.com/rsvp/boda-maria-juan-2024',
      shortUrl: 'https://inv.ly/rsvp012',
      description: 'Formulario de confirmación de asistencia',
      type: 'rsvp',
      clicks: 203,
      uniqueVisitors: 178,
      lastAccessed: '2024-01-15T11:20:00Z',
      isActive: true
    }
  ]);

  const [analytics] = useState({
    totalClicks: 695,
    uniqueVisitors: 568,
    conversionRate: 72.5,
    topReferrers: [
      { source: 'WhatsApp', clicks: 245, percentage: 35.3 },
      { source: 'Email', clicks: 189, percentage: 27.2 },
      { source: 'Facebook', clicks: 134, percentage: 19.3 },
      { source: 'Direct', clicks: 89, percentage: 12.8 },
      { source: 'Instagram', clicks: 38, percentage: 5.4 }
    ],
    deviceBreakdown: [
      { device: 'Mobile', clicks: 417, percentage: 60.0 },
      { device: 'Desktop', clicks: 208, percentage: 29.9 },
      { device: 'Tablet', clicks: 70, percentage: 10.1 }
    ]
  });

  const copyToClipboard = (text, linkId) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(linkId);
    setTimeout(() => setCopiedLink(''), 2000);
  };

  const shareViaEmail = (link) => {
    const subject = encodeURIComponent('Invitación a nuestro evento');
    const body = encodeURIComponent(`Te invitamos a nuestro evento. Más detalles en: ${link.url}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareViaSocial = (platform, link) => {
    const url = encodeURIComponent(link.url);
    const text = encodeURIComponent('¡Estás invitado a nuestro evento!');
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${text} ${url}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  const generateQRCode = (link) => {
    setSelectedLink(link);
    setShowQRDialog(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLinkTypeIcon = (type) => {
    const icons = {
      invitation: Calendar,
      registry: LinkIcon,
      accommodations: Globe,
      rsvp: Users
    };
    return icons[type] || LinkIcon;
  };

  const getLinkTypeColor = (type) => {
    const colors = {
      invitation: 'bg-blue-100 text-blue-800',
      registry: 'bg-purple-100 text-purple-800',
      accommodations: 'bg-green-100 text-green-800',
      rsvp: 'bg-orange-100 text-orange-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
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
                <Share2 className="h-8 w-8 text-blue-600" />
                Enlaces Compartibles
              </h1>
              <p className="text-gray-600 mt-1">
                Gestiona y comparte los enlaces de tu evento
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar Stats
              </Button>
              <Button>
                <Settings className="h-4 w-4 mr-2" />
                Configurar
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalClicks}</div>
              <p className="text-xs text-gray-600">En todos los enlaces</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.uniqueVisitors}</div>
              <p className="text-xs text-gray-600">Personas diferentes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa de Conversión</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.conversionRate}%</div>
              <p className="text-xs text-gray-600">Confirmaciones</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enlaces Activos</CardTitle>
              <LinkIcon className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{shareableLinks.filter(l => l.isActive).length}</div>
              <p className="text-xs text-gray-600">De {shareableLinks.length} totales</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="links">Enlaces</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="social">Redes Sociales</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          {/* Links Tab */}
          <TabsContent value="links" className="space-y-6">
            <div className="space-y-4">
              {shareableLinks.map((link) => {
                const TypeIcon = getLinkTypeIcon(link.type);
                return (
                  <Card key={link.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <TypeIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{link.title}</h3>
                            <p className="text-gray-600 text-sm">{link.description}</p>
                          </div>
                        </div>
                        <Badge className={getLinkTypeColor(link.type)}>
                          {link.type}
                        </Badge>
                      </div>

                      {/* URLs */}
                      <div className="space-y-3 mb-4">
                        <div>
                          <Label className="text-xs text-gray-500">URL Original</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              value={link.url}
                              readOnly
                              className="flex-1 text-sm"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(link.url, `${link.id}-full`)}
                            >
                              {copiedLink === `${link.id}-full` ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs text-gray-500">URL Corta</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              value={link.shortUrl}
                              readOnly
                              className="flex-1 text-sm font-mono"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(link.shortUrl, `${link.id}-short`)}
                            >
                              {copiedLink === `${link.id}-short` ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-blue-600">{link.clicks}</div>
                          <div className="text-xs text-gray-600">Clicks</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-600">{link.uniqueVisitors}</div>
                          <div className="text-xs text-gray-600">Únicos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-purple-600">
                            {Math.round((link.uniqueVisitors / link.clicks) * 100)}%
                          </div>
                          <div className="text-xs text-gray-600">Conversión</div>
                        </div>
                      </div>

                      {/* Last accessed */}
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Clock className="h-4 w-4" />
                        Último acceso: {formatDate(link.lastAccessed)}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(link.url, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Abrir
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => generateQRCode(link)}
                        >
                          <QrCode className="h-4 w-4 mr-1" />
                          QR Code
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => shareViaEmail(link)}
                        >
                          <Mail className="h-4 w-4 mr-1" />
                          Email
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => shareViaSocial('whatsapp', link)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          WhatsApp
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => shareViaSocial('facebook', link)}
                        >
                          <Facebook className="h-4 w-4 mr-1" />
                          Facebook
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Referrers */}
              <Card>
                <CardHeader>
                  <CardTitle>Fuentes de Tráfico</CardTitle>
                  <CardDescription>
                    De dónde vienen tus visitantes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.topReferrers.map((referrer, index) => (
                      <div key={referrer.source} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                            {index + 1}
                          </div>
                          <span className="font-medium">{referrer.source}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{referrer.clicks}</div>
                          <div className="text-sm text-gray-500">{referrer.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Device Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Dispositivos</CardTitle>
                  <CardDescription>
                    Cómo acceden tus invitados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.deviceBreakdown.map((device) => (
                      <div key={device.device} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-5 w-5 text-gray-500" />
                          <span className="font-medium">{device.device}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{device.clicks}</div>
                          <div className="text-sm text-gray-500">{device.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Link Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento por Enlace</CardTitle>
                <CardDescription>
                  Comparación de todos tus enlaces
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shareableLinks.map((link) => {
                    const TypeIcon = getLinkTypeIcon(link.type);
                    return (
                      <div key={link.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <TypeIcon className="h-5 w-5 text-gray-500" />
                          <div>
                            <div className="font-medium">{link.title}</div>
                            <div className="text-sm text-gray-500">{link.shortUrl}</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-6 text-center">
                          <div>
                            <div className="font-semibold text-blue-600">{link.clicks}</div>
                            <div className="text-xs text-gray-500">Clicks</div>
                          </div>
                          <div>
                            <div className="font-semibold text-green-600">{link.uniqueVisitors}</div>
                            <div className="text-xs text-gray-500">Únicos</div>
                          </div>
                          <div>
                            <div className="font-semibold text-purple-600">
                              {Math.round((link.uniqueVisitors / link.clicks) * 100)}%
                            </div>
                            <div className="text-xs text-gray-500">CTR</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Tab */}
          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compartir en Redes Sociales</CardTitle>
                <CardDescription>
                  Comparte tu evento en diferentes plataformas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {shareableLinks.map((link) => (
                    <div key={link.id} className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">{link.title}</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => shareViaSocial('facebook', link)}
                          className="justify-start"
                        >
                          <Facebook className="h-4 w-4 mr-2" />
                          Facebook
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => shareViaSocial('twitter', link)}
                          className="justify-start"
                        >
                          <Twitter className="h-4 w-4 mr-2" />
                          Twitter
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => shareViaSocial('linkedin', link)}
                          className="justify-start"
                        >
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => shareViaSocial('whatsapp', link)}
                          className="justify-start"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          WhatsApp
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Enlaces</CardTitle>
                <CardDescription>
                  Personaliza el comportamiento de tus enlaces compartibles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Tracking de Analytics</h3>
                    <p className="text-sm text-gray-600">Recopilar estadísticas de clicks y visitantes</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">URLs Cortas Personalizadas</h3>
                    <p className="text-sm text-gray-600">Usar tu dominio personalizado para enlaces cortos</p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Expiración Automática</h3>
                    <p className="text-sm text-gray-600">Desactivar enlaces después del evento</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>

                <div>
                  <Label htmlFor="customDomain">Dominio Personalizado</Label>
                  <Input
                    id="customDomain"
                    placeholder="tu-evento.com"
                    className="mt-1"
                  />
                </div>

                <Button>
                  Guardar Configuración
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* QR Code Dialog */}
        <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Código QR</DialogTitle>
              <DialogDescription>
                {selectedLink?.title}
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col items-center space-y-4">
              <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <QrCode className="h-24 w-24 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 text-center">
                Escanea este código QR para acceder directamente al enlace
              </p>
              <div className="text-xs text-gray-500 font-mono break-all text-center">
                {selectedLink?.shortUrl}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowQRDialog(false)}>
                Cerrar
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Descargar QR
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ShareableLink;
