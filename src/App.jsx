// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.jsx';
import LayoutImproved from './components/LayoutImproved';
import Landing from './pages/Landing';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DashboardFixed from './pages/DashboardFixed';
import DashboardImproved from './pages/DashboardImproved';
import CreateEvent from './pages/CreateEvent';
import EventWizard from './pages/EventWizard';
import EventBuilder from './pages/EventBuilder';
import EventPreview from './pages/EventPreview';
import PublicEvent from './pages/PublicEvent';
// CAMBIADO: Usar el componente optimizado para móviles
import VisualEditorComplete from './pages/VisualEditorComplete';
import GuestManager from './pages/GuestManager';
import PaymentTransfer from './pages/PaymentTransfer';
import PaymentCode from './pages/PaymentCode';
import DemoWedding from './pages/DemoWedding';
import DemoQuinceanera from './pages/DemoQuinceanera';
import DemoBlack from './pages/DemoBlack';
import DemoPremium from './pages/DemoPremium';
import DemoClassic from './pages/DemoClassic';

// New pages
import Registry from './pages/Registry';
import Accommodations from './pages/Accommodations';
import ShareableLink from './pages/ShareableLink';
import GuestSurveys from './pages/GuestSurveys';
import Tracking from './pages/Tracking';

// CORREGIDO: Rutas correctas para los hooks y componentes móviles

// Category pages
import Boda from './pages/categories/Boda';
import Quinceaneras from './pages/categories/Quinceaneras';
import Infantiles from './pages/categories/Infantiles';
import Bautizo from './pages/categories/Bautizo';
import Corporativos from './pages/categories/Corporativos';
import Graduaciones from './pages/categories/Graduaciones';
import './utils/assets';

// Admin
import RequireAdmin from './components/RequireAdmin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // AGREGADO: Wrapper para optimizaciones móviles
  const AppContent = () => (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/demo/boda" element={<DemoWedding />} />
      <Route path="/demo/quinceanera" element={<DemoQuinceanera />} />
      <Route path="/demo/black" element={<DemoBlack />} />
      <Route path="/demo/premium" element={<DemoPremium />} />
      <Route path="/demo/clasica" element={<DemoClassic />} />
      
      {/* Category routes */}
      <Route path="/categorias/boda" element={<Boda />} />
      <Route path="/categorias/quinceaneras" element={<Quinceaneras />} />
      <Route path="/categorias/infantiles" element={<Infantiles />} />
      <Route path="/categorias/bautizo" element={<Bautizo />} />
      <Route path="/categorias/corporativos" element={<Corporativos />} />
      <Route path="/categorias/graduaciones" element={<Graduaciones />} />
      
      {/* Public event route */}
      <Route path="/p/:slug" element={<PublicEvent />} />
      
      {/* Auth routes */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/app/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/app/dashboard" />} />

      {/* Protected app routes */}
      <Route path="/app" element={user ? <LayoutImproved /> : <Navigate to="/login" />}>
        <Route index element={<Navigate to="/app/dashboard" />} />
        
        {/* Main dashboard - using improved version */}
        <Route path="dashboard" element={<DashboardImproved />} />
        
        {/* Event management */}
        <Route path="events/create" element={<CreateEvent />} />
        <Route path="events/wizard" element={<EventWizard />} />
        <Route path="events/:id/builder" element={<EventBuilder />} />
        {/* CAMBIADO: Usar el editor optimizado */}
        <Route path="events/:id/editor" element={<VisualEditorOptimized />} />
        <Route path="events/:id/preview" element={<EventPreview />} />
        <Route path="events/:id/guests" element={<GuestManager />} />
        
        {/* New feature pages */}
        <Route path="registry" element={<Registry />} />
        <Route path="accommodations" element={<Accommodations />} />
        <Route path="shareable-link" element={<ShareableLink />} />
        
        {/* Guest management */}
        <Route path="guest-manager" element={<GuestManager />} />
        <Route path="guest-surveys" element={<GuestSurveys />} />
        
        {/* Customization tools */}
        {/* CAMBIADO: Usar el editor optimizado */}
        <Route path="visual-editor" element={<VisualEditorOptimized />} />
        <Route path="color-palette" element={<div className="p-8"><h1 className="text-2xl font-bold">Paletas de Colores - Próximamente</h1></div>} />
        <Route path="typography" element={<div className="p-8"><h1 className="text-2xl font-bold">Tipografías - Próximamente</h1></div>} />
        <Route path="gallery" element={<div className="p-8"><h1 className="text-2xl font-bold">Galería de Imágenes - Próximamente</h1></div>} />
        
        {/* Communication */}
        <Route path="custom-emails" element={<div className="p-8"><h1 className="text-2xl font-bold">Emails Personalizados - Próximamente</h1></div>} />
        
        {/* Analytics and tracking */}
        <Route path="tracking" element={<Tracking />} />
        
        {/* User management */}
        <Route path="profile" element={<div className="p-8"><h1 className="text-2xl font-bold">Perfil de Usuario - Próximamente</h1></div>} />
        <Route path="settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Configuración - Próximamente</h1></div>} />
        
        {/* Preview functionality */}
        <Route path="preview" element={<div className="p-8"><h1 className="text-2xl font-bold">Vista Previa - Próximamente</h1></div>} />
        
        {/* Payment routes */}
        <Route path="payment/transfer/:eventId" element={<PaymentTransfer />} />
        <Route path="payment/code/:eventId" element={<PaymentCode />} />

        {/* Admin (protegido por rol) */}
        <Route
          path="admin"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />
      </Route>

      {/* Neutraliza /index.html si el host te lo redirige */}
      <Route path="/index.html" element={<Navigate to="/" replace />} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );

  // AGREGADO: Condicional para usar VirtualKeyboardHandler solo en móviles
  return deviceInfo.isMobile ? (
    <VirtualKeyboardHandler>
      <AppContent />
    </VirtualKeyboardHandler>
  ) : (
    <AppContent />
  );
}

export default App;
