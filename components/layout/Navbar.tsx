'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navLinks = [
    { href: '/canchas', label: 'Canchas', icon: '🏟️' },
    { href: '/reservas', label: 'Mis Reservas', icon: '📅' },
    ...(user?.role === 'admin' ? [{ href: '/admin', label: 'Dashboard', icon: '📊' }] : []),
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 50,
      background: 'rgba(10, 15, 13, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(34,197,94,0.1)',
      fontFamily: 'DM Sans, sans-serif',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <Link href="/canchas" style={{textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px'}}>
          <div style={{
            width: '36px', height: '36px',
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(34,197,94,0.35)',
          }}>
            <span style={{color: '#0a0f0d', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.875rem'}}>AG</span>
          </div>
          <span style={{fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.125rem', color: '#f0fdf4'}}>
            Agenda<span style={{color: '#22c55e'}}>Gol</span>
          </span>
        </Link>

        {/* Links */}
        <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#22c55e' : '#86efac',
                  background: isActive ? 'rgba(34,197,94,0.1)' : 'transparent',
                  border: `1px solid ${isActive ? 'rgba(34,197,94,0.25)' : 'transparent'}`,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(34,197,94,0.06)';
                    e.currentTarget.style.color = '#f0fdf4';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#86efac';
                  }
                }}
              >
                <span style={{fontSize: '0.875rem'}}>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Usuario */}
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>

          {/* Info usuario */}
          <div style={{textAlign: 'right'}}>
            <p style={{color: '#f0fdf4', fontSize: '0.875rem', fontWeight: 500, margin: 0, lineHeight: 1.2}}>
              {user?.username}
            </p>
            <p style={{color: '#4ade80', fontSize: '0.6875rem', margin: 0, lineHeight: 1.2, textTransform: 'capitalize'}}>
              {user?.role === 'admin' ? '⚡ Admin' : '👤 Usuario'}
            </p>
          </div>

          {/* Avatar */}
          <div style={{
            width: '36px', height: '36px',
            borderRadius: '50%',
            background: 'rgba(34,197,94,0.1)',
            border: '2px solid rgba(34,197,94,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 12px rgba(34,197,94,0.1)',
          }}>
            <span style={{color: '#22c55e', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.875rem'}}>
              {user?.username?.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Separador */}
          <div style={{width: '1px', height: '24px', background: 'rgba(34,197,94,0.15)'}} />

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid transparent',
              borderRadius: '8px',
              padding: '6px 14px',
              color: '#4ade80',
              fontSize: '0.8125rem',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.08)';
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)';
              e.currentTarget.style.color = '#f87171';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.color = '#4ade80';
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
}