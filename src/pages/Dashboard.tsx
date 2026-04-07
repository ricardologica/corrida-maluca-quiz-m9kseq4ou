import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import pb from '@/lib/pocketbase/client'
import { useAuth } from '@/hooks/use-auth'
import { useRealtime } from '@/hooks/use-realtime'
import { TrackLane } from '@/components/TrackLane'
import { Button } from '@/components/ui/button'
import type { RecordModel } from 'pocketbase'
import { Play, Pause, Square, Plus } from 'lucide-react'

const TOTAL_QUESTIONS = 30

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [session, setSession] = useState<RecordModel | null>(null)
  const [players, setPlayers] = useState<RecordModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user || user.role !== 'teacher') {
      navigate('/login')
      return
    }
    loadSession()
  }, [user, navigate])

  const loadSession = async () => {
    try {
      const records = await pb.collection('game_sessions').getList(1, 1, {
        filter: `created_by="${user?.id}" && status!="finished"`,
        sort: '-created',
      })
      if (records.items.length > 0) {
        setSession(records.items[0])
        loadPlayers(records.items[0].id)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const loadPlayers = async (sessionId: string) => {
    try {
      const records = await pb.collection('player_progress').getFullList({
        filter: `session_id="${sessionId}"`,
        expand: 'user_id',
        sort: '-position_x,updated',
      })
      setPlayers(records)
    } catch (e) {
      console.error(e)
    }
  }

  useRealtime(
    'player_progress',
    (e) => {
      if (session && e.record.session_id === session.id) {
        loadPlayers(session.id)
      }
    },
    !!session,
  )

  useRealtime(
    'game_sessions',
    (e) => {
      if (e.record.created_by === user?.id) {
        if (e.record.status === 'finished') {
          setSession(null)
          setPlayers([])
        } else {
          setSession(e.record)
        }
      }
    },
    !!user,
  )

  const createSession = async () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    try {
      const newSession = await pb.collection('game_sessions').create({
        code,
        status: 'lobby',
        created_by: user?.id,
      })
      setSession(newSession)
      setPlayers([])
    } catch (e) {
      console.error(e)
    }
  }

  const updateSessionStatus = async (status: string) => {
    if (!session) return
    try {
      await pb.collection('game_sessions').update(session.id, { status })
    } catch (e) {
      console.error(e)
    }
  }

  const formattedPlayers = players.map((p) => ({
    id: p.id,
    name: p.expand?.user_id?.name || 'Unknown',
    grade: p.expand?.user_id?.grade || '',
    carColor: p.car_color || 'hsl(188, 100%, 50%)',
    avatarUrl: p.avatar_url || '',
    progress: p.position_x || 0,
    score: p.score || 0,
    wrong_answers: p.wrong_answers || 0,
    status: (p.status || 'idle') as 'idle' | 'boost' | 'penalty',
  }))

  const sortedPlayers = [...formattedPlayers].sort((a, b) => b.progress - a.progress)

  if (loading) return <div className="p-8 text-center font-racing">Carregando Painel...</div>

  if (!session) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="glass-panel p-8 text-center space-y-6 rounded-2xl max-w-md w-full animate-fade-in-up">
          <h2 className="font-racing text-3xl text-primary">Painel do Professor</h2>
          <p className="text-muted-foreground">
            Nenhuma corrida ativa no momento. Inicie uma nova para seus alunos entrarem.
          </p>
          <Button
            onClick={createSession}
            className="w-full bg-primary text-black font-racing text-lg h-14 hover:bg-primary/80 transition-all"
          >
            <Plus className="mr-2" /> Criar Nova Corrida
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-hidden h-full">
      <div className="flex-1 glass-panel rounded-2xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40 flex-wrap gap-4">
          <h2 className="font-racing text-xl md:text-2xl flex items-center gap-2">
            <span
              className={`animate-pulse ${session.status === 'active' ? 'text-green-500' : session.status === 'paused' ? 'text-yellow-500' : 'text-blue-500'}`}
            >
              ●
            </span>
            {session.status.toUpperCase()}
          </h2>
          <div className="flex gap-2">
            {session.status === 'lobby' || session.status === 'paused' ? (
              <Button
                onClick={() => updateSessionStatus('active')}
                variant="outline"
                size="sm"
                className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-green-500/50"
              >
                <Play className="w-4 h-4 mr-2" /> Iniciar
              </Button>
            ) : (
              <Button
                onClick={() => updateSessionStatus('paused')}
                variant="outline"
                size="sm"
                className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border-yellow-500/50"
              >
                <Pause className="w-4 h-4 mr-2" /> Pausar
              </Button>
            )}
            <Button
              onClick={() => updateSessionStatus('finished')}
              variant="outline"
              size="sm"
              className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/50"
            >
              <Square className="w-4 h-4 mr-2" /> Encerrar
            </Button>
          </div>
          <div className="font-racing text-sm text-muted-foreground">
            CÓDIGO:{' '}
            <span className="text-white text-2xl tracking-widest bg-black/50 px-3 py-1 rounded border border-white/20 ml-2">
              {session.code}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide py-4">
          {formattedPlayers.map((player) => (
            <TrackLane key={player.id} player={player} totalQuestions={TOTAL_QUESTIONS} />
          ))}
          {formattedPlayers.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground font-racing p-4 text-center space-y-4">
              <div className="text-5xl animate-bounce">🏎️</div>
              <div className="text-xl">Peça aos alunos para entrarem com o código:</div>
              <div className="text-5xl text-primary tracking-widest">{session.code}</div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-80 glass-panel rounded-2xl flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/10 bg-black/40 text-center">
          <h2 className="font-racing text-lg text-warning tracking-widest">🏆 CLASSIFICAÇÃO</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {sortedPlayers.map((player, idx) => (
            <div
              key={player.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${idx === 0 && player.progress > 0 ? 'bg-warning/10 border-warning shadow-[0_0_10px_rgba(254,228,64,0.2)]' : 'bg-black/30 border-white/5'}`}
            >
              <div className="font-racing text-xl font-bold text-muted-foreground w-6 text-center">
                {idx + 1}
              </div>
              <img
                src={player.avatarUrl}
                alt={player.name}
                className="w-10 h-10 rounded-full border-2 border-white/20 object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate text-sm">{player.name}</div>
                <div className="text-xs text-muted-foreground">{player.grade}</div>
                <div className="flex gap-2 text-[10px] mt-1 font-bold">
                  <span className="text-accent">{player.score} ACERTOS</span>
                  <span className="text-destructive">{player.wrong_answers} ERROS</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-racing text-sm text-primary">
                  {Math.round((player.progress / TOTAL_QUESTIONS) * 100)}%
                </div>
              </div>
            </div>
          ))}
          {sortedPlayers.length === 0 && (
            <div className="text-center text-sm text-muted-foreground mt-10">
              Nenhum piloto na pista.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Dashboard
