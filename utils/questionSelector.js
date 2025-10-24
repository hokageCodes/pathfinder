import questionPools from '../data/questionPools.json';

// Career paths with their detailed information
export const CAREER_PATHS = {
  software_engineer: {
    name: "Software Engineer",
    description: "Build and maintain software applications and systems",
    key_skills: ["Programming", "Problem Solving", "System Design", "Testing"],
    salary_range: "$70,000 - $150,000",
    growth: "22% (Much faster than average)",
    personality_match: "Logical, detail-oriented, enjoys building and optimizing.",
    resources: [
      { name: "FreeCodeCamp", description: "Interactive coding lessons and projects.", link: "https://www.freecodecamp.org/" },
      { name: "The Odin Project", description: "Full-stack curriculum for web development.", link: "https://www.theodinproject.com/" }
    ]
  },
  data_scientist: {
    name: "Data Scientist",
    description: "Extract insights from data using statistical analysis and machine learning",
    key_skills: ["Statistics", "Python/R", "Machine Learning", "Data Visualization"],
    salary_range: "$85,000 - $180,000",
    growth: "35% (Much faster than average)",
    personality_match: "Analytical, curious, enjoys finding patterns in data.",
    resources: [
      { name: "Kaggle Learn", description: "Free micro-courses on data science.", link: "https://kaggle.com/learn" },
      { name: "Coursera Data Science", description: "Johns Hopkins University specialization.", link: "https://coursera.org/specializations/jhu-data-science" }
    ]
  },
  ui_ux: {
    name: "UI/UX Designer",
    description: "Design user interfaces and experiences for digital products",
    key_skills: ["Design Thinking", "Prototyping", "User Research", "Visual Design"],
    salary_range: "$65,000 - $140,000",
    growth: "13% (Faster than average)",
    personality_match: "Creative, empathetic, focused on user needs and aesthetics.",
    resources: [
      { name: "Google UX Design Certificate", description: "Professional UX design certification.", link: "https://coursera.org/professional-certificates/google-ux-design" },
      { name: "Figma Academy", description: "Learn the industry-standard design tool.", link: "https://help.figma.com/hc/en-us" }
    ]
  },
  product_manager: {
    name: "Product Manager",
    description: "Guide product development from conception to launch",
    key_skills: ["Strategic Thinking", "Communication", "Market Research", "Project Management"],
    salary_range: "$80,000 - $160,000",
    growth: "10% (As fast as average)",
    personality_match: "Strategic, collaborative, enjoys bringing ideas to life.",
    resources: [
      { name: "Product School", description: "Product management courses and certifications.", link: "https://productschool.com/" },
      { name: "Marty Cagan's Blog", description: "Insights from a product management expert.", link: "https://svpg.com/" }
    ]
  },
  devops: {
    name: "DevOps Engineer",
    description: "Bridge development and operations to improve deployment and reliability",
    key_skills: ["Automation", "Cloud Platforms", "CI/CD", "Monitoring"],
    salary_range: "$90,000 - $170,000",
    growth: "21% (Much faster than average)",
    personality_match: "Systematic, automation-focused, enjoys optimizing processes.",
    resources: [
      { name: "AWS Training", description: "Amazon Web Services certification courses.", link: "https://aws.amazon.com/training" },
      { name: "Docker Documentation", description: "Containerization platform documentation.", link: "https://docs.docker.com" }
    ]
  },
  cybersecurity: {
    name: "Cybersecurity Analyst",
    description: "Protect systems and data from cyber threats and attacks",
    key_skills: ["Security Analysis", "Risk Assessment", "Incident Response", "Compliance"],
    salary_range: "$75,000 - $155,000",
    growth: "33% (Much faster than average)",
    personality_match: "Detail-oriented, security-conscious, enjoys solving complex puzzles.",
    resources: [
      { name: "Cybrary", description: "Free cybersecurity training platform.", link: "https://cybrary.it" },
      { name: "SANS Training", description: "Professional cybersecurity training.", link: "https://sans.org" }
    ]
  }
};

// Function to get all variants for a specific question slot
function getAllVariantsForSlot(slot) {
  const allQuestions = [
    ...questionPools.psychological.questions,
    ...questionPools.behavioral.questions,
    ...questionPools.situational.questions
  ];
  
  return allQuestions.filter(question => question.variant_group === slot);
}

// Function to shuffle an array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to select 15 questions (5 from each category) with variant selection
export function selectQuestions() {
  const selected = [];
  
  // Question slots: 5 psychological (p1-p5), 5 behavioral (b1-b5), 5 situational (s1-s5)
  const questionSlots = [
    'p1', 'p2', 'p3', 'p4', 'p5',  // Psychological
    'b1', 'b2', 'b3', 'b4', 'b5',  // Behavioral  
    's1', 's2', 's3', 's4', 's5'   // Situational
  ];
  
  // For each question slot, pick one random variant
  questionSlots.forEach(slot => {
    const variants = getAllVariantsForSlot(slot);
    if (variants.length > 0) {
      const chosen = variants[Math.floor(Math.random() * variants.length)];
      selected.push(chosen);
    }
  });
  
  // Shuffle to mix categories (so it's not always p1-p5, b1-b5, s1-s5)
  return shuffleArray(selected);
}

// Function to calculate career compatibility scores
export function calculateScores(answers) {
  const scores = {};
  Object.keys(CAREER_PATHS).forEach(path => {
    scores[path] = 0;
  });

  answers.forEach(answer => {
    // Find the question from our question pools
    const allQuestions = [
      ...questionPools.psychological.questions,
      ...questionPools.behavioral.questions,
      ...questionPools.situational.questions
    ];
    
    const question = allQuestions.find(q => q.id === answer.questionId);
    if (question) {
      const selectedOption = question.options.find(opt => opt.value === answer.value);
      if (selectedOption && selectedOption.scores) {
        Object.keys(selectedOption.scores).forEach(path => {
          if (scores[path] !== undefined) {
            scores[path] += selectedOption.scores[path];
          }
        });
      }
    }
  });

  // Normalize scores to a percentage (max possible score is 3 points per question * 15 questions = 45)
  const maxPossibleScore = 45; 
  const percentageScores = {};
  Object.keys(scores).forEach(path => {
    percentageScores[path] = Math.round((scores[path] / maxPossibleScore) * 100);
  });

  return percentageScores;
}

// Function to get top N careers
export function getTopCareers(scores, count = 3) {
  return Object.entries(scores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .slice(0, count)
    .map(([path, score]) => ({
      ...CAREER_PATHS[path],
      id: path,
      match_percentage: score
    }));
}

// Function to generate a personalized recommendation message
export function generateRecommendation(topCareers, userName) {
  if (!topCareers || topCareers.length === 0) {
    return {
      primary: null,
      secondary: [],
      reasoning: "We couldn't find a strong match based on your responses. Please try the quiz again!",
      learning_resources: []
    };
  }

  const primary = topCareers[0];
  const secondary = topCareers.slice(1);
  
  let reasoning = `Based on your responses, ${primary.name} appears to be your best match with a ${primary.match_percentage}% compatibility score. `;
  reasoning += primary.personality_match;

  const learning_resources = topCareers.map(role => ({
    role: role.name,
    resources: role.resources
  }));

  return {
    primary: primary,
    secondary: secondary,
    reasoning: reasoning,
    learning_resources: learning_resources
  };
}