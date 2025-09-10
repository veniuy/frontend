import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'   // <-- Importa tu AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>   {/* <-- Aquí envuelves toda tu app */}
      <App />
    </AuthProvider>
  </StrictMode>,
)
