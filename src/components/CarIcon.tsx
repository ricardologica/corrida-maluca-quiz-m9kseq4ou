import { cn } from '@/lib/utils'
import { Player } from '@/types/game'

interface CarIconProps {
  color: string
  avatarUrl?: string
  className?: string
  status?: Player['status']
}

export function CarIcon({ color, avatarUrl, className, status = 'idle' }: CarIconProps) {
  return (
    <div
      className={cn(
        'relative w-24 h-16 sm:w-32 sm:h-20 flex items-center justify-center',
        className,
      )}
    >
      {/* Boost Particles */}
      {status === 'boost' && (
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex space-x-1 animate-boost-trail z-0">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <div className="w-3 h-3 rounded-full bg-primary/80" />
          <div className="w-4 h-4 rounded-full bg-white" />
        </div>
      )}

      {/* Penalty Smoke */}
      {status === 'penalty' && (
        <div className="absolute top-0 right-0 text-2xl animate-fade-out-up z-20">💨</div>
      )}

      <div
        className={cn(
          'relative w-full h-full transition-transform duration-300 z-10',
          status === 'idle' && 'animate-idle-car',
          status === 'boost' && 'animate-wheelie',
          status === 'penalty' && 'animate-penalty',
        )}
      >
        {/* Avatar in the driver seat with CSS Cutout Effect */}
        {avatarUrl && (
          <div className="absolute top-[-12px] left-[40%] w-10 h-10 sm:w-12 sm:h-12 z-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            <div
              className="w-full h-full"
              style={{
                maskImage:
                  'radial-gradient(ellipse at 50% 40%, black 50%, rgba(0,0,0,0.8) 60%, transparent 70%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse at 50% 40%, black 50%, rgba(0,0,0,0.8) 60%, transparent 70%)',
              }}
            >
              <img src={avatarUrl} alt="Driver" className="w-full h-full object-cover object-top" />
            </div>
          </div>
        )}

        {/* SVG Car Body */}
        <svg
          viewBox="0 0 100 50"
          className="w-full h-full drop-shadow-xl"
          style={{ filter: `drop-shadow(0 4px 6px ${color}40)` }}
        >
          <path
            d="M 20 40 L 10 40 C 5 40 5 35 10 30 L 25 15 C 30 10 35 10 45 10 L 70 10 C 80 10 85 15 90 25 L 95 30 C 100 35 95 40 90 40 L 80 40"
            fill={color}
          />
          <path d="M 30 15 L 45 15 L 45 25 L 25 25 Z" fill="#ffffff" opacity="0.8" />
          <path d="M 50 15 L 65 15 C 70 15 75 20 78 25 L 50 25 Z" fill="#ffffff" opacity="0.8" />
          {/* Wheels */}
          <circle cx="25" cy="40" r="8" fill="#111" />
          <circle cx="25" cy="40" r="4" fill="#ccc" />
          <circle cx="75" cy="40" r="8" fill="#111" />
          <circle cx="75" cy="40" r="4" fill="#ccc" />
          {/* Neon Underglow */}
          <ellipse
            cx="50"
            cy="48"
            rx="40"
            ry="3"
            fill={color}
            opacity="0.6"
            style={{ filter: 'blur(4px)' }}
          />
        </svg>
      </div>
    </div>
  )
}
