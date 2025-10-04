import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion'
import PublicHeader from '../components/PublicHeader'
import { 
  Search,
  HelpCircle,
  Package,
  CreditCard,
  Truck,
  RotateCcw,
  Shield,
  Phone,
  Mail,
  MessageCircle,
  Smartphone,
  Globe,
  Edit
} from 'lucide-react'

function FAQ() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const faqCategories = [
    {
      id: 'digital',
      title: 'Invitaciones Digitales',
      icon: Smartphone,
      questions: [
        {
          question: '¿Cómo funcionan las invitaciones digitales?',
          answer: 'Las invitaciones digitales son páginas web personalizadas que se envían por WhatsApp, email o redes sociales. Tus invitados reciben un enlace único que los lleva a una experiencia interactiva con toda la información del evento.'
        },
        {
          question: '¿Puedo personalizar completamente mi invitación?',
          answer: 'Sí, puedes personalizar colores, fuentes, imágenes, música de fondo, animaciones y todo el contenido. También puedes agregar mapas interactivos, formularios de confirmación y galerías de fotos.'
        },
        {
          question: '¿Funcionan en todos los dispositivos?',
          answer: 'Absolutamente. Nuestras invitaciones están optimizadas para verse perfectamente en móviles, tablets y computadoras. Se adaptan automáticamente al tamaño de pantalla.'
        },
        {
          question: '¿Puedo ver una vista previa antes de enviar?',
          answer: 'Sí, te proporcionamos un enlace de vista previa para que puedas revisar y aprobar tu invitación antes de compartirla con tus invitados.'
        }
      ]
    },
    {
      id: 'orders',
      title: 'Pedidos y Pagos',
      icon: Package,
      questions: [
        {
          question: '¿Cómo realizo mi pedido?',
          answer: 'Selecciona la plantilla que más te guste, personalízala con tu información y fotos, revisa la vista previa y procede al pago. Recibirás tu invitación lista en minutos.'
        },
        {
          question: '¿Qué métodos de pago aceptan?',
          answer: 'Aceptamos Visa, Mastercard, PayPal y transferencias bancarias. Todos los pagos son seguros y están encriptados con tecnología SSL.'
        },
        {
          question: '¿Puedo modificar mi invitación después del pago?',
          answer: 'Sí, puedes hacer modificaciones menores sin costo adicional durante las primeras 24 horas. Para cambios mayores, consultanos sobre tarifas adicionales.'
        },
        {
          question: '¿Ofrecen descuentos para múltiples eventos?',
          answer: 'Sí, ofrecemos descuentos especiales para clientes que contratan múltiples invitaciones o eventos corporativos. Contacta con nuestro equipo comercial.'
        }
      ]
    },
    {
      id: 'delivery',
      title: 'Entrega y Distribución',
      icon: Globe,
      questions: [
        {
          question: '¿Cuánto tiempo tarda en estar lista mi invitación?',
          answer: 'Las invitaciones digitales están listas en 2-4 horas después del pago. Para diseños personalizados complejos, puede tomar hasta 24 horas.'
        },
        {
          question: '¿Cómo recibo mi invitación?',
          answer: 'Te enviamos por email el enlace de tu invitación junto con instrucciones de cómo compartirla. También incluimos códigos QR y botones para redes sociales.'
        },
        {
          question: '¿Cómo comparto la invitación con mis invitados?',
          answer: 'Puedes compartir el enlace por WhatsApp, email, Facebook, Instagram o cualquier plataforma digital. También puedes generar códigos QR para imprimir si lo deseas.'
        },
        {
          question: '¿Hay límite de invitados que pueden ver la invitación?',
          answer: 'No hay límite. Tu invitación puede ser vista por tantas personas como desees, sin costos adicionales por visualización.'
        }
      ]
    },
    {
      id: 'features',
      title: 'Características y Funciones',
      icon: Edit,
      questions: [
        {
          question: '¿Puedo incluir música en mi invitación?',
          answer: 'Sí, puedes agregar música de fondo, canciones especiales o incluso grabaciones de voz personalizadas. Soportamos archivos MP3 y streaming de plataformas populares.'
        },
        {
          question: '¿Incluyen confirmación de asistencia?',
          answer: 'Sí, todas nuestras invitaciones incluyen formularios de confirmación personalizables. Puedes ver en tiempo real quién confirmó asistencia desde tu panel de control.'
        },
        {
          question: '¿Puedo agregar mapas y ubicaciones?',
          answer: 'Por supuesto. Incluimos mapas interactivos de Google Maps, direcciones exactas y botones para abrir la navegación directamente en el móvil del invitado.'
        },
        {
          question: '¿Se pueden agregar galerías de fotos?',
          answer: 'Sí, puedes incluir galerías de fotos, videos de presentación y hasta cronogramas del evento. Todo se integra perfectamente en el diseño.'
        }
      ]
    },
    {
      id: 'support',
      title: 'Soporte Técnico',
      icon: Shield,
      questions: [
        {
          question: '¿Qué pasa si tengo problemas técnicos?',
          answer: 'Nuestro equipo de soporte técnico está disponible por WhatsApp, email y chat en vivo. Respondemos en menos de 2 horas durante horario laboral.'
        },
        {
          question: '¿Puedo hacer cambios después de enviar las invitaciones?',
          answer: 'Sí, una de las ventajas de las invitaciones digitales es que puedes actualizar información en tiempo real. Los cambios se reflejan automáticamente para todos los invitados.'
        },
        {
          question: '¿Qué pasa si mi enlace deja de funcionar?',
          answer: 'Nuestras invitaciones están alojadas en servidores seguros con 99.9% de disponibilidad. En el caso improbable de un problema, lo solucionamos inmediatamente.'
        },
        {
          question: '¿Ofrecen capacitación para usar la plataforma?',
          answer: 'Sí, ofrecemos tutoriales en video, guías paso a paso y sesiones de capacitación personalizadas para eventos corporativos o usuarios que lo necesiten.'
        }
      ]
    }
  ]

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PublicHeader />

      {/* Hero Section */}
      <section className="bg-gradient-warm py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-display font-medium text-foreground mb-4">
            Preguntas Frecuentes
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Todo lo que necesitas saber sobre nuestras invitaciones digitales
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar en preguntas frecuentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {searchTerm && (
            <div className="mb-8">
              <p className="text-muted-foreground">
                {filteredFAQs.reduce((total, category) => total + category.questions.length, 0)} resultados para "{searchTerm}"
              </p>
            </div>
          )}

          <div className="space-y-8">
            {(searchTerm ? filteredFAQs : faqCategories).map((category) => (
              <Card key={category.id} className="border-border">
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <category.icon className="w-6 h-6 text-primary mr-3" />
                    <h2 className="text-xl font-semibold text-foreground">
                      {category.title}
                    </h2>
                  </div>
                  
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`${category.id}-${index}`}
                        className="border border-border rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          <span className="font-medium text-foreground">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Card>
            ))}
          </div>

          {searchTerm && filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-muted-foreground mb-6">
                No encontramos preguntas que coincidan con tu búsqueda. 
                Intenta con otros términos o contacta con nosotros.
              </p>
              <Button 
                onClick={() => setSearchTerm('')}
                variant="outline"
                className="mr-4"
              >
                Limpiar búsqueda
              </Button>
              <Button 
                onClick={() => navigate('/contact')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Contactar soporte
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-background py-16 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-display font-medium text-foreground mb-4">
            ¿Necesitas ayuda personalizada?
          </h2>
          <p className="text-muted-foreground mb-8">
            Nuestro equipo está listo para ayudarte a crear la invitación digital perfecta
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-warm transition-shadow">
              <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">WhatsApp</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Respuesta inmediata<br />
                Lunes a Domingo
              </p>
              <Button variant="outline" size="sm">
                +34 919 03 36 08
              </Button>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-warm transition-shadow">
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Respuesta en 2h<br />
                Soporte técnico
              </p>
              <Button variant="outline" size="sm">
                hola@venite.com
              </Button>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-warm transition-shadow">
              <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">Chat en vivo</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Disponible<br />
                9:00 - 22:00
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/contact')}
              >
                Iniciar chat
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQ
