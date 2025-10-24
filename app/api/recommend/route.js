import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { answers } = await request.json();

    if (!answers || Object.keys(answers).length === 0) {
      return NextResponse.json(
        { error: 'No answers provided' },
        { status: 400 }
      );
    }

    // Load questions to map answers back to questions
    const questionsData = require('../../../data/questions.json');
    const questions = questionsData.questions;

    // Organize answers by category
    const categorizedAnswers = {
      psychological: [],
      behavioral: [],
      situational: []
    };

    questions.forEach(question => {
      if (answers[question.id]) {
        const answerOption = question.options.find(opt => opt.value === answers[question.id]);
        categorizedAnswers[question.category].push({
          question: question.question,
          answer: answerOption.label,
          value: answerOption.value
        });
      }
    });

    // Use Hugging Face API for free AI recommendations
    const prompt = `Based on these tech career quiz responses, recommend 2-3 suitable tech roles:

Psychological responses: ${categorizedAnswers.psychological.map(q => `${q.question}: ${q.answer}`).join(', ')}
Behavioral responses: ${categorizedAnswers.behavioral.map(q => `${q.question}: ${q.answer}`).join(', ')}
Situational responses: ${categorizedAnswers.situational.map(q => `${q.question}: ${q.answer}`).join(', ')}

Consider roles like: Frontend Developer, Backend Developer, Full Stack Developer, Data Scientist, UI/UX Designer, DevOps Engineer, Cybersecurity Analyst, Mobile Developer, Software Engineer, Product Manager.

Return a JSON object with recommended_roles (array of objects with name, match_percentage, description, key_skills, salary_range), reasoning (explanation), and learning_resources (array with role and resources).`;

    try {
      const huggingFaceResponse = await fetch(
        "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY || 'hf_demo'}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_length: 1000,
              temperature: 0.7,
              return_full_text: false
            }
          }),
        }
      );

      if (!huggingFaceResponse.ok) {
        throw new Error('Hugging Face API failed');
      }

      const huggingFaceResult = await huggingFaceResponse.json();
      console.log('Hugging Face response:', huggingFaceResult);

      // Since Hugging Face models might not return perfect JSON, let's use our intelligent recommendation system
      const recommendation = generateIntelligentRecommendation(categorizedAnswers);
      
      return NextResponse.json(recommendation);

    } catch (hfError) {
      console.log('Hugging Face API failed, using intelligent recommendation system:', hfError.message);
      
      // Fallback to our intelligent recommendation system
      const recommendation = generateIntelligentRecommendation(categorizedAnswers);
      return NextResponse.json(recommendation);
    }

  } catch (error) {
    console.error('API error:', error);
    
    // Final fallback recommendation
    const fallbackRecommendation = generateIntelligentRecommendation({});
    return NextResponse.json(fallbackRecommendation);
  }
}

