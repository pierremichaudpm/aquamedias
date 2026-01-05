'use client';

import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import FilmsSection from '@/components/FilmsSection';
import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main className="min-h-screen !m-0 !p-0">
      <HeroSection />
      <AboutSection />
      <FilmsSection />
      <ServicesSection />
      <ContactSection />
    </main>
  );
}