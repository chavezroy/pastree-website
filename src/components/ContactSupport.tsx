export default function ContactSupport() {
  const contactOptions = [
    {
      icon: (
        <svg className="w-12 h-12 email-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Support",
      description: "Get personalized help via email",
      buttonText: "Send Email",
      buttonClass: "border-pastree-purple text-pastree-purple hover:bg-white hover:text-pastree-orange",
      href: "mailto:support@pastr.ee?subject=Support Request"
    },
    {
      icon: (
        <svg className="w-12 h-12 bug-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      title: "Report Bug",
      description: "Found an issue? Let us know",
      buttonText: "Report Bug",
      buttonClass: "border-pastree-purple text-pastree-purple hover:bg-white hover:text-pastree-orange",
      href: "/report-bug"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-3xl mb-4">Still need help?</h3>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Can&apos;t find what you&apos;re looking for? Our support team is here to help.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {contactOptions.map((option, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 h-full hover-shadow-pastree transition-all duration-300 transform hover:-translate-y-2 group">
              <div className={`text-orange-600/30 mb-6 flex justify-center group-hover:scale-125 group-hover:-translate-y-3 group-hover:rotate-3 group-hover:text-pastree-orange transition-all duration-700 ease-out`}>
                {option.icon}
              </div>
              <h4 className="text-xl font-bold mb-4">{option.title}</h4>
              <p className="text-gray-600 mb-6">{option.description}</p>
              <a 
                href={option.href}
                className={`w-full border-2 border-pastree-purple text-pastree-purple hover:bg-white/50 hover:text-pastree-orange px-6 py-3 rounded-full font-semibold transition-all duration-300 inline-block text-center ${option.buttonClass}`}
              >
                {option.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
