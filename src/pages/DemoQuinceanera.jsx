import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { 
  Crown,
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
  Sparkles,
  Star
} from 'lucide-react'

function DemoQuinceanera() {
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

  const quinceaneraData = {
    name: "Sofía",
    date: "22 de Septiembre, 2024",
    time: "19:00",
    venue: "Salón de Eventos Crystal",
    address: "Avenida Libertador 456, Buenos Aires",
    theme: "Princesa Dorada",
    hashtag: "#Sofia15Anos"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
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
          <Badge className="bg-purple-600 text-white">
            DEMO QUINCEAÑERA
          </Badge>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background con overlay */}
        <div className="absolute inset-0">
          <img 
            src="/src/assets/cotton_bird_images/categoria_bebes_ninos.webp"
            alt="Fondo de quinceañera"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-yellow-900/40"></div>
        </div>

        {/* Estrellas animadas */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <Star 
              key={i}
              className={`absolute text-yellow-300 animate-pulse`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${Math.random() * 10 + 10}px`
              }}
            />
          ))}
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            {/* Corona animada */}
            <div className="mb-8">
              <Crown className="w-20 h-20 text-yellow-400 mx-auto mb-6 animate-bounce" />
            </div>
            
            <h1 className="font-display text-7xl md:text-9xl font-light text-white mb-6 drop-shadow-2xl">
              {quinceaneraData.name}
            </h1>
            
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-px bg-yellow-400"></div>
              <Sparkles className="w-8 h-8 text-yellow-400 mx-4" />
              <div className="w-16 h-px bg-yellow-400"></div>
            </div>
            
            <p className="text-3xl md:text-4xl text-white mb-8 font-light drop-shadow-lg">
              Mis 15 Años
            </p>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-2xl border border-yellow-400/30">
              <div className="flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-purple-600 mr-3" />
                <span className="text-xl font-medium text-gray-800">
                  {quinceaneraData.date}
                </span>
              </div>
              <div className="flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-purple-600 mr-3" />
                <span className="text-xl font-medium text-gray-800">
                  {quinceaneraData.time}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <Crown className="w-6 h-6 text-yellow-500 mr-3" />
                <span className="text-lg text-gray-700">
                  Tema: {quinceaneraData.theme}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg shadow-xl"
                onClick={() => setShowRSVP(true)}
              >
                <Crown className="w-5 h-5 mr-2" />
                Confirmar Asistencia
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-50 px-8 py-4 text-lg bg-white/90"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Ver Ubicación
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Cuenta regresiva */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-light mb-8">
            ¡Faltan pocos días para la gran celebración!
          </h2>
          
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { value: '15', label: 'Días' },
              { value: '08', label: 'Horas' },
              { value: '32', label: 'Minutos' },
              { value: '45', label: 'Segundos' }
            ].map((item, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <div className="text-3xl md:text-4xl font-bold">{item.value}</div>
                <div className="text-sm opacity-90">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Información del evento */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-display font-light text-center text-gray-800 mb-12">
            Detalles de la Celebración
          </h2>
          
          <Card className="overflow-hidden shadow-2xl">
            <div className="h-64 bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative text-center">
                <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-3xl font-display font-medium text-gray-800">
                  Gran Celebración
                </h3>
              </div>
            </div>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-purple-500 mr-4 mt-1" />
                    <div>
                      <p className="font-medium text-gray-800 text-lg">{quinceaneraData.venue}</p>
                      <p className="text-gray-600">{quinceaneraData.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-6 h-6 text-purple-500 mr-4" />
                    <span className="text-gray-800 text-lg">{quinceaneraData.time}</span>
                  </div>
                  <div className="flex items-center">
                    <Crown className="w-6 h-6 text-yellow-500 mr-4" />
                    <span className="text-gray-800 text-lg">Código de vestimenta: Elegante</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    <MapPin className="w-4 h-4 mr-2" />
                    Abrir en Google Maps
                  </Button>
                  <Button variant="outline" className="w-full border-purple-500 text-purple-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    Agregar al Calendario
                  </Button>
                  <Button variant="outline" className="w-full border-yellow-500 text-yellow-500">
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartir Evento
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Protocolo del evento */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-display font-light text-center text-gray-800 mb-12">
            Protocolo de la Celebración
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                time: "19:00",
                event: "Recepción",
                description: "Bienvenida a los invitados con cóctel de honor",
                icon: Users,
                color: "purple"
              },
              {
                time: "20:00",
                event: "Vals de Honor",
                description: "Baile tradicional de los 15 años",
                icon: Music,
                color: "pink"
              },
              {
                time: "20:30",
                event: "Cena",
                description: "Deliciosa cena de tres tiempos",
                icon: Gift,
                color: "yellow"
              },
              {
                time: "22:00",
                event: "Fiesta",
                description: "¡A bailar toda la noche!",
                icon: Sparkles,
                color: "purple"
              },
              {
                time: "23:00",
                event: "Sorpresa",
                description: "Show especial para la quinceañera",
                icon: Star,
                color: "pink"
              },
              {
                time: "02:00",
                event: "Cierre",
                description: "Despedida con recuerdos inolvidables",
                icon: Camera,
                color: "yellow"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className={`w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className={`w-8 h-8 text-${item.color}-500`} />
                </div>
                <div className={`text-2xl font-bold text-${item.color}-600 mb-2`}>
                  {item.time}
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {item.event}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Galería de fotos */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-display font-light text-center text-gray-800 mb-12">
            Mis Momentos Especiales
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer relative">
                <img 
                  src={`/src/assets/cotton_bird_images/categoria_bebes_ninos.webp`}
                  alt={`Foto ${i}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-50">
              <Camera className="w-4 h-4 mr-2" />
              Ver todas las fotos
            </Button>
          </div>
        </div>
      </section>

      {/* Información adicional */}
      <section className="py-16 bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Lista de regalos */}
            <Card className="text-center p-6 shadow-lg">
              <Gift className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">Lista de Regalos</h3>
              <p className="text-gray-600 text-sm mb-4">
                Si deseas obsequiarme algo especial para mis 15 años...
              </p>
              <Button variant="outline" className="border-purple-500 text-purple-500">
                Ver Lista
              </Button>
            </Card>

            {/* Hashtag */}
            <Card className="text-center p-6 shadow-lg">
              <Instagram className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">Comparte el Momento</h3>
              <p className="text-gray-600 text-sm mb-4">
                Usa nuestro hashtag en redes sociales
              </p>
              <Badge className="bg-pink-100 text-pink-600 text-lg px-4 py-2">
                {quinceaneraData.hashtag}
              </Badge>
            </Card>

            {/* Contacto */}
            <Card className="text-center p-6 shadow-lg">
              <Phone className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
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
                  WhatsApp
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-800 to-pink-800 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <p className="text-lg mb-4">
            ¡Gracias por acompañarme en este día tan especial!
          </p>
          <p className="text-xl font-display">
            Con amor, {quinceaneraData.name} ✨
          </p>
          
          <div className="flex justify-center space-x-4 mt-6">
            <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-purple-800">
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
            <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-purple-800">
              <Download className="w-4 h-4 mr-2" />
              Guardar Fecha
            </Button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/30">
            <p className="text-sm text-purple-200">
              Invitación digital creada con ✨ por <span className="text-yellow-400 font-medium">Venite</span>
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
                    ¡Gracias por confirmar! Te esperamos en esta celebración especial.
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
                        max="3"
                        value={rsvpData.guests}
                        onChange={(e) => setRsvpData({...rsvpData, guests: parseInt(e.target.value)})}
                      />
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje para Sofía (opcional)
                    </label>
                    <Textarea
                      value={rsvpData.message}
                      onChange={(e) => setRsvpData({...rsvpData, message: e.target.value})}
                      placeholder="Déjale un mensaje especial..."
                      rows={3}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    <Crown className="w-4 h-4 mr-2" />
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

export default DemoQuinceanera
