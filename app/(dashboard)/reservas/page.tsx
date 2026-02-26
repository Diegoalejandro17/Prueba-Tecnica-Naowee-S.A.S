'use client';

import React, { useEffect, useState } from 'react';
import { reservationsApi, fieldsApi } from '@/lib/axios';
import { Reservation, Field } from '@/types';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ReservasPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [cancelling, setCancelling] = useState<number | null>(null);
  const [selectedField, setSelectedField] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [availability, setAvailability] = useState<{start_time: string; end_time: string}[]>([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [duration, setDuration] = useState<1 | 2>(1);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchReservations();
    fetchFields();
  }, []);

  useEffect(() => {
    if (selectedField && selectedDate) {
      fetchAvailability(selectedField, selectedDate);
    }
  }, [selectedField, selectedDate]);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await reservationsApi.get('/reservations/my', {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('📦 Respuesta del API:', data);
      const result = Array.isArray(data) ? data : data.reservations ?? data.data ?? [];
      console.log('✅ Reservas:', result);
      if (result.length > 0) {
        console.log('🏷️ Status de primera reserva:', result[0].status);
        console.log('📋 Primera reserva completa:', result[0]);
      }

      setReservations(result);
    } catch (err: any) {
      console.error('❌ Error al cargar reservas:', err.response?.data);
    } finally {
      setLoading(false);
    }
  };

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
    }
  };

  const fetchAvailability = async (fieldId: string, date: string) => {
    setLoadingAvailability(true);
    setAvailability([]);
    setSelectedSlot('');
    try {
      const token = localStorage.getItem('token');
      const { data } = await fieldsApi.get(`/fields/${fieldId}/availability?date=${date}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const hours: string[] = data.available_hours ?? [];
      const slots = hours.map((hour: string) => ({
        start_time: hour,
        end_time: `${String(parseInt(hour) + 1).padStart(2, '0')}:00`,
      }));
      setAvailability(slots);
    } catch (err: any) {
      console.error('Error disponibilidad:', err.response?.data);
    } finally {
      setLoadingAvailability(false);
    }
  };

  const handleCreateReservation = async () => {
    if (!selectedField || !selectedDate || !selectedSlot) {
      setFormError('Por favor completa todos los campos');
      return;
    }
    setFormError('');
    setCreating(true);
    try {
      const token = localStorage.getItem('token');
      const isoStartTime = `${selectedDate}T${selectedSlot}:00`;

      const response = await reservationsApi.post(
        '/reservations/',
        { field_id: Number(selectedField), start_time: isoStartTime, duration_hours: duration },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('🎉 Reserva creada:', response.data);

      setShowForm(false);
      setSelectedField('');
      setSelectedDate('');
      setSelectedSlot('');
      setDuration(1);
      setAvailability([]);
      fetchReservations();
    } catch (err: any) {
      console.error('❌ Error al crear:', err.response?.data);
      const detail = err.response?.data?.detail;
      const message = Array.isArray(detail)
        ? 'Error de validación en los datos'
        : typeof detail === 'string' ? detail : 'Error al crear la reserva';
      setFormError(message);
    } finally {
      setCreating(false);
    }
  };

  const handleCancel = async (id: number) => {
    setCancelling(id);
    try {
      const token = localStorage.getItem('token');
      await reservationsApi.post(`/reservations/${id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchReservations();
    } catch (err) {
      console.error('Error al cancelar:', err);
    } finally {
      setCancelling(null);
    }
  };

  const normalizeStatus = (status: string = '') => status.toLowerCase().trim();
  const CANCELLED_STATUSES = ['cancelled', 'canceled', 'cancelada', 'cancelado'];

  const activeReservations = reservations.filter(r => !CANCELLED_STATUSES.includes(normalizeStatus(r.status)));
  const cancelledReservations = reservations.filter(r => CANCELLED_STATUSES.includes(normalizeStatus(r.status)));

  const formatDate = (value: string = '') => (!value ? '—' : value.split('T')[0]);
  const formatTime = (value: string = '') => {
    if (!value) return '—';
    if (value.includes('T')) return value.split('T')[1].substring(0, 5);
    return value.substring(0, 5);
  };

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const max = maxDate.toISOString().split('T')[0];

  const inputStyle = {
    background: '#1a2820',
    border: '1px solid rgba(34,197,94,0.15)',
    borderRadius: '10px',
    padding: '11px 16px',
    color: '#f0fdf4',
    fontSize: '0.875rem',
    width: '100%',
    boxSizing: 'border-box' as const,
    outline: 'none',
    fontFamily: 'DM Sans, sans-serif',
  };

  return (
    <DashboardLayout>
      <div style={{paddingTop: '80px', fontFamily: 'DM Sans, sans-serif'}}>

        {/* Header */}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem'}}>
          <div>
            <h1 style={{fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.875rem', color: '#f0fdf4', margin: 0}}>
              Mis Reservas
            </h1>
            <p style={{color: '#4ade80', fontSize: '0.875rem', marginTop: '0.375rem'}}>
              Gestiona tus reservas de canchas
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              backgroundColor: showForm ? 'transparent' : '#22c55e',
              color: showForm ? '#86efac' : '#0a0f0d',
              border: showForm ? '1px solid rgba(34,197,94,0.3)' : 'none',
              padding: '11px 24px',
              borderRadius: '10px',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontFamily: 'Syne, sans-serif',
              boxShadow: showForm ? 'none' : '0 0 20px rgba(34,197,94,0.2)',
              transition: 'all 0.2s',
            }}
          >
            {showForm ? '✕ Cancelar' : '+ Nueva Reserva'}
          </button>
        </div>

        {/* Formulario */}
        {showForm && (
          <div style={{
            background: '#111a15',
            border: '1px solid rgba(34,197,94,0.15)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 0 30px rgba(34,197,94,0.06)',
          }}>
            <h2 style={{fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.125rem', color: '#f0fdf4', marginTop: 0, marginBottom: '1.5rem'}}>
              🏟️ Nueva Reserva
            </h2>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem'}}>

              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <label style={{fontSize: '0.8125rem', fontWeight: 500, color: '#86efac'}}>Cancha</label>
                <select value={selectedField} onChange={(e) => setSelectedField(e.target.value)} style={inputStyle}>
                  <option value="">Selecciona una cancha</option>
                  {fields.map(f => <option key={String(f.id)} value={String(f.id)}>{f.name}</option>)}
                </select>
              </div>

              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <label style={{fontSize: '0.8125rem', fontWeight: 500, color: '#86efac'}}>Fecha</label>
                <input type="date" min={today} max={max} value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={inputStyle} />
              </div>

              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <label style={{fontSize: '0.8125rem', fontWeight: 500, color: '#86efac'}}>Duración</label>
                <select value={duration} onChange={(e) => setDuration(parseInt(e.target.value) as 1 | 2)} style={inputStyle}>
                  <option value={1}>1 hora</option>
                  <option value={2}>2 horas</option>
                </select>
              </div>

              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <label style={{fontSize: '0.8125rem', fontWeight: 500, color: '#86efac'}}>
                  Horario {loadingAvailability && <span style={{color: '#4ade80', fontSize: '0.75rem'}}>· consultando...</span>}
                </label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  disabled={availability.length === 0}
                  style={{...inputStyle, opacity: availability.length === 0 ? 0.5 : 1}}
                >
                  <option value="">{availability.length === 0 ? 'Selecciona cancha y fecha' : 'Elige un horario'}</option>
                  {availability.map((slot, i) => (
                    <option key={i} value={slot.start_time}>{slot.start_time} → {slot.end_time}</option>
                  ))}
                </select>
              </div>
            </div>

            {formError && (
              <div style={{marginTop: '1rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '12px 16px'}}>
                <p style={{color: '#f87171', fontSize: '0.875rem', margin: 0}}>⚠️ {formError}</p>
              </div>
            )}

            <div style={{marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end'}}>
              <button
                onClick={handleCreateReservation}
                disabled={creating}
                style={{
                  backgroundColor: '#22c55e',
                  color: '#0a0f0d',
                  padding: '12px 32px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  cursor: creating ? 'not-allowed' : 'pointer',
                  fontSize: '0.9375rem',
                  border: 'none',
                  fontFamily: 'Syne, sans-serif',
                  boxShadow: '0 0 20px rgba(34,197,94,0.2)',
                  opacity: creating ? 0.7 : 1,
                }}
              >
                {creating ? 'Creando reserva...' : 'Confirmar Reserva →'}
              </button>
            </div>
          </div>
        )}

        {/* Lista */}
        {loading ? (
          <div style={{display: 'flex', justifyContent: 'center', padding: '5rem 0'}}>
            <LoadingSpinner size="lg" text="Cargando reservas..." />
          </div>
        ) : (
          <>
            {/* Activas */}
            <div style={{marginBottom: '2.5rem'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}>
                <div style={{width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e'}} />
                <h2 style={{fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.125rem', color: '#f0fdf4', margin: 0}}>
                  Activas <span style={{color: '#4ade80', fontWeight: 400, fontSize: '0.9375rem'}}>({activeReservations.length})</span>
                </h2>
              </div>

              {activeReservations.length === 0 ? (
                <div style={{background: '#111a15', border: '1px solid rgba(34,197,94,0.1)', borderRadius: '12px', padding: '3rem', textAlign: 'center'}}>
                  <p style={{color: '#4ade80', fontSize: '0.875rem', margin: 0}}>No tienes reservas activas</p>
                  <p style={{color: '#2d4a38', fontSize: '0.8125rem', marginTop: '0.5rem'}}>Haz clic en "+ Nueva Reserva" para comenzar</p>
                </div>
              ) : (
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem'}}>
                  {activeReservations.map((r) => (
                    <div key={r.id} style={{
                      background: '#111a15',
                      border: '1px solid rgba(34,197,94,0.15)',
                      borderRadius: '14px',
                      padding: '1.5rem',
                      transition: 'all 0.2s',
                    }}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem'}}>
                        <h3 style={{fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#f0fdf4', margin: 0, fontSize: '1rem'}}>
                          {r.field_name || `Cancha #${r.field_id}`}
                        </h3>
                        <span style={{background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e', fontSize: '0.6875rem', fontWeight: 600, padding: '3px 10px', borderRadius: '999px'}}>
                          {r.status ?? 'Activa'}
                        </span>
                      </div>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '0.375rem', marginBottom: '1.25rem'}}>
                        <p style={{color: '#86efac', fontSize: '0.875rem', margin: 0}}>📅 {formatDate(r.date ?? r.start_time)}</p>
                        <p style={{color: '#86efac', fontSize: '0.875rem', margin: 0}}>🕐 {formatTime(r.start_time)} — {formatTime(r.end_time)}</p>
                        <p style={{color: '#86efac', fontSize: '0.875rem', margin: 0}}>⏱ {r.duration_hours} hora(s)</p>
                        <p style={{color: '#22c55e', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', margin: 0, marginTop: '0.25rem'}}>
                          💰 ${r.total_price}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCancel(r.id)}
                        disabled={cancelling === r.id}
                        style={{
                          width: '100%',
                          background: 'rgba(239,68,68,0.08)',
                          border: '1px solid rgba(239,68,68,0.2)',
                          color: '#f87171',
                          padding: '9px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          opacity: cancelling === r.id ? 0.7 : 1,
                        }}
                      >
                        {cancelling === r.id ? 'Cancelando...' : 'Cancelar Reserva'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Canceladas */}
            {cancelledReservations.length > 0 && (
              <div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem'}}>
                  <div style={{width: '8px', height: '8px', background: '#f87171', borderRadius: '50%'}} />
                  <h2 style={{fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.125rem', color: '#f0fdf4', margin: 0}}>
                    Canceladas <span style={{color: '#f87171', fontWeight: 400, fontSize: '0.9375rem'}}>({cancelledReservations.length})</span>
                  </h2>
                </div>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem'}}>
                  {cancelledReservations.map((r) => (
                    <div key={r.id} style={{
                      background: '#0f1812',
                      border: '1px solid rgba(239,68,68,0.1)',
                      borderRadius: '14px',
                      padding: '1.5rem',
                      opacity: 0.7,
                    }}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem'}}>
                        <h3 style={{fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#f0fdf4', margin: 0, fontSize: '1rem'}}>
                          {r.field_name || `Cancha #${r.field_id}`}
                        </h3>
                        <span style={{background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: '0.6875rem', fontWeight: 600, padding: '3px 10px', borderRadius: '999px'}}>
                          Cancelada
                        </span>
                      </div>
                      <p style={{color: '#86efac', fontSize: '0.875rem', margin: '0 0 0.375rem 0'}}>📅 {formatDate(r.date ?? r.start_time)}</p>
                      <p style={{color: '#86efac', fontSize: '0.875rem', margin: '0 0 0.375rem 0'}}>🕐 {formatTime(r.start_time)} — {formatTime(r.end_time)}</p>
                      <p style={{color: '#4ade80', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9375rem', margin: 0, marginTop: '0.5rem'}}>
                        💰 ${r.total_price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}