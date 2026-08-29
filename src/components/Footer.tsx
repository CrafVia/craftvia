import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      id="main-footer"
      className="relative z-10 w-full border-t border-[#C89B3C]/20 py-16 px-6 sm:px-10 lg:px-16 mt-12 bg-white/40 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        
        {/* Brand Logo */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <a href="#" id="footer-brand-link" className="hover:opacity-90 transition-opacity">
            <BrandLogo size="md" idPrefix="footer" showEmblem={true} />
          </a>
          <span className="font-montserrat text-xs text-[#6B5D4D] font-medium">
            Better files, better marks via CraftVia.
          </span>
        </div>

        {/* Navigation Links: Services | Process | Contact */}
        <nav className="flex items-center gap-6 sm:gap-10 text-center">
          <button
            onClick={() => scrollToSection('services-section')}
            id="footer-link-services"
            className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#4A4033] hover:text-[#C89B3C] font-semibold transition-colors cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('process-section')}
            id="footer-link-process"
            className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#4A4033] hover:text-[#C89B3C] font-semibold transition-colors cursor-pointer"
          >
            Process
          </button>
          <button
            onClick={() => scrollToSection('contact-section')}
            id="footer-link-contact"
            className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#4A4033] hover:text-[#C89B3C] font-semibold transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Social Icons & WhatsApp Link */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Social Media Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/info.craftvia/"
              id="footer-insta-link"
              aria-label="CraftVia Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#C89B3C]/30 bg-white/80 flex items-center justify-center text-[#8C651E] hover:bg-[#C89B3C] hover:text-white hover:border-[#C89B3C] transition-all duration-300 shadow-sm"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61594057072862"
              id="footer-fb-link"
              aria-label="CraftVia Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#C89B3C]/30 bg-white/80 flex items-center justify-center text-[#8C651E] hover:bg-[#C89B3C] hover:text-white hover:border-[#C89B3C] transition-all duration-300 shadow-sm"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://wa.link/rg6vr0"
              id="footer-whatsapp-link"
              aria-label="CraftVia WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-[#C89B3C]/30 bg-white/80 flex items-center justify-center text-[#8C651E] hover:bg-[#C89B3C] hover:text-white hover:border-[#C89B3C] transition-all duration-300 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Note */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#C89B3C]/15 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-[#8A7966] text-xs font-cinzel tracking-wider">
        <span>© {new Date().getFullYear()} CRAFTVIA. All rights reserved.</span>
        <span className="font-montserrat text-xs text-[#998773]">Handcrafted Excellence for University Students</span>
      </div>
    </footer>
  );
};

