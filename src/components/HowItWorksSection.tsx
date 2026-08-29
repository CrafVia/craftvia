import React from 'react';
import { Send, FileEdit, PackageCheck } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      stepNum: '01',
      title: 'Share Details',
      description: 'Send assignment topics, page requirements, and formatting guidelines.',
      icon: Send,
      id: 'step-1-card'
    },
    {
      stepNum: '02',
      title: 'File Preparation',
      description: 'We write and compile the complete file with neat handwriting, indexes, and diagrams.',
      icon: FileEdit,
      id: 'step-2-card'
    },
    {
      stepNum: '03',
      title: 'Doorstep Delivery',
      description: 'The physical, submission-ready file is delivered directly to your doorstep.',
      icon: PackageCheck,
      id: 'step-3-card'
    }
  ];

  return (
    <section 
      id="process-section" 
      className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading with flanking horizontal rules matching reference */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div className="h-px bg-[#C89B3C]/30 flex-1 max-w-xs sm:max-w-md"></div>
          <h2 
            id="how-it-works-title" 
            className="font-cinzel text-xl sm:text-2xl md:text-3xl text-[#201A14] font-bold tracking-[0.25em] uppercase text-center whitespace-nowrap"
          >
            — HOW IT WORKS —
          </h2>
          <div className="h-px bg-[#C89B3C]/30 flex-1 max-w-xs sm:max-w-md"></div>
        </div>

        {/* 2-Column Main Composition matching Reference (Text description on Left, Stepped Timeline on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Descriptive Summary Text */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8 lg:space-y-16 lg:sticky lg:top-32">
            <div className="space-y-4">
              <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#C89B3C] font-bold block">
                Seamless Workflow
              </span>
              <p 
                id="how-it-works-summary" 
                className="font-montserrat text-sm sm:text-base md:text-lg text-[#524638] leading-relaxed font-normal"
              >
                You share the topic and university guidelines; we prepare your handwritten files and deliver them to your address before the submission deadline.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-card border border-[#C89B3C]/20 space-y-3 shadow-md shadow-amber-900/5">
              <span className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#736350] block font-bold">
                Guaranteed Standard
              </span>
              <p className="font-montserrat text-xs sm:text-sm text-[#524638] leading-relaxed">
                Handwritten with precision using archival ink, regulated line spacing, and compliant university title styling.
              </p>
            </div>
          </div>

          {/* Right Column: Stepped Connected Timeline */}
          <div className="lg:col-span-7 relative">
            
            {/* Vertical timeline connector line */}
            <div className="absolute left-6 sm:left-8 top-10 bottom-10 w-px bg-gradient-to-b from-[#C89B3C]/50 via-[#C89B3C]/30 to-transparent hidden sm:block"></div>

            <div className="space-y-8 sm:space-y-12">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    id={step.id}
                    className={`relative flex flex-col sm:flex-row items-start gap-5 sm:gap-8 ${
                      idx === 1 ? 'sm:ml-8' : idx === 2 ? 'sm:ml-16' : ''
                    }`}
                  >
                    {/* Timeline Node Marker */}
                    <div className="hidden sm:flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#C89B3C]/40 bg-white shadow-md shadow-[#C89B3C]/20 text-[#C89B3C] shrink-0 z-10">
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Step Card Content */}
                    <div className="glass-card glass-card-hover rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex-1 border border-[#C89B3C]/20 transition-all duration-300 group hover:-translate-y-1 w-full shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#C89B3C] font-bold">
                          Step {step.stepNum}
                        </span>
                        <div className="sm:hidden p-2 rounded-xl bg-[#C89B3C]/10 text-[#C89B3C] border border-[#C89B3C]/20">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Step Title in Cinzel */}
                      <h3 className="font-cinzel text-lg sm:text-xl text-[#201A14] font-semibold uppercase tracking-[0.14em] mb-2 group-hover:text-[#C89B3C] transition-colors">
                        {step.title}
                      </h3>

                      {/* Step Description in Montserrat */}
                      <p className="font-montserrat text-xs sm:text-sm text-[#524638] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

