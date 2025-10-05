export default function UserPersonasSection() {
  const personas = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      title: "For Individuals",
      features: [
        "Organize frequently used text snippets",
        "Quick access to email signatures and addresses", 
        "Save and reuse common responses",
        "Never lose important copied content"
      ]
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
        </svg>
      ),
      title: "For Professionals",
      features: [
        "Streamline repetitive tasks",
        "Organize project-specific content",
        "Quick access to common responses",
        "Boost productivity with smart lists"
      ]
    }
  ];

  return (
    <section className="py-20 bg-pastree-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Clipboard management for everyone</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {personas.map((persona, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 h-full">
              <div className="w-16 h-16 bg-orange-gradient rounded-2xl flex items-center justify-center text-white mb-6">
                {persona.icon}
              </div>
              <h3 className="text-2xl font-bold mb-6">{persona.title}</h3>
              <ul className="space-y-3 mb-8">
                {persona.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full border-2 border-pastree-orange text-pastree-orange hover:bg-pastree-orange hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300">
                {index === 0 ? 'Get Started Free' : 'Download Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
