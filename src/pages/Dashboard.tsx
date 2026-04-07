import { useEffect } from 'react'
import { useGameStore, gameStore } from '@/stores/main'
import { TrackLane } from '@/components/TrackLane'

const TOTAL_QUESTIONS = 30

const Dashboard = () => {
  const { players, raceCode } = useGameStore()

  // Bot Simulation Hook
  useEffect(() => {
    const bots = players.filter((p) => p.id.startsWith('bot'))

    const intervals = bots.map((bot) => {
      // Random interval between 3s and 8s for each bot to answer
      const delay = Math.random() * 5000 + 3000

      return setInterval(() => {
        const currentBot = gameStore.getSnapshot().players.find((p) => p.id === bot.id)
        if (currentBot && !currentBot.isFinished) {
          // 80% chance of getting it right
          const isCorrect = Math.random() > 0.2
          gameStore.updatePlayerStatus(bot.id, isCorrect)
        }
      }, delay)
    })

    return () => intervals.forEach(clearInterval)
  }, []) // Run once on mount

  const sortedPlayers = [...players].sort((a, b) => b.progress - a.progress)

  return (
    <div className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-hidden h-full">
      {/* Left: Tracks Area */}
      <div className="flex-1 glass-panel rounded-2xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40">
          <h2 className="font-racing text-xl md:text-2xl text-primary flex items-center gap-2">
            <span className="animate-pulse">🔴</span> LIVE RACE
          </h2>
          <div className="font-racing text-sm text-muted-foreground">
            CÓDIGO: <span className="text-white text-lg">{raceCode}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide">
          {players.map((player) => (
            <TrackLane key={player.id} player={player} totalQuestions={TOTAL_QUESTIONS} />
          ))}
          {players.length === 0 && (
            <div className="h-full flex items-center justify-center text-muted-foreground font-racing">
              Aguardando pilotos...
            </div>
          )}
        </div>
      </div>

      {/* Right: Leaderboard */}
      <div className="w-full md:w-80 glass-panel rounded-2xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/10 bg-black/40 text-center">
          <h2 className="font-racing text-lg text-warning">🏆 CLASSIFICAÇÃO</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {sortedPlayers.map((player, idx) => (
            <div
              key={player.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${idx === 0 ? 'bg-warning/10 border-warning shadow-[0_0_10px_rgba(254,228,64,0.2)]' : 'bg-black/30 border-white/5'}`}
            >
              <div className="font-racing text-xl font-bold text-muted-foreground w-6 text-center">
                {idx + 1}
              </div>
              <img
                src={player.avatarUrl}
                alt={player.name}
                className="w-10 h-10 rounded-full border-2 border-white/20"
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate text-sm">{player.name}</div>
                <div className="text-xs text-muted-foreground">{player.grade}</div>
              </div>
              <div className="text-right">
                <div className="font-racing text-sm text-primary">{Math.round(player.speed)}</div>
                <div className="text-[10px] text-muted-foreground">KM/H</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
