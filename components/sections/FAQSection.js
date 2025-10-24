'use client';

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const faqs = [
    {
      question: "How accurate are the career recommendations?",
      answer: "Our AI algorithm analyzes your responses across psychological, behavioral, and situational dimensions to provide highly personalized recommendations. While no system is 100% accurate, our users report a 95% satisfaction rate with their career matches."
    },
    {
      question: "How long does the quiz take to complete?",
      answer: "The quiz takes approximately 5-10 minutes to complete. It consists of 15 carefully crafted questions designed to understand your personality, learning style, and problem-solving approach."
    },
    {
      question: "Is this quiz really free?",
      answer: "Yes, our quiz is completely free with no hidden costs or subscriptions. We believe everyone should have access to career guidance, regardless of their financial situation."
    },
    {
      question: "What tech careers do you cover?",
      answer: "We cover 12+ major tech career paths including Frontend Developer, Backend Developer, Full Stack Developer, Data Scientist, UI/UX Designer, DevOps Engineer, Cybersecurity Analyst, Mobile Developer, Software Engineer, Product Manager, QA Engineer, and Cloud Engineer."
    },
    {
      question: "Can I retake the quiz if I'm not satisfied?",
      answer: "Absolutely! You can retake the quiz as many times as you'd like. Your responses might change over time as you gain more experience or clarity about your preferences."
    },
    {
      question: "Do you provide learning resources for recommended careers?",
      answer: "Yes! Each recommendation comes with curated learning resources including free courses, documentation, tutorials, and platforms to help you get started on your chosen tech path."
    },
    {
      question: "Is my data secure and private?",
      answer: "We take your privacy seriously. Your quiz responses are processed securely and are not shared with third parties. We only use your data to generate personalized recommendations."
    },
    {
      question: "What if I'm completely new to tech?",
      answer: "Perfect! Our quiz is designed for people at all levels, including complete beginners. The questions are designed to understand your interests and learning style, not your technical knowledge."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-2 max-w-4xl">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Got questions? We've got answers. Here are the most common questions about our tech career quiz.
          </p>
        </motion.div>

                <div className="max-w-5xl mx-auto">
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
                        <button
                          onClick={() => toggleFAQ(index)}
                          className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                        >
                          <span className="text-lg font-semibold text-gray-900 pr-4 leading-tight">
                            {faq.question}
                          </span>
                          <div className="flex-shrink-0">
                            {openIndex === index ? (
                              <Minus className="w-5 h-5 text-primary-600" />
                            ) : (
                              <Plus className="w-5 h-5 text-primary-600" />
                            )}
                          </div>
                        </button>
                        
                        {openIndex === index && (
                          <div className="px-6 pb-5 border-t border-gray-100 bg-gray-50">
                            <p className="text-gray-700 leading-relaxed pt-4">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
      </div>
    </section>
  );
}
