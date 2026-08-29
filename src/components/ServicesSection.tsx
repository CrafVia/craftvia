import React from 'react';
import { PenLine, FolderGit2, SlidersHorizontal, Truck } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      id: 'service-card-1',
      title: 'Handwritten Assignments',
      description: 'Neatly written theory assignments on quality ruled or plain sheets with clear headings and margins.',
      icon: PenLine,
      tag: 'Theory & Coursework'
    },
    {
      id: 'service-card-2',
      title: 'Practical Project Files',
      description: 'Complete project reports including index, acknowledgments, content, and bibliography.',
      icon: FolderGit2,
      tag: 'Lab & Projects'
    },
    {
      id: 'service-card-3',
      title: 'Custom Formatting',
      description: "Prepared strictly according to your college's instructions regarding pen color, page count, and layout.",
      icon: SlidersHorizontal,
      tag: 'University Guidelines'
    },
    {
      id: 'service-card-4',
      title: 'Doorstep Delivery',
      description: 'Securely packed physical files delivered on time to your address.',
      icon: Truck,
      tag: 'Express Shipping'
    }
  ];

  return (
    <section 
      id="services-section" 
      className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title with horizontal line extending to the right */}
        <div className="flex items-center gap-6 mb-12 sm:mb-16">
          <h2 
            id="our-services-title" 
            className="font-cinzel text-xl sm:text-2xl md:text-3xl text-[#201A14] font-bold tracking-[0.25em] uppercase whitespace-nowrap"
          >
            — OUR SERVICES —
          </h2>
          <div className="h-px bg-[#C89B3C]/30 flex-1"></div>
        </div>

        {/* 4 Service Cards in a 4-column horizontal grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className="glass-card glass-card-hover rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-[#C89B3C]/20 transition-all duration-300 group hover:-translate-y-1 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl border border-[#C89B3C]/25 bg-[#C89B3C]/10 text-[#9E7422] group-hover:scale-105 group-hover:border-[#C89B3C]/50 group-hover:bg-[#C89B3C]/20 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-cinzel text-base sm:text-lg text-[#201A14] font-semibold uppercase tracking-[0.12em] leading-tight group-hover:text-[#C89B3C] transition-colors">
                      {service.title}
                    </h3>
                  </div>

                  {/* Card Description in Montserrat Font */}
                  <p className="font-montserrat text-xs sm:text-sm text-[#524638] leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#C89B3C]/20 flex items-center justify-between">
                  <span className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-[#C89B3C] font-bold">
                    {service.tag}
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full bg-[#C89B3C]/60"></div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

