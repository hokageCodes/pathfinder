# Tech Path Recommender

An AI-powered quiz application that helps beginners discover their ideal tech career path through personalized recommendations.

## Features

- 🧠 **Psychological Assessment**: Questions about interests, mindset, and work preferences
- 👥 **Behavioral Analysis**: Understanding learning style and motivation patterns  
- 🎯 **Situational Scenarios**: Real-world tech problem-solving situations
- 🤖 **AI-Powered Recommendations**: Personalized career suggestions using intelligent analysis
- 📚 **Learning Resources**: Curated resources for each recommended path
- 📱 **Responsive Design**: Works perfectly on desktop and mobile

## Tech Stack

- **Frontend**: Next.js 16 (App Router) + Tailwind CSS
- **State Management**: Zustand
- **AI Integration**: Free intelligent recommendation system (no API costs!)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- **No API keys required!** The app works out of the box

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd path-finder
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

**That's it!** No API setup needed - the app uses a free intelligent recommendation system.

## How It Works

1. **Landing Page**: Users see an introduction to the quiz and can start immediately
2. **Quiz Flow**: 15 questions across 3 categories with smooth navigation
3. **AI Analysis**: Responses are analyzed by an intelligent algorithm for personalized recommendations
4. **Results Page**: Users receive detailed recommendations with match percentages, reasoning, and learning resources

## Project Structure

```
├── app/
│   ├── api/recommend/route.js    # OpenAI API integration
│   ├── quiz/page.js              # Quiz interface
│   ├── results/page.js           # Results display
│   ├── page.js                   # Landing page
│   └── layout.js                 # Root layout
├── data/
│   └── questions.json            # Quiz questions data
├── store/
│   └── quizStore.js              # Zustand state management
└── tailwind.config.js            # Tailwind configuration
```

## Customization

### Adding Questions
Edit `data/questions.json` to add or modify quiz questions. Each question should have:
- `id`: Unique identifier
- `category`: "psychological", "behavioral", or "situational"
- `question`: The question text
- `options`: Array of answer options with `value` and `label`

### Modifying AI Prompts
Update the prompt in `app/api/recommend/route.js` to change how recommendations are generated.

### Styling
The app uses Tailwind CSS with custom components defined in `app/globals.css`.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `OPENAI_API_KEY` environment variable in Vercel dashboard
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js applications. Make sure to set the `OPENAI_API_KEY` environment variable.

## Future Enhancements

- [ ] User accounts and saved results
- [ ] Admin dashboard for question management
- [ ] Quiz analytics and insights
- [ ] Social sharing of results
- [ ] Multiple quiz variations
- [ ] Integration with job boards

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
