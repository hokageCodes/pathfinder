'use client';

import Image from "next/image";
import { Target, Lightbulb, Award, Brain, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="bg-white py-20">
      <div className="container mx-auto px-2 max-w-6xl">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Side - Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Person working on laptop with tech setup"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About TechPath</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We're on a mission to help people discover their ideal tech career path through intelligent, personalized recommendations. 
              Whether you're just starting out or looking to make a career change, we guide you to the perfect tech role.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4 mb-8"
            >
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="text-gray-700">AI-powered analysis of your personality, behavior, and preferences</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-secondary-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="text-gray-700">Comprehensive career path recommendations with detailed insights</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-white rounded-lg"></div>
                </div>
                <p className="text-gray-700">Free, personalized guidance to help you make informed career decisions</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
