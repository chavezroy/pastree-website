import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories } from '@/content/support/categories';

// Sample articles by category (in real app, this would come from a database or CMS)
const articlesByCategory: Record<string, Array<{ slug: string; title: string; description: string; updatedAt: string }>> = {
  installation: [
    {
      slug: 'install-extension',
      title: 'How to install Pastree browser extension',
      description: 'Step-by-step installation guide for Chrome and Firefox',
      updatedAt: '2024-12-15'
    },
    {
      slug: 'first-time-setup',
      title: 'First time setup and configuration',
      description: 'Configure Pastree for the first time and sync your data',
      updatedAt: '2024-12-10'
    }
  ],
  usage: [
    {
      slug: 'manage-lists',
      title: 'Creating and managing clipboard lists',
      description: 'Organize your frequently used text into categories',
      updatedAt: '2024-12-12'
    },
    {
      slug: 'keyboard-shortcuts',
      title: 'Keyboard shortcuts and hotkeys',
      description: 'Speed up your workflow with keyboard shortcuts',
      updatedAt: '2024-12-08'
    }
  ],
  settings: [
    {
      slug: 'preferences',
      title: 'Customizing preferences and settings',
      description: 'Personalize Pastree to match your workflow',
      updatedAt: '2024-12-14'
    },
    {
      slug: 'sync-settings',
      title: 'Sync and backup settings',
      description: 'Keep your data safe and synced across devices',
      updatedAt: '2024-12-11'
    }
  ],
  troubleshooting: [
    {
      slug: 'troubleshoot-sync',
      title: 'Troubleshooting clipboard sync issues',
      description: 'Fix problems with clipboard not working properly',
      updatedAt: '2024-12-13'
    },
    {
      slug: 'common-issues',
      title: 'Common issues and solutions',
      description: 'Solutions to frequently encountered problems',
      updatedAt: '2024-12-09'
    }
  ]
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categoryId } = await params;
  const category = categories.find(cat => cat.id === categoryId);
  
  if (!category) {
    notFound();
  }

  const articles = articlesByCategory[categoryId] || [];

  return (
    <div className="min-h-screen bg-pastree-light">
      {/* Header */}
      <section className="bg-hero-support-gradient text-pastree-dark py-16">
        <div className="container mx-auto px-4">
          <nav className="mb-8">
            <Link href="/support" className="text-pastree-orange hover:text-pastree-orange-hover">
              ← Back to Support
            </Link>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.title}</h1>
          <p className="text-xl text-gray-700 max-w-3xl">{category.description}</p>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {articles.length > 0 ? (
            <div className="grid gap-6 max-w-4xl">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/support/${categoryId}/${article.slug}`}
                  className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-pastree-orange hover:border-pastree-orange-hover"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-2 text-gray-900 hover:text-pastree-orange transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-gray-600 mb-3">{article.description}</p>
                      <p className="text-sm text-gray-500">Updated {new Date(article.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No articles available for this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// Generate static params for all categories
export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.id,
  }));
}