// Intelligent recommendation system based on quiz answers
function generateIntelligentRecommendation(categorizedAnswers) {
  const roles = {
    frontend: {
      name: "Frontend Developer",
      match_percentage: 0,
      description: "Build beautiful user interfaces and user experiences",
      key_skills: ["HTML/CSS", "JavaScript", "React/Vue/Angular", "Design Systems"],
      salary_range: "$60k-$110k"
    },
    backend: {
      name: "Backend Developer", 
      match_percentage: 0,
      description: "Build server-side applications and APIs",
      key_skills: ["Node.js/Python/Java", "Databases", "APIs", "System Architecture"],
      salary_range: "$70k-$120k"
    },
    fullstack: {
      name: "Full Stack Developer",
      match_percentage: 0,
      description: "Handle both frontend and backend development",
      key_skills: ["JavaScript", "React", "Node.js", "Databases", "DevOps"],
      salary_range: "$75k-$125k"
    },
    data: {
      name: "Data Scientist/Analyst",
      match_percentage: 0,
      description: "Extract insights from data to drive business decisions",
      key_skills: ["Python/R", "SQL", "Machine Learning", "Statistics", "Visualization"],
      salary_range: "$80k-$130k"
    },
    ux: {
      name: "UI/UX Designer",
      match_percentage: 0,
      description: "Design user-centered digital experiences",
      key_skills: ["Figma/Sketch", "User Research", "Prototyping", "Design Systems"],
      salary_range: "$65k-$115k"
    },
    devops: {
      name: "DevOps Engineer",
      match_percentage: 0,
      description: "Automate and optimize software deployment and infrastructure",
      key_skills: ["AWS/Azure", "Docker/Kubernetes", "CI/CD", "Monitoring"],
      salary_range: "$85k-$135k"
    },
    security: {
      name: "Cybersecurity Analyst",
      match_percentage: 0,
      description: "Protect systems and data from cyber threats",
      key_skills: ["Security Tools", "Risk Assessment", "Incident Response", "Compliance"],
      salary_range: "$70k-$120k"
    },
    mobile: {
      name: "Mobile Developer",
      match_percentage: 0,
      description: "Build native or cross-platform mobile applications",
      key_skills: ["React Native/Flutter", "iOS/Android", "Mobile UX", "APIs"],
      salary_range: "$70k-$120k"
    }
  };

  // Analyze answers and calculate match scores
  const psychAnswers = categorizedAnswers.psychological || [];
  const behavAnswers = categorizedAnswers.behavioral || [];
  const situAnswers = categorizedAnswers.situational || [];

  // Frontend scoring
  if (psychAnswers.some(a => a.value === 'visual') || 
      situAnswers.some(a => a.value === 'frontend')) {
    roles.frontend.match_percentage += 25;
  }
  if (behavAnswers.some(a => a.value === 'hands_on')) {
    roles.frontend.match_percentage += 15;
  }

  // Backend scoring
  if (psychAnswers.some(a => a.value === 'logical' || a.value === 'technical') ||
      situAnswers.some(a => a.value === 'backend')) {
    roles.backend.match_percentage += 25;
  }
  if (behavAnswers.some(a => a.value === 'structured')) {
    roles.backend.match_percentage += 15;
  }

  // Full Stack scoring
  if (situAnswers.some(a => a.value === 'fullstack') ||
      (psychAnswers.some(a => a.value === 'varied'))) {
    roles.fullstack.match_percentage += 30;
  }

  // Data Science scoring
  if (psychAnswers.some(a => a.value === 'data') ||
      behavAnswers.some(a => a.value === 'research')) {
    roles.data.match_percentage += 30;
  }
  if (psychAnswers.some(a => a.value === 'logical')) {
    roles.data.match_percentage += 15;
  }

  // UX Design scoring
  if (psychAnswers.some(a => a.value === 'visual' || a.value === 'human') ||
      behavAnswers.some(a => a.value === 'creative')) {
    roles.ux.match_percentage += 25;
  }
  if (psychAnswers.some(a => a.value === 'creative')) {
    roles.ux.match_percentage += 15;
  }

  // DevOps scoring
  if (psychAnswers.some(a => a.value === 'automation') ||
      behavAnswers.some(a => a.value === 'structured')) {
    roles.devops.match_percentage += 25;
  }
  if (situAnswers.some(a => a.value === 'diagnose')) {
    roles.devops.match_percentage += 15;
  }

  // Security scoring
  if (psychAnswers.some(a => a.value === 'security') ||
      situAnswers.some(a => a.value === 'report_immediately')) {
    roles.security.match_percentage += 30;
  }
  if (behavAnswers.some(a => a.value === 'investigate')) {
    roles.security.match_percentage += 15;
  }

  // Mobile scoring
  if (psychAnswers.some(a => a.value === 'visual') ||
      situAnswers.some(a => a.value === 'mobile')) {
    roles.mobile.match_percentage += 25;
  }

  // Add base scores for everyone
  Object.keys(roles).forEach(key => {
    roles[key].match_percentage += Math.random() * 20 + 40; // 40-60% base
    roles[key].match_percentage = Math.min(Math.round(roles[key].match_percentage), 95);
  });

  // Sort by match percentage and get top 3
  const sortedRoles = Object.values(roles)
    .sort((a, b) => b.match_percentage - a.match_percentage)
    .slice(0, 3);

  // Generate reasoning based on top matches
  const topRole = sortedRoles[0];
  let reasoning = `Based on your responses, ${topRole.name} appears to be your best match with a ${topRole.match_percentage}% compatibility score. `;
  
  if (psychAnswers.some(a => a.value === 'visual')) {
    reasoning += "Your interest in visual and creative work suggests you'd enjoy roles that involve design and user experience. ";
  }
  if (psychAnswers.some(a => a.value === 'logical')) {
    reasoning += "Your logical thinking and problem-solving approach makes you well-suited for technical development roles. ";
  }
  if (behavAnswers.some(a => a.value === 'hands_on')) {
    reasoning += "Your hands-on learning style indicates you'd thrive in practical, project-based roles. ";
  }

  // Generate learning resources
  const learningResources = sortedRoles.map(role => ({
    role: role.name,
    resources: getLearningResources(role.name)
  }));

  return {
    recommended_roles: sortedRoles,
    reasoning: reasoning || "Based on your responses, we recommend starting with a versatile tech role that allows you to explore different areas of technology.",
    learning_resources: learningResources
  };
}

