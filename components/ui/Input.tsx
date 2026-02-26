import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export default function Input({
    label,
    error,
    icon,
    className = '',
    ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-text-secondary font-dm">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full bg-surface-2 border border-[rgba(34,197,94,0.15)] rounded-lg
            text-text-primary placeholder:text-[#2d4a38]
            px-4 py-3 text-sm font-dm
            transition-all duration-200
            focus:outline-none focus:border-accent focus:bg-[#1f3329]
            hover:border-[rgba(34,197,94,0.3)]
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-500/50 focus:border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <span className="text-xs text-red-400 font-dm">{error}</span>
      )}
    </div>
  );
}