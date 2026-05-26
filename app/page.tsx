import HeroSection from "@/components/HeroSection";
import FrictionMapSection from "@/components/FrictionMapSection";
import BusinessModelSection from "@/components/BusinessModelSection";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FrictionMapSection />
      <BusinessModelSection />
      <AboutSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
