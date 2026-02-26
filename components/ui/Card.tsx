import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    glow?: boolean;
    onClick?: () => void;
}

export default function Card({
    children,
    className = '',
    glow = false,
    onClick,
}: CardProps) {
    return (
        <div 
        onClick={onClick}
        className={`
            bg-surface border border-[rgba(34, 197, 94, 0.15)] rounded-xl p-6
            transition-all duration-300
            ${glow ? 'shadow-glow hover:shadow--glow' : ''}
            ${onClick ? 'cursor-pointer hover:border-[rgba(34,197,94,0.4)] hover:shadow-glow hover:-translate-y-1' : ''}
            ${className}
        `}
        >
            {children}
        </div>
    );
}