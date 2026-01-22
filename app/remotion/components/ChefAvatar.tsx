import { useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion'

interface ChefAvatarProps {
  emoji: string
  name: string
  delay?: number
  index?: number
}

export const ChefAvatar: React.FC<ChefAvatarProps> = ({
  emoji,
  name,
  delay = 0,
  index = 0,
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const adjustedFrame = frame - delay

  if (adjustedFrame < 0) {
    return null
  }

  const scale = spring({
    frame: adjustedFrame,
    fps,
    config: {
      damping: 10,
      stiffness: 150,
      mass: 0.8,
    },
  })

  const opacity = interpolate(adjustedFrame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  })

  const floatY = Math.sin((frame + index * 20) * 0.05) * 5

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        opacity,
        transform: `scale(${scale}) translateY(${floatY}px)`,
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'white',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 48,
        }}
      >
        {emoji}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: '#374151',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {name}
      </div>
    </div>
  )
}
