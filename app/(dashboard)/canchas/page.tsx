'use client';

import React, { useEffect, useState } from 'react';
import { fieldsApi } from '@/lib/axios';
import { Field } from '@/types';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function CanchasPage() {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [availability, setAvailability] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [loadingAvailability, setLoadingAvailability] = useState(false);

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await fieldsApi.get('/fields/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = Array.isArray(data) ? data : data.fields ?? data.data ?? [];
      setFields(result);
    } catch (err) {
      console.error('Error al cargar canchas:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailability = async (fieldId: number, date: string) => {
    if (!date) return;
    setLoadingAvailability(true);
    setAvailability([]);
    try {
      const token = localStorage.getItem('token');
      const { data } = await fieldsApi.get(`/fields/${fieldId}/availability?date=${date}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAvailability(data.available_hours ?? []);
    } catch (err) {
      console.error('Error al cargar disponibilidad:', err);
    } finally {
      setLoadingAvailability(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const max = maxDate.toISOString().split('T')[0];

  return (
    <DashboardLayout>
      <div style={{paddingTop: '80px', fontFamily: 'DM Sans, sans-serif'}}>

        {/* Header */}
        <div style={{marginBottom: '2rem'}}>
          <h1 style={{fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.875rem', color: '#f0fdf4', margin: 0}}>
            Canchas Disponibles
          </h1>
          <p style={{color: '#4ade80', fontSize: '0.875rem', marginTop: '0.375rem'}}>
            Explora nuestras canchas y consulta disponibilidad
          </p>
        </div>

        {loading ? (
          <div style={{display: 'flex', justifyContent: 'center', padding: '5rem 0'}}>
            <LoadingSpinner size="lg" text="Cargando canchas..." />
          </div>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem'}}>
            {fields.map((field) => (
              <div key={field.id} style={{
                background: '#111a15',
                border: `1px solid ${selectedField?.id === field.id ? 'rgba(34,197,94,0.4)' : 'rgba(34,197,94,0.12)'}`,
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: selectedField?.id === field.id ? '0 0 30px rgba(34,197,94,0.12)' : 'none',
                transition: 'all 0.3s',
              }}>

                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem'}}>
                  <div style={{
                    width: '44px', height: '44px',
                    background: 'rgba(34,197,94,0.1)',
                    border: '1px solid rgba(34,197,94,0.2)',
                    borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{fontSize: '1.25rem'}}>🏟️</span>
                  </div>
                  <div style={{
                    background: 'rgba(34,197,94,0.1)',
                    border: '1px solid rgba(34,197,94,0.2)',
                    borderRadius: '8px',
                    padding: '4px 12px',
                  }}>
                    <span style={{color: '#22c55e', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9375rem'}}>
                      ${field.price_per_hour}/hr
                    </span>
                  </div>
                </div>

                <h3 style={{fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.125rem', color: '#f0fdf4', margin: '0 0 0.375rem 0'}}>
                  {field.name}
                </h3>
                <p style={{color: '#4ade80', fontSize: '0.875rem', marginBottom: '1rem'}}>
                  📍 {field.location}
                </p>

                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(34,197,94,0.06)',
                  border: '1px solid rgba(34,197,94,0.1)',
                  borderRadius: '8px',
                  padding: '4px 12px',
                  marginBottom: '1.25rem',
                }}>
                  <span style={{fontSize: '0.75rem', color: '#86efac'}}>👥 {field.capacity} jugadores</span>
                </div>

                {selectedField?.id === field.id ? (
                  <div style={{borderTop: '1px solid rgba(34,197,94,0.1)', paddingTop: '1rem'}}>
                    <p style={{color: '#86efac', fontSize: '0.875rem', marginBottom: '0.75rem'}}>
                      Selecciona una fecha:
                    </p>
                    <input
                      type="date"
                      min={today}
                      max={max}
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        fetchAvailability(field.id, e.target.value);
                      }}
                      style={{
                        width: '100%',
                        background: '#1a2820',
                        border: '1px solid rgba(34,197,94,0.15)',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        color: '#f0fdf4',
                        fontSize: '0.875rem',
                        marginBottom: '0.75rem',
                        boxSizing: 'border-box',
                        outline: 'none',
                      }}
                    />

                    {loadingAvailability ? (
                      <div style={{display: 'flex', justifyContent: 'center', padding: '1rem 0'}}>
                        <LoadingSpinner size="sm" text="Consultando..." />
                      </div>
                    ) : availability.length > 0 ? (
                      <>
                        <p style={{color: '#4ade80', fontSize: '0.75rem', marginBottom: '0.5rem'}}>
                          Horarios disponibles:
                        </p>
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', maxHeight: '160px', overflowY: 'auto'}}>
                          {availability.map((hour, i) => (
                            <div key={i} style={{
                              background: 'rgba(34,197,94,0.08)',
                              border: '1px solid rgba(34,197,94,0.2)',
                              borderRadius: '8px',
                              padding: '6px 4px',
                              textAlign: 'center',
                              color: '#22c55e',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                            }}>
                              {hour}
                            </div>
                          ))}
                        </div>
                      </>
                    ) : selectedDate ? (
                      <p style={{color: '#4ade80', fontSize: '0.8125rem', textAlign: 'center', padding: '0.5rem 0'}}>
                        No hay horarios disponibles
                      </p>
                    ) : null}

                    <button
                      onClick={() => { setSelectedField(null); setAvailability([]); setSelectedDate(''); }}
                      style={{
                        width: '100%',
                        marginTop: '0.75rem',
                        background: 'transparent',
                        border: '1px solid rgba(34,197,94,0.2)',
                        borderRadius: '8px',
                        padding: '8px',
                        color: '#86efac',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                      }}
                    >
                      Cerrar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedField(field)}
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: '1px solid rgba(34,197,94,0.25)',
                      borderRadius: '8px',
                      padding: '10px',
                      color: '#86efac',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      fontWeight: 500,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(34,197,94,0.08)';
                      e.currentTarget.style.borderColor = 'rgba(34,197,94,0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(34,197,94,0.25)';
                    }}
                  >
                    Ver Disponibilidad
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}