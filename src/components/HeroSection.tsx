import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BrandLogo } from './BrandLogo';
import { LogoEmblem } from './LogoEmblem';
import { PenTool, CheckCircle, Sparkles, BookOpen, Truck, Instagram, Facebook } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [step, setStep] = useState<number>(0); // 0: Start, 1: 50% animation, 2: 100% completed
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const isAnimatingRef = useRef<boolean>(false);
  const stepRef = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  // Keep stepRef in sync with state
  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  const featureTags = [
    { text: '100% Handwritten', icon: PenTool },
    { text: 'Strict Syllabus Match', icon: CheckCircle },
    { text: 'Clean Formatting', icon: Sparkles },
    { text: 'Ready to Submit', icon: BookOpen },
    { text: 'Doorstep Delivery', icon: Truck },
  ];

  // Smooth video playback toward target time
  const playVideoToTarget = useCallback((targetRatio: number) => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure duration is ready or fallback to estimated/known webm duration if needed
    const duration = video.duration && !isNaN(video.duration) && video.duration > 0 
      ? video.duration 
      : 3.5;

    const targetTime = targetRatio >= 1.0 
      ? duration 
      : Math.min(Math.max(targetRatio * duration, 0), duration);

    const isForward = targetTime > video.currentTime;
    isAnimatingRef.current = true;

    if (isForward) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            const checkTime = () => {
              if (!video) return;
              if (targetRatio >= 1.0) {
                // If 100%, let video play till ended or reaching duration
                if (video.ended || video.currentTime >= duration - 0.08) {
                  video.pause();
                  video.currentTime = duration;
                  isAnimatingRef.current = false;
                } else {
                  requestAnimationFrame(checkTime);
                }
              } else {
                if (video.currentTime >= targetTime - 0.05 || video.ended) {
                  video.pause();
                  video.currentTime = targetTime;
                  isAnimatingRef.current = false;
                } else {
                  requestAnimationFrame(checkTime);
                }
              }
            };
            requestAnimationFrame(checkTime);
          })
          .catch(() => {
            // If autoplay policy blocks or scrubbing fails, set currentTime directly
            video.currentTime = targetTime;
            isAnimatingRef.current = false;
          });
      }
    } else {
      video.pause();
      const scrubBack = () => {
        if (!video) return;
        const diff = video.currentTime - targetTime;
        if (diff > 0.05) {
          video.currentTime = Math.max(video.currentTime - 0.08, targetTime);
          requestAnimationFrame(scrubBack);
        } else {
          video.currentTime = targetTime;
          isAnimatingRef.current = false;
        }
      };
      requestAnimationFrame(scrubBack);
    }
  }, []);

  // Handle Step Advancement
  const advanceStep = useCallback((direction: 'next' | 'prev') => {
    const current = stepRef.current;
    
    if (direction === 'next') {
      if (current === 0) {
        setStep(1);
        playVideoToTarget(0.5); // 1st scroll: plays 50% animation, stays on hero
      } else if (current === 1) {
        setStep(2);
        playVideoToTarget(1.0); // 2nd scroll: plays to 100% completion, stays on hero
      } else if (current === 2) {
        // 3rd scroll: animation complete -> smooth scroll down to about section
        const aboutEl = document.getElementById('about-section');
        if (aboutEl) {
          aboutEl.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
        }
      }
    } else if (direction === 'prev') {
      if (current === 2) {
        setStep(1);
        playVideoToTarget(0.5);
      } else if (current === 1) {
        setStep(0);
        playVideoToTarget(0.0);
      }
    }
  }, [playVideoToTarget]);

  // Set up listeners for Scroll Wheel, Keyboard, and Touch Swipes
  useEffect(() => {
    const isAtHeroTop = () => window.scrollY <= 15;
    let wheelCooldown = false;
    let touchCooldown = false;

    // Wheel event handler
    const handleWheel = (e: WheelEvent) => {
      if (!isAtHeroTop()) return;
      if (stepRef.current < 2) {
        e.preventDefault();
        if (wheelCooldown) return;
        if (Math.abs(e.deltaY) > 15) {
          wheelCooldown = true;
          advanceStep(e.deltaY > 0 ? 'next' : 'prev');
          setTimeout(() => { wheelCooldown = false; }, 400);
        }
      } else if (stepRef.current === 2 && e.deltaY < -20 && window.scrollY === 0) {
        // Scrolling up at top of hero after completion can step back
        e.preventDefault();
        if (wheelCooldown) return;
        wheelCooldown = true;
        advanceStep('prev');
        setTimeout(() => { wheelCooldown = false; }, 400);
      }
    };

    // Keyboard navigation (ArrowDown, ArrowUp, PageDown, PageUp, Space)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isAtHeroTop()) return;
      
      const downKeys = ['ArrowDown', 'PageDown', ' ', 'Spacebar'];
      const upKeys = ['ArrowUp', 'PageUp'];

      if (downKeys.includes(e.key)) {
        if (stepRef.current < 2) {
          e.preventDefault();
          advanceStep('next');
        }
      } else if (upKeys.includes(e.key)) {
        if (stepRef.current > 0 && isAtHeroTop()) {
          e.preventDefault();
          advanceStep('prev');
        }
      }
    };

    // Touch event handlers for mobile
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isAtHeroTop()) return;
      if (stepRef.current < 2) {
        // Prevent default scrolling until animation completes
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isAtHeroTop()) return;
      if (touchCooldown) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;

      if (Math.abs(diffY) > 30) {
        touchCooldown = true;
        if (diffY > 0) {
          // Swipe up (scroll down)
          advanceStep('next');
        } else if (diffY < 0 && stepRef.current > 0) {
          // Swipe down (scroll up)
          advanceStep('prev');
        }
        setTimeout(() => { touchCooldown = false; }, 400);
      }
    };

    // Video metadata load
    const video = videoRef.current;
    if (video) {
      const onMetadata = () => {
        setIsVideoLoaded(true);
        video.pause();
        video.currentTime = 0.01;
      };
      video.addEventListener('loadedmetadata', onMetadata);
      if (video.readyState >= 1) {
        onMetadata();
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [advanceStep]);

  return (
    <section 
      id="hero-section" 
      ref={containerRef}
      data-antigravity="hero-container"
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between px-6 sm:px-10 lg:px-16 pt-28 sm:pt-36 pb-10 sm:pb-12 overflow-hidden bg-transparent"
    >
      {/* Scroll-Triggered Background Video Animation Layer */}
      <div 
        id="hero-bg-video-container"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
      >
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/q0mldlcd/video/upload/v1787942188/Blur_Cv_1_1.webm"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-80 mix-blend-multiply transition-opacity duration-700 pointer-events-none"
        />
        {/* Soft natural scrim overlay to guarantee crystal clear contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/65 via-[#FDFBF7]/30 to-[#FDFBF7]/85 pointer-events-none" />
      </div>

      {/* Floating Social Icons on top-right */}
      <div 
        id="hero-social-container"
        data-antigravity="hero-socials"
        className="absolute top-28 sm:top-36 right-6 sm:right-16 z-20 hidden md:flex flex-col items-center gap-3 transform-gpu"
      >
        <a
          href="https://www.instagram.com/info.craftvia/"
          id="hero-insta-link"
          data-antigravity="hero-social-item"
          aria-label="CraftVia Instagram"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full border border-[#C89B3C]/30 bg-white/80 backdrop-blur-md flex items-center justify-center text-[#8C651E] hover:text-[#201A14] hover:border-[#C89B3C] hover:bg-white transition-all shadow-sm transform-gpu will-change-transform"
        >
          <Instagram className="w-4 h-4" />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61594057072862"
          id="hero-fb-link"
          data-antigravity="hero-social-item"
          aria-label="CraftVia Facebook"
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full border border-[#C89B3C]/30 bg-white/80 backdrop-blur-md flex items-center justify-center text-[#8C651E] hover:text-[#201A14] hover:border-[#C89B3C] hover:bg-white transition-all shadow-sm transform-gpu will-change-transform"
        >
          <Facebook className="w-4 h-4" />
        </a>
      </div>

      {/* Main Content Area */}
      <div 
        id="hero-content-wrapper"
        data-antigravity="hero-content"
        className="relative z-10 max-w-4xl pt-4 sm:pt-8 flex flex-col items-start"
      >
        
        {/* Emblem & Main Brand Headline */}
        <div 
          id="hero-main-headline" 
          data-antigravity="hero-brand"
          className="mb-6 flex flex-col items-start transform-gpu will-change-transform"
        >
          <div className="flex items-center gap-3.5 mb-2">
            <div id="hero-logo-emblem-wrap" data-antigravity="hero-emblem" className="transform-gpu">
              <LogoEmblem size={56} className="drop-shadow-sm" />
            </div>
            <div id="hero-brand-name-wrap" data-antigravity="hero-brand-title" className="transform-gpu">
              <BrandLogo size="lg" idPrefix="hero-main" showEmblem={false} />
            </div>
          </div>
        </div>

        {/* Tagline in Cinzel Font with gold accents */}
        <div id="hero-tagline-wrapper" data-antigravity="hero-tagline-wrap" className="transform-gpu">
          <h1 
            id="hero-tagline" 
            data-antigravity="hero-tagline"
            className="font-cinzel text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#201A14] font-semibold uppercase tracking-[0.12em] leading-tight mb-5 max-w-3xl text-left transform-gpu will-change-transform"
          >
            Better files, better marks <span id="hero-tagline-accent" data-antigravity="hero-tagline-accent" className="gold-gradient-text">via CraftVia.</span>
          </h1>
        </div>

        {/* Subtext in Montserrat Font */}
        <div id="hero-subtext-wrapper" data-antigravity="hero-subtext-wrap" className="transform-gpu">
          <p 
            id="hero-subtext" 
            data-antigravity="hero-subtext"
            className="font-montserrat text-sm sm:text-base md:text-lg text-[#524638] font-normal leading-relaxed max-w-2xl mb-6 text-left transform-gpu will-change-transform"
          >
            Handwritten assignments and practical project files written as per your college guidelines and delivered to your doorstep.
          </p>
        </div>

      </div>

      {/* Bottom Area: 5 Feature Cards + CTA Button */}
      <div 
        id="hero-feature-tags-container" 
        data-antigravity="hero-bottom-bar"
        className="relative z-10 w-full pt-6 sm:pt-8 transform-gpu"
      >
        <div className="flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-5 sm:gap-6">
          
          {/* 5 Feature Cards Grid */}
          <div 
            id="hero-cards-grid"
            data-antigravity="hero-cards-grid"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 flex-1 transform-gpu"
          >
            {featureTags.map((tag, index) => {
              const Icon = tag.icon;
              return (
                <div
                  key={index}
                  id={`hero-feature-tag-${index + 1}`}
                  data-antigravity="hero-card"
                  data-index={index}
                  className="glass-card glass-card-hover rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between min-h-[100px] sm:min-h-[115px] transition-all duration-300 group cursor-default shadow-sm transform-gpu will-change-transform"
                >
                  <div className="p-2 rounded-xl bg-[#C89B3C]/10 border border-[#C89B3C]/25 w-fit text-[#9E7422] group-hover:bg-[#C89B3C]/20 group-hover:border-[#C89B3C]/50 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.08em] uppercase text-[#2D251D] group-hover:text-[#C89B3C] font-semibold leading-tight mt-2.5 transition-colors">
                    {tag.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div 
            id="hero-cta-wrapper"
            data-antigravity="hero-cta-wrap"
            className="flex items-end shrink-0 transform-gpu"
          >
            <a
              href="https://wa.link/8rws5t"
              id="hero-order-file-btn"
              data-antigravity="hero-cta-btn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full lg:w-auto min-w-[180px] h-[50px] sm:h-[52px] px-8 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#DFBF6E] via-[#C89B3C] to-[#B08226] text-white font-cinzel text-xs sm:text-sm uppercase tracking-[0.22em] font-bold hover:brightness-105 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-[#C89B3C]/30 flex items-center justify-center text-center transform-gpu will-change-transform"
            >
              <span>Order File</span>
            </a>
          </div>

        </div>
      </div>

    </section>
  );
};
