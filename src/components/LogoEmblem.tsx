import React from 'react';

interface LogoEmblemProps {
  className?: string;
  size?: number;
}

export const LogoEmblem: React.FC<LogoEmblemProps> = ({ className = '', size = 56 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldMetallic" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DFBF6E" />
          <stop offset="45%" stopColor="#C89B3C" />
          <stop offset="80%" stopColor="#AD7F25" />
          <stop offset="100%" stopColor="#C89B3C" />
        </linearGradient>
        <linearGradient id="penGold" x1="120" y1="60" x2="150" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DFBF6E" />
          <stop offset="60%" stopColor="#C89B3C" />
          <stop offset="100%" stopColor="#946C1C" />
        </linearGradient>
      </defs>

      {/* Outer Stylized "C" Arc */}
      <path
        d="M 125 45 C 105 32 60 38 42 75 C 24 112 36 152 75 168 C 112 184 148 160 158 142 C 148 148 120 162 90 152 C 55 140 44 105 58 76 C 72 48 108 42 128 54 L 125 45 Z"
        fill="url(#goldMetallic)"
      />

      {/* Upper Serif Accent on C */}
      <path
        d="M 115 36 C 122 36 132 44 135 50 C 130 52 122 52 118 46 Z"
        fill="url(#goldMetallic)"
      />

      {/* Main Bold "V" Shape */}
      {/* Left arm of V */}
      <path
        d="M 68 62 L 92 62 L 118 135 L 128 160 L 105 160 L 68 62 Z"
        fill="url(#goldMetallic)"
      />

      {/* Top serif on left arm of V */}
      <path
        d="M 64 62 L 95 62 L 95 67 L 85 67 L 64 67 Z"
        fill="url(#goldMetallic)"
      />

      {/* Pen Body & Stylus as the right arm of V */}
      {/* Lower thin connecting shaft */}
      <path
        d="M 122 148 L 136 112 L 138 113 L 126 152 Z"
        fill="url(#goldMetallic)"
      />

      {/* Pen Barrel Body */}
      <rect
        x="132"
        y="65"
        width="16"
        height="38"
        rx="4"
        transform="rotate(-26 132 65)"
        fill="url(#penGold)"
      />

      {/* Pen Grip / Band detail */}
      <rect
        x="134"
        y="96"
        width="14"
        height="4"
        rx="1"
        transform="rotate(-26 134 96)"
        fill="#7A5614"
      />

      {/* Pen Nib Tip */}
      <polygon
        points="141,105 137,114 144,111"
        fill="url(#goldMetallic)"
      />

      {/* 4-Point Sparkle Star near the pen top */}
      <path
        d="M 148 38 Q 148 48 158 48 Q 148 48 148 58 Q 148 48 138 48 Q 148 48 148 38 Z"
        fill="url(#goldMetallic)"
      />
    </svg>
  );
};
