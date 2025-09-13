import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Download, 
  Share2, 
  Copy, 
  Mail, 
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  QrCode
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function DesignerPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Simular carga del diseño
    const designId = parseInt(id);
    const mockDesign = {
      id: designId,
      name: 'Elegancia Dorada - Mi Diseño',
      templateName: 'Elegancia Dorada',
      category: 'boda',
      size: 'A5',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      previewUrl: '/assets/templates/boda-elegante.jpg',
      layers: [
        {
          id: 1,
          type: 'background',
          name: 'Fondo',
          props: { color: '#D4AF37' }
        },
        {
          id: 2,
          type: 'text',
          name: 'Título',
          props: { text: 'Nos Casamos', fontSize: 32, color: '#FFFFFF' }
        },
        {
          id: 3,
          type: 'text',
          name: 'Nombres',
          props: { text: 'María & Juan', fontSize: 24, color: '#FFFFFF' }
        }
      ]
    };
    
    setDesign(mockDesign);
    setShareUrl(`${window.location.origin}/preview/${designId}`);
    setLoading(false);
  }, [id]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error al copiar URL:', error);
    }
  };

  const handleDownload = (format = 'png') => {
    // Simular descarga
    console.log(`Descargando diseño como ${format}`);
    // Aquí implementarías la lógica real de descarga
  };

  const handleShare = (platform) => {
    const text = `¡Mira mi invitación personalizada!`;
    const url = shareUrl;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      instagram: `https://www.instagram.com/`, // Instagram no permite compartir URLs directamente
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      email: `mailto:?subject=${encodeURIComponent('Mi invitación personalizada')}&body=${encodeURIComponent(text + '\n\n' + url)}`
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!design) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Diseño no encontrado</h2>
          <Button asChild>
            <Link to="/plantillas">Volver a la galería</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {design.name}
                </h1>
                <p className="text-sm text-gray-500">
                  Basado en {design.templateName}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link to={`/editor/${design.id}`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Link>
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartir
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Compartir Diseño</DialogTitle>
                    <DialogDescription>
                      Comparte tu invitación personalizada con otros
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Tabs defaultValue="link" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="link">Enlace</TabsTrigger>
                      <TabsTrigger value="social">Redes Sociales</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="link" className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Input
                          value={shareUrl}
                          readOnly
                          className="flex-1"
                        />
                        <Button size="sm" onClick={handleCopyUrl}>
                          <Copy className="h-4 w-4" />
                          {copied ? 'Copiado' : 'Copiar'}
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="social" className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => handleShare('facebook')}
                          className="justify-start"
                        >
                          <Facebook className="h-4 w-4 mr-2" />
                          Facebook
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleShare('twitter')}
                          className="justify-start"
                        >
                          <Twitter className="h-4 w-4 mr-2" />
                          Twitter
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleShare('whatsapp')}
                          className="justify-start"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleShare('email')}
                          className="justify-start"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Descargar Diseño</DialogTitle>
                    <DialogDescription>
                      Selecciona el formato de descarga
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => handleDownload('png')}
                      className="justify-start"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      PNG (Web)
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleDownload('jpg')}
                      className="justify-start"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      JPG (Web)
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleDownload('pdf')}
                      className="justify-start"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      PDF (Imprimir)
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleDownload('svg')}
                      className="justify-start"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      SVG (Vector)
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Preview del diseño */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Vista Previa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                  <div className="bg-white shadow-2xl rounded-lg overflow-hidden max-w-md w-full">
                    <div className="aspect-[3/4] relative">
                      <img
                        src={design.previewUrl}
                        alt={design.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/400x533/f3f4f6/6b7280?text=${encodeURIComponent(design.name)}`;
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Información del diseño */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información del Diseño</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nombre</label>
                  <p className="text-gray-900">{design.name}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Plantilla Base</label>
                  <p className="text-gray-900">{design.templateName}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Categoría</label>
                  <Badge variant="outline" className="capitalize">
                    {design.category}
                  </Badge>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Tamaño</label>
                  <p className="text-gray-900">{design.size}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Última modificación</label>
                  <p className="text-gray-900">
                    {new Date(design.updatedAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Capas del Diseño</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {design.layers.map((layer, index) => (
                    <div key={layer.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium text-pink-600">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {layer.name}
                        </div>
                        <div className="text-sm text-gray-500 capitalize">
                          {layer.type}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Código QR</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Comparte tu invitación escaneando este código QR
                </p>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar QR
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
