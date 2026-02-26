'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { authApi } from '@/lib/axios';

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, loadFromStorage } = useAuthStore();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFromStorage();
    if (isAuthenticated) router.push('/canchas');
  }, [isAuthenticated]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !email || !password || !confirmPassword) {
      setError('Por favor completa todos los campos');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    setLoading(true);
    try {
      await authApi.post('/auth/register', { username, email, password });
      router.push('/login?registered=true');
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      setError(typeof detail === 'string' ? detail : 'Error al registrar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0f0d',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      fontFamily: 'DM Sans, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: 0, right: '25%', width: '400px', height: '400px', background: 'rgba(34,197,94,0.06)', borderRadius: '50%', filter: 'blur(80px)'}} />
        <div style={{position: 'absolute', bottom: 0, left: '25%', width: '300px', height: '300px', background: 'rgba(34,197,94,0.04)', borderRadius: '50%', filter: 'blur(80px)'}} />
      </div>

      <div style={{position: 'relative', zIndex: 10, width: '100%', maxWidth: '420px'}}>

        {/* Logo */}
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '72px', height: '72px',
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.25)',
            borderRadius: '20px',
            marginBottom: '1rem',
            boxShadow: '0 0 30px rgba(34,197,94,0.15)',
          }}>
            <span style={{color: '#22c55e', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.5rem'}}>AG</span>
          </div>
          <h1 style={{fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#f0fdf4', margin: 0}}>
            Agenda<span style={{color: '#22c55e'}}>Gol</span>
          </h1>
          <p style={{color: '#4ade80', fontSize: '0.875rem', marginTop: '0.5rem'}}>
            Crea tu cuenta y empieza a reservar
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(17, 26, 21, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(34,197,94,0.15)',
          borderRadius: '20px',
          padding: '2.5rem',
          boxShadow: '0 0 40px rgba(34,197,94,0.08)',
        }}>
          <h2 style={{fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.25rem', color: '#f0fdf4', marginBottom: '1.75rem', marginTop: 0}}>
            Crear Cuenta
          </h2>

          <form onSubmit={handleRegister} style={{display: 'flex', flexDirection: 'column', gap: '1.125rem'}}>

            {/* Username */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <label style={{fontSize: '0.875rem', fontWeight: 500, color: '#86efac'}}>Usuario</label>
              <div style={{position: 'relative'}}>
                <svg style={{position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#4ade80', width: '16px', height: '16px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input type="text" placeholder="Tu nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)}
                  style={{width: '100%', background: '#1a2820', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '10px', padding: '12px 16px 12px 42px', color: '#f0fdf4', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box'}}
                  onFocus={(e) => e.target.style.borderColor = '#22c55e'} onBlur={(e) => e.target.style.borderColor = 'rgba(34,197,94,0.15)'} />
              </div>
            </div>

            {/* Email */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <label style={{fontSize: '0.875rem', fontWeight: 500, color: '#86efac'}}>Correo electrónico</label>
              <div style={{position: 'relative'}}>
                <svg style={{position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#4ade80', width: '16px', height: '16px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
                  style={{width: '100%', background: '#1a2820', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '10px', padding: '12px 16px 12px 42px', color: '#f0fdf4', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box'}}
                  onFocus={(e) => e.target.style.borderColor = '#22c55e'} onBlur={(e) => e.target.style.borderColor = 'rgba(34,197,94,0.15)'} />
              </div>
            </div>

            {/* Password */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <label style={{fontSize: '0.875rem', fontWeight: 500, color: '#86efac'}}>Contraseña</label>
              <div style={{position: 'relative'}}>
                <svg style={{position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#4ade80', width: '16px', height: '16px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)}
                  style={{width: '100%', background: '#1a2820', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '10px', padding: '12px 16px 12px 42px', color: '#f0fdf4', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box'}}
                  onFocus={(e) => e.target.style.borderColor = '#22c55e'} onBlur={(e) => e.target.style.borderColor = 'rgba(34,197,94,0.15)'} />
              </div>
            </div>

            {/* Confirm Password */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <label style={{fontSize: '0.875rem', fontWeight: 500, color: '#86efac'}}>Confirmar contraseña</label>
              <div style={{position: 'relative'}}>
                <svg style={{position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#4ade80', width: '16px', height: '16px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <input type="password" placeholder="Repite tu contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{width: '100%', background: '#1a2820', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '10px', padding: '12px 16px 12px 42px', color: '#f0fdf4', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box'}}
                  onFocus={(e) => e.target.style.borderColor = '#22c55e'} onBlur={(e) => e.target.style.borderColor = 'rgba(34,197,94,0.15)'} />
              </div>
            </div>

            {error && (
              <div style={{background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px'}}>
                <p style={{color: '#f87171', fontSize: '0.875rem', margin: 0}}>⚠️ {error}</p>
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width: '100%', backgroundColor: loading ? '#16a34a' : '#22c55e', color: '#0a0f0d',
              border: 'none', borderRadius: '10px', padding: '14px', fontSize: '0.9375rem',
              fontWeight: 700, fontFamily: 'Syne, sans-serif', cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '0.25rem', boxShadow: '0 0 20px rgba(34,197,94,0.2)',
            }}>
              {loading ? 'Creando cuenta...' : 'Crear Cuenta →'}
            </button>

            {/* ✅ Link adentro de la card */}
            <p style={{textAlign: 'center', color: '#4ade80', fontSize: '0.875rem', margin: '0.25rem 0 0 0'}}>
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" style={{color: '#22c55e', fontWeight: 600, textDecoration: 'none'}}>
                Inicia sesión
              </Link>
            </p>

          </form>
        </div>

        <p style={{textAlign: 'center', color: '#2d4a38', fontSize: '0.75rem', marginTop: '1.5rem'}}>
          Sistema de gestión de canchas deportivas
        </p>
      </div>
    </div>
  );
}