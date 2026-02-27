'use client';

import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0a0f0d',
        fontFamily: 'DM Sans, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}>

        <div style={{position: 'fixed', inset: 0, pointerEvents: 'none'}}>
          <div style={{position: 'absolute', top: '-10%', left: '10%', width: '600px', height: '600px', background: 'rgba(34,197,94,0.06)', borderRadius: '50%', filter: 'blur(100px)'}} />
          <div style={{position: 'absolute', bottom: '-10%', right: '10%', width: '500px', height: '500px', background: 'rgba(34,197,94,0.04)', borderRadius: '50%', filter: 'blur(100px)'}} />
          <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'rgba(34,197,94,0.02)', borderRadius: '50%', filter: 'blur(120px)'}} />
        </div>

        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background: 'rgba(10,15,13,0.8)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(34,197,94,0.08)',
          padding: '0 2rem',
          height: '64px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <div style={{
              width: '34px', height: '34px',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              borderRadius: '9px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 16px rgba(34,197,94,0.35)',
            }}>
              <span style={{color: '#0a0f0d', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.8125rem'}}>AG</span>
            </div>
            <span style={{fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.125rem', color: '#f0fdf4'}}>
              Agenda<span style={{color: '#22c55e'}}>Gol</span>
            </span>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <Link href="/login" style={{
              textDecoration: 'none',
              color: '#86efac',
              fontSize: '0.875rem',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid transparent',
              transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(34,197,94,0.2)';
                e.currentTarget.style.background = 'rgba(34,197,94,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Iniciar Sesión
            </Link>
            <Link href="/register" style={{
              textDecoration: 'none',
              color: '#0a0f0d',
              fontSize: '0.875rem',
              fontWeight: 700,
              padding: '8px 20px',
              borderRadius: '8px',
              background: '#22c55e',
              boxShadow: '0 0 20px rgba(34,197,94,0.25)',
              fontFamily: 'Syne, sans-serif',
            }}>
              Registrarse
            </Link>
          </div>
        </nav>

        <section style={{
          minHeight: '100vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          padding: '6rem 1.5rem 4rem',
          position: 'relative', zIndex: 10,
        }}>
          <div style={{maxWidth: '800px'}}>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: '999px',
              padding: '6px 16px',
              marginBottom: '2rem',
            }}>
              <div style={{width: '6px', height: '6px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 8px #22c55e'}} />
              <span style={{color: '#4ade80', fontSize: '0.8125rem', fontWeight: 500}}>Sistema de reservas deportivas</span>
            </div>

            <h1 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              color: '#f0fdf4',
              lineHeight: 1.1,
              margin: '0 0 1.5rem 0',
            }}>
              Reserva tu cancha<br />
              <span style={{color: '#22c55e'}}>en segundos</span>
            </h1>

            <p style={{
              color: '#86efac',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: 1.6,
              maxWidth: '560px',
              margin: '0 auto 3rem',
            }}>
              Gestiona tus canchas de fútbol de forma simple y rápida. Consulta disponibilidad, haz tu reserva y juega.
            </p>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap'}}>
              <Link href="/register" style={{
                textDecoration: 'none',
                color: '#0a0f0d',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                padding: '14px 32px',
                borderRadius: '12px',
                background: '#22c55e',
                boxShadow: '0 0 30px rgba(34,197,94,0.3)',
                transition: 'all 0.2s',
              }}>
                Registrate gratis →
              </Link>
              <Link href="/login" style={{
                textDecoration: 'none',
                color: '#86efac',
                fontSize: '1rem',
                padding: '14px 32px',
                borderRadius: '12px',
                background: 'transparent',
                border: '1px solid rgba(34,197,94,0.25)',
                transition: 'all 0.2s',
              }}>
                Ya tengo cuenta inciar sesion
              </Link>
            </div>
          </div>
        </section>

        <section style={{
          padding: '4rem 1.5rem 6rem',
          position: 'relative', zIndex: 10,
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          <h2 style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            color: '#f0fdf4', textAlign: 'center',
            margin: '0 0 3rem 0',
          }}>
            Todo lo que necesitas
          </h2>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem'}}>
            {[
              {
                icon: '🏟️',
                title: 'Canchas disponibles',
                desc: 'Explora todas las canchas disponibles con su ubicación, capacidad y precio por hora.',
                color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.15)',
              },
              {
                icon: '📅',
                title: 'Disponibilidad en tiempo real',
                desc: 'Consulta los horarios libres de cualquier cancha para la fecha que necesites.',
                color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.15)',
              },
              {
                icon: '⚡',
                title: 'Reserva rápida',
                desc: 'Reserva tu cancha en segundos. Elige duración de 1 o 2 horas según tu necesidad.',
                color: '#facc15', bg: 'rgba(250,204,21,0.08)', border: 'rgba(250,204,21,0.15)',
              },
              {
                icon: '📊',
                title: 'Panel de administración',
                desc: 'Control total del sistema con estadísticas de ingresos, ocupación y reservas.',
                color: '#c084fc', bg: 'rgba(192,132,252,0.08)', border: 'rgba(192,132,252,0.15)',
              },
            ].map((f, i) => (
              <div key={i} style={{
                background: '#111a15',
                border: `1px solid ${f.border}`,
                borderRadius: '16px',
                padding: '2rem',
                transition: 'all 0.3s',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.3)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '52px', height: '52px',
                  background: f.bg,
                  border: `1px solid ${f.border}`,
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '1.25rem',
                }}>
                  {f.icon}
                </div>
                <h3 style={{fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.0625rem', color: '#f0fdf4', margin: '0 0 0.625rem 0'}}>
                  {f.title}
                </h3>
                <p style={{color: '#4ade80', fontSize: '0.875rem', lineHeight: 1.6, margin: 0}}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{
          padding: '2rem 1.5rem 6rem',
          position: 'relative', zIndex: 10,
          textAlign: 'center',
        }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            background: 'rgba(17,26,21,0.8)',
            border: '1px solid rgba(34,197,94,0.15)',
            borderRadius: '24px',
            padding: '3rem 2rem',
            boxShadow: '0 0 60px rgba(34,197,94,0.06)',
          }}>
            <h2 style={{fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#f0fdf4', margin: '0 0 1rem 0'}}>
              ¿Listo para jugar?
            </h2>
            <p style={{color: '#86efac', fontSize: '1rem', margin: '0 0 2rem 0', lineHeight: 1.6}}>
              Crea tu cuenta gratis y empieza a reservar canchas hoy mismo.
            </p>
            <Link href="/register" style={{
              textDecoration: 'none',
              color: '#0a0f0d',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '14px 40px',
              borderRadius: '12px',
              background: '#22c55e',
              boxShadow: '0 0 30px rgba(34,197,94,0.3)',
              display: 'inline-block',
            }}>
              Crear cuenta →
            </Link>
          </div>
        </section>

        <footer style={{
          borderTop: '1px solid rgba(34,197,94,0.08)',
          padding: '1.5rem',
          textAlign: 'center',
          position: 'relative', zIndex: 10,
        }}>
          <p style={{color: '#2d4a38', fontSize: '0.8125rem', margin: 0}}>
            © 2026 AgendaGol — Prueba Técnica Naowee S.A.S
          </p>
        </footer>

      </div>

      <style>{`
        * { box-sizing: border-box; }
      `}</style>
    </>
  );
}