import { useCurrentFrame, interpolate } from 'remotion'

export const GradientBackground: React.FC = () => {
  const frame = useCurrentFrame()

  const rotation = interpolate(frame, [0, 300], [0, 360])
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity,
        background: `
          linear-gradient(
            ${rotation}deg,
            #f97316 0%,
            #fb923c 25%,
            #fdba74 50%,
            #fed7aa 75%,
            #ffedd5 100%
          )
        `,
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background: `
            radial-gradient(
              circle at 30% 30%,
              rgba(255, 255, 255, 0.3) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 70% 70%,
              rgba(249, 115, 22, 0.4) 0%,
              transparent 40%
            )
          `,
          transform: `rotate(${rotation * 0.5}deg)`,
        }}
      />
    </div>
  )
}
