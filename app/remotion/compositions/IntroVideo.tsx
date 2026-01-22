import { AbsoluteFill, Sequence } from 'remotion'
import { GradientBackground } from '../components/GradientBackground'
import { LogoReveal } from '../sequences/LogoReveal'
import { ChefShowcase } from '../sequences/ChefShowcase'
import { FeaturesHighlight } from '../sequences/FeaturesHighlight'
import { CallToAction } from '../sequences/CallToAction'

export const IntroVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#fef7f0' }}>
      <GradientBackground />

      {/* 로고 리빌: 0-60 프레임 (2초) */}
      <Sequence from={0} durationInFrames={60}>
        <LogoReveal />
      </Sequence>

      {/* 셰프 쇼케이스: 60-150 프레임 (3초) */}
      <Sequence from={60} durationInFrames={90}>
        <ChefShowcase />
      </Sequence>

      {/* 기능 하이라이트: 150-240 프레임 (3초) */}
      <Sequence from={150} durationInFrames={90}>
        <FeaturesHighlight />
      </Sequence>

      {/* CTA: 240-300 프레임 (2초) */}
      <Sequence from={240} durationInFrames={60}>
        <CallToAction />
      </Sequence>
    </AbsoluteFill>
  )
}
