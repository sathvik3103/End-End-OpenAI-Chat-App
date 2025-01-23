
# AI Chat Application with Text-to-Speech

A modern, full-stack chat application built with Next.js 15 that features real-time AI responses, code syntax highlighting, text-to-speech capabilities, and Google authentication.
Try the app here: https://simple-chatapp-iota.vercel.app/

## Preview of the chat interface in deployment

<img width="1470" alt="Screenshot 2025-01-23 at 1 19 36 AM" src="https://github.com/user-attachments/assets/3530e7d5-41ca-40b8-82f4-e94f2764cabf" />

## 🚀 Tech Stack

### Core Technologies
- **Framework**: Next.js 15.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth
- **AI Integration**: OpenAI GPT-4, Anthropic Claude
- **Deployment**: Vercel

### Key Dependencies
- `ai` (^3.3.20) - Vercel AI SDK for handling AI interactions
- `@ai-sdk/openai` (^0.0.54) - OpenAI integration
- `@ai-sdk/anthropic` (^0.0.48) - Anthropic integration
- `firebase` (^10.13.0) - Authentication and backend services
- `react-syntax-highlighter` - Code block syntax highlighting
- `react-markdown` (^9.0.1) - Markdown rendering
- `framer-motion` (^11.3.31) - Animations
- `date-fns` (^3.6.0) - Date formatting

## 📁 Project Structure

## Getting started
To create a new project, you go to `/paths`, choose from our list of Paths, and then use Cursor's Composer feature to quickly scaffold your project!

You can also edit the Path's prompt template to be whatever you like!

## Technologies used
This doesn't really matter, but is useful for the AI to understand more about this project. We are using the following technologies
- React with Next.js 14 App Router
- TailwindCSS
- Firebase Auth, Storage, and Database
- Multiple AI endpoints including OpenAI, Anthropic, and Replicate using Vercel's AI SDK

## 🛠 Features

### 1. Chat Interface
- Real-time AI responses
- Code syntax highlighting with theme support
- Markdown rendering
- Loading states and animations
- Sample questions for quick start
- Message streaming for faster responses

### 2. Authentication
- Google Sign-in integration
- Protected routes
- Authentication context provider
- Custom `useAuth` hook

### 3. AI Integration
- OpenAI GPT-4 support
- Anthropic Claude support
- Edge runtime for API routes
- Streaming responses
- System prompts configuration

### 4. Text-to-Speech
- Real-time text-to-speech conversion
- Play/Pause functionality
- Audio state management
- Error handling for audio playback

### 5. UI/UX
- Responsive design
- Dark/Light theme support
- Loading indicators
- Code block formatting
- Message bubbles with role-based styling

## 🚀 Setup & Installation

1. **Clone the repository**

## 🔧 Configuration

### Next.js Configuration
The `next.config.mjs` includes:
- Image optimization settings
- API rewrites
- Remote pattern configurations
- SVG support
- Content Security Policy

### ESLint Configuration
Extended from Next.js core web vitals with custom rules in `.eslintrc.json`

### Vercel Configuration
`vercel.json` includes:
- Build commands
- Development commands
- Framework specifications
- Region settings

## 📦 API Routes

### OpenAI Chat
- Endpoint: `/api/openai/chat`
- Model: GPT-4
- Features: Streaming responses, system prompts

### Anthropic Chat
- Endpoint: `/api/anthropic/chat`
- Model: Claude 3 Sonnet
- Features: Streaming responses, system prompts

## 🔒 Security

- Environment variables for API keys
- Content Security Policy implementation
- Protected API routes
- Secure authentication flow
- CORS configuration

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with:
```bash
vercel
```

## 💻 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Husky for pre-commit hooks (optional)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🙏 Acknowledgments

- Vercel for the AI SDK
- OpenAI and Anthropic for AI models
- Firebase for authentication
- Next.js team for the framework