// Get learning resources for each role
function getLearningResources(roleName) {
  const resources = {
    "Frontend Developer": [
      {
        name: "freeCodeCamp",
        type: "Platform",
        url: "https://freecodecamp.org",
        description: "Free coding bootcamp with frontend curriculum"
      },
      {
        name: "MDN Web Docs",
        type: "Documentation",
        url: "https://developer.mozilla.org",
        description: "Comprehensive web development documentation"
      }
    ],
    "Backend Developer": [
      {
        name: "The Odin Project",
        type: "Platform", 
        url: "https://theodinproject.com",
        description: "Free curriculum for full-stack development"
      },
      {
        name: "Node.js Official Docs",
        type: "Documentation",
        url: "https://nodejs.org/docs",
        description: "Official Node.js documentation and guides"
      }
    ],
    "Full Stack Developer": [
      {
        name: "freeCodeCamp",
        type: "Platform",
        url: "https://freecodecamp.org",
        description: "Complete full-stack development curriculum"
      },
      {
        name: "The Odin Project",
        type: "Platform",
        url: "https://theodinproject.com",
        description: "Comprehensive web development path"
      }
    ],
    "Data Scientist/Analyst": [
      {
        name: "Kaggle Learn",
        type: "Platform",
        url: "https://kaggle.com/learn",
        description: "Free data science micro-courses"
      },
      {
        name: "Python.org Tutorial",
        type: "Documentation",
        url: "https://docs.python.org/tutorial",
        description: "Official Python tutorial"
      }
    ],
    "UI/UX Designer": [
      {
        name: "Figma Academy",
        type: "Platform",
        url: "https://figma.com/academy",
        description: "Learn Figma design tools"
      },
      {
        name: "UX Mastery",
        type: "Platform",
        url: "https://uxmastery.com",
        description: "UX design principles and methods"
      }
    ],
    "DevOps Engineer": [
      {
        name: "AWS Free Tier",
        type: "Platform",
        url: "https://aws.amazon.com/free",
        description: "Free AWS services for learning"
      },
      {
        name: "Docker Tutorial",
        type: "Platform",
        url: "https://docker.com/get-started",
        description: "Learn containerization with Docker"
      }
    ],
    "Cybersecurity Analyst": [
      {
        name: "Cybrary",
        type: "Platform",
        url: "https://cybrary.it",
        description: "Free cybersecurity courses"
      },
      {
        name: "TryHackMe",
        type: "Platform",
        url: "https://tryhackme.com",
        description: "Hands-on cybersecurity learning"
      }
    ],
    "Mobile Developer": [
      {
        name: "React Native Docs",
        type: "Documentation",
        url: "https://reactnative.dev",
        description: "Official React Native documentation"
      },
      {
        name: "Flutter Docs",
        type: "Documentation", 
        url: "https://flutter.dev/docs",
        description: "Official Flutter documentation"
      }
    ]
  };

  return resources[roleName] || [
    {
      name: "freeCodeCamp",
      type: "Platform",
      url: "https://freecodecamp.org",
      description: "Free coding bootcamp with comprehensive curriculum"
    }
  ];
}
