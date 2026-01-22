import { AbsoluteFill } from 'remotion'
import { AnimatedText } from '../components/AnimatedText'
import { ChefAvatar } from '../components/ChefAvatar'

const CHEFS = [
  { emoji: '👨‍🍳', name: '김 셰프' },
  { emoji: '👩‍🍳', name: '이 셰프' },
  { emoji: '🧑‍🍳', name: '박 셰프' },
  { emoji: '👨‍🍳', name: '최 셰프' },
  { emoji: '👩‍🍳', name: '정 셰프' },
  { emoji: '🧑‍🍳', name: '강 셰프' },
  { emoji: '👨‍🍳', name: '조 셰프' },
  { emoji: '👩‍🍳', name: '윤 셰프' },
]

export const ChefShowcase: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 60,
        padding: 80,
      }}
    >
      <AnimatedText
        text="8명의 개성있는 AI 셰프"
        delay={0}
        type="spring"
        fontSize={64}
        fontWeight={700}
        color="#1f2937"
      />

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 40,
          maxWidth: 1200,
        }}
      >
        {CHEFS.map((chef, index) => (
          <ChefAvatar
            key={chef.name}
            emoji={chef.emoji}
            name={chef.name}
            delay={15 + index * 8}
            index={index}
          />
        ))}
      </div>

      <AnimatedText
        text="각자의 전문 분야와 개성으로 요리를 도와드립니다"
        delay={70}
        type="fade"
        fontSize={28}
        fontWeight={400}
        color="#6b7280"
      />
    </AbsoluteFill>
  )
}
