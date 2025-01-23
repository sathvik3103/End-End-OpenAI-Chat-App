export interface OpenAIConfig {
  apiKey: string
  model: string
  temperature: number
  maxTokens: number
  rateLimit: number
  rateLimitWindow: number
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
} 