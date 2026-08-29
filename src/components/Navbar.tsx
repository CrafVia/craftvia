import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#C89B3C]/20 py-3.5 shadow-sm shadow-amber-900/5'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        
        {/* Brand Logo with Emblem */}
        <a 
          href="#" 
          id="nav-brand-link" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="hover:opacity-90 transition-opacity flex items-center cursor-pointer"
        >
          <BrandLogo size="md" idPrefix="nav" showEmblem={true} />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          <button
            onClick={() => scrollToSection('about-section')}
            id="nav-link-about"
            className="font-cinzel text-xs lg:text-sm uppercase tracking-[0.18em] text-[#4A4033] hover:text-[#C89B3C] font-semibold transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('services-section')}
            id="nav-link-services"
            className="font-cinzel text-xs lg:text-sm uppercase tracking-[0.18em] text-[#4A4033] hover:text-[#C89B3C] font-semibold transition-colors cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('process-section')}
            id="nav-link-process"
            className="font-cinzel text-xs lg:text-sm uppercase tracking-[0.18em] text-[#4A4033] hover:text-[#C89B3C] font-semibold transition-colors cursor-pointer"
          >
            Process
          </button>
          <button
            onClick={() => scrollToSection('contact-section')}
            id="nav-link-contact"
            className="font-cinzel text-xs lg:text-sm uppercase tracking-[0.18em] text-[#4A4033] hover:text-[#C89B3C] font-semibold transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          id="mobile-menu-toggle-btn"
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 rounded-xl border border-[#C89B3C]/30 text-[#3D3327] hover:bg-[#C89B3C]/10 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#C89B3C]" /> : <Menu className="w-5 h-5 text-[#C89B3C]" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-menu"
          className="md:hidden glass-card mx-4 mt-3 rounded-2xl p-6 border border-[#C89B3C]/25 bg-[#FAF7F2]/98 backdrop-blur-xl shadow-xl shadow-amber-900/10 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('about-section')}
              id="mobile-nav-link-about"
              className="text-left font-cinzel text-sm uppercase tracking-[0.18em] text-[#332A20] hover:text-[#C89B3C] font-semibold py-2 border-b border-[#C89B3C]/15"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services-section')}
              id="mobile-nav-link-services"
              className="text-left font-cinzel text-sm uppercase tracking-[0.18em] text-[#332A20] hover:text-[#C89B3C] font-semibold py-2 border-b border-[#C89B3C]/15"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('process-section')}
              id="mobile-nav-link-process"
              className="text-left font-cinzel text-sm uppercase tracking-[0.18em] text-[#332A20] hover:text-[#C89B3C] font-semibold py-2 border-b border-[#C89B3C]/15"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              id="mobile-nav-link-contact"
              className="text-left font-cinzel text-sm uppercase tracking-[0.18em] text-[#332A20] hover:text-[#C89B3C] font-semibold py-2"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

