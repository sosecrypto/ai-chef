import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion'

export const CallToAction: React.FC = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const textScale = spring({
    frame,
    fps,
    config: {
      damping: 8,
      stiffness: 120,
      mass: 0.8,
    },
  })

  const textOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  })

  const buttonScale = spring({
    frame: frame - 20,
    fps,
    config: {
      damping: 10,
      stiffness: 150,
      mass: 0.6,
    },
  })

  const buttonOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateRight: 'clamp',
  })

  const pulseScale = 1 + Math.sin(frame * 0.15) * 0.03

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50,
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 800,
          color: '#1f2937',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          opacity: textOpacity,
          transform: `scale(${textScale})`,
          textAlign: 'center',
        }}
      >
        지금 시작하세요
      </div>

      <div
        style={{
          fontSize: 28,
          fontWeight: 400,
          color: '#6b7280',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          opacity: textOpacity,
          transform: `scale(${textScale})`,
          textAlign: 'center',
        }}
      >
        AI 셰프가 당신의 요리를 도와드립니다
      </div>

      <div
        style={{
          opacity: buttonOpacity,
          transform: `scale(${buttonScale * pulseScale})`,
        }}
      >
        <div
          style={{
            padding: '24px 64px',
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(249, 115, 22, 0.4)',
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: 'white',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            🚀 시작하기
          </span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 60,
          opacity: interpolate(frame, [30, 45], [0, 0.6], {
            extrapolateRight: 'clamp',
          }),
          fontSize: 18,
          color: '#9ca3af',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        Powered by AI 셰프 • Google Gemini
      </div>
    </AbsoluteFill>
  )
}
