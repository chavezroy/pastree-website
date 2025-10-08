type Props = {
  categories: { id: string; title: string; description: string; iconKey: string; href: string }[]
};

import { supportIcons } from '@/icons/support';

export default function SupportCategories({ categories }: Props) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-center mb-16">Browse by Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl hover-shadow-pastree transition-all duration-300 transform hover:-translate-y-2 p-8 text-center h-full"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-500 mx-auto mb-6">
                {supportIcons[category.iconKey]}
              </div>
              <h3 className="text-xl font-bold mb-4">{category.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
              <a href={category.href} className="inline-block border-2 border-gray-400 text-gray-500 hover:bg-white hover:text-pastree-orange px-6 py-2 rounded-full font-semibold transition-colors">
                View Articles
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
