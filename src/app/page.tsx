import HeroSection from '@/components/HeroSection';
import DownloadSection from '@/components/DownloadSection';
import FeaturesSection from '@/components/FeaturesSection';
import UserPersonasSection from '@/components/UserPersonasSection';
import TrustSection from '@/components/TrustSection';
import FAQSection from '@/components/FAQSection';
import FinalCTASection from '@/components/FinalCTASection';

export default function Home() {
  return (
    <div className="min-h-screen bg-pastree-light">
      <HeroSection />
      <DownloadSection />
      
      {/* Section Divider */}
      <hr className="section-divider" />
      
      <FeaturesSection />
      <UserPersonasSection />
      <TrustSection />
      
      {/* Section Divider */}
      <hr className="section-divider" />
      
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}
