import dynamic from 'next/dynamic';
import SupportHero from '@/components/SupportHero';
import SupportCategories from '@/components/SupportCategories';
import { config } from '@/content/support/config';
import { categories } from '@/content/support/categories';
import { popularArticleLinks as popularArticles, recentUpdates } from '@/content/support/articles';

// Lazy load heavy components
const SupportArticles = dynamic(() => import('@/components/SupportArticles'), {
  loading: () => (
    <div className="py-20 bg-pastree-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="h-8 bg-gray-200 rounded-lg mb-8 max-w-48 animate-pulse"></div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-5 rounded-lg">
                  <div className="h-6 bg-gray-200 rounded-lg mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="h-8 bg-gray-200 rounded-lg mb-8 max-w-40 animate-pulse"></div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="h-6 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
});

const ContactSupport = dynamic(() => import('@/components/ContactSupport'), {
  loading: () => (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="h-10 bg-gray-200 rounded-lg mb-4 max-w-64 mx-auto animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded-lg mb-12 max-w-2xl mx-auto animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-8 h-64">
              <div className="w-8 h-8 bg-gray-200 rounded-lg mx-auto mb-6 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
});

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-pastree-light">
      <SupportHero title={config.hero.title} subtitle={config.hero.subtitle} />
      <SupportCategories categories={categories} />
      
      {/* Section Divider */}
      <hr className="section-divider" />
      
      <SupportArticles popularArticles={popularArticles} recentUpdates={recentUpdates} tutorial={config.tutorial} />
      <ContactSupport />
    </div>
  );
}
