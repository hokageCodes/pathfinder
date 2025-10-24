'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, BookOpen, Play, GraduationCap, Star, Clock, Users } from 'lucide-react';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', count: 0, description: '' },
    { id: 'frontend', name: 'Frontend Development', count: 0, description: 'As a Frontend Developer, you\'ll be the architect of what users see and interact with. Think of yourself as a digital interior designer - you decide how websites and apps look, feel, and behave when people click, scroll, or tap. You\'ll make sure everything works smoothly on phones, tablets, and computers.' },
    { id: 'backend', name: 'Backend Development', count: 0, description: 'As a Backend Developer, you\'re the behind-the-scenes wizard who makes everything work. While frontend developers handle what users see, you handle the databases, servers, and logic that power applications. You\'re like the engine room of a ship - essential but invisible to passengers.' },
    { id: 'fullstack', name: 'Full Stack Development', count: 0, description: 'As a Full Stack Developer, you\'re the Swiss Army knife of programming. You can build both the user-facing parts (frontend) and the behind-the-scenes systems (backend). You\'re like a contractor who can both design a house and build its foundation - you see the complete picture.' },
    { id: 'data-science', name: 'Data Science', count: 0, description: 'As a Data Scientist, you\'re a digital detective who finds hidden stories in numbers. You take massive amounts of information and turn it into insights that help businesses make smart decisions. You\'re like a translator who converts raw data into actionable intelligence.' },
    { id: 'ui-ux', name: 'UI/UX Design', count: 0, description: 'As a UI/UX Designer, you\'re the user experience architect. You figure out how to make apps and websites not just look good, but feel intuitive and enjoyable to use. You\'re like a psychologist who understands how people think and designs accordingly.' },
    { id: 'devops', name: 'DevOps', count: 0, description: 'As a DevOps Engineer, you\'re the bridge between development and operations. You make sure software gets built, tested, and deployed smoothly and reliably. You\'re like a logistics coordinator who ensures everything runs like a well-oiled machine.' },
    { id: 'cybersecurity', name: 'Cybersecurity', count: 0, description: 'As a Cybersecurity Professional, you\'re the digital guardian protecting organizations from cyber threats. You identify vulnerabilities, prevent attacks, and respond to security incidents. You\'re like a security guard for the digital world, keeping bad actors out.' },
    { id: 'mobile', name: 'Mobile Development', count: 0, description: 'As a Mobile Developer, you create apps for smartphones and tablets. You decide how apps look, feel, and function on different devices. You\'re like a specialized architect who designs specifically for mobile spaces - compact but powerful.' },
    { id: 'product', name: 'Product Management', count: 0, description: 'As a Product Manager, you\'re the conductor of the development orchestra. You decide what features to build, prioritize tasks, and coordinate between different teams. You\'re like a project manager who understands both business needs and technical possibilities.' },
    { id: 'qa', name: 'QA Engineering', count: 0, description: 'As a QA Engineer, you\'re the quality assurance specialist who tests software to find bugs before users do. You break things intentionally to make sure they work properly. You\'re like a meticulous inspector who ensures everything meets high standards.' },
    { id: 'cloud', name: 'Cloud Engineering', count: 0, description: 'As a Cloud Engineer, you manage and optimize cloud-based systems and infrastructure. You help organizations scale their technology without physical servers. You\'re like a facilities manager for digital infrastructure that lives in the cloud.' }
  ];

  const resources = {
    frontend: {
      documentation: [
        {
          title: 'MDN Web Docs',
          description: 'The ultimate resource for web developers',
          url: 'https://developer.mozilla.org',
          type: 'Documentation',
          rating: 4.9
        },
        {
          title: 'React Documentation',
          description: 'Official React.js documentation and guides',
          url: 'https://react.dev',
          type: 'Documentation',
          rating: 4.8
        },
        {
          title: 'Vue.js Guide',
          description: 'Comprehensive Vue.js documentation',
          url: 'https://vuejs.org/guide/',
          type: 'Documentation',
          rating: 4.7
        },
        {
          title: 'Angular Documentation',
          description: 'Official Angular framework documentation',
          url: 'https://angular.io/docs',
          type: 'Documentation',
          rating: 4.6
        }
      ],
      platforms: [
        {
          title: 'FreeCodeCamp',
          description: 'Free interactive coding bootcamp',
          url: 'https://freecodecamp.org',
          type: 'Learning Platform',
          rating: 4.8,
          duration: '300+ hours'
        },
        {
          title: 'The Odin Project',
          description: 'Full-stack curriculum for web development',
          url: 'https://theodinproject.com',
          type: 'Learning Platform',
          rating: 4.7,
          duration: '500+ hours'
        },
        {
          title: 'Frontend Masters',
          description: 'Advanced frontend development courses',
          url: 'https://frontendmasters.com',
          type: 'Learning Platform',
          rating: 4.9,
          duration: 'Premium'
        }
      ],
      videos: [
        {
          title: 'Complete React Tutorial for Beginners',
          description: 'Learn React from scratch with practical projects',
          url: 'https://youtube.com/watch?v=SqcY0GlETPk',
          channel: 'The Net Ninja',
          duration: '8:30:00',
          views: '2.1M',
          rating: 4.8,
          year: 2024
        },
        {
          title: 'Modern JavaScript Tutorial',
          description: 'ES6+ features and modern JavaScript practices',
          url: 'https://youtube.com/watch?v=hdI2bqOjy3c',
          channel: 'Traversy Media',
          duration: '11:30:00',
          views: '3.2M',
          rating: 4.9,
          year: 2024
        }
      ]
    },
    backend: {
      documentation: [
        {
          title: 'Node.js Documentation',
          description: 'Official Node.js runtime documentation',
          url: 'https://nodejs.org/docs',
          type: 'Documentation',
          rating: 4.7
        },
        {
          title: 'Django Documentation',
          description: 'Python web framework documentation',
          url: 'https://docs.djangoproject.com',
          type: 'Documentation',
          rating: 4.8
        },
        {
          title: 'Express.js Guide',
          description: 'Node.js web application framework',
          url: 'https://expressjs.com',
          type: 'Documentation',
          rating: 4.6
        }
      ],
      platforms: [
        {
          title: 'Backend Developer Bootcamp',
          description: 'Complete backend development course',
          url: 'https://udemy.com/course/backend-developer-bootcamp',
          type: 'Learning Platform',
          rating: 4.7,
          duration: '40+ hours'
        },
        {
          title: 'Python Backend Development',
          description: 'Django and Flask backend development',
          url: 'https://coursera.org/specializations/python-backend',
          type: 'Learning Platform',
          rating: 4.6,
          duration: '6 months'
        }
      ],
      videos: [
        {
          title: 'Node.js Backend Development',
          description: 'Complete backend development with Node.js and Express',
          url: 'https://youtube.com/watch?v=Oe421EPjeBE',
          channel: 'freeCodeCamp.org',
          duration: '8:00:00',
          views: '1.8M',
          rating: 4.8,
          year: 2024
        }
      ]
    },
    'data-science': {
      documentation: [
        {
          title: 'Pandas Documentation',
          description: 'Python data analysis library',
          url: 'https://pandas.pydata.org/docs',
          type: 'Documentation',
          rating: 4.8
        },
        {
          title: 'NumPy Documentation',
          description: 'Python scientific computing library',
          url: 'https://numpy.org/doc',
          type: 'Documentation',
          rating: 4.7
        },
        {
          title: 'Scikit-learn Documentation',
          description: 'Machine learning library for Python',
          url: 'https://scikit-learn.org/stable/',
          type: 'Documentation',
          rating: 4.8
        }
      ],
      platforms: [
        {
          title: 'Data Science Specialization',
          description: 'Johns Hopkins University course',
          url: 'https://coursera.org/specializations/jhu-data-science',
          type: 'Learning Platform',
          rating: 4.7,
          duration: '8 months'
        },
        {
          title: 'Kaggle Learn',
          description: 'Free micro-courses on data science',
          url: 'https://kaggle.com/learn',
          type: 'Learning Platform',
          rating: 4.8,
          duration: 'Self-paced'
        }
      ],
      videos: [
        {
          title: 'Data Science Full Course',
          description: 'Complete data science tutorial with Python',
          url: 'https://youtube.com/watch?v=ua-CiDNNj30',
          channel: 'edureka!',
          duration: '12:00:00',
          views: '2.5M',
          rating: 4.7,
          year: 2024
        }
      ]
    },
    'ui-ux': {
      documentation: [
        {
          title: 'Material Design Guidelines',
          description: 'Google\'s design system documentation',
          url: 'https://material.io/design',
          type: 'Documentation',
          rating: 4.8
        },
        {
          title: 'Figma Documentation',
          description: 'Design tool documentation and tutorials',
          url: 'https://help.figma.com',
          type: 'Documentation',
          rating: 4.7
        }
      ],
      platforms: [
        {
          title: 'Google UX Design Certificate',
          description: 'Professional UX design certification',
          url: 'https://coursera.org/professional-certificates/google-ux-design',
          type: 'Learning Platform',
          rating: 4.6,
          duration: '6 months'
        },
        {
          title: 'Interaction Design Foundation',
          description: 'UX/UI design courses and certifications',
          url: 'https://interaction-design.org',
          type: 'Learning Platform',
          rating: 4.8,
          duration: 'Self-paced'
        }
      ],
      videos: [
        {
          title: 'UI/UX Design Tutorial',
          description: 'Complete UI/UX design course for beginners',
          url: 'https://youtube.com/watch?v=68w2Vale_DU',
          channel: 'CareerFoundry',
          duration: '6:30:00',
          views: '1.2M',
          rating: 4.8,
          year: 2024
        }
      ]
    },
    devops: {
      documentation: [
        {
          title: 'Docker Documentation',
          description: 'Containerization platform documentation',
          url: 'https://docs.docker.com',
          type: 'Documentation',
          rating: 4.7
        },
        {
          title: 'Kubernetes Documentation',
          description: 'Container orchestration platform',
          url: 'https://kubernetes.io/docs',
          type: 'Documentation',
          rating: 4.8
        }
      ],
      platforms: [
        {
          title: 'AWS Training',
          description: 'Amazon Web Services certification courses',
          url: 'https://aws.amazon.com/training',
          type: 'Learning Platform',
          rating: 4.8,
          duration: 'Self-paced'
        },
        {
          title: 'DevOps Bootcamp',
          description: 'Complete DevOps engineering course',
          url: 'https://udemy.com/course/devops-bootcamp',
          type: 'Learning Platform',
          rating: 4.7,
          duration: '50+ hours'
        }
      ],
      videos: [
        {
          title: 'DevOps Engineering Course',
          description: 'Complete DevOps tutorial with Docker and Kubernetes',
          url: 'https://youtube.com/watch?v=9BVQrS4u5V8',
          channel: 'TechWorld with Nana',
          duration: '10:00:00',
          views: '1.5M',
          rating: 4.9,
          year: 2024
        }
      ]
    },
    cybersecurity: {
      documentation: [
        {
          title: 'OWASP Top 10',
          description: 'Web application security risks',
          url: 'https://owasp.org/www-project-top-ten',
          type: 'Documentation',
          rating: 4.8
        },
        {
          title: 'NIST Cybersecurity Framework',
          description: 'Cybersecurity standards and guidelines',
          url: 'https://nist.gov/cyberframework',
          type: 'Documentation',
          rating: 4.7
        }
      ],
      platforms: [
        {
          title: 'Cybrary',
          description: 'Free cybersecurity training platform',
          url: 'https://cybrary.it',
          type: 'Learning Platform',
          rating: 4.6,
          duration: 'Self-paced'
        },
        {
          title: 'SANS Training',
          description: 'Professional cybersecurity training',
          url: 'https://sans.org',
          type: 'Learning Platform',
          rating: 4.9,
          duration: 'Various'
        }
      ],
      videos: [
        {
          title: 'Cybersecurity Full Course',
          description: 'Complete cybersecurity tutorial for beginners',
          url: 'https://youtube.com/watch?v=inWWhr5tnEA',
          channel: 'Simplilearn',
          duration: '11:30:00',
          views: '2.8M',
          rating: 4.7,
          year: 2024
        }
      ]
    }
  };

  // Calculate total resources for each category
  categories.forEach(category => {
    if (category.id === 'all') {
      category.count = Object.values(resources).reduce((total, catResources) => {
        return total + catResources.documentation.length + catResources.platforms.length + catResources.videos.length;
      }, 0);
    } else if (resources[category.id]) {
      const catResources = resources[category.id];
      category.count = catResources.documentation.length + catResources.platforms.length + catResources.videos.length;
    }
  });

  const filteredResources = selectedCategory === 'all' 
    ? Object.values(resources).flatMap(cat => [...cat.documentation, ...cat.platforms, ...cat.videos])
    : resources[selectedCategory] 
      ? [...resources[selectedCategory].documentation, ...resources[selectedCategory].platforms, ...resources[selectedCategory].videos]
      : [];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-2 py-8">
        {/* Header */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-heading">
            Learning Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive learning materials for every tech career path. Find documentation, courses, and tutorials to accelerate your journey.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          {/* Desktop Filter */}
          <div className="hidden md:flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Mobile Dropdown Filter */}
          <div className="md:hidden">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Job Description */}
        {selectedCategory !== 'all' && categories.find(cat => cat.id === selectedCategory)?.description && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-heading">
                What does a {categories.find(cat => cat.id === selectedCategory)?.name} do?
              </h3>
              <p className="text-gray-700 leading-relaxed font-body">
                {categories.find(cat => cat.id === selectedCategory)?.description}
              </p>
            </div>
          </motion.div>
        )}

        {/* Resources Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredResources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {resource.type === 'Documentation' && <BookOpen className="w-5 h-5 text-primary-600" />}
                  {resource.type === 'Learning Platform' && <GraduationCap className="w-5 h-5 text-secondary-600" />}
                  {resource.type === 'Video' && <Play className="w-5 h-5 text-accent-600" />}
                  <span className="text-sm font-medium text-gray-500">{resource.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{resource.rating}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">
                {resource.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 font-body">
                {resource.description}
              </p>

              {resource.channel && (
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-medium">Channel:</span> {resource.channel}
                </p>
              )}

              {resource.duration && (
                <p className="text-sm text-gray-500 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {resource.duration}
                </p>
              )}

              {resource.views && (
                <p className="text-sm text-gray-500 mb-4">
                  <Users className="w-4 h-4 inline mr-1" />
                  {resource.views} views
                </p>
              )}

              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Resource
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="card p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
              Ready to Start Your Tech Journey?
            </h2>
            <p className="text-gray-600 mb-6 font-body">
              Take our quiz to get personalized career recommendations and a curated learning path just for you.
            </p>
            <a
              href="/quiz"
              className="btn-primary inline-flex items-center gap-2"
            >
              Take the Quiz
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
