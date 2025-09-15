import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { Button } from './ui/button';
import { 
  Home, 
  Calendar, 
  LogOut, 
  Menu, 
  X, 
  Sparkles,
  Users,
  Gift,
  Building,
  ClipboardList,
  Mail,
  Link as LinkIcon,
  BarChart3,
  User,
  Settings,
  Eye,
  Palette,
  Image,
  FileText
} from 'lucide-react';
import './Layout.css';

export default function LayoutImproved() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const BASE = '/app';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navigation = [
    { 
      name: 'Dashboard', 
      href: `${BASE}/dashboard`, 
      icon: Home,
      description: 'Panel principal'
    },
    { 
      name: 'Mis Eventos', 
      href: `${BASE}/dashboard?tab=events`, 
      icon: Calendar,
      description: 'Gestionar eventos'
    },
    { 
      name: 'Preview', 
      href: `${BASE}/preview`, 
      icon: Eye,
      description: 'Vista previa'
    },
    { 
      name: 'Registry', 
      href: `${BASE}/registry`, 
      icon: Gift,
      description: 'Lista de regalos'
    },
    { 
      name: 'Accommodations', 
      href: `${BASE}/accommodations`, 
      icon: Building,
      description: 'Alojamientos'
    },
    { 
      name: 'Guest Surveys', 
      href: `${BASE}/guest-surveys`, 
      icon: ClipboardList,
      description: 'Encuestas'
    },
    { 
      name: 'Custom Emails', 
      href: `${BASE}/custom-emails`, 
      icon: Mail,
      description: 'Emails personalizados'
    },
    { 
      name: 'Shareable Link', 
      href: `${BASE}/shareable-link`, 
      icon: LinkIcon,
      description: 'Enlaces compartibles'
    },
    { 
      name: 'Tracking', 
      href: `${BASE}/tracking`, 
      icon: BarChart3,
      description: 'Seguimiento'
    }
  ];

  const quickActions = [
    {
      name: 'Crear Evento',
      href: `${BASE}/events/wizard`,
      icon: Calendar,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'Editor Visual',
      href: `${BASE}/visual-editor`,
      icon: Palette,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      name: 'Galería',
      href: `${BASE}/gallery`,
      icon: Image,
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  const isActive = (href) => {
    if (href.includes('?tab=')) {
      const [basePath, tab] = href.split('?tab=');
      return location.pathname === basePath && location.search.includes(tab);
    }
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar móvil */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex w-80 flex-col bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <div className="flex items-center">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Invitaciones</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-100 text-blue-900 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="border-t border-gray-200 p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Acciones Rápidas
            </h3>
            <div className="space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.name}
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start text-white ${action.color}`}
                    onClick={() => {
                      navigate(action.href);
                      setSidebarOpen(false);
                    }}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {action.name}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* User Profile */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center mb-3">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.username?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700">{user?.username}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => {
                  navigate(`${BASE}/profile`);
                  setSidebarOpen(false);
                }}
              >
                <User className="mr-2 h-4 w-4" />
                Perfil
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => {
                  navigate(`${BASE}/settings`);
                  setSidebarOpen(false);
                }}
              >
                <Settings className="mr-2 h-4 w-4" />
                Configuración
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-80 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm">
          {/* Header */}
          <div className="flex items-center flex-shrink-0 px-6 py-4 border-b">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Invitaciones</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-100 text-blue-900 border-r-2 border-blue-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="border-t border-gray-200 p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Acciones Rápidas
            </h3>
            <div className="space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.name}
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start text-white transition-all duration-200 ${action.color}`}
                    onClick={() => navigate(action.href)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {action.name}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* User Profile */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center mb-3">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.username?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700">{user?.username}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start hover:bg-gray-50"
                onClick={() => navigate(`${BASE}/profile`)}
              >
                <User className="mr-2 h-4 w-4" />
                Perfil
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start hover:bg-gray-50"
                onClick={() => navigate(`${BASE}/settings`)}
              >
                <Settings className="mr-2 h-4 w-4" />
                Configuración
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="lg:pl-80 flex flex-col flex-1">
        <div className="sticky top-0 z-10 lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-50">
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
