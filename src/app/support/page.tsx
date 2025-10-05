import SupportHero from '@/components/SupportHero';
import SupportCategories from '@/components/SupportCategories';
import SupportArticles from '@/components/SupportArticles';
import ContactSupport from '@/components/ContactSupport';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-pastree-light">
      <SupportHero />
      <SupportCategories />
      
      {/* Section Divider */}
      <hr className="h-1 bg-gradient-to-r from-pastree-orange to-transparent border-0 my-16" />
      
      <SupportArticles />
      <ContactSupport />
    </div>
  );
}
