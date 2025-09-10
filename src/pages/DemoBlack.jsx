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
  MessageCircle
} from 'lucide-react'

function DemoBlack() {
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
  const [timeLeft, setTimeLeft] = useState({
    days: 74,
    hours: 6,
    minutes: 12,
    seconds: 21
  })

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const weddingData = {
    couple: {
      bride: "Belén",
      groom: "Amadeo"
    },
    date: "23 de Noviembre, 2024",
    ceremony: {
      time: "19:00 hs",
      venue: "Iglesia Nuestra Señora del Carmen",
      location: "Villa Allende, Córdoba",
      address: "Av. San Martín 456, Villa Allende"
    },
    reception: {
      time: "Después de la ceremonia",
      venue: "Rincón Calina",
      location: "Unquillo, Córdoba",
      address: "Ruta Provincial E-53 Km 8, Unquillo"
    },
    hashtag: "#beluyamador",
    dressCode: "Vestimenta formal, elegante"
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
          <Badge className="bg-green-600 text-white shadow-lg">
            DEMO BLACK
          </Badge>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-100">
        {/* Elementos florales decorativos */}
        <div className="absolute top-0 left-0 w-96 h-96 opacity-30">
          <img 
            src="/src/assets/cotton_bird_images/categoria_boda_grid.webp"
            alt="Elementos florales"
            className="w-full h-full object-cover"
            style={{ filter: 'sepia(100%) hue-rotate(90deg) saturate(150%)' }}
          />
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-30 transform rotate-180">
          <img 
            src="/src/assets/cotton_bird_images/categoria_boda_grid.webp"
            alt="Elementos florales"
            className="w-full h-full object-cover"
            style={{ filter: 'sepia(100%) hue-rotate(90deg) saturate(150%)' }}
          />
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            {/* Nombres de la pareja */}
            <h1 className="font-display text-6xl md:text-8xl font-light text-gray-800 mb-4 tracking-wider">
              {weddingData.couple.bride.toUpperCase()}
            </h1>
            
            {/* Símbolo decorativo */}
            <div className="flex items-center justify-center my-8">
              <div className="w-16 h-px bg-gray-400"></div>
              <div className="mx-4 text-4xl text-green-600 font-light">∞</div>
              <div className="w-16 h-px bg-gray-400"></div>
            </div>
            
            <h1 className="font-display text-6xl md:text-8xl font-light text-gray-800 mb-8 tracking-wider">
              {weddingData.couple.groom.toUpperCase()}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 font-light tracking-wide">
              ¡NOS CASAMOS!
            </p>
            
            {/* Scroll indicator */}
            <div className="animate-bounce">
              <ChevronDown className="w-8 h-8 text-green-600 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-light mb-8 tracking-wide">
            Bienvenidos a nuestra boda
          </h2>
          
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-light mb-2">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base opacity-90">días</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-light mb-2">:</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-light mb-2">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base opacity-90">hs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-light mb-2">:</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-light mb-2">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base opacity-90">min</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-light mb-2">:</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-6xl font-light mb-2">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base opacity-90">seg</div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Ceremonia */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Church className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-display font-medium text-gray-800 mb-6 tracking-wide">
                CEREMONIA
              </h3>
              <div className="space-y-3 text-gray-600 mb-8">
                <p className="text-lg">{weddingData.date}</p>
                <p className="text-lg">{weddingData.ceremony.time}</p>
                <p className="font-medium">{weddingData.ceremony.venue}</p>
                <p>{weddingData.ceremony.location}</p>
                <p className="text-sm">Recibí debajo las indicaciones para llegar.</p>
              </div>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full"
                onClick={() => window.open(`https://maps.google.com/?q=${weddingData.ceremony.address}`, '_blank')}
              >
                LLEGAR A LA CEREMONIA
              </Button>
            </div>

            {/* Fiesta */}
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <PartyPopper className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-display font-medium text-gray-800 mb-6 tracking-wide">
                FIESTA
              </h3>
              <div className="space-y-3 text-gray-600 mb-8">
                <p className="text-lg">{weddingData.reception.time}</p>
                <p className="font-medium">{weddingData.reception.venue}</p>
                <p>{weddingData.reception.location}</p>
                <p className="text-lg font-medium text-green-600">¡Te esperamos!</p>
              </div>
              <Button 
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full"
                onClick={() => window.open(`https://maps.google.com/?q=${weddingData.reception.address}`, '_blank')}
              >
                LLEGAR A LA FIESTA
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Nosotros Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-medium text-gray-800 mb-8 tracking-wide">
            NOSOTROS...
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Si deseás realizarnos un regalo podés colaborar con nuestra Luna de Miel...
          </p>
          <Button 
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-full"
            onClick={() => setShowGifts(true)}
          >
            Ver Datos Bancarios
          </Button>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Instagram className="w-8 h-8 text-pink-600" />
          </div>
          <h2 className="text-2xl font-display font-medium text-gray-800 mb-4">
            @{weddingData.hashtag.replace('#', '')}
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            ¡Preparate para nuestro gran día!<br />
            Ya podés seguirnos en nuestra cuenta para ver todas las novedades del casamiento y etiquetarnos en tus fotos y videos.
          </p>
          <Button 
            className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full"
            onClick={() => window.open('https://instagram.com', '_blank')}
          >
            Ver en Instagram
          </Button>
        </div>
      </section>

      {/* Dress Code */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-medium mb-4 tracking-wide">
            DRESS CODE
          </h2>
          <p className="text-lg">
            {weddingData.dressCode}
          </p>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-medium mb-6 tracking-wide">
            CONFIRMACIÓN DE ASISTENCIA
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Esperamos que seas parte de esta gran celebración. ¡Confirmanos tu asistencia!
          </p>
          <Button 
            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-full font-medium"
            onClick={() => setShowRSVP(true)}
          >
            Confirmar asistencia
          </Button>
          
          <div className="mt-8 pt-8 border-t border-green-500">
            <p className="text-lg">
              ¡Agendá la fecha en tu calendario!
            </p>
            <Button 
              variant="outline"
              className="mt-4 border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-full"
            >
              AGENDAR EVENTO
            </Button>
          </div>
        </div>
      </section>

      {/* Music Suggestions */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-medium text-gray-800 mb-6 tracking-wide">
            ¿QUÉ CANCIONES NO PUEDEN FALTAR?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            ¡Ayudanos sugiriendo las canciones que pensás que no pueden faltar en la fiesta!
          </p>
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full"
          >
            <Music className="w-4 h-4 mr-2" />
            Sugerir canción
          </Button>
        </div>
      </section>

      {/* Info Útil */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-medium text-gray-800 mb-6 tracking-wide">
            INFO ÚTIL
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Te dejamos sugerencias de alojamientos y traslados para que aproveches ese fin de semana al máximo.
          </p>
          <Button 
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-full"
          >
            VER MÁS
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg mb-8">
            ¡Gracias por acompañarnos en este momento tan importante!
          </p>
          
          <div className="border-t border-gray-600 pt-8">
            <p className="text-sm text-gray-400 mb-4">
              Invitación digital creada con ❤️ por <span className="text-green-400 font-medium">Venite</span>
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
                  
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
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
                  <CreditCard className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Si deseás colaborar con nuestra Luna de Miel, podés hacerlo a través de:
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Transferencia Bancaria</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Banco:</strong> Banco Nación</p>
                    <p><strong>CBU:</strong> 0110599520000012345678</p>
                    <p><strong>Alias:</strong> BELU.AMADEO.BODA</p>
                    <p><strong>Titular:</strong> Belén García</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Mercado Pago</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>CVU:</strong> 0000003100012345678901</p>
                    <p><strong>Alias:</strong> BELU.MP</p>
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

export default DemoBlack
