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

  const speedClass = isBoost ? 'animation-fast' : ''

  const torsoAnim = isPenalty ? 'animate-stumble-torso' : 'animate-sprint-torso'
  const headAnim = isPenalty ? 'animate-stumble-head' : 'animate-sprint-head'
  const armLAnim = isPenalty ? 'animate-stumble-arm' : 'animate-sprint-arm-l'
  const armRAnim = isPenalty ? 'animate-stumble-arm' : 'animate-sprint-arm-r'
  const thighLAnim = isPenalty ? 'animate-stumble-thigh-l' : 'animate-sprint-thigh-l'
  const calfLAnim = isPenalty ? 'animate-stumble-calf-l' : 'animate-sprint-calf-l'
  const thighRAnim = isPenalty ? 'animate-stumble-thigh-r' : 'animate-sprint-thigh-r'
  const calfRAnim = isPenalty ? 'animate-stumble-calf-r' : 'animate-sprint-calf-r'

  return (
    <div
      className={cn('relative flex flex-col items-center justify-end', className)}
      style={{ width: '60px', height: '80px' }}
    >
      {/* Boost Particles */}
      {isBoost && (
        <div className="absolute -left-6 top-1/2 flex space-x-1 animate-boost-trail z-0">
          <div className="w-3 h-1 rounded-full bg-primary" />
          <div className="w-5 h-1.5 rounded-full bg-primary/80" />
        </div>
      )}

      {/* Penalty Stars */}
      {isPenalty && <div className="absolute -top-4 text-lg animate-fade-out-up z-50">💫</div>}

      <div className={cn('relative mb-6 md:mb-8', torsoAnim, speedClass)}>
        {/* Head */}
        <div
          className={cn(
            'absolute -top-[34px] md:-top-[42px] left-1/2 -translate-x-1/2 z-40',
            headAnim,
            speedClass,
          )}
        >
          <div
            className={cn(
              'w-8 h-8 md:w-10 md:h-10 rounded-full border-[2.5px] overflow-hidden bg-black shadow-lg',
              isMe ? 'border-primary shadow-[0_0_12px_var(--primary)]' : 'border-white',
            )}
            style={{ borderColor: isMe ? undefined : color }}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-white/20 flex items-center justify-center" />
            )}
          </div>
        </div>

        {/* Back Arm (Left) */}
        <div
          className={cn(
            'absolute -top-[4px] md:-top-[6px] left-[3px] md:left-[5px] w-2.5 h-[22px] md:w-3.5 md:h-[30px] rounded-full origin-[50%_4px] z-10',
            armLAnim,
            speedClass,
          )}
          style={{ backgroundColor: color, filter: 'brightness(0.6)' }}
        >
          <div
            className="absolute top-[80%] left-0 w-full h-[20px] md:h-[26px] origin-[50%_4px] rounded-full rotate-[-100deg]"
            style={{ backgroundColor: color }}
          />
        </div>

        {/* Back Leg (Left) */}
        <div
          className={cn(
            'absolute top-[16px] md:top-[22px] left-[3px] md:left-[5px] w-3 h-[24px] md:w-4 md:h-[32px] rounded-full origin-[50%_4px] z-10',
            thighLAnim,
            speedClass,
          )}
          style={{ backgroundColor: color, filter: 'brightness(0.6)' }}
        >
          <div
            className={cn(
              'absolute top-[80%] left-0 w-full h-[24px] md:h-[32px] origin-[50%_4px] rounded-full',
              calfLAnim,
              speedClass,
            )}
            style={{ backgroundColor: color }}
          >
            <div
              className="absolute bottom-0 right-[-4px] w-[140%] h-[8px] rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>

        {/* Torso Body */}
        <div
          className="relative w-[14px] h-[24px] md:w-[20px] md:h-[32px] rounded-[10px] z-20"
          style={{ backgroundColor: color }}
        />
        <div
          className="absolute -top-[4px] md:-top-[6px] -left-[2px] w-[18px] h-[14px] md:w-[24px] md:h-[18px] rounded-[8px] z-20"
          style={{ backgroundColor: color }}
        />

        {/* Front Leg (Right) */}
        <div
          className={cn(
            'absolute top-[16px] md:top-[22px] left-[3px] md:left-[5px] w-3 h-[24px] md:w-4 md:h-[32px] rounded-full origin-[50%_4px] z-30',
            thighRAnim,
            speedClass,
          )}
          style={{ backgroundColor: color }}
        >
          <div
            className={cn(
              'absolute top-[80%] left-0 w-full h-[24px] md:h-[32px] origin-[50%_4px] rounded-full',
              calfRAnim,
              speedClass,
            )}
            style={{ backgroundColor: color }}
          >
            <div
              className="absolute bottom-0 right-[-4px] w-[140%] h-[8px] rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>

        {/* Front Arm (Right) */}
        <div
          className={cn(
            'absolute -top-[4px] md:-top-[6px] left-[3px] md:left-[5px] w-2.5 h-[22px] md:w-3.5 md:h-[30px] rounded-full origin-[50%_4px] z-40',
            armRAnim,
            speedClass,
          )}
          style={{ backgroundColor: color }}
        >
          <div
            className="absolute top-[80%] left-0 w-full h-[20px] md:h-[26px] origin-[50%_4px] rounded-full rotate-[-100deg]"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
    </div>
  )
}
