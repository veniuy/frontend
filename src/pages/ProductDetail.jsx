import React, { useState } from 'react'
import PublicHeader from '../components/PublicHeader'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../components/ui/breadcrumb'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion'
import { 
  Heart, 
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Palette,
  FileImage,
  Calendar,
  X as CloseIcon
} from 'lucide-react'

import { asset, ph, onImgError } from '../utils/assets';

function ProductDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedFormat, setSelectedFormat] = useState('small')
  const [selectedPaper, setSelectedPaper] = useState('photo')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)

  // Mock product data - en app real viene de API
  const product = {
    id: 1,
    name: "Cuadro foto personalizado Jazmín",
    category: "Productos con fotos",
    images: [
      '/src/assets/te_espero_images/producto_jazmin_cuadro.webp',
      '/src/assets/te_espero_images/categoria_productos_fotos.webp',
      '/src/assets/te_espero_images/album_le_petit_quotidien.webp'
    ],
    price: 46.00,
    badge: "Nuevo",
    rating: 4.8,
    reviews: 124,
    description: "Momentos maravillosos, instantes que recordarás siempre... Enmárcalos en este cuadro con foto único. Impresa en un papel fotográfico de alta calidad, tu foto favorita (en horizontal o en vertical) se destacará gracias a nuestro paspartú de toque elegante. Su cuadro en cristal y su marco en roble darán a tus fotos un acabado digno de una galería de arte.",
    features: [
      "Papel fotográfico de alta calidad (190 g/m²)",
      "Marco en roble natural",
      "Cristal protector incluido",
      "Paspartú elegante",
      "Montaje incluido",
      "Orientación vertical u horizontal"
    ],
    formats: [
      { id: 'small', name: 'Pequeño marco vertical', size: '20x30 cm', price: 46.00 },
      { id: 'medium', name: 'Marco mediano', size: '30x40 cm', price: 65.00 },
      { id: 'large', name: 'Marco grande', size: '40x50 cm', price: 89.00 }
    ],
    papers: [
      { id: 'photo', name: 'Fotográfico de alta gama', weight: '190 g/m²' },
      { id: 'premium', name: 'Premium mate', weight: '280 g/m²' },
      { id: 'silk', name: 'Efecto sedoso', weight: '350 g/m²' }
    ],
    deliveryDate: "16 de septiembre - 17 de septiembre",
    klarna: {
      available: true,
      installments: 3,
      amount: 15.33
    }
  }

  const relatedProducts = [
    { id: 2, name: "Cuadro Pequeño mensaje", image: '/src/assets/te_espero_images/album_le_petit_quotidien.webp', price: "46,00 €" },
    { id: 3, name: "Cuadro Floral", image: '/src/assets/te_espero_images/categoria_productos_fotos.webp', price: "46,00 €" },
    { id: 4, name: "Cuadro Pure", image: '/src/assets/te_espero_images/novedades_boda.webp', price: "44,00 €" }
  ]

  const getCurrentPrice = () => {
    const format = product.formats.find(f => f.id === selectedFormat)
    return format ? format.price * quantity : product.price * quantity
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => prev === product.images.length - 1 ? 0 : prev + 1)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => prev === 0 ? product.images.length - 1 : prev - 1)
  }

  const openPreview = () => setPreviewOpen(true)
  const closePreview = () => setPreviewOpen(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <PublicHeader />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/">Inicio</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="/products">Foto</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbLink href="/products/cuadros">Cuadro foto personalizado</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Jazmín</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 md:pb-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => onImgError(e, product.name)}
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-pink-600 text-white">
                  {product.badge}
                </Badge>
              )}
              
              {/* Flechas */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Thumbnails */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${currentImageIndex === index ? 'border-pink-600' : 'border-gray-200'}`}
                  aria-label={`Imagen ${index + 1}`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => onImgError(e, product.name)}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.badge && <Badge className="bg-pink-600 text-white">{product.badge}</Badge>}
                <span className="text-gray-600">·</span>
                <span className="text-gray-600">{product.category}</span>
              </div>
              
              <h1 className="text-3xl font-serif font-medium text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">
                  {product.rating} ({product.reviews} valoraciones)
                </span>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <FileImage className="w-5 h-5 text-gray-600" />
                <span className="text-gray-600">montaje incluido</span>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-6">
              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad: {quantity} ({getCurrentPrice().toFixed(2)} €)
                </label>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Paper Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Palette className="w-4 h-4 inline mr-2" />
                  Papel: {product.papers.find(p => p.id === selectedPaper)?.name} ({product.papers.find(p => p.id === selectedPaper)?.weight})
                </label>
                <Select value={selectedPaper} onValueChange={setSelectedPaper}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {product.papers.map((paper) => (
                      <SelectItem key={paper.id} value={paper.id}>
                        {paper.name} ({paper.weight})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Format */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formato: {product.formats.find(f => f.id === selectedFormat)?.name} ({product.formats.find(f => f.id === selectedFormat)?.size})
                </label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {product.formats.map((format) => (
                      <SelectItem key={format.id} value={format.id}>
                        {format.name} ({format.size}) - {format.price.toFixed(2)} €
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price and CTA (desktop / tablet) */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{getCurrentPrice().toFixed(2)} €</p>
                  <p className="text-sm text-gray-600">/ unidad a {(getCurrentPrice() / quantity).toFixed(2)} €</p>
                </div>
                <Heart className="w-6 h-6 text-gray-400 hover:text-pink-600 cursor-pointer" />
              </div>

              <Button 
                size="lg" 
                className="w-full bg-green-700 hover:bg-green-800 text-white mb-4"
                onClick={() => navigate(`/login?redirect=/personalizar/${id || product.id}`)}
              >
                <Palette className="w-5 h-5 mr-2" />
                PERSONALIZAR
              </Button>

              {/* Klarna */}
              {product.klarna.available && (
                <div className="bg-pink-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>3 pagos de {product.klarna.amount.toFixed(2)} €</strong> al 0 % de interés con Klarna
                  </p>
                  <a href="#" className="text-pink-600 text-sm underline">Más información</a>
                </div>
              )}

              {/* Delivery Info */}
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Truck className="w-4 h-4 mr-2" />
                <span>Fecha de entrega: {product.deliveryDate}</span>
              </div>
            </div>

            {/* Product Details */}
            <Accordion type="single" collapsible className="border-t pt-6">
              <AccordionItem value="description">
                <AccordionTrigger className="text-left">Descripción</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-pink-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="control">
                <AccordionTrigger className="text-left">Opción control</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 leading-relaxed">
                    Con esta opción nuestros diseñadores profesionales revisarán tu pedido antes de la impresión 
                    para asegurar la mejor calidad posible. Te contactaremos si detectamos algún problema 
                    con la resolución o composición de tu imagen.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping">
                <AccordionTrigger className="text-left">Envío y devoluciones</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-sm text-gray-600">
                    <div className="flex items-start">
                      <Truck className="w-4 h-4 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Envío gratuito</p>
                        <p>En pedidos superiores a 50€</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <RotateCcw className="w-4 h-4 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Devoluciones</p>
                        <p>Los productos personalizados no admiten devolución salvo defecto de fabricación</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Shield className="w-4 h-4 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Garantía de calidad</p>
                        <p>Productos fabricados con materiales de primera calidad</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif font-medium text-gray-900 mb-8">Productos relacionados</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => onImgError(e, relatedProduct.name)}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{relatedProduct.name}</h3>
                  <p className="font-semibold text-gray-900">{relatedProduct.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* -------- Barra fija inferior SOLO móvil -------- */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 md:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full" onClick={openPreview}>
              Visualizar
            </Button>
            <Button className="w-full" onClick={() => navigate(`/login?redirect=/personalizar/${id || product.id}`)}>
              Personalizar
            </Button>
          </div>
        </div>
      </div>

      {/* -------- Lightbox de Visualización -------- */}
      {previewOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/70" onClick={closePreview} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl aspect-[4/3] bg-black rounded-lg overflow-hidden">
              <img
                src={product.images[currentImageIndex]}
                alt={`Preview ${currentImageIndex + 1}`}
                className="absolute inset-0 w-full h-full object-contain"
                onError={(e) => onImgError(e, product.name)}
              />
              <button
                className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow"
                onClick={closePreview}
                aria-label="Cerrar"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
              <button
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white"
                onClick={prevImage}
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white"
                onClick={nextImage}
                aria-label="Siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductDetail
