import React, { useEffect } from 'react';

export const ContactOrderSection: React.FC = () => {
  useEffect(() => {
    // Load and initialize Tally embeds
    const d = document;
    const w = 'https://tally.so/widgets/embed.js';
    const v = () => {
      // @ts-expect-error Tally global defined in script
      if (typeof window.Tally !== 'undefined') {
        // @ts-expect-error Tally global defined in script
        window.Tally.loadEmbeds();
      } else {
        d.querySelectorAll<HTMLIFrameElement>('iframe[data-tally-src]:not([src])').forEach((e) => {
          if (e.dataset.tallySrc) {
            e.src = e.dataset.tallySrc;
          }
        });
      }
    };

    // @ts-expect-error Tally global defined in script
    if (typeof window.Tally !== 'undefined') {
      v();
    } else if (d.querySelector(`script[src="${w}"]`) === null) {
      const s = d.createElement('script');
      s.src = w;
      s.onload = v;
      s.onerror = v;
      d.body.appendChild(s);
    }
  }, []);

  return (
    <section 
      id="contact-section" 
      className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Form Card with Tally Embed */}
          <div className="lg:col-span-6">
            <div 
              id="order-form-container"
              className="glass-card rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-8 md:p-10 border border-[#C89B3C]/25 relative overflow-hidden shadow-xl shadow-amber-900/10 backdrop-blur-xl"
            >
              {/* Tally Embed iframe */}
              <div className="relative z-10 w-full min-h-[476px]">
                <iframe
                  src="https://tally.so/embed/7Rraxa?alignLeft=1&transparentBackground=1&dynamicHeight=1"
                  data-tally-src="https://tally.so/embed/7Rraxa?alignLeft=1&transparentBackground=1&dynamicHeight=1"
                  loading="lazy"
                  width="100%"
                  height={476}
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  title="Not Sure Yet? Ask Away, No Pressure"
                  className="w-full border-0"
                />
              </div>

            </div>
          </div>

          {/* Right Column: Decorative framing matching right open view in reference */}
          <div className="lg:col-span-6 hidden lg:flex flex-col items-start justify-center pl-8 space-y-6">
            <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#C89B3C] font-bold block">
              Direct University Dispatch
            </span>
            <h3 className="font-cinzel text-3xl xl:text-4xl text-[#201A14] font-semibold uppercase tracking-[0.14em] leading-tight">
              Fast, Reliable & Professionally Packaged.
            </h3>
            <p className="font-montserrat text-sm sm:text-base text-[#524638] leading-relaxed font-normal">
              Every project file is individually checked, securely bound, and dispatched on priority express courier to meet your submission timeline without stress.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};


