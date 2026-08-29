import React, { useEffect, useRef, useState } from 'react';

interface GeminiGlowWavesProps {
  revealTriggerId?: string;
}

export const GeminiGlowWaves: React.FC<GeminiGlowWavesProps> = ({ revealTriggerId = 'hero-section' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [revealed, setRevealed] = useState<boolean>(false);
  const animationFrameId = useRef<number | null>(null);

  // Monitor scroll to reveal when hero section ends
  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById(revealTriggerId);
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // Reveal when the bottom of the hero section is scrolling past the viewport
        const isPastHero = rect.bottom <= window.innerHeight * 0.6 || window.scrollY > (heroEl.offsetHeight * 0.5);
        setRevealed(isPastHero);
      } else {
        setRevealed(window.scrollY > 300);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [revealTriggerId]);

  // Canvas wave animation logic from provided snippet
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight * (window.innerWidth <= 600 ? 0.55 : 0.7);
    let step = 0;

    const resizeCanvas = () => {
      if (!canvas || !ctx) return;
      const isMobile = window.innerWidth <= 600;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight * (isMobile ? 0.55 : 0.7);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const isMobile = window.innerWidth <= 600;
    const scale = isMobile ? 0.75 : 1;
    const waves = [
      { amplitude: 110 * scale, frequency: 0.007, speed: 0.02, opacity: 0.28, offset: 0 },
      { amplitude: 85 * scale, frequency: 0.011, speed: 0.03, opacity: 0.45, offset: 2 },
      { amplitude: 60 * scale, frequency: 0.014, speed: 0.015, opacity: 0.65, offset: 4 }
    ];

    const drawWave = (context: CanvasRenderingContext2D, wave: typeof waves[0]) => {
      context.save();
      context.beginPath();
      context.moveTo(0, height);
      for (let x = 0; x <= width; x += 10) {
        const y = Math.sin(x * wave.frequency + step * wave.speed + wave.offset) * wave.amplitude
                + Math.cos(x * 0.005 + step * 0.01) * (30 * scale);
        context.lineTo(x, height - 90 * scale + y);
      }
      context.lineTo(width, height);
      context.closePath();
      
      // Gradient filling with #FDF4DC gold/amber tones
      const gradient = context.createLinearGradient(0, height - 260 * scale, 0, height);
      gradient.addColorStop(0, `rgba(255, 200, 80, ${wave.opacity})`);
      gradient.addColorStop(0.6, `rgba(255, 175, 60, ${wave.opacity * 0.5})`);
      gradient.addColorStop(1, 'rgba(255, 175, 60, 0)');
      context.fillStyle = gradient;
      context.fill();
      context.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      waves.forEach(wave => {
        drawWave(ctx, wave);
      });
      step++;
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div
      id="gemini-ambient-waves"
      className={`fixed top-0 left-0 w-screen pointer-events-none overflow-hidden z-[1] transition-opacity duration-1000 ease-out ${
        revealed ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        height: '70vh',
        transform: 'scaleY(-1)',
      }}
      aria-hidden="true"
    >
      {/* Background soft glow core */}
      <div 
        className="glow-core"
        style={{
          position: 'absolute',
          bottom: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw',
          height: '55vh',
          background: 'radial-gradient(ellipse at bottom, rgba(255, 215, 120, 0.45) 0%, rgba(255, 215, 120, 0.12) 45%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'pulseGlow 6s ease-in-out infinite alternate',
        }}
      />
      {/* Wave canvas */}
      <canvas
        ref={canvasRef}
        id="waveCanvasTop"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          filter: 'blur(12px)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};
