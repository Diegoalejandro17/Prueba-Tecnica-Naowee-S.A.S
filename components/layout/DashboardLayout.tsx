'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Navbar from './Navbar';
import LoadingSpinner from '../ui/LoadingSpinner';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, loadFromStorage } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    loadFromStorage();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated]);

  if (loading) {
    return (
      <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0f0d'}}>
        <LoadingSpinner size="lg" text="Cargando..." />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#0a0f0d', color: '#f0fdf4', position: 'relative'}}>

      {/* Fondo decorativo */}
      <div style={{position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0}}>
        <div style={{position: 'absolute', top: 0, left: '25%', width: '400px', height: '400px', background: 'rgba(34,197,94,0.05)', borderRadius: '50%', filter: 'blur(80px)'}} />
        <div style={{position: 'absolute', bottom: '25%', right: '25%', width: '300px', height: '300px', background: 'rgba(34,197,94,0.03)', borderRadius: '50%', filter: 'blur(80px)'}} />
      </div>

      <Navbar />

      <main style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '80px 1.5rem 3rem 1.5rem',
      }}>
        {children}
      </main>
    </div>
  );
}