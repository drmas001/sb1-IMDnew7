import React from 'react';
import { Activity } from 'lucide-react';
import { ASSETS } from '../config/assets';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'hero';
  className?: string;
  showFallback?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '', showFallback = false }) => {
  const dimensions = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16',
    hero: 'h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56 xl:h-64 xl:w-64'
  };

  const logoUrl = ASSETS.LOGO.PRIMARY;
  const fallbackUrl = size === 'small' ? ASSETS.LOGO.SMALL : ASSETS.LOGO.PRIMARY;

  if (showFallback) {
    return (
      <div className={`bg-indigo-100 rounded-lg ${dimensions[size]} ${className}`}>
        <Activity className="w-full h-full p-2 text-indigo-600" />
      </div>
    );
  }

  return (
    <picture>
      <source srcSet={logoUrl} type="image/webp" />
      <source srcSet={fallbackUrl} type="image/png" />
      <img
        src={fallbackUrl}
        alt="IMD-Care Logo"
        className={`object-contain ${dimensions[size]} ${className}`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          
          const fallback = document.createElement('div');
          fallback.className = `bg-indigo-100 rounded-lg ${dimensions[size]} ${className}`;
          const icon = document.createElement('div');
          icon.className = 'w-full h-full p-2 text-indigo-600';
          icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`;
          fallback.appendChild(icon);
          target.parentElement?.appendChild(fallback);
        }}
      />
    </picture>
  );
};

export default Logo;