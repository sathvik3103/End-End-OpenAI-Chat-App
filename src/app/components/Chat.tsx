'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from 'ai/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

const sampleQuestions = [
  { text: "What is React?", icon: "🤔" },
  { text: "Give me example Python code", icon: "🐍" },
  { text: "Explain TypeScript", icon: "💡" },
  { text: "Best coding practices?", icon: "✨" },
]

function MessageContent({ content, onPlay, isPlaying, isAssistant }: { 
  content: string; 
  onPlay: () => void;
  isPlaying: boolean;
  isAssistant: boolean;
}) {
  // Check if the message contains code (between triple backticks)
  const codeBlockRegex = /```(\w+)?\s*\n([\s\S]*?)```/g
  const parts = []
  let lastIndex = 0
  let match

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex, match.index)
      })
    }

    // Add code block
    parts.push({
      type: 'code',
      language: match[1] || 'plaintext',
      content: match[2].trim()
    })

    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      content: content.slice(lastIndex)
    })
  }

  return (
    <div className="relative">
      {parts.length > 0 ? parts.map((part, i) => (
        part.type === 'code' ? (
          <div key={i} className="my-2 rounded-md overflow-hidden">
            <SyntaxHighlighter
              language={part.language}
              style={tomorrow}
              customStyle={{
                margin: 0,
                borderRadius: '0.375rem',
              }}
            >
              {part.content}
            </SyntaxHighlighter>
          </div>
        ) : (
          <p key={i} className="whitespace-pre-wrap">{part.content}</p>
        )
      )) : (
        <p className="whitespace-pre-wrap">{content}</p>
      )}
      {isAssistant && (
        <button 
          onClick={onPlay}
          className="absolute bottom-0 right-0 p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors transform translate-x-2 translate-y-2"
          title={isPlaying ? "Pause audio" : "Play audio"}
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          )}
        </button>
      )}
    </div>
  )
}

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [audioSrc, setAudioSrc] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handlePlay = async (text: string, messageIndex: number) => {
    try {
      if (isPlaying && currentPlayingIndex === messageIndex) {
        // Pause the current audio
        audioRef.current?.pause()
        setIsPlaying(false)
        setCurrentPlayingIndex(null)
        return
      }

      if (currentPlayingIndex !== messageIndex) {
        // Load new audio for different message
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        })

        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.message || 'Failed to generate speech')
        }

        const audioBlob = await res.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        
        if (audioSrc) {
          URL.revokeObjectURL(audioSrc)
        }
        
        setAudioSrc(audioUrl)
        if (audioRef.current) {
          audioRef.current.src = audioUrl
        }
      }
      
      // Play the audio
      await audioRef.current?.play()
      setIsPlaying(true)
      setCurrentPlayingIndex(messageIndex)
    } catch (error) {
      console.error('Failed to generate speech:', error)
    }
  }

  useEffect(() => {
    const audioElement = audioRef.current
    if (audioElement) {
      const handleEnded = () => {
        setIsPlaying(false)
        setCurrentPlayingIndex(null)
      }
      audioElement.addEventListener('ended', handleEnded)
      return () => audioElement.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <audio 
        ref={audioRef} 
        className="hidden"
        controls={false}
        onError={(e) => {
          console.error('Audio Error:', (e.target as HTMLAudioElement).error)
          setIsPlaying(false)
          setCurrentPlayingIndex(null)
        }}
      />
      {/* Main chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="text-center mt-12">
            <h1 className="text-4xl font-bold mb-8">Hi, I'm Bunty! 👋</h1>
            <p className="text-gray-600 mb-8">What can I help you with today?</p>
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {sampleQuestions.map((q, i) => (
                <button
                  key={i}
                  className="p-4 text-left rounded-lg border hover:bg-gray-50 transition-colors"
                  onClick={() => handleInputChange({ target: { value: q.text } } as any)}
                >
                  <span className="mr-2">{q.icon}</span>
                  {q.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, index) => (
            <div
              key={index}
              className={`flex ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.role === 'assistant' && (
                <div className="flex items-center mr-2">
                  <span className="text-sm font-medium text-gray-600">Bunty</span>
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  m.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <MessageContent 
                  content={m.content} 
                  onPlay={() => handlePlay(m.content, index)}
                  isPlaying={isPlaying && currentPlayingIndex === index}
                  isAssistant={m.role === 'assistant'}
                />
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-center mr-2">
              <span className="text-sm font-medium text-gray-600">Bunty</span>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Message Bunty..."
            className="w-full rounded-lg border border-gray-200 p-4 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
} 