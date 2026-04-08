import { cn } from '@/lib/utils'

interface RunnerIconProps {
  color: string
  avatarUrl?: string
  status?: 'idle' | 'boost' | 'penalty'
  className?: string
  isMe?: boolean
}

export function RunnerIcon({
  color,
  avatarUrl,
  status = 'idle',
  className,
  isMe,
}: RunnerIconProps) {
  const isBoost = status === 'boost'
  const isPenalty = status === 'penalty'

  const rootStateClass = isPenalty
    ? 'state-stumble'
    : isBoost
      ? 'state-run state-fast'
      : 'state-run'

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-end w-[60px] h-[90px] md:w-[80px] md:h-[120px]',
        className,
      )}
    >
      <style>{`
        /* Run Keyframes */
        @keyframes svg-run-leg-r { 0%{transform:rotate(-30deg)} 25%{transform:rotate(0deg)} 50%{transform:rotate(20deg)} 75%{transform:rotate(-10deg)} 100%{transform:rotate(-30deg)} }
        @keyframes svg-run-calf-r { 0%{transform:rotate(0deg)} 25%{transform:rotate(10deg)} 50%{transform:rotate(20deg)} 75%{transform:rotate(100deg)} 100%{transform:rotate(0deg)} }
        @keyframes svg-run-leg-l { 0%{transform:rotate(20deg)} 25%{transform:rotate(-10deg)} 50%{transform:rotate(-30deg)} 75%{transform:rotate(0deg)} 100%{transform:rotate(20deg)} }
        @keyframes svg-run-calf-l { 0%{transform:rotate(20deg)} 25%{transform:rotate(100deg)} 50%{transform:rotate(0deg)} 75%{transform:rotate(10deg)} 100%{transform:rotate(20deg)} }
        @keyframes svg-run-arm-r { 0%{transform:rotate(40deg)} 25%{transform:rotate(10deg)} 50%{transform:rotate(-40deg)} 75%{transform:rotate(10deg)} 100%{transform:rotate(40deg)} }
        @keyframes svg-run-lower-arm-r { 0%{transform:rotate(-70deg)} 25%{transform:rotate(-90deg)} 50%{transform:rotate(-90deg)} 75%{transform:rotate(-90deg)} 100%{transform:rotate(-70deg)} }
        @keyframes svg-run-arm-l { 0%{transform:rotate(-40deg)} 25%{transform:rotate(10deg)} 50%{transform:rotate(40deg)} 75%{transform:rotate(10deg)} 100%{transform:rotate(-40deg)} }
        @keyframes svg-run-lower-arm-l { 0%{transform:rotate(-90deg)} 25%{transform:rotate(-90deg)} 50%{transform:rotate(-70deg)} 75%{transform:rotate(-90deg)} 100%{transform:rotate(-90deg)} }
        @keyframes svg-run-torso { 0%{transform:translateY(0) rotate(8deg)} 25%{transform:translateY(-4px) rotate(8deg)} 50%{transform:translateY(0) rotate(8deg)} 75%{transform:translateY(-4px) rotate(8deg)} 100%{transform:translateY(0) rotate(8deg)} }

        /* Stumble Keyframes */
        @keyframes svg-stumble-torso { 0%,100%{transform:rotate(20deg) translateY(5px)} 50%{transform:rotate(25deg) translateY(8px)} }
        @keyframes svg-stumble-leg-r { 0%,100%{transform:rotate(-10deg)} 50%{transform:rotate(0deg)} }
        @keyframes svg-stumble-calf-r { 0%,100%{transform:rotate(20deg)} }
        @keyframes svg-stumble-leg-l { 0%,100%{transform:rotate(10deg)} 50%{transform:rotate(20deg)} }
        @keyframes svg-stumble-calf-l { 0%,100%{transform:rotate(10deg)} }
        @keyframes svg-stumble-arm-r { 0%,100%{transform:rotate(80deg)} 50%{transform:rotate(90deg)} }
        @keyframes svg-stumble-lower-arm-r { 0%,100%{transform:rotate(-20deg)} }
        @keyframes svg-stumble-arm-l { 0%,100%{transform:rotate(-60deg)} 50%{transform:rotate(-70deg)} }
        @keyframes svg-stumble-lower-arm-l { 0%,100%{transform:rotate(-40deg)} }

        /* Assign Classes */
        .state-run .part-leg-r { animation: svg-run-leg-r 0.8s infinite linear; }
        .state-run .part-calf-r { animation: svg-run-calf-r 0.8s infinite linear; }
        .state-run .part-leg-l { animation: svg-run-leg-l 0.8s infinite linear; }
        .state-run .part-calf-l { animation: svg-run-calf-l 0.8s infinite linear; }
        .state-run .part-arm-r { animation: svg-run-arm-r 0.8s infinite linear; }
        .state-run .part-lower-arm-r { animation: svg-run-lower-arm-r 0.8s infinite linear; }
        .state-run .part-arm-l { animation: svg-run-arm-l 0.8s infinite linear; }
        .state-run .part-lower-arm-l { animation: svg-run-lower-arm-l 0.8s infinite linear; }
        .state-run .part-torso { animation: svg-run-torso 0.8s infinite linear; }

        .state-fast .part-leg-r, .state-fast .part-calf-r, .state-fast .part-leg-l, .state-fast .part-calf-l,
        .state-fast .part-arm-r, .state-fast .part-lower-arm-r, .state-fast .part-arm-l, .state-fast .part-lower-arm-l,
        .state-fast .part-torso {
          animation-duration: 0.4s;
        }

        .state-stumble .part-torso { animation: svg-stumble-torso 1.2s infinite ease-in-out; }
        .state-stumble .part-leg-r { animation: svg-stumble-leg-r 1.2s infinite ease-in-out; }
        .state-stumble .part-calf-r { animation: svg-stumble-calf-r 1.2s infinite ease-in-out; }
        .state-stumble .part-leg-l { animation: svg-stumble-leg-l 1.2s infinite ease-in-out; }
        .state-stumble .part-calf-l { animation: svg-stumble-calf-l 1.2s infinite ease-in-out; }
        .state-stumble .part-arm-r { animation: svg-stumble-arm-r 1.2s infinite ease-in-out; }
        .state-stumble .part-lower-arm-r { animation: svg-stumble-lower-arm-r 1.2s infinite ease-in-out; }
        .state-stumble .part-arm-l { animation: svg-stumble-arm-l 1.2s infinite ease-in-out; }
        .state-stumble .part-lower-arm-l { animation: svg-stumble-lower-arm-l 1.2s infinite ease-in-out; }
      `}</style>

      {/* Boost Particles */}
      {isBoost && (
        <div className="absolute -left-6 top-1/2 flex space-x-1 animate-boost-trail z-0">
          <div className="w-3 h-1 rounded-full bg-primary" />
          <div className="w-5 h-1.5 rounded-full bg-primary/80" />
        </div>
      )}

      {/* Penalty Stars */}
      {isPenalty && <div className="absolute -top-4 text-lg animate-fade-out-up z-50">💫</div>}

      <div className={cn('relative w-full h-full', rootStateClass)}>
        <svg
          viewBox="0 0 100 150"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible drop-shadow-md"
        >
          <g className="part-torso" style={{ transformOrigin: '50px 85px' }}>
            {/* Left Arm (Back) */}
            <g className="part-arm-l" style={{ transformOrigin: '52px 45px' }}>
              <line
                x1="52"
                y1="45"
                x2="52"
                y2="70"
                stroke={color}
                strokeWidth="9"
                strokeLinecap="round"
                style={{ filter: 'brightness(0.6)' }}
              />
              <g className="part-lower-arm-l" style={{ transformOrigin: '52px 70px' }}>
                <line
                  x1="52"
                  y1="70"
                  x2="52"
                  y2="90"
                  stroke={color}
                  strokeWidth="7"
                  strokeLinecap="round"
                  style={{ filter: 'brightness(0.6)' }}
                />
              </g>
            </g>

            {/* Left Leg (Back) */}
            <g className="part-leg-l" style={{ transformOrigin: '50px 85px' }}>
              <line
                x1="50"
                y1="85"
                x2="50"
                y2="115"
                stroke={color}
                strokeWidth="11"
                strokeLinecap="round"
                style={{ filter: 'brightness(0.6)' }}
              />
              <g className="part-calf-l" style={{ transformOrigin: '50px 115px' }}>
                <line
                  x1="50"
                  y1="115"
                  x2="50"
                  y2="140"
                  stroke={color}
                  strokeWidth="9"
                  strokeLinecap="round"
                  style={{ filter: 'brightness(0.6)' }}
                />
                <path
                  d="M 46 140 L 58 140"
                  stroke={color}
                  strokeWidth="7"
                  strokeLinecap="round"
                  style={{ filter: 'brightness(0.6)' }}
                />
              </g>
            </g>

            {/* Neck & Torso */}
            <path d="M 49 35 L 55 35 L 54 45 L 50 45 Z" fill={color} />
            <path
              d="M 43 45 C 43 35, 61 35, 61 45 C 61 60, 56 85, 53 85 C 47 85, 43 60, 43 45 Z"
              fill={color}
            />

            {/* Head */}
            <g className="part-head">
              <foreignObject x="32" y="3" width="40" height="40">
                <div
                  className={cn(
                    'w-full h-full rounded-full border-[2.5px] overflow-hidden bg-black shadow-sm flex items-center justify-center',
                    isMe ? 'border-primary shadow-[0_0_12px_var(--primary)]' : 'border-white',
                  )}
                  style={{ borderColor: isMe ? undefined : color }}
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-white/20" />
                  )}
                </div>
              </foreignObject>
            </g>

            {/* Right Leg (Front) */}
            <g className="part-leg-r" style={{ transformOrigin: '50px 85px' }}>
              <line
                x1="50"
                y1="85"
                x2="50"
                y2="115"
                stroke={color}
                strokeWidth="11"
                strokeLinecap="round"
              />
              <g className="part-calf-r" style={{ transformOrigin: '50px 115px' }}>
                <line
                  x1="50"
                  y1="115"
                  x2="50"
                  y2="140"
                  stroke={color}
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <path d="M 46 140 L 58 140" stroke={color} strokeWidth="7" strokeLinecap="round" />
              </g>
            </g>

            {/* Right Arm (Front) */}
            <g className="part-arm-r" style={{ transformOrigin: '52px 45px' }}>
              <line
                x1="52"
                y1="45"
                x2="52"
                y2="70"
                stroke={color}
                strokeWidth="9"
                strokeLinecap="round"
              />
              <g className="part-lower-arm-r" style={{ transformOrigin: '52px 70px' }}>
                <line
                  x1="52"
                  y1="70"
                  x2="52"
                  y2="90"
                  stroke={color}
                  strokeWidth="7"
                  strokeLinecap="round"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}
