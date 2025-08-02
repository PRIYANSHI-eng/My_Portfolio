
import { useState, useEffect } from 'react'
import { Brain, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

interface AmbientTrack {
  id: string
  name: string
  url: string
  mood: string
  description: string
}

const ambientTracks: AmbientTrack[] = [
  {
    id: 'focus',
    name: 'Deep Focus',
    url: 'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3',
    mood: 'productive',
    description: 'AI suggests: Perfect for coding and deep work'
  },
  {
    id: 'creative',
    name: 'Creative Flow',
    url: 'https://www.bensound.com/bensound-music/bensound-inspire.mp3',
    mood: 'inspirational',
    description: 'AI suggests: Enhances creative thinking'
  },
  {
    id: 'calm',
    name: 'Mindful Peace',
    url: 'https://www.bensound.com/bensound-music/bensound-relaxing.mp3',
    mood: 'peaceful',
    description: 'AI suggests: Reduces stress and promotes wellness'
  },
  {
    id: 'nature',
    name: 'Forest Therapy',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    mood: 'natural',
    description: 'AI suggests: Connects you with nature'
  }
]

interface AiAmbientControllerProps {
  currentSection: string
  onTrackChange: (track: AmbientTrack) => void
  currentTrack: AmbientTrack | null
}

export function AiAmbientController({ currentSection, onTrackChange, currentTrack }: AiAmbientControllerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState<AmbientTrack | null>(null)
  const [showSuggestion, setShowSuggestion] = useState(false)

  // AI logic to suggest tracks based on current section
  const getAiSuggestion = (section: string): AmbientTrack => {
    const suggestions = {
      'home': ambientTracks.find(t => t.id === 'creative') || ambientTracks[0],
      'about': ambientTracks.find(t => t.id === 'calm') || ambientTracks[0],
      'projects': ambientTracks.find(t => t.id === 'focus') || ambientTracks[0],
      'vision': ambientTracks.find(t => t.id === 'nature') || ambientTracks[0],
      'contact': ambientTracks.find(t => t.id === 'calm') || ambientTracks[0],
      'blog': ambientTracks.find(t => t.id === 'creative') || ambientTracks[0],
    }
    return suggestions[section as keyof typeof suggestions] || ambientTracks[0]
  }

  useEffect(() => {
    // Simulate AI analysis when section changes
    setIsAnalyzing(true)
    const timer = setTimeout(() => {
      const suggestion = getAiSuggestion(currentSection)
      setAiSuggestion(suggestion)
      setIsAnalyzing(false)
      
      // Only show suggestion if it's different from current track
      if (!currentTrack || suggestion.id !== currentTrack.id) {
        setShowSuggestion(true)
        // Auto-hide after 5 seconds
        setTimeout(() => setShowSuggestion(false), 5000)
      }
    }, 1500) // Simulate AI processing time

    return () => clearTimeout(timer)
  }, [currentSection, currentTrack])

  const acceptSuggestion = () => {
    if (aiSuggestion) {
      onTrackChange(aiSuggestion)
      setShowSuggestion(false)
    }
  }

  return (
    <div className="relative">
      {/* AI Analysis Indicator */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-background/90 backdrop-blur-sm border border-primary/20 rounded-lg px-3 py-2 shadow-lg">
              <div className="flex items-center gap-2 text-sm">
                <Brain className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-muted-foreground">AI analyzing mood...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Suggestion Popup */}
      <AnimatePresence>
        {showSuggestion && aiSuggestion && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="absolute -top-24 left-1/2 transform -translate-x-1/2 z-50 w-80"
          >
            <div className="bg-background/95 backdrop-blur-sm border border-primary/20 rounded-xl p-4 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      AI Recommendation
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{aiSuggestion.name}</p>
                  <p className="text-xs text-muted-foreground">{aiSuggestion.description}</p>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" onClick={acceptSuggestion} className="text-xs h-7">
                      Apply
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setShowSuggestion(false)}
                      className="text-xs h-7"
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { ambientTracks }
export type { AmbientTrack }
