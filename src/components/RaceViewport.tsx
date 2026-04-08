import { useEffect, useState, useMemo, useCallback } from 'react'
import pb from '@/lib/pocketbase/client'
import { useRealtime } from '@/hooks/use-realtime'
import { RunnerIcon } from './RunnerIcon'

interface RaceViewportProps {
  sessionId: string
  currentUserId: string
}

export function RaceViewport({ sessionId, currentUserId }: RaceViewportProps) {
  const [players, setPlayers] = useState<any[]>([])

  const fetchPlayers = useCallback(async () => {
    try {
      const data = await pb.collection('player_progress').getFullList({
        filter: `session_id="${sessionId}"`,
        expand: 'user_id',
        sort: '-position_x,updated',
      })
      setPlayers(data)
    } catch (e) {
      console.error(e)
    }
  }, [sessionId])

  useEffect(() => {
    fetchPlayers()
  }, [fetchPlayers])

  useRealtime('player_progress', (e) => {
    if (e.record.session_id === sessionId) {
      setPlayers((prev) => {
        const exists = prev.find((p) => p.id === e.record.id)
        if (exists) {
          return prev.map((p) =>
            p.id === e.record.id ? { ...p, ...e.record, expand: exists.expand } : p,
          )
        } else {
          fetchPlayers()
          return prev
        }
      })
    }
  })

  const { viewportPlayers, trackRange } = useMemo(() => {
    const sorted = [...players].sort(
      (a, b) =>
        b.position_x - a.position_x ||
        new Date(a.updated).getTime() - new Date(b.updated).getTime(),
    )
    const myIdx = sorted.findIndex((p) => p.user_id === currentUserId)
    if (myIdx === -1) return { viewportPlayers: [], trackRange: [0, 5] }

    const startIdx = Math.max(0, myIdx - 2)
    const endIdx = Math.min(sorted.length - 1, myIdx + 2)
    const visible = sorted.slice(startIdx, endIdx + 1)

    const myPos = sorted[myIdx].position_x
    const minPos = Math.max(0, myPos - 3)
    const maxPos = Math.max(6, minPos + 6)

    return { viewportPlayers: visible, trackRange: [minPos, maxPos] }
  }, [players, currentUserId])

  return (
    <div className="w-full h-[20vh] min-h-[140px] relative overflow-hidden bg-gradient-to-b from-black/80 to-black/40 border-b-2 border-dashed border-white/20 shadow-lg">
      <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/200/200?q=asphalt&color=black')] opacity-30 animate-track" />

      {trackRange[1] >= 30 && (
        <div
          className="absolute right-0 top-0 bottom-0 w-8 bg-[url('https://img.usecurling.com/p/100/100?q=checkerboard')] opacity-50 z-0 transition-all duration-1000"
          style={{
            right: `calc(${100 - ((30 - trackRange[0]) / (trackRange[1] - trackRange[0])) * 100}%)`,
          }}
        />
      )}

      {viewportPlayers.map((p) => {
        let pct = ((p.position_x - trackRange[0]) / (trackRange[1] - trackRange[0])) * 100
        pct = Math.max(8, Math.min(92, pct))
        const isMe = p.user_id === currentUserId

        let avatarSrc = p.avatar_url
        if (p.expand?.user_id?.avatar) {
          avatarSrc = pb.files.getURL(p.expand.user_id, p.expand.user_id.avatar)
        } else if (avatarSrc && !avatarSrc.startsWith('http') && !avatarSrc.startsWith('data:')) {
          if (p.user_id) {
            const mockRecord = { collectionId: 'users', id: p.user_id } as any
            avatarSrc = pb.files.getURL(mockRecord, avatarSrc)
          } else {
            avatarSrc = ''
          }
        }

        const name = p.expand?.user_id?.nickname || p.expand?.user_id?.name || 'Piloto'

        return (
          <div
            key={p.id}
            className="absolute bottom-6 -translate-x-1/2 transition-all duration-1000 ease-in-out z-10 flex flex-col items-center"
            style={{ left: `${pct}%`, zIndex: isMe ? 20 : 10 }}
          >
            {isMe && (
              <div className="text-[10px] md:text-xs font-racing text-primary mb-1 animate-pulse">
                VOCÊ
              </div>
            )}
            <RunnerIcon color={p.car_color} avatarUrl={avatarSrc} status={p.status} isMe={isMe} />
            <div className="mt-2 text-[9px] md:text-[10px] font-racing bg-black/80 px-1.5 py-0.5 rounded truncate max-w-[60px] md:max-w-[80px] border border-white/10 shadow-lg uppercase">
              {name}
            </div>
          </div>
        )
      })}
    </div>
  )
}
