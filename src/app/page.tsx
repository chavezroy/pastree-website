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
      <hr className="h-1 bg-gradient-to-r from-pastree-orange to-transparent border-0 my-16" />
      
      <FeaturesSection />
      <UserPersonasSection />
      <TrustSection />
      
      {/* Section Divider */}
      <hr className="h-1 bg-gradient-to-r from-pastree-orange to-transparent border-0 my-16" />
      
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}
