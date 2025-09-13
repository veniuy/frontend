import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { 
  Type, 
  Palette, 
  Image, 
  Calendar,
  MapPin,
  Users,
  Edit3
} from 'lucide-react'

const DetailsPanel = ({ invitation, selectedElement, updateElement }) => {
  const [editingField, setEditingField] = useState(null)

  if (!selectedElement) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <Edit3 className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <h3 className="font-medium text-gray-600 mb-2">Selecciona un elemento</h3>
          <p className="text-sm text-gray-500">
            Haz clic en cualquier elemento de la invitación para editarlo
          </p>
        </div>
      </div>
    )
  }

  const renderHeaderEditor = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title" className="text-sm font-medium">Título Principal</Label>
        <Input
          id="title"
          value={invitation.header.title}
          onChange={(e) => updateElement(selectedElement.id, 'header', { title: e.target.value })}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="subtitle" className="text-sm font-medium">Subtítulo</Label>
        <Input
          id="subtitle"
          value={invitation.header.subtitle || ''}
          onChange={(e) => updateElement(selectedElement.id, 'header', { subtitle: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="initials" className="text-sm font-medium">Iniciales de la Pareja</Label>
        <Input
          id="initials"
          value={invitation.header.coupleInitials}
          onChange={(e) => updateElement(selectedElement.id, 'header', { coupleInitials: e.target.value })}
          className="mt-1"
          placeholder="S.L."
        />
      </div>

      <div>
        <Label htmlFor="date" className="text-sm font-medium">Año</Label>
        <Input
          id="date"
          value={invitation.header.date}
          onChange={(e) => updateElement(selectedElement.id, 'header', { date: e.target.value })}
          className="mt-1"
          placeholder="2026"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Gráfico Central</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {['rings', 'heart', 'monogram'].map((graphic) => (
            <Button
              key={graphic}
              variant={invitation.header.centerGraphic === graphic ? "default" : "outline"}
              size="sm"
              onClick={() => updateElement(selectedElement.id, 'header', { centerGraphic: graphic })}
              className="text-xs"
            >
              {graphic === 'rings' ? '💍' : graphic === 'heart' ? '💕' : '✨'}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )

  const renderBasicInfoEditor = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="hostedBy" className="text-sm font-medium">Anfitriones</Label>
        <Input
          id="hostedBy"
          value={invitation.basicInfo.hostedBy}
          onChange={(e) => updateElement(selectedElement.id, 'basicInfo', { hostedBy: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="eventDate" className="text-sm font-medium">Fecha del Evento</Label>
        <Input
          id="eventDate"
          value={invitation.basicInfo.date}
          onChange={(e) => updateElement(selectedElement.id, 'basicInfo', { date: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="eventTime" className="text-sm font-medium">Hora del Evento</Label>
        <Input
          id="eventTime"
          value={invitation.basicInfo.time}
          onChange={(e) => updateElement(selectedElement.id, 'basicInfo', { time: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="description" className="text-sm font-medium">Descripción</Label>
        <Textarea
          id="description"
          value={invitation.basicInfo.description}
          onChange={(e) => updateElement(selectedElement.id, 'basicInfo', { description: e.target.value })}
          className="mt-1"
          rows={3}
        />
      </div>
    </div>
  )

  const renderBlockEditor = () => {
    const block = invitation.blocks.find(b => b.id === selectedElement.id)
    if (!block) return null

    return (
      <div className="space-y-4">
        <div>
          <Label htmlFor="blockTitle" className="text-sm font-medium">Título del Bloque</Label>
          <Input
            id="blockTitle"
            value={block.title}
            onChange={(e) => updateElement(selectedElement.id, 'block', { title: e.target.value })}
            className="mt-1"
          />
        </div>

        {block.type === 'accommodations' ? (
          <div>
            <Label className="text-sm font-medium">Opciones de Alojamiento</Label>
            <div className="space-y-3 mt-2">
              {block.items?.map((item, index) => (
                <Card key={index} className="p-3">
                  <div className="space-y-2">
                    <Input
                      value={item.name}
                      onChange={(e) => {
                        const newItems = [...block.items]
                        newItems[index] = { ...item, name: e.target.value }
                        updateElement(selectedElement.id, 'block', { items: newItems })
                      }}
                      placeholder="Nombre del hotel"
                      className="font-medium"
                    />
                    <Textarea
                      value={item.description}
                      onChange={(e) => {
                        const newItems = [...block.items]
                        newItems[index] = { ...item, description: e.target.value }
                        updateElement(selectedElement.id, 'block', { items: newItems })
                      }}
                      placeholder="Descripción del hotel"
                      rows={2}
                    />
                    {item.code && (
                      <Input
                        value={item.code}
                        onChange={(e) => {
                          const newItems = [...block.items]
                          newItems[index] = { ...item, code: e.target.value }
                          updateElement(selectedElement.id, 'block', { items: newItems })
                        }}
                        placeholder="Código de reserva"
                      />
                    )}
                  </div>
                </Card>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newItems = [...(block.items || []), {
                    name: 'Nuevo Hotel',
                    description: 'Descripción...',
                    code: 'CODIGO'
                  }]
                  updateElement(selectedElement.id, 'block', { items: newItems })
                }}
                className="w-full"
              >
                + Agregar Hotel
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Label htmlFor="blockContent" className="text-sm font-medium">Contenido</Label>
            <Textarea
              id="blockContent"
              value={typeof block.content === 'string' ? block.content : ''}
              onChange={(e) => updateElement(selectedElement.id, 'block', { content: e.target.value })}
              className="mt-1"
              rows={4}
            />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Edit3 className="w-4 h-4 text-blue-600" />
          <h3 className="font-medium">Editando Elemento</h3>
        </div>
        <Badge variant="secondary" className="text-xs">
          {selectedElement.type === 'header' ? 'Encabezado' :
           selectedElement.type === 'basicInfo' ? 'Información Básica' :
           selectedElement.type === 'block' ? 'Bloque de Contenido' : 
           selectedElement.type}
        </Badge>
      </div>

      <Card>
        <CardContent className="p-4">
          {selectedElement.type === 'header' && renderHeaderEditor()}
          {selectedElement.type === 'basicInfo' && renderBasicInfoEditor()}
          {selectedElement.type === 'block' && renderBlockEditor()}
        </CardContent>
      </Card>
    </div>
  )
}

export default DetailsPanel
