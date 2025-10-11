export default function Loading() {
    return (
      <div className="min-h-screen bg-pastree-light py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">About Pastree</h1>
            </div>
  
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  