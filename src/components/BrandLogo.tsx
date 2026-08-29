import React from 'react';
import { LogoEmblem } from './LogoEmblem';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  idPrefix?: string;
  showEmblem?: boolean;
  layout?: 'horizontal' | 'vertical';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = '', 
  size = 'md',
  idPrefix = 'brand',
  showEmblem = false,
  layout = 'horizontal'
}) => {
  const sizeStyles = {
    sm: {
      craft: 'text-lg tracking-[0.15em] font-semibold',
      via: 'text-2xl -ml-0.5',
      emblemSize: 28,
    },
    md: {
      craft: 'text-2xl tracking-[0.18em] font-bold',
      via: 'text-3xl sm:text-4xl -ml-1',
      emblemSize: 38,
    },
    lg: {
      craft: 'text-4xl sm:text-5xl md:text-6xl tracking-[0.2em] font-bold',
      via: 'text-5xl sm:text-6xl md:text-7xl -ml-2',
      emblemSize: 72,
    },
    xl: {
      craft: 'text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.22em] font-bold',
      via: 'text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] -ml-2 sm:-ml-4',
      emblemSize: 110,
    }
  };

  const selected = sizeStyles[size];

  if (layout === 'vertical') {
    return (
      <div id={`${idPrefix}-logo`} className={`inline-flex flex-col items-center select-none ${className}`}>
        {showEmblem && (
          <LogoEmblem size={selected.emblemSize} className="mb-2" />
        )}
        <div className="inline-flex items-baseline leading-none">
          <span className={`font-cinzel text-[#201A14] uppercase ${selected.craft}`}>
            Craft
          </span>
          <span className={`font-great-vibes text-[#C89B3C] italic font-normal ${selected.via}`}>
            Via
          </span>
        </div>
      </div>
    );
  }

  return (
    <span id={`${idPrefix}-logo`} className={`inline-flex items-center gap-2.5 select-none leading-none ${className}`}>
      {showEmblem && (
        <LogoEmblem size={selected.emblemSize} className="shrink-0" />
      )}
      <span className="inline-flex items-baseline leading-none">
        <span className={`font-cinzel text-[#201A14] uppercase ${selected.craft}`}>
          Craft
        </span>
        <span className={`font-great-vibes text-[#C89B3C] italic font-normal ${selected.via}`}>
          Via
        </span>
      </span>
    </span>
  );
};

