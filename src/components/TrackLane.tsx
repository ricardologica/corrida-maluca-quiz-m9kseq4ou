import { Player } from '@/types/game'
import { RunnerIcon } from './RunnerIcon'

interface TrackLaneProps {
  player: Player
  totalQuestions: number
}

export function TrackLane({ player, totalQuestions }: TrackLaneProps) {
  const percentage = Math.min((player.progress / totalQuestions) * 100, 100)
  const formattedName =
    player.name && player.name !== 'Unknown' ? player.name.split(' ')[0].toLowerCase() : 'piloto'
  const formattedGrade = player.grade ? player.grade.replace(/[^0-9]/g, '') + 'ano' : ''
  const displayLabel = formattedGrade ? `${formattedName}_${formattedGrade}` : formattedName

  return (
    <div className="relative w-full h-24 sm:h-32 border-b-2 border-dashed border-white/10 overflow-hidden flex items-end">
      {/* Animated Track Background */}
      <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/200/200?q=asphalt&color=black')] opacity-20 animate-track" />

      {/* Finish Line Indicator */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-[url('https://img.usecurling.com/p/100/100?q=checkerboard')] opacity-50 z-0" />

      {/* Moving Car Container */}
      <div
        className="absolute bottom-1 sm:bottom-2 z-10 transition-all duration-1000 ease-in-out"
        style={{ left: `calc(${percentage}% - ${percentage === 100 ? 100 : 50}px)` }}
      >
        <div className="relative flex flex-col items-center">
          <RunnerIcon
            color={player.carColor}
            avatarUrl={player.avatarUrl}
            status={player.status}
            className="w-12 h-16 sm:w-16 sm:h-20 mb-2"
          />
          {/* Player Name Bubble */}
          <div className="bg-black/80 px-2 py-0.5 mt-1 rounded text-[10px] sm:text-xs font-racing whitespace-nowrap border border-white/20 shadow-lg uppercase z-20">
            {displayLabel}
          </div>
        </div>
      </div>
    </div>
  )
}
