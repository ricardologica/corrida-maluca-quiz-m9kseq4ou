import { cn } from '@/lib/utils'
import { Player } from '@/types/game'

interface RunnerIconProps {
  color: string
  avatarUrl?: string
  status?: Player['status']
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

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-end',
        isBoost && 'animate-sprint',
        isPenalty && 'animate-stumble',
        !isBoost && !isPenalty && 'animate-run-bounce',
        className,
      )}
      style={{ width: '48px', height: '64px' }}
    >
      {/* Boost Particles */}
      {isBoost && (
        <div className="absolute -left-6 top-1/2 flex space-x-1 animate-boost-trail z-0">
          <div className="w-3 h-1 rounded-full bg-primary" />
          <div className="w-5 h-1.5 rounded-full bg-primary/80" />
        </div>
      )}

      {/* Penalty Stars */}
      {isPenalty && <div className="absolute -top-4 text-lg animate-fade-out-up z-20">💫</div>}

      <div
        className={cn(
          'relative w-full h-full transition-all duration-300 origin-bottom',
          isBoost ? 'rotate-[15deg] scale-110' : '',
          isPenalty ? 'rotate-[-45deg] translate-y-4 opacity-70 grayscale' : '',
        )}
      >
        {/* Head */}
        <div
          className={cn(
            'absolute top-0 left-1/2 -translate-x-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full border-[2.5px] overflow-hidden z-30 shadow-md',
            isMe ? 'border-primary shadow-[0_0_10px_var(--primary)]' : 'border-white',
          )}
          style={{ borderColor: isMe ? undefined : color }}
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover bg-black" />
          ) : (
            <div className="w-full h-full bg-white/20" />
          )}
        </div>

        {/* Torso */}
        <div
          className="absolute top-[26px] md:top-[30px] left-1/2 -translate-x-1/2 w-4 h-7 md:h-8 rounded-full z-20"
          style={{ backgroundColor: color }}
        />

        {/* Left Arm (Back) */}
        <div
          className={cn(
            'absolute top-[28px] md:top-[32px] left-[45%] w-2 h-6 md:h-7 rounded-full origin-top z-10',
            !isPenalty && 'animate-run-arm-l',
            isBoost && 'animation-duration-fast',
          )}
          style={{ backgroundColor: color, filter: 'brightness(0.7)' }}
        />

        {/* Right Arm (Front) */}
        <div
          className={cn(
            'absolute top-[28px] md:top-[32px] left-[55%] w-2 h-6 md:h-7 rounded-full origin-top z-30',
            !isPenalty && 'animate-run-arm-r',
            isBoost && 'animation-duration-fast',
          )}
          style={{ backgroundColor: color }}
        />

        {/* Left Leg (Back) */}
        <div
          className={cn(
            'absolute top-[48px] md:top-[56px] left-[45%] w-2.5 h-7 md:h-8 rounded-full origin-top z-10',
            !isPenalty && 'animate-run-leg-l',
            isBoost && 'animation-duration-fast',
          )}
          style={{ backgroundColor: color, filter: 'brightness(0.7)' }}
        />

        {/* Right Leg (Front) */}
        <div
          className={cn(
            'absolute top-[48px] md:top-[56px] left-[55%] w-2.5 h-7 md:h-8 rounded-full origin-top z-20',
            !isPenalty && 'animate-run-leg-r',
            isBoost && 'animation-duration-fast',
          )}
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  )
}
