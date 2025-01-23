import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: Request) {
  try {
    const { text } = await req.json()
    
    if (!process.env.ELEVEN_LABS_API_KEY || !process.env.ELEVEN_LABS_VOICE_ID) {
      return NextResponse.json(
        { error: 'Missing ElevenLabs configuration' },
        { status: 500 }
      )
    }

    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVEN_LABS_VOICE_ID}`,
      {
        text,
        voice_settings: {
          stability: 0.7,
          similarity_boost: 0.8
        }
      },
      {
        headers: {
          'xi-api-key': process.env.ELEVEN_LABS_API_KEY,
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      }
    )

    // Return the audio data with proper headers
    return new NextResponse(response.data, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': response.data.length.toString()
      }
    })
  } catch (error) {
    console.error('TTS Error:', error)
    return NextResponse.json(
      { error: 'Text-to-speech conversion failed' },
      { status: 500 }
    )
  }
} 