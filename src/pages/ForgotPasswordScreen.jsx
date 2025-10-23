import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function ResetPasswordScreen() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr(''); setMsg('');
    if (!pw || pw.length < 6) return setErr('La contraseña debe tener al menos 6 caracteres');
    if (pw !== pw2) return setErr('Las contraseñas no coinciden');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: pw }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg(data.message || 'Contraseña actualizada. Inicia sesión.');
        setTimeout(() => navigate('/auth'), 1200);
      } else {
        setErr(data.message || 'No se pudo restablecer la contraseña');
      }
    } catch {
      setErr('Error de red o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="absolute top-4 left-4 z-50">
        <Link to="/auth" className="flex items-center text-white hover:text-gray-200 transition-colors">
          <span className="text-sm font-medium">Volver</span>
        </Link>
      </div>

      <div className="auth-form-section">
        <div className="max-w-md w-full space-y-8 p-4 md:p-0">
          <Card className="border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-foreground">Restablecer contraseña</CardTitle>
              <CardDescription className="text-foreground">
                Ingresa tu nueva contraseña para completar el proceso.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={submit} className="space-y-4" noValidate>
                {msg && <p className="text-green-500 text-sm">{msg}</p>}
                {err && <p className="text-red-500 text-sm">{err}</p>}

                <div className="floating-label-container">
                  <input
                    id="password"
                    type="password"
                    className={`floating-input ${pw ? 'has-value' : ''}`}
                    placeholder=" "
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <label htmlFor="password" className="floating-label">Nueva contraseña</label>
                </div>

                <div className="floating-label-container">
                  <input
                    id="password2"
                    type="password"
                    className={`floating-input ${pw2 ? 'has-value' : ''}`}
                    placeholder=" "
                    value={pw2}
                    onChange={(e) => setPw2(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <label htmlFor="password2" className="floating-label">Repetir contraseña</label>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Actualizando...' : 'Actualizar contraseña'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

