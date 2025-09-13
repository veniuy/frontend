import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.jsx';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import PaymentTransfer from './pages/PaymentTransfer';
import PaymentCode from './pages/PaymentCode';
import DemoWedding from './pages/DemoWedding';
import DemoQuinceanera from './pages/DemoQuinceanera';
import DemoBlack from './pages/DemoBlack';
import DemoPremium from './pages/DemoPremium';
import DemoClassic from './pages/DemoClassic';
import InvitationEditor from './pages/InvitationEditor';
// Category pages
import Boda from './pages/categories/Boda';
import Quinceaneras from './pages/categories/Quinceaneras';
import Infantiles from './pages/categories/Infantiles';
import Bautizo from './pages/categories/Bautizo';
import Corporativos from './pages/categories/Corporativos';
import Graduaciones from './pages/categories/Graduaciones';
import './utils/assets';


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

  return (
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
      
      {/* Editor de Invitaciones */}
      <Route path="/editor" element={<InvitationEditor />} />
      <Route path="/editor/:id" element={<InvitationEditor />} />
      
      {/* Category routes */}
      <Route path="/categorias/boda" element={<Boda />} />
      <Route path="/categorias/quinceaneras" element={<Quinceaneras />} />
      <Route path="/categorias/infantiles" element={<Infantiles />} />
      <Route path="/categorias/bautizo" element={<Bautizo />} />
      <Route path="/categorias/corporativos" element={<Corporativos />} />
      <Route path="/categorias/graduaciones" element={<Graduaciones />} />
      
      {/* Auth routes */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/app/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/app/dashboard" />} />

      {/* Protected app routes */}
      <Route path="/app" element={user ? <Layout /> : <Navigate to="/login" />}>
        <Route index element={<Navigate to="/app/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="events/create" element={<CreateEvent />} />
        <Route path="payment/transfer/:eventId" element={<PaymentTransfer />} />
        <Route path="payment/code/:eventId" element={<PaymentCode />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
