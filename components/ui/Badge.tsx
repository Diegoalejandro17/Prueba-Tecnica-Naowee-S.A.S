import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'danger' | 'warning' | 'info';
  className?: string;
}

export default function Badge({
  children,
  variant = 'success',
  className = '',
}: BadgeProps) {
  const variants = {
    success: 'bg-green-500/10 text-green-400 border border-green-500/20',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/20',
    warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    info: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  };

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-dm
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}