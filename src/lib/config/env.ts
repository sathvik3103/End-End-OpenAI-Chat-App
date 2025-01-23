const env = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY!,
    model: process.env.OPENAI_API_MODEL || 'gpt-4',
    temperature: Number(process.env.OPENAI_API_TEMPERATURE) || 0.7,
    maxTokens: Number(process.env.OPENAI_API_MAX_TOKENS) || 2000,
    rateLimit: Number(process.env.OPENAI_API_RATE_LIMIT) || 10,
    rateLimitWindow: Number(process.env.OPENAI_API_RATE_LIMIT_WINDOW) || 60,
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL!,
  },
}

// Validate required environment variables
const requiredEnvs: (keyof typeof env.openai)[] = ['apiKey']
requiredEnvs.forEach((key) => {
  if (!env.openai[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
})

export default env 