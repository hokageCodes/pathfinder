import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your Perfect Tech Career?
          </h2>
          
          <p className="text-xl mb-8 opacity-90">
            Join thousands of people who have discovered their ideal tech path. 
            Take our quiz and get personalized recommendations in just 5 minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/quiz" 
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg inline-flex items-center justify-center gap-2 transition-colors duration-200"
            >
              Start Your Quiz Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/how-it-works" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg text-lg inline-flex items-center justify-center transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="w-6 h-6 text-white" />
              <span className="text-lg">100% Free</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="w-6 h-6 text-white" />
              <span className="text-lg">5 Minutes</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="w-6 h-6 text-white" />
              <span className="text-lg">Instant Results</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
