import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { 
  Heart,
  MapPin,
  Calendar,
  Clock,
  Music,
  Camera,
  Share2,
  Download,
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Users,
  Gift,
  Phone,
  Mail,
  Instagram,
  Facebook,
  CheckCircle,
  X,
  ChevronDown,
  Church,
  PartyPopper,
  CreditCard,
  MessageCircle,
  Leaf
} from 'lucide-react'

function DemoClassic() {
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showRSVP, setShowRSVP] = useState(false)
  const [showGifts, setShowGifts] = useState(false)
  const [rsvpData, setRsvpData] = useState({
    name: '',
    email: '',
    attendance: '',
    guests: 1,
    message: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const weddingData = {
    couple: {
      bride: "Agus",
      groom: "Santi"
    },
    date: "22 de Noviembre, 2024",
    ceremony: {
      time: "19:00 hs",
      venue: "Catedral de San Isidro",
      location: "San Isidro, Buenos Aires",
      address: "Av. del Libertador 16200, San Isidro"
    },
    reception: {
      time: "Después de la ceremonia",
      venue: "Espacio Tigre",
      location: "Tigre, Buenos Aires",
      address: "Paseo Victorica 972, Tigre"
    }
  }

  const handleRSVPSubmit = (e) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setShowRSVP(false)
      setRsvpData({
        name: '',
        email: '',
        attendance: '',
        guests: 1,
        message: ''
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con controles */}
      <div className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/products')}
          className="bg-white/90 backdrop-blur-sm shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white/90 backdrop-blur-sm shadow-lg"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="bg-white/90 backdrop-blur-sm shadow-lg"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Badge className="bg-sage-600 text-white shadow-lg">
            DEMO CLÁSICA
          </Badge>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-sage-50">
        {/* Contenido principal */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            {/* Texto superior curvado */}
            <div className="mb-8">
              <svg viewBox="0 0 400 100" className="w-80 h-20 mx-auto">
                <path
                  id="curve"
                  d="M 50 50 Q 200 20 350 50"
                  fill="none"
                  stroke="none"
                />
                <text className="text-sm fill-gray-600 font-light tracking-widest">
                  <textPath href="#curve" startOffset="50%" textAnchor="middle">
                    ¡NOS CASAMOS!
                  </textPath>
                </text>
              </svg>
            </div>
            
            {/* Nombres de la pareja */}
            <h1 className="font-display text-6xl md:text-8xl font-light text-gray-800 mb-8 tracking-wide">
              {weddingData.couple.bride} y {weddingData.couple.groom}
            </h1>
            
            {/* Elemento floral central */}
            <div className="my-12 flex justify-center">
              <div className="w-32 h-32 relative">
                <img 
                  src="/src/assets/cotton_bird_images/categoria_boda_grid.webp"
                  alt="Elemento floral"
                  className="w-full h-full object-cover rounded-full opacity-60"
                  style={{ filter: 'sepia(100%) hue-rotate(90deg) saturate(120%)' }}
                />
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="animate-bounce">
              <ChevronDown className="w-8 h-8 text-sage-600 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Ceremonia */}
            <div className="text-center">
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Church className="w-8 h-8 text-sage-600" />
              </div>
              <h3 className="text-2xl font-display font-medium text-gray-800 mb-8 tracking-wide">
                Ceremonia
              </h3>
              <div className="space-y-3 text-gray-600 mb-10">
                <p className="text-lg">{weddingData.date}</p>
                <p className="text-lg">{weddingData.ceremony.time}</p>
                <p className="font-medium text-gray-800">{weddingData.ceremony.venue}</p>
                <p>{weddingData.ceremony.location}</p>
                <p className="text-sm">Recibí debajo las indicaciones para llegar.</p>
              </div>
              <Button 
                className="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3 rounded-full font-light tracking-wide"
                onClick={() => window.open(`https://maps.google.com/?q=${weddingData.ceremony.address}`, '_blank')}
              >
                LLEGAR A LA CEREMONIA
              </Button>
            </div>

            {/* Fiesta */}
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <PartyPopper className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-display font-medium text-gray-800 mb-8 tracking-wide">
                Fiesta
              </h3>
              <div className="space-y-3 text-gray-600 mb-10">
                <p className="text-lg">{weddingData.reception.time}</p>
                <p className="font-medium text-gray-800">{weddingData.reception.venue}</p>
                <p>{weddingData.reception.location}</p>
                <p className="text-lg font-medium text-sage-600">¡Te esperamos!</p>
              </div>
              <Button 
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-light tracking-wide"
                onClick={() => window.open(`https://maps.google.com/?q=${weddingData.reception.address}`, '_blank')}
              >
                LLEGAR A LA FIESTA
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Nosotros Section */}
      <section className="py-20 bg-gradient-to-br from-sage-50 to-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 mb-8">
              Si deseás realizarnos un regalo podés colaborar con nuestra Luna de Miel...
            </p>
            <Button 
              variant="outline"
              className="border-sage-600 text-sage-600 hover:bg-sage-50 px-8 py-3 rounded-full font-light tracking-wide"
              onClick={() => setShowGifts(true)}
            >
              Ver Datos Bancarios
            </Button>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-20 bg-sage-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-light mb-8 tracking-wide">
            CONFIRMACIÓN DE ASISTENCIA
          </h2>
          <p className="text-lg mb-10 max-w-2xl mx-auto font-light">
            Esperamos que seas parte de esta gran celebración. ¡Confirmanos tu asistencia!
          </p>
          <Button 
            className="bg-white text-sage-600 hover:bg-gray-100 px-10 py-4 rounded-full font-medium tracking-wide"
            onClick={() => setShowRSVP(true)}
          >
            Confirmar asistencia
          </Button>
        </div>
      </section>

      {/* Decorative Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-8">
            <div className="w-24 h-px bg-sage-300"></div>
            <Leaf className="w-8 h-8 text-sage-500" />
            <div className="w-24 h-px bg-sage-300"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg mb-8 font-light">
            ¡Gracias por acompañarnos en este momento tan importante!
          </p>
          
          <div className="border-t border-gray-600 pt-8">
            <p className="text-sm text-gray-400 mb-4">
              Invitación digital creada con ❤️ por <span className="text-sage-400 font-medium">Venite</span>
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-gray-800">
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
              <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-gray-800">
                <Download className="w-4 h-4 mr-2" />
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal RSVP */}
      {showRSVP && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium text-gray-800">Confirmar Asistencia</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowRSVP(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {showSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    ¡Confirmación Recibida!
                  </h4>
                  <p className="text-gray-600">
                    Gracias por confirmar tu asistencia. ¡Te esperamos!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRSVPSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo *
                    </label>
                    <Input
                      required
                      value={rsvpData.name}
                      onChange={(e) => setRsvpData({...rsvpData, name: e.target.value})}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={rsvpData.email}
                      onChange={(e) => setRsvpData({...rsvpData, email: e.target.value})}
                      placeholder="tu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ¿Asistirás? *
                    </label>
                    <select 
                      required
                      value={rsvpData.attendance}
                      onChange={(e) => setRsvpData({...rsvpData, attendance: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="yes">Sí, asistiré</option>
                      <option value="no">No podré asistir</option>
                    </select>
                  </div>
                  
                  {rsvpData.attendance === 'yes' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número de acompañantes
                      </label>
                      <Input
                        type="number"
                        min="0"
                        max="5"
                        value={rsvpData.guests}
                        onChange={(e) => setRsvpData({...rsvpData, guests: parseInt(e.target.value)})}
                      />
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje (opcional)
                    </label>
                    <Textarea
                      value={rsvpData.message}
                      onChange={(e) => setRsvpData({...rsvpData, message: e.target.value})}
                      placeholder="Déjanos un mensaje..."
                      rows={3}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700 text-white">
                    <Heart className="w-4 h-4 mr-2" />
                    Confirmar Asistencia
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal Datos Bancarios */}
      {showGifts && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-medium text-gray-800">Datos Bancarios</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowGifts(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <CreditCard className="w-12 h-12 text-sage-600 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Si deseás colaborar con nuestra Luna de Miel:
                  </p>
                </div>
                
                <div className="bg-sage-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Transferencia Bancaria</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Banco:</strong> Banco Galicia</p>
                    <p><strong>CBU:</strong> 0070599520000011223344</p>
                    <p><strong>Alias:</strong> AGUS.SANTI.BODA</p>
                    <p><strong>Titular:</strong> Agustina López</p>
                  </div>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Mercado Pago</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>CVU:</strong> 0000003100011223344556</p>
                    <p><strong>Alias:</strong> AGUS.MP</p>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  ¡Tu presencia es nuestro mejor regalo!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default DemoClassic
