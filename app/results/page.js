'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '../../store/quizStore';
import { ArrowLeft, ExternalLink, Star, RefreshCw, CheckCircle, Bot, User, TrendingUp, DollarSign, Users, Share2, Download, Copy, BarChart3, Target, BookOpen, Brain, Zap } from 'lucide-react';
import { calculateScores, getTopCareers, generateRecommendation as createRecommendation, CAREER_PATHS } from '../../utils/questionSelector';
import { toast } from 'react-toastify';

export default function Results() {
  const router = useRouter();
  const { answers, resetQuiz, setLoading, isLoading, userName, setUserName } = useQuizStore();
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);
  const [showNameInput, setShowNameInput] = useState(!userName);
  const [tempName, setTempName] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (answers.length === 0) {
      router.push('/quiz');
      return;
    }
    generateRecommendation();
  }, []);

  const generateRecommendation = async () => {
    setLoading(true);
    setError(null);

    try {
      // Calculate scores using our new system
      const scores = calculateScores(answers);
      const topCareers = getTopCareers(scores, 3);
      const personalizedRecommendation = createRecommendation(topCareers, userName || 'there');
      
      setRecommendation(personalizedRecommendation);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNameSubmit = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
      setShowNameInput(false);
      // Regenerate recommendation with name
      generateRecommendation();
    }
  };

  const handleRetakeQuiz = () => {
    resetQuiz();
    router.push('/');
  };

  const handleShare = async () => {
    const shareData = {
      title: `My Tech Career Path: ${recommendation.primary.name}`,
      text: `I just discovered my perfect tech career match: ${recommendation.primary.name} with ${recommendation.primary.match_percentage}% compatibility! Take the quiz to find yours:`,
      url: window.location.origin
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Shared successfully!");
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying to clipboard
      const shareText = `${shareData.text} ${shareData.url}`;
      await navigator.clipboard.writeText(shareText);
      toast.success("Results copied to clipboard!");
    }
  };

  const handleDownloadImage = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const element = document.getElementById('profile-card');
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const link = document.createElement('a');
      link.download = `tech-career-${recommendation.primary.name.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast.success("Profile card downloaded!");
    } catch (error) {
      console.error('Error downloading image:', error);
      toast.error("Failed to download image");
    }
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getMatchBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-100';
    if (percentage >= 60) return 'bg-yellow-100';
    return 'bg-orange-100';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Star },
    { id: 'recommendations', label: 'All Recommendations', icon: Target },
    { id: 'analysis', label: 'Analysis', icon: BarChart3 },
    { id: 'resources', label: 'Learning Resources', icon: BookOpen }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <Bot className="w-24 h-24 text-primary-600 animate-bounce" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">AI is analyzing your responses...</h2>
          <p className="text-gray-600 mb-4">Our intelligent system is calculating your perfect tech career match</p>
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              <strong>What we're analyzing:</strong><br/>
              • Your personality traits and preferences<br/>
              • Your work style and behavioral patterns<br/>
              • How you handle real-world tech scenarios
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showNameInput) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <div className="border border-gray-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Almost there!</h2>
            <p className="text-gray-600 mb-6">
              What should we call you? This helps us personalize your results.
            </p>
            <div className="space-y-4">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                autoFocus
              />
              <button
                onClick={handleNameSubmit}
                disabled={!tempName.trim()}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Get My Results
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={generateRecommendation}
              className="btn-primary mr-4"
            >
              Try Again
            </button>
            <button
              onClick={handleRetakeQuiz}
              className="btn-secondary"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!recommendation) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-2 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Your Tech Path Results
          </h1>
          <p className="text-lg text-gray-600">
            Based on your responses, here are your personalized recommendations
          </p>
        </div>

        {/* Share and Download Buttons */}
        <div className="text-center mb-8">
          <div className="flex justify-center gap-4">
            <button
              onClick={handleShare}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share Results
            </button>
            <button
              onClick={handleDownloadImage}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Profile Card
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap justify-center -mb-px">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Primary Recommendation */}
              <div id="profile-card" className="card p-8 text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-10 h-10 text-primary-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {userName ? `${userName}, meet your perfect match:` : 'Your Perfect Match:'} {recommendation.primary.name}
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  {recommendation.primary.description}
                </p>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getMatchColor(recommendation.primary.match_percentage)}`}>
                    {recommendation.primary.match_percentage}% Match
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{recommendation.primary.salary_range}</span>
                </div>
                
                {/* Why This Path Fits You */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Why This Path Fits You</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {recommendation.reasoning}
                  </p>
                </div>

                {/* Key Skills */}
                <div className="bg-primary-50 rounded-lg p-6 text-left">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Skills You'll Need</h3>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.primary.key_skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All Recommendations Tab */}
          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800 text-center mb-8">
                All Career Recommendations
              </h3>
              
              {/* Primary Recommendation */}
              <div className="card p-6 border-2 border-primary-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">{recommendation.primary.name}</h4>
                      <p className="text-primary-600 font-medium">Top Match</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full ${getMatchBgColor(recommendation.primary.match_percentage)}`}>
                    <span className={`text-sm font-medium ${getMatchColor(recommendation.primary.match_percentage)}`}>
                      {recommendation.primary.match_percentage}% Match
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{recommendation.primary.description}</p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{recommendation.primary.salary_range}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{recommendation.primary.growth}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{recommendation.primary.personality_match}</span>
                  </div>
                </div>
              </div>

              {/* Secondary Recommendations */}
              <div className="grid md:grid-cols-2 gap-6">
                {recommendation.secondary.map((career, index) => (
                  <div key={index} className="card p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-bold text-gray-800">{career.name}</h4>
                      <div className={`px-3 py-1 rounded-full ${getMatchBgColor(career.match_percentage)}`}>
                        <span className={`text-sm font-medium ${getMatchColor(career.match_percentage)}`}>
                          {career.match_percentage}% Match
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{career.description}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>{career.salary_range}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>{career.growth}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-gray-800 text-center mb-8">
                Your Analysis Breakdown
              </h3>

              {/* Personality Analysis */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-primary-600" />
                  <h4 className="text-xl font-semibold text-gray-800">Personality Traits</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Based on your responses, you show strong alignment with {recommendation.primary.name.toLowerCase()} characteristics.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Key Insight:</strong> {recommendation.reasoning}
                  </p>
                </div>
              </div>

              {/* Match Calculation */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-6 h-6 text-secondary-600" />
                  <h4 className="text-xl font-semibold text-gray-800">Match Calculation</h4>
                </div>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary-600 font-bold">1</span>
                    </div>
                    <h5 className="font-semibold text-gray-800 mb-2">Answer Analysis</h5>
                    <p className="text-sm text-gray-600">
                      Each answer scored 0-3 points based on career compatibility
                    </p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-secondary-600 font-bold">2</span>
                    </div>
                    <h5 className="font-semibold text-gray-800 mb-2">Score Calculation</h5>
                    <p className="text-sm text-gray-600">
                      Total points divided by maximum possible points (45) × 100
                    </p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-accent-600 font-bold">3</span>
                    </div>
                    <h5 className="font-semibold text-gray-800 mb-2">Final Percentage</h5>
                    <p className="text-sm text-gray-600">
                      Rounded to nearest whole number for easy understanding
                    </p>
                  </div>
                </div>
              </div>

              {/* Career Path Comparison */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-accent-600" />
                  <h4 className="text-xl font-semibold text-gray-800">Career Path Comparison</h4>
                </div>
                <div className="space-y-4">
                  {[recommendation.primary, ...recommendation.secondary].map((career, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-primary-500' : 'bg-gray-400'}`}></div>
                        <span className="font-medium text-gray-800">{career.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{career.match_percentage}%</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${index === 0 ? 'bg-primary-500' : 'bg-gray-400'}`}
                            style={{ width: `${career.match_percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Learning Resources Tab */}
          {activeTab === 'resources' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-gray-800 text-center mb-8">
                Learning Resources
              </h3>

              {/* Primary Career Resources */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                  <h4 className="text-xl font-semibold text-gray-800">
                    Resources for {recommendation.primary.name}
                  </h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {recommendation.primary.resources.map((resource, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h5 className="font-semibold text-gray-800 mb-2">{resource.name}</h5>
                      <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                      <a 
                        href={resource.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visit Resource
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Career Resources */}
              {recommendation.secondary.map((career, index) => (
                <div key={index} className="card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-5 h-5 text-gray-600" />
                    <h4 className="text-lg font-semibold text-gray-800">
                      Resources for {career.name}
                    </h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {career.resources.map((resource, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h5 className="font-semibold text-gray-800 mb-2">{resource.name}</h5>
                        <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                        <a 
                          href={resource.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visit Resource
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="max-w-2xl mx-auto text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetakeQuiz}
              className="btn-primary inline-flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Take Quiz Again
            </button>
            <button
              onClick={() => window.print()}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Print Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}