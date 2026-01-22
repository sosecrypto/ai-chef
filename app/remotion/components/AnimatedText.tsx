import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion'

interface AnimatedTextProps {
  text: string
  delay?: number
  type?: 'spring' | 'fade' | 'typewriter'
  fontSize?: number
  color?: string
  fontWeight?: number
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  type = 'spring',
  fontSize = 72,
  color = '#1f2937',
  fontWeight = 700,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const adjustedFrame = frame - delay

  if (adjustedFrame < 0) {
    return null
  }

  if (type === 'typewriter') {
    const charIndex = Math.floor(adjustedFrame / 2)
    const displayText = text.slice(0, charIndex)
    const showCursor = adjustedFrame % 10 < 5 && charIndex < text.length

    return (
      <div
        style={{
          fontSize,
          fontWeight,
          color,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {displayText}
        {showCursor && (
          <span style={{ opacity: 0.7 }}>|</span>
        )}
      </div>
    )
  }

  if (type === 'fade') {
    const opacity = interpolate(adjustedFrame, [0, 20], [0, 1], {
      extrapolateRight: 'clamp',
    })
    const translateY = interpolate(adjustedFrame, [0, 20], [30, 0], {
      extrapolateRight: 'clamp',
    })

    return (
      <div
        style={{
          fontSize,
          fontWeight,
          color,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          opacity,
          transform: `translateY(${translateY}px)`,
        }}
      >
        {text}
      </div>
    )
  }

  const scale = spring({
    frame: adjustedFrame,
    fps,
    config: {
      damping: 12,
      stiffness: 200,
      mass: 0.5,
    },
  })

  const opacity = interpolate(adjustedFrame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        color,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {text}
    </div>
  )
}
