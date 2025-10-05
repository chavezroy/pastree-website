import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-pastree-dark text-gray-400 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Pastree Brand */}
          <div className="lg:col-span-2">
            <h6 className="text-white font-semibold mb-4">Pastree</h6>
            <p className="mb-6 text-sm leading-relaxed">
              The clipboard manager that organizes your frequently used text into easy-to-access lists. 
              Simple, secure, and completely free.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-pastree-orange transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-pastree-orange transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-pastree-orange transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h6 className="text-white font-semibold mb-4">Product</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#features" className="hover:text-pastree-orange transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#download" className="hover:text-pastree-orange transition-colors">
                  Download
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-pastree-orange transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-pastree-orange transition-colors">
                  Release Notes
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h6 className="text-white font-semibold mb-4">Support</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/support" className="hover:text-pastree-orange transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/report-bug" className="hover:text-pastree-orange transition-colors">
                  Report Bug
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-pastree-orange transition-colors">
                  User Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-pastree-orange transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Browser Extensions */}
          <div>
            <h6 className="text-white font-semibold mb-4">Browser Extensions</h6>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-pastree-orange transition-colors">
                  Chrome
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-pastree-orange transition-colors">
                  Firefox
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-pastree-orange transition-colors">
                  Edge
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-pastree-orange transition-colors">
                  Safari (Coming)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <hr className="my-8 border-gray-600" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; 2025 Pastree. All rights reserved.</p>
          </div>
          <div className="flex items-center">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              Privacy Focused • Open Source • 100% Free
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
