import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { 
  Hotel,
  MapPin,
  Car,
  Clock,
  Users,
  Gift,
  Shirt,
  Camera,
  FileText,
  Plus,
  Trash2,
  GripVertical
} from 'lucide-react'

const BLOCK_TYPES = {
  accommodations: {
    title: 'Alojamiento',
    description: 'Información sobre hoteles y opciones de hospedaje',
    icon: Hotel,
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  venue: {
    title: 'El Lugar',
    description: 'Información sobre el lugar de la ceremonia',
    icon: MapPin,
    color: 'bg-green-50 text-green-700 border-green-200'
  },
  directions: {
    title: 'Cómo Llegar',
    description: 'Direcciones e instrucciones para llegar',
    icon: Car,
    color: 'bg-orange-50 text-orange-700 border-orange-200'
  },
  shuttle: {
    title: 'Transporte',
    description: 'Información sobre transporte y shuttle',
    icon: Car,
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  schedule: {
    title: 'Cronograma',
    description: 'Horarios y programa del día',
    icon: Clock,
    color: 'bg-pink-50 text-pink-700 border-pink-200'
  },
  weddingParty: {
    title: 'Cortejo Nupcial',
    description: 'Información sobre padrinos y damas',
    icon: Users,
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  registry: {
    title: 'Lista de Regalos',
    description: 'Enlaces a registros de regalos',
    icon: Gift,
    color: 'bg-red-50 text-red-700 border-red-200'
  },
  dressCode: {
    title: 'Código de Vestimenta',
    description: 'Guía de vestimenta para invitados',
    icon: Shirt,
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200'
  },
  photos: {
    title: 'Galería de Fotos',
    description: 'Fotos de la pareja y del evento',
    icon: Camera,
    color: 'bg-teal-50 text-teal-700 border-teal-200'
  },
  customText: {
    title: 'Texto Personalizado',
    description: 'Bloque de texto libre personalizable',
    icon: FileText,
    color: 'bg-gray-50 text-gray-700 border-gray-200'
  }
}

const AddBlocksPanel = ({ invitation, addBlock, removeBlock }) => {
  const existingBlockTypes = invitation.blocks.map(block => block.type)

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="font-medium mb-4 text-sm">Agregar Bloques</h3>
        <div className="space-y-2">
          {Object.entries(BLOCK_TYPES).map(([type, config]) => {
            const Icon = config.icon
            const hasBlock = existingBlockTypes.includes(type)
            
            return (
              <Card 
                key={type}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  hasBlock ? 'opacity-50' : 'hover:bg-gray-50'
                }`}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`p-2 rounded-lg ${config.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm mb-1">{config.title}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {config.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={hasBlock ? "secondary" : "default"}
                      onClick={() => !hasBlock && addBlock(type)}
                      disabled={hasBlock}
                      className="ml-2 shrink-0"
                    >
                      {hasBlock ? (
                        <span className="text-xs">Agregado</span>
                      ) : (
                        <Plus className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Bloques existentes */}
      {invitation.blocks.length > 0 && (
        <div>
          <h3 className="font-medium mb-4 text-sm">Bloques Actuales</h3>
          <div className="space-y-2">
            {invitation.blocks.map((block, index) => {
              const config = BLOCK_TYPES[block.type]
              const Icon = config?.icon || FileText
              
              return (
                <Card key={block.id} className="group">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                        <div className={`p-1.5 rounded ${config?.color || 'bg-gray-50 text-gray-700'}`}>
                          <Icon className="w-3 h-3" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{block.title}</h4>
                          <p className="text-xs text-gray-500">
                            Posición {index + 1}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Badge 
                          variant={block.visible ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {block.visible ? 'Visible' : 'Oculto'}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeBlock(block.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Información adicional */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <h4 className="font-medium text-sm text-blue-800 mb-2">💡 Consejos</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Arrastra los bloques para reordenarlos</li>
          <li>• Cada bloque se puede personalizar individualmente</li>
          <li>• Los bloques ocultos no aparecen en la invitación final</li>
        </ul>
      </div>
    </div>
  )
}

export default AddBlocksPanel
