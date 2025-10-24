import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-2 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 - Brand */}
          <div className="text-center md:text-left">
                    <Link href="/" className="text-2xl font-bold text-white hover:text-primary-400 transition-colors duration-200 font-heading">
                      PathFinder
                    </Link>
            <p className="text-gray-400 mt-3 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              Discover your ideal tech career path through personalized AI recommendations.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>
                    <ul className="space-y-3">
                      <li>
                        <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link href="/how-it-works" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                          How it Works
                        </Link>
                      </li>
                      <li>
                        <Link href="/resources" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                          Resources
                        </Link>
                      </li>
                      <li>
                        <Link href="/quiz" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                          Take Quiz
                        </Link>
                      </li>
                    </ul>
          </div>

          {/* Column 3 - Resources */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-5">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://freecodecamp.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  FreeCodeCamp
                </a>
              </li>
              <li>
                <a href="https://theodinproject.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  The Odin Project
                </a>
              </li>
              <li>
                <a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  MDN Web Docs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © 2024 TechPath. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-3 md:mt-0">
              Built with ❤️ for tech career guidance
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
