import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion'
import { AnimatedText } from '../components/AnimatedText'

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const iconScale = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 100,
      mass: 1,
    },
  })

  const iconRotate = spring({
    frame,
    fps,
    config: {
      damping: 15,
      stiffness: 80,
      mass: 0.8,
    },
    from: -30,
    to: 0,
  })

  const iconOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
      }}
    >
      <div
        style={{
          fontSize: 140,
          opacity: iconOpacity,
          transform: `scale(${iconScale}) rotate(${iconRotate}deg)`,
          filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15))',
        }}
      >
        👨‍🍳
      </div>

      <AnimatedText
        text="AI 셰프"
        delay={20}
        type="typewriter"
        fontSize={96}
        fontWeight={800}
        color="#1f2937"
      />

      <AnimatedText
        text="당신만의 맞춤 레시피"
        delay={45}
        type="fade"
        fontSize={36}
        fontWeight={400}
        color="#6b7280"
      />
    </AbsoluteFill>
  )
}
