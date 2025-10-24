import { create } from 'zustand';

export const useQuizStore = create((set, get) => ({
  // Current state
  currentQuestionIndex: 0,
  answers: [],
  questions: [],
  isComplete: false,
  isLoading: false,
  userName: '',
  
  // Actions
  setQuestions: (questions) => set(() => ({
    questions
  })),
  
  setAnswer: (questionId, answer) => set((state) => {
    const existingAnswerIndex = state.answers.findIndex(a => a.questionId === questionId);
    const newAnswer = { questionId, value: answer };
    
    if (existingAnswerIndex >= 0) {
      // Update existing answer
      const newAnswers = [...state.answers];
      newAnswers[existingAnswerIndex] = newAnswer;
      return { answers: newAnswers };
    } else {
      // Add new answer
      return { answers: [...state.answers, newAnswer] };
    }
  }),
  
  nextQuestion: () => set((state) => ({
    currentQuestionIndex: state.currentQuestionIndex + 1
  })),
  
  prevQuestion: () => set((state) => ({
    currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1)
  })),
  
  goToQuestion: (index) => set(() => ({
    currentQuestionIndex: index
  })),
  
  setLoading: (loading) => set(() => ({
    isLoading: loading
  })),
  
  setComplete: () => set(() => ({
    isComplete: true
  })),
  
  setUserName: (name) => set(() => ({
    userName: name
  })),
  
  resetQuiz: () => set(() => ({
    currentQuestionIndex: 0,
    answers: [],
    questions: [],
    isComplete: false,
    isLoading: false,
    userName: ''
  })),
  
  // Computed values
  getProgress: () => {
    const state = get();
    if (state.questions.length === 0) return 0;
    return Math.round((state.answers.length / state.questions.length) * 100);
  },
  
  getCurrentCategory: () => {
    const state = get();
    if (state.questions.length === 0) return 'psychological';
    
    // Determine category based on question index
    const questionsPerCategory = 5;
    const categoryIndex = Math.floor(state.currentQuestionIndex / questionsPerCategory);
    const categories = ['psychological', 'behavioral', 'situational'];
    return categories[categoryIndex] || 'psychological';
  },
  
  getAnsweredCount: () => {
    const state = get();
    return state.answers.length;
  },
  
  isQuestionAnswered: (questionId) => {
    const state = get();
    return state.answers.some(a => a.questionId === questionId);
  }
}));
