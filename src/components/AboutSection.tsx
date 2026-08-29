import React from 'react';
import { Award, BookCheck, Clock3, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section 
      id="about-section" 
      className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-5xl mx-auto">
        <div className="glass-card rounded-[2.5rem] p-8 sm:p-12 md:p-16 border border-[#C89B3C]/25 text-center relative overflow-hidden shadow-lg shadow-amber-900/5">
          
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8">
            <div className="h-px bg-[#C89B3C]/30 flex-1 max-w-xs"></div>
            <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl text-[#201A14] font-bold tracking-[0.2em] uppercase whitespace-nowrap">
              — ABOUT CRAFTVIA —
            </h2>
            <div className="h-px bg-[#C89B3C]/30 flex-1 max-w-xs"></div>
          </div>

          <p className="font-montserrat text-sm sm:text-base md:text-lg text-[#524638] leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
            CraftVia was created for ambitious students seeking flawless academic presentation. Every page is crafted by hand with disciplined calligraphy, precise margins, and strict adherence to institutional grading standards.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-[#C89B3C]/20">
            <div className="p-4 rounded-2xl bg-white/60 border border-[#C89B3C]/20 flex flex-col items-center">
              <Award className="w-6 h-6 text-[#C89B3C] mb-2" />
              <span className="font-cinzel text-lg sm:text-xl text-[#201A14] font-bold">100+</span>
              <span className="font-montserrat text-xs sm:text-sm text-[#736350] font-medium">Files Delivered</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 border border-[#C89B3C]/20 flex flex-col items-center">
              <BookCheck className="w-6 h-6 text-[#C89B3C] mb-2" />
              <span className="font-cinzel text-lg sm:text-xl text-[#201A14] font-bold">100%</span>
              <span className="font-montserrat text-xs sm:text-sm text-[#736350] font-medium">Syllabus Match</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 border border-[#C89B3C]/20 flex flex-col items-center">
              <Clock3 className="w-6 h-6 text-[#C89B3C] mb-2" />
              <span className="font-cinzel text-lg sm:text-xl text-[#201A14] font-bold">Zero</span>
              <span className="font-montserrat text-xs sm:text-sm text-[#736350] font-medium">Missed Deadlines</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 border border-[#C89B3C]/20 flex flex-col items-center">
              <Sparkles className="w-6 h-6 text-[#C89B3C] mb-2" />
              <span className="font-cinzel text-lg sm:text-xl text-[#201A14] font-bold">Grade A</span>
              <span className="font-montserrat text-xs sm:text-sm text-[#736350] font-medium">Quality Rating</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

