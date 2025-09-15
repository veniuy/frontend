import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  ClipboardList,
  Plus,
  Edit,
  Trash2,
  Eye,
  Copy,
  Check,
  Users,
  BarChart3,
  ArrowLeft,
  Save,
  Send,
  MessageSquare,
  Star,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Clock,
  TrendingUp,
  Download,
  Filter
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const GuestSurveys = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('surveys');
  const [surveys, setSurveys] = useState([]);
  const [responses, setResponses] = useState([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState(null);
  const [copiedLink, setCopiedLink] = useState('');

  // Form state for new/edit survey
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [],
    isActive: true,
    allowAnonymous: true,
    requireAuth: false,
    expiresAt: ''
  });

  const [newQuestion, setNewQuestion] = useState({
    text: '',
    type: 'text',
    required: false,
    options: []
  });

  const questionTypes = [
    { value: 'text', label: 'Texto Libre' },
    { value: 'textarea', label: 'Texto Largo' },
    { value: 'radio', label: 'Opción Única' },
    { value: 'checkbox', label: 'Múltiple Selección' },
    { value: 'rating', label: 'Calificación (1-5)' },
    { value: 'yesno', label: 'Sí/No' },
    { value: 'date', label: 'Fecha' },
    { value: 'email', label: 'Email' }
  ];

  // Sample data
  useEffect(() => {
    setSurveys([
      {
        id: 1,
        title: 'Preferencias Alimentarias',
        description: 'Ayúdanos a planificar el menú perfecto para nuestro evento',
        questions: [
          {
            id: 1,
            text: '¿Tienes alguna restricción alimentaria?',
            type: 'checkbox',
            required: true,
            options: ['Vegetariano', 'Vegano', 'Sin gluten', 'Sin lactosa', 'Ninguna']
          },
          {
            id: 2,
            text: '¿Hay algún alimento que no puedas consumir?',
            type: 'textarea',
            required: false
          },
          {
            id: 3,
            text: '¿Cómo calificarías tu experiencia con eventos similares?',
            type: 'rating',
            required: false
          }
        ],
        isActive: true,
        allowAnonymous: true,
        requireAuth: false,
        createdAt: '2024-01-10T10:00:00Z',
        expiresAt: '2024-03-15T23:59:59Z',
        responseCount: 45,
        completionRate: 78.3
      },
      {
        id: 2,
        title: 'Transporte y Alojamiento',
        description: 'Información para coordinar el transporte y hospedaje',
        questions: [
          {
            id: 1,
            text: '¿Necesitas transporte desde el aeropuerto?',
            type: 'yesno',
            required: true
          },
          {
            id: 2,
            text: '¿En qué hotel te hospedarás?',
            type: 'radio',
            required: false,
            options: ['Hotel Lyle', 'Downtown Suites', 'Budget Inn', 'Otro', 'No necesito alojamiento']
          },
          {
            id: 3,
            text: 'Fecha de llegada',
            type: 'date',
            required: false
          }
        ],
        isActive: true,
        allowAnonymous: false,
        requireAuth: true,
        createdAt: '2024-01-12T14:30:00Z',
        expiresAt: '2024-03-10T23:59:59Z',
        responseCount: 32,
        completionRate: 65.4
      }
    ]);

    setResponses([
      {
        id: 1,
        surveyId: 1,
        respondentName: 'María González',
        respondentEmail: 'maria@email.com',
        submittedAt: '2024-01-14T16:20:00Z',
        answers: {
          1: ['Vegetariano', 'Sin gluten'],
          2: 'No puedo comer mariscos',
          3: 4
        }
      },
      {
        id: 2,
        surveyId: 1,
        respondentName: 'Carlos Ruiz',
        respondentEmail: 'carlos@email.com',
        submittedAt: '2024-01-14T18:45:00Z',
        answers: {
          1: ['Ninguna'],
          2: '',
          3: 5
        }
      },
      {
        id: 3,
        surveyId: 2,
        respondentName: 'Ana López',
        respondentEmail: 'ana@email.com',
        submittedAt: '2024-01-15T09:30:00Z',
        answers: {
          1: 'Sí',
          2: 'Hotel Lyle',
          3: '2024-03-14'
        }
      }
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingSurvey) {
      setSurveys(surveys => 
        surveys.map(survey => 
          survey.id === editingSurvey.id 
            ? { ...formData, id: editingSurvey.id, responseCount: editingSurvey.responseCount, completionRate: editingSurvey.completionRate }
            : survey
        )
      );
    } else {
      const newSurvey = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        responseCount: 0,
        completionRate: 0
      };
      setSurveys(surveys => [...surveys, newSurvey]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      questions: [],
      isActive: true,
      allowAnonymous: true,
      requireAuth: false,
      expiresAt: ''
    });
    setEditingSurvey(null);
    setShowCreateDialog(false);
  };

  const handleEdit = (survey) => {
    setFormData(survey);
    setEditingSurvey(survey);
    setShowCreateDialog(true);
  };

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta encuesta?')) {
      setSurveys(surveys => surveys.filter(survey => survey.id !== id));
      setResponses(responses => responses.filter(response => response.surveyId !== id));
    }
  };

  const addQuestion = () => {
    if (newQuestion.text.trim()) {
      setFormData({
        ...formData,
        questions: [...formData.questions, { ...newQuestion, id: Date.now() }]
      });
      setNewQuestion({
        text: '',
        type: 'text',
        required: false,
        options: []
      });
    }
  };

  const removeQuestion = (questionId) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter(q => q.id !== questionId)
    });
  };

  const copySurveyLink = (surveyId) => {
    const link = `${window.location.origin}/survey/${surveyId}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(surveyId);
    setTimeout(() => setCopiedLink(''), 2000);
  };

  const toggleSurveyStatus = (surveyId) => {
    setSurveys(surveys =>
      surveys.map(survey =>
        survey.id === surveyId
          ? { ...survey, isActive: !survey.isActive }
          : survey
      )
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getResponsesForSurvey = (surveyId) => {
    return responses.filter(response => response.surveyId === surveyId);
  };

  const totalResponses = responses.length;
  const averageCompletionRate = surveys.length > 0 
    ? (surveys.reduce((sum, survey) => sum + survey.completionRate, 0) / surveys.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" onClick={() => navigate('/app/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Dashboard
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <ClipboardList className="h-8 w-8 text-blue-600" />
                Encuestas para Invitados
              </h1>
              <p className="text-gray-600 mt-1">
                Recopila información importante de tus invitados
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar Datos
              </Button>
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Encuesta
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Encuestas</CardTitle>
              <ClipboardList className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{surveys.length}</div>
              <p className="text-xs text-gray-600">
                {surveys.filter(s => s.isActive).length} activas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Respuestas</CardTitle>
              <MessageSquare className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalResponses}</div>
              <p className="text-xs text-gray-600">Respuestas recibidas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa de Finalización</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageCompletionRate}%</div>
              <p className="text-xs text-gray-600">Promedio general</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participación</CardTitle>
              <Users className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {surveys.reduce((sum, survey) => sum + survey.responseCount, 0)}
              </div>
              <p className="text-xs text-gray-600">Total participantes</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="surveys">Encuestas</TabsTrigger>
            <TabsTrigger value="responses">Respuestas</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Surveys Tab */}
          <TabsContent value="surveys" className="space-y-6">
            {surveys.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <ClipboardList className="h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    No tienes encuestas aún
                  </h3>
                  <p className="text-gray-600 mb-6 text-center max-w-md">
                    Crea encuestas para recopilar información importante de tus invitados
                  </p>
                  <Button onClick={() => setShowCreateDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Primera Encuesta
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {surveys.map((survey) => (
                  <Card key={survey.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold">{survey.title}</h3>
                            <Badge className={survey.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {survey.isActive ? 'Activa' : 'Inactiva'}
                            </Badge>
                            {survey.requireAuth && (
                              <Badge variant="outline">Requiere Auth</Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{survey.description}</p>
                          <div className="text-sm text-gray-500">
                            {survey.questions.length} preguntas • Creada el {formatDate(survey.createdAt)}
                            {survey.expiresAt && (
                              <> • Expira el {formatDate(survey.expiresAt)}</>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(survey)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(survey.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-blue-600">{survey.responseCount}</div>
                          <div className="text-xs text-gray-600">Respuestas</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-green-600">{survey.completionRate}%</div>
                          <div className="text-xs text-gray-600">Finalización</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-purple-600">
                            {getResponsesForSurvey(survey.id).length}
                          </div>
                          <div className="text-xs text-gray-600">Recientes</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copySurveyLink(survey.id)}
                        >
                          {copiedLink === survey.id ? (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              Copiado
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-1" />
                              Copiar Enlace
                            </>
                          )}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`/survey/${survey.id}`, '_blank')}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Vista Previa
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleSurveyStatus(survey.id)}
                        >
                          {survey.isActive ? 'Desactivar' : 'Activar'}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveTab('responses')}
                        >
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Ver Respuestas
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Responses Tab */}
          <TabsContent value="responses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Respuestas Recibidas</h2>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrar por encuesta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las encuestas</SelectItem>
                    {surveys.map(survey => (
                      <SelectItem key={survey.id} value={survey.id.toString()}>
                        {survey.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>

            {responses.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <MessageSquare className="h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    No hay respuestas aún
                  </h3>
                  <p className="text-gray-600 text-center max-w-md">
                    Las respuestas de tus invitados aparecerán aquí una vez que completen las encuestas
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {responses.map((response) => {
                  const survey = surveys.find(s => s.id === response.surveyId);
                  return (
                    <Card key={response.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold">{response.respondentName}</h3>
                            <p className="text-sm text-gray-600">{response.respondentEmail}</p>
                            <p className="text-sm text-gray-500">
                              {survey?.title} • {formatDate(response.submittedAt)}
                            </p>
                          </div>
                          <Badge variant="outline">
                            {Object.keys(response.answers).length} respuestas
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          {survey?.questions.map((question) => {
                            const answer = response.answers[question.id];
                            if (!answer) return null;

                            return (
                              <div key={question.id} className="border-l-2 border-blue-200 pl-4">
                                <p className="font-medium text-sm">{question.text}</p>
                                <p className="text-gray-700 mt-1">
                                  {Array.isArray(answer) ? answer.join(', ') : answer.toString()}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rendimiento por Encuesta</CardTitle>
                  <CardDescription>
                    Comparación de tasas de respuesta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {surveys.map((survey) => (
                      <div key={survey.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{survey.title}</div>
                          <div className="text-sm text-gray-500">{survey.responseCount} respuestas</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">{survey.completionRate}%</div>
                          <div className="text-xs text-gray-500">Finalización</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tendencias de Respuesta</CardTitle>
                  <CardDescription>
                    Actividad en los últimos días
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Gráfico de tendencias</p>
                      <p className="text-sm text-gray-500">Próximamente</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Create/Edit Survey Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSurvey ? 'Editar Encuesta' : 'Crear Nueva Encuesta'}
              </DialogTitle>
              <DialogDescription>
                Configura las preguntas y opciones de tu encuesta
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Título de la Encuesta</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Ej: Preferencias Alimentarias"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="expiresAt">Fecha de Expiración (Opcional)</Label>
                  <Input
                    id="expiresAt"
                    type="datetime-local"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({...formData, expiresAt: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe el propósito de esta encuesta..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="isActive">Encuesta activa</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="allowAnonymous"
                    checked={formData.allowAnonymous}
                    onChange={(e) => setFormData({...formData, allowAnonymous: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="allowAnonymous">Permitir respuestas anónimas</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="requireAuth"
                    checked={formData.requireAuth}
                    onChange={(e) => setFormData({...formData, requireAuth: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="requireAuth">Requiere autenticación</Label>
                </div>
              </div>

              {/* Questions Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Preguntas</h3>
                
                {/* Existing Questions */}
                <div className="space-y-3 mb-4">
                  {formData.questions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium">Pregunta {index + 1}</span>
                            <Badge variant="outline">{questionTypes.find(t => t.value === question.type)?.label}</Badge>
                            {question.required && <Badge className="bg-red-100 text-red-800">Requerida</Badge>}
                          </div>
                          <p className="text-gray-700">{question.text}</p>
                          {question.options && question.options.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">Opciones:</p>
                              <ul className="text-sm text-gray-600 ml-4">
                                {question.options.map((option, i) => (
                                  <li key={i}>• {option}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Question */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Agregar Nueva Pregunta</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="questionText">Texto de la Pregunta</Label>
                      <Input
                        id="questionText"
                        value={newQuestion.text}
                        onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
                        placeholder="Escribe tu pregunta aquí..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="questionType">Tipo de Pregunta</Label>
                        <Select
                          value={newQuestion.type}
                          onValueChange={(value) => setNewQuestion({...newQuestion, type: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {questionTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2 pt-6">
                        <input
                          type="checkbox"
                          id="questionRequired"
                          checked={newQuestion.required}
                          onChange={(e) => setNewQuestion({...newQuestion, required: e.target.checked})}
                          className="rounded"
                        />
                        <Label htmlFor="questionRequired">Pregunta requerida</Label>
                      </div>
                    </div>

                    {(newQuestion.type === 'radio' || newQuestion.type === 'checkbox') && (
                      <div>
                        <Label>Opciones (una por línea)</Label>
                        <Textarea
                          value={newQuestion.options.join('\n')}
                          onChange={(e) => setNewQuestion({
                            ...newQuestion, 
                            options: e.target.value.split('\n').filter(opt => opt.trim())
                          })}
                          placeholder="Opción 1&#10;Opción 2&#10;Opción 3"
                          rows={3}
                        />
                      </div>
                    )}

                    <Button type="button" onClick={addQuestion} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Pregunta
                    </Button>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {editingSurvey ? 'Actualizar' : 'Crear'} Encuesta
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default GuestSurveys;
