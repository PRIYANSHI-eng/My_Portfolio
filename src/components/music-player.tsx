import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, Brain } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { AiAmbientController, ambientTracks, type AmbientTrack } from './ai-ambient-controller'

interface MusicPlayerProps {
  currentSection?: string
}

// Web Audio API for synthetic ambient sounds
class AmbientSoundGenerator {
  private audioContext: AudioContext | null = null
  private oscillators: OscillatorNode[] = []
  private gainNodes: GainNode[] = []
  private isPlaying = false

  async init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
    }
  }

  createAmbientSound(type: string) {
    if (!this.audioContext) return

    this.stop()

    const sounds = {
      focus: {
        frequencies: [220, 293.66, 369.99, 440], // A minor pentatonic - soothing for focus
        waveType: 'sine' as OscillatorType,
        volume: 0.04
      },
      creative: {
        frequencies: [261.63, 329.63, 392, 523.25], // C major chord progression - uplifting
        waveType: 'triangle' as OscillatorType,
        volume: 0.05
      },
      calm: {
        frequencies: [130.81, 174.61, 220, 261.63], // Very low, meditative frequencies
        waveType: 'sine' as OscillatorType,
        volume: 0.03
      },
      nature: {
        frequencies: [110, 146.83, 196, 246.94], // Earth tones with slight variation
        waveType: 'sawtooth' as OscillatorType,
        volume: 0.035
      }
    }

    const soundConfig = sounds[type as keyof typeof sounds] || sounds.calm

    soundConfig.frequencies.forEach((freq, index) => {
      const oscillator = this.audioContext!.createOscillator()
      const gainNode = this.audioContext!.createGain()
      const filterNode = this.audioContext!.createBiquadFilter()
      
      oscillator.type = soundConfig.waveType
      oscillator.frequency.setValueAtTime(freq, this.audioContext!.currentTime)
      
      // Add subtle frequency modulation for more organic sound
      const lfo = this.audioContext!.createOscillator()
      const lfoGain = this.audioContext!.createGain()
      lfo.frequency.setValueAtTime(0.5 + (index * 0.1), this.audioContext!.currentTime)
      lfoGain.gain.setValueAtTime(2, this.audioContext!.currentTime)
      lfo.connect(lfoGain)
      lfoGain.connect(oscillator.frequency)
      lfo.start()
      
      // Low-pass filter for warmth
      filterNode.type = 'lowpass'
      filterNode.frequency.setValueAtTime(800 + (index * 200), this.audioContext!.currentTime)
      filterNode.Q.setValueAtTime(1, this.audioContext!.currentTime)
      
      gainNode.gain.setValueAtTime(0, this.audioContext!.currentTime)
      gainNode.gain.linearRampToValueAtTime(soundConfig.volume, this.audioContext!.currentTime + 2)
      
      oscillator.connect(filterNode)
      filterNode.connect(gainNode)
      gainNode.connect(this.audioContext!.destination)
      
      oscillator.start()
      
      this.oscillators.push(oscillator)
      this.oscillators.push(lfo)
      this.gainNodes.push(gainNode)
    })

    this.isPlaying = true
  }

  stop() {
    this.oscillators.forEach(osc => {
      try { osc.stop() } catch (e) {}
    })
    this.oscillators = []
    this.gainNodes = []
    this.isPlaying = false
  }

  getIsPlaying() {
    return this.isPlaying
  }
}

export function MusicPlayer({ currentSection = 'home' }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<AmbientTrack | null>(null)
  const soundGenerator = useRef<AmbientSoundGenerator>(new AmbientSoundGenerator())

  useEffect(() => {
    // Set initial track
    if (!currentTrack) {
      setCurrentTrack(ambientTracks[2]) // Default to calm track
    }
  }, [currentTrack])

  const togglePlay = async () => {
    if (!currentTrack) return

    try {
      if (isPlaying) {
        soundGenerator.current.stop()
        setIsPlaying(false)
      } else {
        await soundGenerator.current.init()
        soundGenerator.current.createAmbientSound(currentTrack.id)
        setIsPlaying(true)
      }
    } catch (error) {
      console.error('Audio play failed:', error)
    }
  }

  const handleTrackChange = (track: AmbientTrack) => {
    const wasPlaying = isPlaying
    setCurrentTrack(track)
    
    if (wasPlaying) {
      soundGenerator.current.stop()
      setTimeout(async () => {
        await soundGenerator.current.init()
        soundGenerator.current.createAmbientSound(track.id)
      }, 100)
    }
    
    console.log('AI suggested track change:', track.name)
  }

  return (
    <div className="relative flex items-center gap-3">
      {/* AI Controller */}
      <AiAmbientController
        currentSection={currentSection}
        onTrackChange={handleTrackChange}
        currentTrack={currentTrack}
      />

      {/* AI Brain Icon */}
      <Button
        variant="ghost"
        size="sm"
        className="relative p-2 hover:bg-primary/10 group"
        title="AI Ambient Intelligence"
      >
        <Brain className="w-4 h-4 text-primary group-hover:text-primary/80 transition-colors" />
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </Button>

      {/* Music Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlay}
          className="p-2 hover:bg-primary/10 group relative overflow-hidden"
          title={`${isPlaying ? 'Pause' : 'Play'} ambient sounds`}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="pause"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Pause className="w-4 h-4 text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Play className="w-4 h-4 text-primary" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ripple effect when playing */}
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/30"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ scale: 1, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </AnimatePresence>
        </Button>

        {/* Current Track Info */}
        <AnimatePresence>
          {currentTrack && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="flex items-center gap-2 px-2 py-1 bg-primary/5 rounded-full border border-primary/10"
            >
              <Volume2 className="w-3 h-3 text-primary/60" />
              <span className="text-xs text-muted-foreground font-medium truncate max-w-24">
                {currentTrack.name}
              </span>
              
              {/* Audio visualization */}
              <div className="flex items-center gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-primary/40 rounded-full"
                    animate={{
                      height: isPlaying ? [2, 8, 2] : 2,
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}