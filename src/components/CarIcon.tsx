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
        'relative w-24 h-12 sm:w-32 sm:h-16 flex items-center justify-center',
        className,
      )}
    >
      {/* Boost Particles */}
      {status === 'boost' && (
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex space-x-1 animate-boost-trail z-0">
          <div className="w-3 h-1 rounded-full bg-primary" />
          <div className="w-5 h-1.5 rounded-full bg-primary/80" />
          <div className="w-8 h-2 rounded-full bg-white" />
        </div>
      )}

      {/* Penalty Smoke */}
      {status === 'penalty' && (
        <div className="absolute top-0 right-0 text-2xl animate-fade-out-up z-20">💨</div>
      )}

      <div
        className={cn(
          'relative w-full h-full transition-transform duration-300 z-10 flex items-center',
          status === 'idle' && 'animate-idle-car',
          status === 'boost' && 'animate-wheelie',
          status === 'penalty' && 'opacity-50 grayscale animate-pulse',
        )}
      >
        {/* Avatar in the driver seat with CSS Cutout Effect */}
        {avatarUrl && (
          <div className="absolute top-[-8px] left-[35%] w-8 h-8 sm:w-10 sm:h-10 z-20 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
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

        {/* Sleek Modern Car SVG */}
        <svg
          viewBox="0 0 120 40"
          className="w-full h-full drop-shadow-2xl"
          style={{ filter: `drop-shadow(0 6px 8px ${color}50)` }}
        >
          {/* Main Body */}
          <path
            d="M 10 35 L 5 35 C 2 35 2 30 5 28 L 25 15 C 35 8 50 8 70 12 L 100 18 C 110 20 115 25 115 32 C 115 35 110 35 105 35 Z"
            fill={color}
          />
          {/* Cockpit Glass */}
          <path d="M 35 15 L 55 12 L 70 16 L 40 18 Z" fill="#ffffff" opacity="0.6" />
          {/* Rear Spoiler */}
          <path
            d="M 5 28 L 15 18 L 20 18 L 10 28 Z"
            fill={color}
            style={{ filter: 'brightness(0.8)' }}
          />
          <path d="M 0 18 L 25 18 L 25 20 L 0 20 Z" fill="#111" />
          {/* Side Skirt/Details */}
          <path d="M 30 30 L 90 30 L 85 32 L 35 32 Z" fill="#111" opacity="0.5" />
          {/* Modern Wheels */}
          <circle cx="28" cy="35" r="11" fill="#111" />
          <circle cx="28" cy="35" r="5" fill="#333" stroke="#666" strokeWidth="1.5" />
          <circle cx="92" cy="35" r="11" fill="#111" />
          <circle cx="92" cy="35" r="5" fill="#333" stroke="#666" strokeWidth="1.5" />
          {/* Neon Underglow */}
          <ellipse
            cx="60"
            cy="42"
            rx="50"
            ry="3"
            fill={color}
            opacity="0.8"
            style={{ filter: 'blur(5px)' }}
          />
        </svg>
      </div>
    </div>
  )
}
