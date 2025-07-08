import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Stats from "@/components/landing/Stats";
import AfterServicesHero from "@/components/landing/AfterServicesHero";
import TestimonialsCarousel from "@/components/landing/TestimonialsCarousel";
import WhyUsSection from "@/components/landing/WhyUsSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="w-screen max-w-[100dvw] overflow-hidden">
      <Hero />
      <Stats />
      <Services />
      <AfterServicesHero />
      <TestimonialsCarousel />
      <WhyUsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
