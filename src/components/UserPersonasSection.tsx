export default function UserPersonasSection() {
  const personas = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      iconBg: "bg-blue-500/15",
      textColor: "text-blue-500",
      title: "Developers",
      description: "Store code snippets, API keys, and command line instructions. Keep your development workflow smooth and efficient.",
      features: [
        "Code snippet management",
        "API endpoint storage",
        "Command line shortcuts"
      ]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      iconBg: "bg-green-500/15",
      textColor: "text-green-500",
      title: "Writers",
      description: "Collect quotes, research notes, and writing prompts. Organize your creative process and never lose inspiration.",
      features: [
        "Quote and reference storage",
        "Research note organization",
        "Writing prompt collection"
      ]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      iconBg: "bg-purple-500/15",
      textColor: "text-purple-500",
      title: "Researchers",
      description: "Save URLs, citations, and research findings. Keep your academic work organized and easily accessible.",
      features: [
        "URL and citation storage",
        "Research finding organization",
        "Academic reference management"
      ]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      iconBg: "bg-orange-500/15",
      textColor: "text-orange-500",
      title: "Everyone",
      description: "From passwords to shopping lists, keep your daily clipboard organized and boost your productivity in any task.",
      features: [
        "Daily task organization",
        "Contact information storage",
        "Shopping and todo lists"
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">Clipboard management for everyone</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {personas.map((persona, index) => (
            <div key={index} className="text-left">
              <div className={`w-16 h-16 ${persona.iconBg} bg-opacity-25 rounded-full flex items-center justify-center ${persona.textColor} mr-auto mb-6`}>
                {persona.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{persona.title}</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {persona.description}
              </p>
              <ul className="space-y-2 text-left">
                {persona.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-xs text-gray-600">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}