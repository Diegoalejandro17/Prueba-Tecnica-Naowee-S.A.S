'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { dashboardApi } from '@/lib/axios';
import { DashboardStats } from '@/types';
import { useAuthStore } from '@/store/authStore';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function AdminPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [fieldStats, setFieldStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/canchas');
      return;
    }
    fetchStats();
  }, [user]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const [statsRes, fieldStatsRes] = await Promise.all([
        dashboardApi.get('/dashboard/stats', { headers }),
        dashboardApi.get('/dashboard/fields/stats', { headers }),
      ]);
      setStats(statsRes.data);
      const fsData = fieldStatsRes.data;
      setFieldStats(Array.isArray(fsData) ? fsData : fsData.fields ?? fsData.data ?? []);
    } catch (err) {
      console.error('Error al cargar estadísticas:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = stats ? [
    { label: 'Total Usuarios', value: stats.total_users, icon: '👥', color: '#60a5fa', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)' },
    { label: 'Total Canchas', value: stats.total_fields, icon: '🏟️', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)' },
    { label: 'Reservas Activas', value: stats.active_reservations, icon: '📅', color: '#facc15', bg: 'rgba(250,204,21,0.1)', border: 'rgba(250,204,21,0.2)' },
    { label: 'Ingresos Totales', value: `$${stats.total_revenue}`, icon: '💰', color: '#4ade80', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.2)' },
    { label: 'Total Reservas', value: stats.total_reservations, icon: '📊', color: '#c084fc', bg: 'rgba(192,132,252,0.1)', border: 'rgba(192,132,252,0.2)' },
    { label: 'Cancelaciones', value: stats.cancelled_reservations, icon: '❌', color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.2)' },
  ] : [];

  return (
    <DashboardLayout>
      <div style={{paddingTop: '80px', fontFamily: 'DM Sans, sans-serif'}}>

        {/* Header */}
        <div style={{marginBottom: '2rem'}}>
          <h1 style={{fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.875rem', color: '#f0fdf4', margin: 0}}>
            Dashboard Admin
          </h1>
          <p style={{color: '#4ade80', fontSize: '0.875rem', marginTop: '0.375rem'}}>
            Resumen general del sistema
          </p>
        </div>

        {loading ? (
          <div style={{display: 'flex', justifyContent: 'center', padding: '5rem 0'}}>
            <LoadingSpinner size="lg" text="Cargando estadísticas..." />
          </div>
        ) : (
          <>
            {/* Stats grid */}
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem'}}>
              {statCards.map((stat, i) => (
                <div key={i} style={{
                  background: '#111a15',
                  border: '1px solid rgba(34,197,94,0.12)',
                  borderRadius: '14px',
                  padding: '1.5rem',
                  transition: 'all 0.2s',
                }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '44px', height: '44px',
                    background: stat.bg,
                    border: `1px solid ${stat.border}`,
                    borderRadius: '12px',
                    marginBottom: '1rem',
                    fontSize: '1.25rem',
                  }}>
                    {stat.icon}
                  </div>
                  <p style={{color: '#4ade80', fontSize: '0.75rem', margin: '0 0 0.375rem 0', textTransform: 'uppercase', letterSpacing: '0.05em'}}>
                    {stat.label}
                  </p>
                  <p style={{fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.75rem', color: stat.color, margin: 0}}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Tasa de ocupación */}
            {stats && stats.total_reservations > 0 && (
              <div style={{
                background: '#111a15',
                border: '1px solid rgba(34,197,94,0.12)',
                borderRadius: '14px',
                padding: '1.75rem',
                marginBottom: '1.5rem',
              }}>
                <h2 style={{fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.125rem', color: '#f0fdf4', marginTop: 0, marginBottom: '1.5rem'}}>
                  📈 Tasa de Ocupación
                </h2>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem'}}>

                  <div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                      <span style={{color: '#86efac', fontSize: '0.875rem'}}>Reservas activas</span>
                      <span style={{color: '#22c55e', fontFamily: 'Syne, sans-serif', fontWeight: 700}}>
                        {Math.round((stats.active_reservations / stats.total_reservations) * 100)}%
                      </span>
                    </div>
                    <div style={{width: '100%', background: '#1a2820', borderRadius: '999px', height: '8px', overflow: 'hidden'}}>
                      <div style={{
                        width: `${(stats.active_reservations / stats.total_reservations) * 100}%`,
                        background: 'linear-gradient(90deg, #16a34a, #22c55e)',
                        height: '8px',
                        borderRadius: '999px',
                        transition: 'width 0.7s ease',
                      }} />
                    </div>
                  </div>

                  <div>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                      <span style={{color: '#86efac', fontSize: '0.875rem'}}>Cancelaciones</span>
                      <span style={{color: '#f87171', fontFamily: 'Syne, sans-serif', fontWeight: 700}}>
                        {Math.round((stats.cancelled_reservations / stats.total_reservations) * 100)}%
                      </span>
                    </div>
                    <div style={{width: '100%', background: '#1a2820', borderRadius: '999px', height: '8px', overflow: 'hidden'}}>
                      <div style={{
                        width: `${(stats.cancelled_reservations / stats.total_reservations) * 100}%`,
                        background: 'linear-gradient(90deg, #dc2626, #f87171)',
                        height: '8px',
                        borderRadius: '999px',
                        transition: 'width 0.7s ease',
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tabla por cancha */}
            {fieldStats.length > 0 && (
              <div style={{
                background: '#111a15',
                border: '1px solid rgba(34,197,94,0.12)',
                borderRadius: '14px',
                padding: '1.75rem',
              }}>
                <h2 style={{fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.125rem', color: '#f0fdf4', marginTop: 0, marginBottom: '1.25rem'}}>
                  🏟️ Estadísticas por Cancha
                </h2>
                <div style={{overflowX: 'auto'}}>
                  <table style={{width: '100%', borderCollapse: 'collapse'}}>
                    <thead>
                      <tr style={{borderBottom: '1px solid rgba(34,197,94,0.1)'}}>
                        {['Cancha', 'Reservas', 'Ingresos'].map(h => (
                          <th key={h} style={{
                            textAlign: 'left', padding: '10px 12px',
                            color: '#4ade80', fontSize: '0.75rem',
                            textTransform: 'uppercase', letterSpacing: '0.05em',
                            fontWeight: 600, fontFamily: 'DM Sans, sans-serif',
                          }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {fieldStats.map((field, i) => (
                        <tr key={i} style={{
                          borderBottom: '1px solid rgba(34,197,94,0.05)',
                          transition: 'background 0.15s',
                        }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(34,197,94,0.03)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <td style={{padding: '12px', color: '#f0fdf4', fontSize: '0.875rem', fontWeight: 500}}>
                            {field.field_name || field.name}
                          </td>
                          <td style={{padding: '12px', color: '#86efac', fontSize: '0.875rem'}}>
                            {field.total_reservations ?? field.reservations ?? 0}
                          </td>
                          <td style={{padding: '12px', color: '#22c55e', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9375rem'}}>
                            ${field.total_revenue ?? field.revenue ?? 0}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}