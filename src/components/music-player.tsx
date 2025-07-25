import { useState, useRef, useEffect } from "react"
import { Play, Pause, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Set initial volume
    audio.volume = 0.5
    
    audio.addEventListener('ended', () => setIsPlaying(false))

    return () => {
      audio.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        // Set volume to ensure it's audible
        audio.volume = 0.5
        await audio.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error('Audio play failed:', error)
      // Fallback: try a different audio source
      if (audio.src.includes('pixabay')) {
        audio.src = "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
        try {
          await audio.play()
          setIsPlaying(true)
        } catch (e) {
          console.error('Fallback audio also failed:', e)
        }
      }
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={togglePlay}
        className="relative h-9 w-9 hover:bg-secondary/50 transition-all duration-300"
        title={isPlaying ? "Pause relaxing music" : "Play relaxing music"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="pause"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <Pause className="h-4 w-4 text-primary" />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <Play className="h-4 w-4 text-primary ml-0.5" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Animated music wave indicator */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
            >
              <div className="flex space-x-0.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-primary rounded-full"
                    animate={{
                      height: [2, 8, 2],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="hidden sm:flex items-center space-x-2 overflow-hidden"
          >
            <Music className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              Peaceful Forest
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://www.bensound.com/bensound-music/bensound-relaxing.mp3"
        crossOrigin="anonymous"
      />
    </div>
  )
}