import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.jsx';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateEvent from './pages/CreateEvent';
import PaymentTransfer from './pages/PaymentTransfer';
import PaymentCode from './pages/PaymentCode';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-500 mx-auto"></div>
          <p className="mt-4 text-warm-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Landing page - accessible to everyone */}
      <Route path="/" element={<Landing />} />
      
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
