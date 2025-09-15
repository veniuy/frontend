// src/pages/DemoBlack.jsx
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
  CreditCard
} from 'lucide-react'

// 👉 util para mapear rutas a /src/assets/* (mismo helper que en Quinceañera)
import { asset, onImgError } from '../utils/assets'

// ------------------------------------
// Paleta (elegante, consistente)
// ------------------------------------
const PALETTE = {
  ink: '#222222',
  text: '#2E2E2E',
  muted: '#6B7280',
  // Verde "sage"
  sage: '#8FAF86',
  sageDark: '#789B70',
  sageLight: '#E8F0E5',
  // Arena "almond"
  almond: '#D4B28A',
  almondDark: '#C59A6A',
  almondLight: '#F4E7D8',
  white: '#FFFFFF',
  paper: '#F8F8F6'
}

// (quedan definidos por si luego los usás)
const btnPrimary = `bg-[${PALETTE.sage}] hover:bg-[${PALETTE.sageDark}] text-white`
const btnOutline = `border-[${PALETTE.sage}] text-[${PALETTE.sage}] hover:bg-[${PALETTE.sageLight}]`

// Helper celda de tiempo
function TimeCell({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="font-light leading-none"
        style={{ fontSize: 'clamp(2.25rem, 7vw, 4.5rem)', color: PALETTE.white }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <div className="opacity-90 text-sm sm:text-base" style={{ color: PALETTE.white }}>
        {label}
      </div>
    </div>
  )
}

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

  // -----------------------------
  // Countdown (a una fecha real)
  // -----------------------------
  const targetDate = new Date('2024-11-23T19:00:00') // ajusta según tu evento
  const getDiff = () => {
    the_now: {
      const now = new Date()
      const diff = Math.max(0, targetDate.getTime() - now.getTime())
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)
      return { days, hours, minutes, seconds }
    }
  }
  const [timeLeft, setTimeLeft] = useState(getDiff())
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getDiff()), 1000)
    return () => clearInterval(t)
  }, [])

  const weddingData = {
    couple: { bride: 'Belén', groom: 'Amadeo' },
    date: '23 de Noviembre, 2024',
    ceremony: {
      time: '19:00 hs',
      venue: 'Iglesia Nuestra Señora del Carmen',
      location: 'Villa Allende, Córdoba',
      address: 'Av. San Martín 456, Villa Allende'
    },
    reception: {
      time: 'Después de la ceremonia',
      venue: 'Rincón Calina',
      location: 'Unquillo, Córdoba',
      address: 'Ruta Provincial E-53 Km 8, Unquillo'
    },
    hashtag: '#beluyamador',
    dressCode: 'Vestimenta formal, elegante'
  }

  const handleRSVPSubmit = (e) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setShowRSVP(false)
      setRsvpData({ name: '', email: '', attendance: '', guests: 1, message: '' })
    }, 2500)
  }

  // Assets (resueltos con helper + fallback onError)
  const paperTexture = asset('src/assets/portada.jpg')
  const floralTop = asset('src/assets/hero_top.png')
  const floralBottom = asset('src/assets/hero_bottom.png')

  return (
    <div className="min-h-screen" style={{ backgroundColor: PALETTE.paper }}>
      {/* Header con controles */}
      <div className="fixed top-4 left-4 right-4 z-50 flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/products')}
          className="backdrop-blur-sm shadow-lg"
          style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: PALETTE.sage, color: PALETTE.sage }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Button>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="backdrop-blur-sm shadow-lg"
            style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: PALETTE.sage, color: PALETTE.sage }}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="backdrop-blur-sm shadow-lg"
            style={{ backgroundColor: 'rgba(255,255,255,0.9)', borderColor: PALETTE.sage, color: PALETTE.sage }}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Badge style={{ backgroundColor: PALETTE.sage, color: PALETTE.white }} className="shadow-lg">
            DEMO BLACK
          </Badge>
        </div>
      </div>

      {/* Hero Section con textura y florales */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* textura papel */}
        <div className="absolute inset-0">
          <img
            src={paperTexture}
            onError={(e) => onImgError(e, 'Textura papel')}
            alt="Textura papel"
            className="absolute inset-0 w-full h-full object-cover object-center block"
          />
        </div>

        {/* florales decorativos (sin franjas) */}
        <div className="absolute top-0 left-0 w-[420px] h-[260px] opacity-80 pointer-events-none">
          <img
            src={floralTop}
            onError={(e) => onImgError(e, 'Decorativo superior')}
            alt="Decorativo superior"
            className="absolute inset-0 w-full h-full object-cover block"
          />
        </div>
        <div className="absolute bottom-0 right-0 w-[460px] h-[280px] opacity-80 pointer-events-none">
          <img
            src={floralBottom}
            onError={(e) => onImgError(e, 'Decorativo inferior')}
            alt="Decorativo inferior"
            className="absolute inset-0 w-full h-full object-cover block"
          />
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div>
            <h1
              className="font-display font-light mb-3 tracking-wider"
              style={{ color: PALETTE.ink, fontSize: 'clamp(2.75rem, 8vw, 6rem)' }}
            >
              {weddingData.couple.bride.toUpperCase()}
            </h1>

            <div className="flex items-center justify-center my-6">
              <div className="h-px w-16" style={{ backgroundColor: '#CFCFCF' }} />
              <div
                className="mx-4 font-light"
                style={{ color: PALETTE.sage, fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
              >
                ∞
              </div>
              <div className="h-px w-16" style={{ backgroundColor: '#CFCFCF' }} />
            </div>

            <h1
              className="font-display font-light mb-8 tracking-wider"
              style={{ color: PALETTE.ink, fontSize: 'clamp(2.75rem, 8vw, 6rem)' }}
            >
              {weddingData.couple.groom.toUpperCase()}
            </h1>

            <p
              className="font-light mb-10 tracking-wide"
              style={{ color: PALETTE.muted, fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)' }}
            >
              ¡NOS CASAMOS!
            </p>

            {/* Indicador scroll */}
            <div className="animate-bounce">
              <ChevronDown className="w-8 h-8 mx-auto" style={{ color: PALETTE.sage }} />
            </div>
          </div>
        </div>
      </section>

      {/* Countdown: grande, centrado, mobile-first */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: PALETTE.sage }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2
            className="font-light mb-6 sm:mb-8 tracking-wide"
            style={{ color: PALETTE.white, fontSize: 'clamp(1.25rem, 3.5vw, 1.875rem)' }}
          >
            Bienvenidos a nuestra boda
          </h2>

          <div className="flex items-stretch justify-center gap-5 sm:gap-8">
            <TimeCell value={timeLeft.days} label="días" />
            <div
              className="self-center font-light"
              style={{ color: PALETTE.white, fontSize: 'clamp(2rem, 7vw, 4rem)' }}
            >
              :
            </div>
            <TimeCell value={timeLeft.hours} label="hs" />
            <div
              className="self-center font-light"
              style={{ color: PALETTE.white, fontSize: 'clamp(2rem, 7vw, 4rem)' }}
            >
              :
            </div>
            <TimeCell value={timeLeft.minutes} label="min" />
            <div
              className="self-center font-light"
              style={{ color: PALETTE.white, fontSize: 'clamp(2rem, 7vw, 4rem)' }}
            >
              :
            </div>
            <TimeCell value={timeLeft.seconds} label="seg" />
          </div>
        </div>
      </section>

      {/* Detalles de evento (iconos mismo color) */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Ceremonia */}
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: PALETTE.sageLight }}
              >
                <Church className="w-8 h-8" style={{ color: PALETTE.sage }} />
              </div>
              <h3
                className="text-2xl font-display font-medium mb-6 tracking-wide"
                style={{ color: PALETTE.ink }}
              >
                CEREMONIA
              </h3>
              <div className="space-y-3 mb-8" style={{ color: PALETTE.text }}>
                <p className="text-lg">{weddingData.date}</p>
                <p className="text-lg">{weddingData.ceremony.time}</p>
                <p className="font-medium">{weddingData.ceremony.venue}</p>
                <p>{weddingData.ceremony.location}</p>
                <p className="text-sm" style={{ color: PALETTE.muted }}>
                  Recibí debajo las indicaciones para llegar.
                </p>
              </div>
              <Button
                className="px-8 py-3 rounded-full"
                style={{ backgroundColor: PALETTE.sage, color: PALETTE.white }}
                onClick={() =>
                  window.open(`https://maps.google.com/?q=${weddingData.ceremony.address}`, '_blank')
                }
              >
                LLEGAR A LA CEREMONIA
              </Button>
            </div>

            {/* Fiesta */}
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: PALETTE.sageLight }}
              >
                <PartyPopper className="w-8 h-8" style={{ color: PALETTE.sage }} />
              </div>
              <h3
                className="text-2xl font-display font-medium mb-6 tracking-wide"
                style={{ color: PALETTE.ink }}
              >
                FIESTA
              </h3>
              <div className="space-y-3 mb-8" style={{ color: PALETTE.text }}>
                <p className="text-lg">{weddingData.reception.time}</p>
                <p className="font-medium">{weddingData.reception.venue}</p>
                <p>{weddingData.reception.location}</p>
                <p className="text-lg font-medium" style={{ color: PALETTE.sage }}>
                  ¡Te esperamos!
                </p>
              </div>
              <Button
                className="px-8 py-3 rounded-full"
                style={{ backgroundColor: PALETTE.sage, color: PALETTE.white }}
                onClick={() =>
                  window.open(`https://maps.google.com/?q=${weddingData.reception.address}`, '_blank')
                }
              >
                LLEGAR A LA FIESTA
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección regalos (almond) */}
      <section className="py-16 text-center" style={{ backgroundColor: PALETTE.almond }}>
        <div className="max-w-3xl mx-auto px-4">
          <Gift className="w-10 h-10 mx-auto mb-6" style={{ color: PALETTE.white }} />
          <p
            className="mb-8"
            style={{ color: PALETTE.white, fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
          >
            Si deseás realizarnos un regalo podés colaborar con nuestra Luna de Miel…
          </p>
          <Button
            className="rounded-full px-8 py-3"
            style={{ backgroundColor: PALETTE.white, color: PALETTE.almondDark }}
            onClick={() => setShowGifts(true)}
          >
            VER DATOS BANCARIOS
          </Button>
        </div>
      </section>

      {/* Instagram */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: PALETTE.sageLight }}
          >
            <Instagram className="w-8 h-8" style={{ color: PALETTE.sage }} />
          </div>
          <h2 className="text-2xl font-display font-medium mb-4" style={{ color: PALETTE.ink }}>
            @{weddingData.hashtag.replace('#', '')}
          </h2>
          <p className="mb-6 max-w-2xl mx-auto" style={{ color: PALETTE.text }}>
            ¡Preparate para nuestro gran día! Ya podés seguirnos para ver todas las novedades del casamiento
            y etiquetarnos en tus fotos y videos.
          </p>
          <Button
            className="px-8 py-3 rounded-full"
            style={{ backgroundColor: PALETTE.sage, color: PALETTE.white }}
            onClick={() => window.open('https://instagram.com', '_blank')}
          >
            Ver en Instagram
          </Button>
        </div>
      </section>

      {/* Dress Code */}
      <section className="py-16" style={{ backgroundColor: '#1F2937', color: PALETTE.white }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-medium mb-4 tracking-wide">DRESS CODE</h2>
          <p className="text-lg">{weddingData.dressCode}</p>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-16" style={{ backgroundColor: PALETTE.sage, color: PALETTE.white }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-medium mb-6 tracking-wide">
            CONFIRMACIÓN DE ASISTENCIA
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Esperamos que seas parte de esta gran celebración. ¡Confirmanos tu asistencia!
          </p>
          <Button
            className="px-8 py-3 rounded-full font-medium"
            style={{ backgroundColor: PALETTE.white, color: PALETTE.sage }}
            onClick={() => setShowRSVP(true)}
          >
            Confirmar asistencia
          </Button>

          <div className="mt-8 pt-8" style={{ borderTop: `1px solid ${PALETTE.sageLight}` }}>
            <p className="text-lg">¡Agendá la fecha en tu calendario!</p>
            <Button
              variant="outline"
              className="mt-4 rounded-full px-8 py-3"
              style={{ borderColor: PALETTE.white, color: PALETTE.white }}
            >
              AGENDAR EVENTO
            </Button>
          </div>
        </div>
      </section>

      {/* Sugerencias musicales */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2
            className="text-2xl font-display font-medium mb-6 tracking-wide"
            style={{ color: PALETTE.ink }}
          >
            ¿QUÉ CANCIONES NO PUEDEN FALTAR?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: PALETTE.text }}>
            ¡Ayudanos sugiriendo las canciones que pensás que no pueden faltar en la fiesta!
          </p>
          <Button
            className="px-8 py-3 rounded-full"
            style={{ backgroundColor: PALETTE.sage, color: PALETTE.white }}
          >
            <Music className="w-4 h-4 mr-2" />
            Sugerir canción
          </Button>
        </div>
      </section>

      {/* Info útil */}
      <section className="py-16" style={{ backgroundColor: PALETTE.paper }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2
            className="text-2xl font-display font-medium mb-6 tracking-wide"
            style={{ color: PALETTE.ink }}
          >
            INFO ÚTIL
          </h2>
          <p className="mb-8 max-w-2xl mx-auto" style={{ color: PALETTE.text }}>
            Te dejamos sugerencias de alojamientos y traslados para que aproveches ese fin de semana al máximo.
          </p>
          <Button
            variant="outline"
            className="px-8 py-3 rounded-full"
            style={{ borderColor: PALETTE.sage, color: PALETTE.sage }}
          >
            VER MÁS
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: '#1F2937', color: PALETTE.white }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg mb-8">¡Gracias por acompañarnos en este momento tan importante!</p>

          <div className="pt-8" style={{ borderTop: '1px solid #4B5563' }}>
            <p className="text-sm opacity-70 mb-4">
              Invitación digital creada con ❤️ por{' '}
              <span className="font-medium" style={{ color: PALETTE.sage }}>
                Venite
              </span>
            </p>
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                style={{ borderColor: PALETTE.white, color: PALETTE.white }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                style={{ borderColor: PALETTE.white, color: PALETTE.white }}
              >
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
                <h3 className="text-xl font-medium" style={{ color: PALETTE.ink }}>
                  Confirmar Asistencia
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowRSVP(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {showSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: PALETTE.sage }} />
                  <h4 className="text-lg font-medium mb-2" style={{ color: PALETTE.ink }}>
                    ¡Confirmación Recibida!
                  </h4>
                  <p style={{ color: PALETTE.text }}>
                    Gracias por confirmar tu asistencia. ¡Te esperamos!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRSVPSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: PALETTE.ink }}>
                      Nombre completo *
                    </label>
                    <Input
                      required
                      value={rsvpData.name}
                      onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: PALETTE.ink }}>
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={rsvpData.email}
                      onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: PALETTE.ink }}>
                      ¿Asistirás? *
                    </label>
                    <select
                      required
                      value={rsvpData.attendance}
                      onChange={(e) => setRsvpData({ ...rsvpData, attendance: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="yes">Sí, asistiré</option>
                      <option value="no">No podré asistir</option>
                    </select>
                  </div>

                  {rsvpData.attendance === 'yes' && (
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: PALETTE.ink }}>
                        Número de acompañantes
                      </label>
                      <Input
                        type="number"
                        min="0"
                        max="5"
                        value={rsvpData.guests}
                        onChange={(e) =>
                          setRsvpData({ ...rsvpData, guests: parseInt(e.target.value || '0', 10) })
                        }
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: PALETTE.ink }}>
                      Mensaje (opcional)
                    </label>
                    <Textarea
                      value={rsvpData.message}
                      onChange={(e) => setRsvpData({ ...rsvpData, message: e.target.value })}
                      placeholder="Déjanos un mensaje..."
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full" style={{ backgroundColor: PALETTE.sage, color: PALETTE.white }}>
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
                <h3 className="text-xl font-medium" style={{ color: PALETTE.ink }}>
                  Datos Bancarios
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowGifts(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="text-center mb-6">
                  <CreditCard className="w-12 h-12 mx-auto mb-4" style={{ color: PALETTE.sage }} />
                  <p style={{ color: PALETTE.text }}>
                    Si deseás colaborar con nuestra Luna de Miel, podés hacerlo a través de:
                  </p>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: PALETTE.paper }}>
                  <h4 className="font-medium mb-2" style={{ color: PALETTE.ink }}>
                    Transferencia Bancaria
                  </h4>
                  <div className="space-y-1 text-sm" style={{ color: PALETTE.text }}>
                    <p>
                      <strong>Banco:</strong> Banco Nación
                    </p>
                    <p>
                      <strong>CBU:</strong> 0110599520000012345678
                    </p>
                    <p>
                      <strong>Alias:</strong> BELU.AMADEO.BODA
                    </p>
                    <p>
                      <strong>Titular:</strong> Belén García
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: PALETTE.paper }}>
                  <h4 className="font-medium mb-2" style={{ color: PALETTE.ink }}>
                    Mercado Pago
                  </h4>
                  <div className="space-y-1 text-sm" style={{ color: PALETTE.text }}>
                    <p>
                      <strong>CVU:</strong> 0000003100012345678901
                    </p>
                    <p>
                      <strong>Alias:</strong> BELU.MP
                    </p>
                  </div>
                </div>

                <p className="text-xs text-center" style={{ color: PALETTE.muted }}>
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
