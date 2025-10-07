export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pastree-light">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">About Pastree</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Pastree was born from a simple frustration: losing important clipboard items. 
              We believe that managing your frequently used text should be effortless, secure, and completely free.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
              <div>
                <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To make clipboard management simple, secure, and accessible to everyone. 
                  We're committed to keeping your data private while providing powerful tools 
                  to organize your digital workflow.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">Why We Built This</h2>
                <p className="text-gray-600 leading-relaxed">
                  After trying countless clipboard managers that were either too complex, 
                  too expensive, or too invasive, we decided to build something better. 
                  Pastree puts you in control of your data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
