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

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full border-[3px] shadow-lg transition-all duration-300 bg-black z-10',
        isBoost ? 'animate-pulse scale-110' : '',
        isPenalty ? 'opacity-70 grayscale translate-y-1' : '',
        className,
      )}
      style={{ borderColor: isMe ? '#fbbf24' : color }}
    >
      {/* Boost Particles */}
      {isBoost && (
        <div className="absolute -left-6 top-1/2 flex space-x-1 animate-pulse z-[-1]">
          <div className="w-3 h-1 rounded-full bg-primary" />
          <div className="w-5 h-1.5 rounded-full bg-primary/80" />
        </div>
      )}

      {/* Penalty Stars */}
      {isPenalty && <div className="absolute -top-4 text-lg animate-bounce z-50">💫</div>}

      <div className="w-full h-full rounded-full overflow-hidden bg-black/50 flex items-center justify-center">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/50">
            ?
          </div>
        )}
      </div>
    </div>
  )
}
