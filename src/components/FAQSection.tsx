'use client';

import { useState } from 'react';

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does Pastree work?",
      answer: "Pastree is a browser extension that helps you organize clipboard items into smart lists. It runs locally in your browser and automatically saves copied text for easy access later. Create custom lists for different types of content and access them with a simple click or keyboard shortcut."
    },
    {
      question: "Is my data safe with Pastree?",
      answer: "Absolutely! Pastree stores all data locally on your device. Nothing is sent to external servers, there's no cloud sync, and we don't collect any personal information. Your clipboard data stays private and secure on your own computer."
    },
    {
      question: "Which browsers are supported?",
      answer: "Pastree is available for Chrome, Firefox, and Edge browsers. The Chrome version also works on other Chromium-based browsers like Brave and Opera. We're working on Safari support for future releases."
    },
    {
      question: "Is Pastree really free?",
      answer: "Yes! Pastree is completely free with no premium features, subscriptions, or hidden costs. All functionality is available to everyone, forever. We believe clipboard management should be accessible to all users without financial barriers."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">Frequently asked questions</h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className={`bg-white rounded-lg overflow-hidden transition-all duration-300 ${
                openFAQ === index ? 'shadow-[var(--box-shadow-pastree)]' : 'shadow-md-light'
              }`}>
                <button
                  className={`w-full px-6 py-4 text-left font-semibold text-lg transition-all duration-500 flex justify-between items-center ${
                    openFAQ === index 
                      ? 'bg-pastree-orange/5 text-pastree-orange' 
                      : 'hover:bg-pastree-orange/5 hover:text-pastree-orange'
                  }`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 transform transition-transform duration-200 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-700 ${openFAQ === index ? 'max-h-96 opacity-100 ease-[cubic-bezier(0.34,1.56,0.64,1)]' : 'max-h-0 opacity-0 ease-in'}`}
                >
                  <div className="px-6 pb-4 my-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
