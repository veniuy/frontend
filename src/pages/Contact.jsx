import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Label } from '../components/ui/label'
import PublicHeader from '../components/PublicHeader'
import { 
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  HeadphonesIcon,
  Users,
  Newspaper,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Globe,
  MessageCircle
} from 'lucide-react'

function Contact() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const contactOptions = [
    {
      id: 'customer-service',
      title: 'Soporte Técnico',
      description: 'Ayuda con tu invitación, problemas técnicos y personalización',
      icon: HeadphonesIcon,
      image: '/src/assets/cotton_bird_images/categoria_productos_fotos.webp',
      action: 'Obtener ayuda'
    },
    {
      id: 'partnerships',
      title: 'Colaboraciones',
      description: 'Wedding planners, influencers y partnerships comerciales',
      icon: Users,
      image: '/src/assets/cotton_bird_images/categoria_boda_grid.webp',
      action: 'Proponer colaboración'
    },
    {
      id: 'custom-design',
      title: 'Diseño Personalizado',
      description: 'Solicita un diseño 100% único para tu evento especial',
      icon: Smartphone,
      image: '/src/assets/cotton_bird_images/taller_produccion_cotton_bird.webp',
      action: 'Solicitar diseño'
    }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PublicHeader />

      {/* Hero Section */}
      <section className="bg-gradient-warm py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageCircle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-display font-medium text-foreground mb-4">
            Contacto
          </h1>
          <p className="text-xl text-muted-foreground">
            Estamos aquí para hacer realidad tu invitación digital perfecta
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactOptions.map((option) => (
              <Card key={option.id} className="group cursor-pointer hover:shadow-warm transition-all duration-300 border-border overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={option.image} 
                    alt={option.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <option.icon className="w-12 h-12 text-white" />
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-display text-xl font-medium text-foreground mb-2">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {option.description}
                  </p>
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => handleInputChange('category', option.id)}
                  >
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-display font-medium text-foreground mb-6">
                Envíanos un mensaje
              </h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <p className="text-green-800">
                    ¡Mensaje enviado! Te responderemos en menos de 2 horas.
                  </p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                  <p className="text-red-800">
                    Ha ocurrido un error. Por favor, inténtalo de nuevo o contáctanos por WhatsApp.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="floating-label-container">
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className={`floating-input ${formData.name ? 'has-value' : ''}`}
                      placeholder=" "
                    />
                    <label htmlFor="name" className="floating-label">
                      Nombre completo *
                    </label>
                  </div>
                  <div className="floating-label-container">
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className={`floating-input ${formData.email ? 'has-value' : ''}`}
                      placeholder=" "
                    />
                    <label htmlFor="email" className="floating-label">
                      Email *
                    </label>
                  </div>
                </div>

                <div className="floating-label-container">
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className={`floating-select-trigger ${formData.category ? 'has-value' : ''}`}>
                      <SelectValue placeholder=" " />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer-service">Soporte Técnico</SelectItem>
                      <SelectItem value="partnerships">Colaboraciones</SelectItem>
                      <SelectItem value="custom-design">Diseño Personalizado</SelectItem>
                      <SelectItem value="billing">Facturación</SelectItem>
                      <SelectItem value="wedding">Consulta sobre Bodas</SelectItem>
                      <SelectItem value="quinceanera">Consulta sobre Quinceañeras</SelectItem>
                      <SelectItem value="other">Otros</SelectItem>
                    </SelectContent>
                  </Select>
                  <label className={`floating-label for-select ${formData.category ? 'has-value' : ''}`}>
                    Tipo de consulta *
                  </label>
                </div>

                <div className="floating-label-container">
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    required
                    className={`floating-input ${formData.subject ? 'has-value' : ''}`}
                    placeholder=" "
                  />
                  <label htmlFor="subject" className="floating-label">
                    Asunto *
                  </label>
                </div>

                <div className="floating-label-container">
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                    rows={6}
                    className={`floating-textarea ${formData.message ? 'has-value' : ''}`}
                    placeholder=" "
                  />
                  <label htmlFor="message" className="floating-label for-textarea">
                    Mensaje *
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar mensaje
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground">
                  * Campos obligatorios. Respuesta garantizada en menos de 2 horas.
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-display font-medium text-foreground mb-6">
                  Información de contacto
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Smartphone className="w-5 h-5 text-primary mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium text-foreground">WhatsApp</h4>
                      <p className="text-muted-foreground">+34 919 03 36 08</p>
                      <p className="text-sm text-muted-foreground">Respuesta inmediata, 7 días a la semana</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-primary mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium text-foreground">Email</h4>
                      <p className="text-muted-foreground">hola@venite.com</p>
                      <p className="text-sm text-muted-foreground">Respuesta en menos de 2 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Globe className="w-5 h-5 text-primary mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium text-foreground">Servicio</h4>
                      <p className="text-muted-foreground">
                        España y Latinoamérica<br />
                        Invitaciones en español
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-primary mr-4 mt-1" />
                    <div>
                      <h4 className="font-medium text-foreground">Horario de atención</h4>
                      <p className="text-muted-foreground">
                        Lunes a Viernes: 9:00 - 22:00<br />
                        Sábados y Domingos: 10:00 - 20:00<br />
                        WhatsApp: 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-accent border-border">
                <CardContent className="p-6">
                  <h4 className="font-medium text-foreground mb-3">
                    ¿Tienes prisa?
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Nuestras invitaciones digitales están listas en 2-4 horas. 
                    Para eventos de último momento, contáctanos por WhatsApp.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <Smartphone className="w-4 h-4 mr-2" />
                    WhatsApp Express
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-sage-100 border-sage-400">
                <CardContent className="p-6">
                  <h4 className="font-medium text-foreground mb-3">
                    Demo gratuita
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    ¿Quieres ver cómo funciona? Te creamos una demo personalizada 
                    gratuita para que veas el resultado antes de decidir.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-sage-400 text-sage-400 hover:bg-sage-100"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Solicitar demo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
