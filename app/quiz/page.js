'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';
import { selectQuestions } from '../../utils/questionSelector';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Quiz() {
  const router = useRouter();
  const {
    currentQuestionIndex,
    answers,
    setAnswer,
    nextQuestion: goToNextQuestion,
    prevQuestion,
    getProgress,
    getCurrentCategory,
    getAnsweredCount,
    setLoading,
    setQuestions,
    resetQuiz
  } = useQuizStore();

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questions, setQuestionsState] = useState([]);
  
          // Initialize questions on component mount
          useEffect(() => {
            try {
              // Reset quiz state first
              resetQuiz();
              
              const selectedQuestions = selectQuestions();
              setQuestionsState(selectedQuestions);
              setQuestions(selectedQuestions);
            } catch (error) {
              console.error('Error selecting questions:', error);
            }
          }, [setQuestions, resetQuiz]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = getProgress();
  const currentCategory = getCurrentCategory();
  const answeredCount = getAnsweredCount();
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

          useEffect(() => {
            // Set selected answer when question changes
            const savedAnswer = answers.find(a => a.questionId === currentQuestion?.id);
            setSelectedAnswer(savedAnswer?.value || null);
          }, [currentQuestionIndex, answers, currentQuestion?.id]);

  // Show loading if questions are not loaded yet
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  // Show error if current question is undefined
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">Unable to load the quiz questions. Please try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Reload Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

          const handleAnswerSelect = (value) => {
            setSelectedAnswer(value);
            setAnswer(currentQuestion.id, value);
          };

          const handleNext = () => {
            if (!canProceed) return;
    
    if (isLastQuestion) {
      // Submit quiz and go to results
      setLoading(true);
      router.push('/results');
    } else {
      // Check if we're completing a category
      const nextQuestionData = questions[currentQuestionIndex + 1];
      const currentCategoryQuestions = questions.filter(q => q.category === currentCategory);
      const currentCategoryAnswered = answers.filter(a => {
        const q = questions.find(question => question.id === a.questionId);
        return q && q.category === currentCategory;
      }).length;
      
      // Show progress message if completing a category
      if (currentCategoryAnswered === currentCategoryQuestions.length - 1) {
        showCategoryProgressMessage();
      }
      
      goToNextQuestion();
    }
  };

  const showCategoryProgressMessage = () => {
    const messages = {
      psychological: [
        "Look at you go! 🎉 You're really getting into the psychology of tech!",
        "Amazing! You're uncovering your true tech personality! ✨",
        "Aww, soon you'll be a tech bro too! 🚀"
      ],
      behavioral: [
        "Wow! You're revealing your work style like a pro! 💪",
        "Look at you understanding your behavior patterns! 🌟",
        "You're nailing this behavioral analysis! 🔥"
      ],
      situational: [
        "Incredible! You're handling these scenarios like a champ! 🎯",
        "Look at you thinking through real-world situations! 🧠",
        "You're absolutely crushing these situational questions! ⚡"
      ]
    };
    
    const categoryMessages = messages[currentCategory] || ["Great job! Keep it up!"];
    const randomMessage = categoryMessages[Math.floor(Math.random() * categoryMessages.length)];
    
    toast.success(randomMessage, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      icon: "🎉"
    });
  };

  const handlePrevious = () => {
    prevQuestion();
  };

          const canProceed = selectedAnswer !== null;

  const getCategoryColor = (category) => {
    switch (category) {
      case 'psychological': return 'bg-primary-600';
      case 'behavioral': return 'bg-secondary-600';
      case 'situational': return 'bg-accent-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-white">
            <div className="container mx-auto px-2 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Tech Path Quiz
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className={`w-3 h-3 rounded-full ${getCategoryColor(currentCategory)}`}></div>
            <span className="text-lg font-medium capitalize">{currentCategory}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-600">{progress}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${getCategoryColor(currentCategory)}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-2xl mx-auto">
          <div className="card p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
              {currentQuestion.question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                          onClick={() => handleAnswerSelect(option.value)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 cursor-pointer ${
                    selectedAnswer === option.value
                      ? 'border-primary-500 bg-primary-50 text-primary-800'
                      : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === option.value
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer === option.value && (
                        <CheckCircle className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-2xl mx-auto mt-8 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="btn-secondary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

                  <button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLastQuestion ? 'Get My Recommendation' : 'Next'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
        </div>

                {/* Answer Summary */}
                <div className="max-w-2xl mx-auto mt-8 text-center">
                  <p className="text-gray-600">
                    {answeredCount} of {questions.length} questions answered
                  </p>
                </div>

      </div>
    </div>
  );
}
