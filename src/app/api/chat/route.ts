import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'
import env from '@/lib/config/env'

const openai = new OpenAI({
  apiKey: env.openai.apiKey,
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const response = await openai.chat.completions.create({
    model: env.openai.model,
    stream: true,
    temperature: env.openai.temperature,
    messages,
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
} 