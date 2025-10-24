'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container mx-auto px-2 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
                  <Link href="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors duration-200 font-heading">
                    PathFinder
                  </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => {
                // Check if we're on the home page
                if (window.location.pathname === '/') {
                  const element = document.getElementById('about');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  // Navigate to home page and then scroll
                  router.push('/#about');
                }
              }}
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              About
            </button>
            <button 
              onClick={() => {
                // Check if we're on the home page
                if (window.location.pathname === '/') {
                  const element = document.getElementById('how-it-works');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  // Navigate to home page and then scroll
                  router.push('/#how-it-works');
                }
              }}
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              How it Works
            </button>
            <Link 
              href="/resources"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Resources
            </Link>
            <button 
              onClick={() => {
                // Check if we're on the home page
                if (window.location.pathname === '/') {
                  const element = document.getElementById('faq');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  // Navigate to home page and then scroll
                  router.push('/#faq');
                }
              }}
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              FAQs
            </button>
          </div>

          {/* CTA Button - Desktop Only */}
          <button
            onClick={() => router.push('/quiz')}
            className="hidden md:block btn-primary text-sm px-4 py-2 transition-all duration-200 hover:scale-105"
          >
            Get Started
          </button>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-primary-600 p-2 -mr-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                  <div className="md:hidden mt-4 pt-4 pb-2 border-t border-gray-200">
                    <div className="flex flex-col space-y-4 animate-in fade-in duration-200">
                      <button 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          // Check if we're on the home page
                          if (window.location.pathname === '/') {
                            const element = document.getElementById('about');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          } else {
                            // Navigate to home page and then scroll
                            router.push('/#about');
                          }
                        }}
                        className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2 px-1 rounded-lg hover:bg-gray-50 text-left"
                      >
                        About
                      </button>
                      <button 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          // Check if we're on the home page
                          if (window.location.pathname === '/') {
                            const element = document.getElementById('how-it-works');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          } else {
                            // Navigate to home page and then scroll
                            router.push('/#how-it-works');
                          }
                        }}
                        className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2 px-1 rounded-lg hover:bg-gray-50 text-left"
                      >
                        How it Works
                      </button>
                      <Link 
                        href="/resources"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2 px-1 rounded-lg hover:bg-gray-50 text-left"
                      >
                        Resources
                      </Link>
                      <button 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          // Check if we're on the home page
                          if (window.location.pathname === '/') {
                            const element = document.getElementById('faq');
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          } else {
                            // Navigate to home page and then scroll
                            router.push('/#faq');
                          }
                        }}
                        className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2 px-1 rounded-lg hover:bg-gray-50 text-left"
                      >
                        FAQs
                      </button>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          router.push('/quiz');
                        }}
                        className="btn-primary text-sm px-6 py-3 w-full transition-all duration-200 hover:scale-105"
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                )}
      </div>
    </nav>
  );
}
