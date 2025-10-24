'use client';
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Users, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="min-h-screen bg-white relative overflow-hidden">
      <div className="container mx-auto px-2 py-20 relative z-10 max-w-7xl">
        {/* Centered Content */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto mb-16"
        >
          <div className="space-y-8">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-6xl font-bold text-gray-900 leading-tight px-4"
              >
                Find Your Perfect Tech Career Path In Three Minutes
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg sm:text-xl lg:text-2xl text-gray-600 mt-8 leading-relaxed max-w-3xl mx-auto px-4"
              >
                Answer a few questions and our AI will recommend you the best path if you were to start a career in tech. 
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/quiz" className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg">
                Find My Path Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => {
                  const element = document.getElementById('how-it-works');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
              >
                How It Works
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Wide Centered Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-6xl mx-auto mb-16 px-4"
        >
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="People collaborating on a tech project"
                width={1200}
                height={600}
                className="w-full h-[500px] object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}