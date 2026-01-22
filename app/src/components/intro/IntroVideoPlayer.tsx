'use client'

import { useCallback, useState, useEffect, useRef } from 'react'
import { Player, PlayerRef } from '@remotion/player'
import { IntroVideo } from '../../../remotion/compositions/IntroVideo'

interface IntroVideoPlayerProps {
  onComplete?: () => void
  autoPlay?: boolean
}

export function IntroVideoPlayer({ onComplete, autoPlay = true }: IntroVideoPlayerProps) {
  const playerRef = useRef<PlayerRef>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  useEffect(() => {
    const player = playerRef.current
    if (!player) return

    const handleEnded = () => {
      setIsPlaying(false)
      onComplete?.()
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    player.addEventListener('ended', handleEnded)
    player.addEventListener('pause', handlePause)
    player.addEventListener('play', handlePlay)

    return () => {
      player.removeEventListener('ended', handleEnded)
      player.removeEventListener('pause', handlePause)
      player.removeEventListener('play', handlePlay)
    }
  }, [onComplete])

  const handlePlayClick = useCallback(() => {
    playerRef.current?.play()
    setIsPlaying(true)
  }, [])

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
      <Player
        ref={playerRef}
        component={IntroVideo}
        durationInFrames={300}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        autoPlay={autoPlay}
        loop={false}
        style={{
          width: '100%',
          height: '100%',
        }}
      />

      {!isPlaying && (
        <button
          onClick={handlePlayClick}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
          aria-label="재생"
        >
          <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
            <svg
              className="w-8 h-8 text-orange-500 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  )
}
