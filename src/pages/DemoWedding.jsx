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
  X
} from 'lucide-react'

function DemoWedding() {
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showRSVP, setShowRSVP] = useState(false)
  const [rsvpData, setRsvpData] = useState({
    name: '',
    email: '',
    attendance: '',
    guests: 1,
    message: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  // Simular música de fondo
  useEffect(() => {
    if (isPlaying && !isMuted) {
      // Aquí iría la lógica de reproducción de música
      console.log('Reproduciendo música de boda...')
    }
  }, [isPlaying, isMuted])

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

  const weddingData = {
    couple: {
      bride: "Isabella",
      groom: "Alejandro"
    },
    date: "15 de Junio, 2024",
    time: "17:00",
    ceremony: {
      venue: "Iglesia San Miguel",
      address: "Calle Mayor 123, Madrid",
      time: "17:00"
    },
    reception: {
      venue: "Hacienda Los Olivos",
      address: "Carretera de Toledo Km 15, Madrid",
      time: "19:30"
    },
    hashtag: "#IsabellaYAlejandro2024"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
      {/* Header con controles */}
      <div className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/products')}
          className="bg-white/90 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white/90 backdrop-blur-sm"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="bg-white/90 backdrop-blur-sm"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Badge className="bg-primary text-primary-foreground">
            DEMO
          </Badge>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background con overlay */}
        <div className="absolute inset-0">
          <img 
            src="/src/assets/cotton_bird_images/hero_boda_invitaciones.webp"
            alt="Fondo de boda"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/60"></div>
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Animación de entrada */}
          <div className="animate-fade-in-up">
            <div className="mb-8">
              <Heart className="w-16 h-16 text-rose-400 mx-auto mb-6 animate-pulse" />
            </div>
            
            <h1 className="font-display text-6xl md:text-8xl font-light text-gray-800 mb-4">
              {weddingData.couple.bride}
              <span className="block text-4xl md:text-5xl text-rose-400 my-4">&</span>
              {weddingData.couple.groom}
            </h1>
            
            <div className="w-32 h-px bg-rose-400 mx-auto mb-8"></div>
            
            <p className="text-2xl md:text-3xl text-gray-600 mb-8 font-light">
              Nos casamos
            </p>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-xl">
              <div className="flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-rose-400 mr-3" />
                <span className="text-xl font-medium text-gray-800">
                  {weddingData.date}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <Clock className="w-6 h-6 text-rose-400 mr-3" />
                <span className="text-xl font-medium text-gray-800">
                  {weddingData.time}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-rose-400 hover:bg-rose-500 text-white px-8 py-4 text-lg"
                onClick={() => setShowRSVP(true)}
              >
                <Heart className="w-5 h-5 mr-2" />
                Confirmar Asistencia
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-rose-400 text-rose-400 hover:bg-rose-50 px-8 py-4 text-lg"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Ver Ubicación
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-rose-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-rose-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Información del evento */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-display font-light text-center text-gray-800 mb-12">
            Detalles del Evento
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ceremonia */}
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-medium text-gray-800">
                    Ceremonia
                  </h3>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-rose-400 mr-3 mt-1" />
                    <div>
                      <p className="font-medium text-gray-800">{weddingData.ceremony.venue}</p>
                      <p className="text-gray-600 text-sm">{weddingData.ceremony.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-rose-400 mr-3" />
                    <span className="text-gray-800">{weddingData.ceremony.time}</span>
                  </div>
                  <Button className="w-full bg-rose-400 hover:bg-rose-500 text-white">
                    <MapPin className="w-4 h-4 mr-2" />
                    Abrir en Maps
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recepción */}
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-medium text-gray-800">
                    Recepción
                  </h3>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-amber-400 mr-3 mt-1" />
                    <div>
                      <p className="font-medium text-gray-800">{weddingData.reception.venue}</p>
                      <p className="text-gray-600 text-sm">{weddingData.reception.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-amber-400 mr-3" />
                    <span className="text-gray-800">{weddingData.reception.time}</span>
                  </div>
                  <Button className="w-full bg-amber-400 hover:bg-amber-500 text-white">
                    <MapPin className="w-4 h-4 mr-2" />
                    Abrir en Maps
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Galería de fotos */}
      <section className="py-16 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-display font-light text-center text-gray-800 mb-12">
            Nuestra Historia
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                <img 
                  src={`/src/assets/cotton_bird_images/categoria_boda_grid.webp`}
                  alt={`Foto ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="border-rose-400 text-rose-400 hover:bg-rose-50">
              <Camera className="w-4 h-4 mr-2" />
              Ver todas las fotos
            </Button>
          </div>
        </div>
      </section>

      {/* Información adicional */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Lista de regalos */}
            <Card className="text-center p-6 shadow-lg">
              <Gift className="w-12 h-12 text-rose-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">Lista de Regalos</h3>
              <p className="text-gray-600 text-sm mb-4">
                Tu presencia es nuestro regalo, pero si deseas obsequiarnos algo...
              </p>
              <Button variant="outline" className="border-rose-400 text-rose-400">
                Ver Lista
              </Button>
            </Card>

            {/* Hashtag */}
            <Card className="text-center p-6 shadow-lg">
              <Instagram className="w-12 h-12 text-rose-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">Comparte el Momento</h3>
              <p className="text-gray-600 text-sm mb-4">
                Usa nuestro hashtag en redes sociales
              </p>
              <Badge className="bg-rose-100 text-rose-600 text-lg px-4 py-2">
                {weddingData.hashtag}
              </Badge>
            </Card>

            {/* Contacto */}
            <Card className="text-center p-6 shadow-lg">
              <Phone className="w-12 h-12 text-rose-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">¿Dudas?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Contáctanos para cualquier consulta
              </p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg mb-4">
            Con amor, {weddingData.couple.bride} & {weddingData.couple.groom}
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-gray-800">
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
            <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-gray-800">
              <Download className="w-4 h-4 mr-2" />
              Guardar Fecha
            </Button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-600">
            <p className="text-sm text-gray-400">
              Invitación digital creada con ❤️ por <span className="text-rose-400 font-medium">Venite</span>
            </p>
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
                  
                  <Button type="submit" className="w-full bg-rose-400 hover:bg-rose-500 text-white">
                    <Heart className="w-4 h-4 mr-2" />
                    Confirmar Asistencia
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default DemoWedding
