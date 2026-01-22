import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion'
import { AnimatedText } from '../components/AnimatedText'

interface FeatureCardProps {
  icon: string
  title: string
  description: string
  delay: number
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
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
      damping: 12,
      stiffness: 180,
      mass: 0.6,
    },
  })

  const opacity = interpolate(adjustedFrame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  })

  const translateX = interpolate(adjustedFrame, [0, 20], [50, 0], {
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 32,
        padding: '40px 50px',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 24,
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
        opacity,
        transform: `scale(${scale}) translateX(${translateX}px)`,
      }}
    >
      <div
        style={{
          fontSize: 72,
          width: 100,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
          borderRadius: 20,
        }}
      >
        {icon}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#1f2937',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: '#6b7280',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {description}
        </div>
      </div>
    </div>
  )
}

export const FeaturesHighlight: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        padding: 80,
      }}
    >
      <AnimatedText
        text="주요 기능"
        delay={0}
        type="spring"
        fontSize={56}
        fontWeight={700}
        color="#1f2937"
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <FeatureCard
          icon="🍳"
          title="나만의 맞춤 레시피"
          description="가진 재료로 완벽한 요리를 제안받으세요"
          delay={10}
        />
        <FeatureCard
          icon="🥬"
          title="재료 관리 & 유통기한 알림"
          description="냉장고 속 재료를 스마트하게 관리하세요"
          delay={25}
        />
        <FeatureCard
          icon="💬"
          title="AI 셰프와 실시간 대화"
          description="요리 중 궁금한 점을 바로 물어보세요"
          delay={40}
        />
      </div>
    </AbsoluteFill>
  )
}
