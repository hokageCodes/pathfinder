'use client';

import { Brain, Users, Target, Clock, CheckCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function HowItWorksSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-2">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our intelligent system analyzes your responses across three key dimensions to find your perfect tech career match
          </p>
        </motion.div>

        {/* Timeline for Categories */}
{/* Timeline for Categories */}
<div className="max-w-5xl mx-auto py-10">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 top-8 bottom-8 w-1 bg-gradient-to-b from-primary-600 via-secondary-600 to-accent-600 rounded-full"></div>
            
            <div className="space-y-12 relative">
              {/* Psychological */}
              <div className="flex items-start gap-6">
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg ring-4 ring-white">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-primary-600">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Psychological Assessment</h3>
                    <p className="text-gray-600">We analyze your interests, mindset, and work preferences to understand what truly motivates you in a tech career</p>
                  </div>
                </div>
              </div>
              
              {/* Behavioral */}
              <div className="flex items-start gap-6">
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 bg-secondary-600 rounded-lg flex items-center justify-center shadow-lg ring-4 ring-white">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-secondary-600">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Behavioral Analysis</h3>
                    <p className="text-gray-600">Your learning style and motivation patterns reveal how you approach challenges and acquire new skills</p>
                  </div>
                </div>
              </div>
              
              {/* Situational */}
              <div className="flex items-start gap-6">
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 bg-accent-600 rounded-lg flex items-center justify-center shadow-lg ring-4 ring-white">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-accent-600">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">Situational Testing</h3>
                    <p className="text-gray-600">Real-world scenarios test how you handle practical tech challenges and make decisions under pressure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center p-8 hover:shadow-xl transition-shadow duration-300 relative">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-lg flex items-center justify-center mx-auto mb-6 text-xl font-bold">1</div>
              <h4 className="font-semibold text-gray-900 mb-4 text-xl">Take the Quiz</h4>
              <p className="text-gray-600 leading-relaxed mb-4">Answer 15 carefully crafted questions across three categories in just 5 minutes</p>
              <div className="inline-block bg-primary-100 text-primary-800 px-4 py-2 rounded-lg text-sm font-medium">
                5 minutes
              </div>
            </div>
            
            <div className="card text-center p-8 hover:shadow-xl transition-shadow duration-300 relative">
              <div className="w-16 h-16 bg-secondary-600 text-white rounded-lg flex items-center justify-center mx-auto mb-6 text-xl font-bold">2</div>
              <h4 className="font-semibold text-gray-900 mb-4 text-xl">AI Analysis</h4>
              <p className="text-gray-600 leading-relaxed mb-4">Our intelligent algorithm analyzes your responses and calculates compatibility scores</p>
              <div className="inline-block bg-secondary-100 text-secondary-800 px-4 py-2 rounded-lg text-sm font-medium">
                Instant
              </div>
            </div>
            
            <div className="card text-center p-8 hover:shadow-xl transition-shadow duration-300 relative">
              <div className="w-16 h-16 bg-accent-600 text-white rounded-lg flex items-center justify-center mx-auto mb-6 text-xl font-bold">3</div>
              <h4 className="font-semibold text-gray-900 mb-4 text-xl">Get Results</h4>
              <p className="text-gray-600 leading-relaxed mb-4">Receive personalized recommendations with detailed reasoning and job role insights</p>
              <div className="inline-block bg-accent-100 text-accent-800 px-4 py-2 rounded-lg text-sm font-medium">
                Detailed
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
