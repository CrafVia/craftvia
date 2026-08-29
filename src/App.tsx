import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactOrderSection } from './components/ContactOrderSection';
import { Footer } from './components/Footer';
import { GeminiGlowWaves } from './components/GeminiGlowWaves';

export default function App() {
  return (
    <div className="relative min-h-screen w-full text-[#241E17] selection:bg-[#C89B3C]/25 selection:text-[#5E4410] overflow-x-hidden">
      {/* Gemini Glow Waves background layer - reveals when hero section ends */}
      <GeminiGlowWaves revealTriggerId="hero-section" />

      {/* Primary UI layer with warm ivory backdrop */}
      <div className="relative z-10 w-full flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="w-full flex-1">
          {/* Hero Section */}
          <HeroSection />

          {/* About Section */}
          <AboutSection />

          {/* Section 1: How It Works */}
          <HowItWorksSection />

          {/* Section 2: What We Offer (Our Services) */}
          <ServicesSection />

          {/* Section 3: Contact & Order Form */}
          <ContactOrderSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}


