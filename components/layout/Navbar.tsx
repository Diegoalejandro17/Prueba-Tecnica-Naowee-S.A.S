'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navLinks = [
    { href: '/canchas', label: 'Canchas', icon: '🏟️' },
    { href: '/reservas', label: 'Mis Reservas', icon: '📅' },
    ...(user?.role === 'admin'
      ? [{ href: '/admin', label: 'Dashboard', icon: '📊' }]
      : []),
  ];

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(10, 15, 13, 0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(34,197,94,0.1)',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1.25rem',
            minHeight: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            href="/canchas"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                borderRadius: '9px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(34,197,94,0.35)',
              }}
            >
              <span
                style={{
                  color: '#0a0f0d',
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: '0.8125rem',
                }}
              >
                AG
              </span>
            </div>

            <span
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: '1.0625rem',
                color: '#f0fdf4',
              }}
            >
              Agenda<span style={{ color: '#22c55e' }}>Gol</span>
            </span>
          </Link>

          {/* Links Desktop */}
          <div className="desktop-nav links">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 14px',
                    borderRadius: '10px',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#22c55e' : '#86efac',
                    background: isActive
                      ? 'rgba(34,197,94,0.1)'
                      : 'transparent',
                    border: `1px solid ${
                      isActive
                        ? 'rgba(34,197,94,0.25)'
                        : 'transparent'
                    }`,
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Usuario Desktop */}
          <div className="desktop-nav user">
            <div style={{ textAlign: 'right' }}>
              <p
                style={{
                  color: '#f0fdf4',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {user?.username}
              </p>
              <p
                style={{
                  color: '#4ade80',
                  fontSize: '0.6875rem',
                  margin: 0,
                }}
              >
                {user?.role === 'admin' ? '⚡ Admin' : '👤 Usuario'}
              </p>
            </div>

            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(34,197,94,0.1)',
                border: '2px solid rgba(34,197,94,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  color: '#22c55e',
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                }}
              >
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>

            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: '8px',
                padding: '6px 12px',
                color: '#f87171',
                fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              Salir
            </button>
          </div>

          {/* Mobile */}
          <div className="mobile-nav">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: '8px',
                padding: '7px',
                cursor: 'pointer',
              }}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Menú Mobile */}
        {menuOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.icon} {link.label}
              </Link>
            ))}

            <button onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        )}
      </nav>

      <style>{`
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .mobile-nav {
          display: none;
        }

        .mobile-menu {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }

          .mobile-nav {
            display: flex !important;
          }

          .mobile-menu {
            display: flex;
            flex-direction: column;
            padding: 1rem;
            background: rgba(10,15,13,0.98);
            gap: 10px;
          }

          .mobile-menu a,
          .mobile-menu button {
            padding: 10px;
            border-radius: 8px;
            text-decoration: none;
            background: rgba(34,197,94,0.08);
            color: #86efac;
            border: 1px solid rgba(34,197,94,0.2);
          }
        }
      `}</style>
    </>
  );
}