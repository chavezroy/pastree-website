import HeroSection from '@/components/HeroSection';
import DownloadSection from '@/components/DownloadSection';
import FeaturesSection from '@/components/FeaturesSection';
import UserPersonasSection from '@/components/UserPersonasSection';
import TrustSection from '@/components/TrustSection';
import FAQSection from '@/components/FAQSection';
import FinalCTASection from '@/components/FinalCTASection';
import AnimatedSection from '@/components/AnimatedSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-pastree-light overflow-hidden">
      <HeroSection />
      
      <AnimatedSection animation="fade-in-up" delay={100} threshold={0.2}>
        <DownloadSection />
      </AnimatedSection>
      
      {/* Section Divider */}
      <AnimatedSection animation="scale-in" delay={200} threshold={0.3}>
        <hr className="section-divider opacity-15" />
      </AnimatedSection>
      
      <AnimatedSection animation="fade-in-up" delay={300} threshold={0.2}>
        <FeaturesSection />
      </AnimatedSection>
      
      <AnimatedSection animation="slide-in-left" delay={400} threshold={0.2}>
        <UserPersonasSection />
      </AnimatedSection>
      
      <AnimatedSection animation="slide-in-right" delay={500} threshold={0.2}>
        <TrustSection />
      </AnimatedSection>
      
      {/* Section Divider */}
      <AnimatedSection animation="scale-in" delay={600} threshold={0.3}>
        <hr className="section-divider opacity-15" />
      </AnimatedSection>
      
      <AnimatedSection animation="fade-in-up" delay={700} threshold={0.2}>
        <FAQSection />
      </AnimatedSection>
      
      <AnimatedSection animation="scale-in-up" delay={800} threshold={0.2}>
        <FinalCTASection />
      </AnimatedSection>
    </div>
  );
}
