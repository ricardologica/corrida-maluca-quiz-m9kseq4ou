import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import pb from '@/lib/pocketbase/client'
import { useAuth } from '@/hooks/use-auth'
import { useRealtime } from '@/hooks/use-realtime'
import { TrackLane } from '@/components/TrackLane'
import { Button } from '@/components/ui/button'
import type { RecordModel } from 'pocketbase'
import { Play, Pause, Square, Plus, RotateCcw, Upload, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { z } from 'zod'

const TOTAL_QUESTIONS = 30

const questionSchema = z.object({
  statement: z.string(),
  option_a: z.string(),
  option_b: z.string(),
  option_c: z.string(),
  option_d: z.string(),
  correct_option: z.enum(['A', 'B', 'C', 'D']),
  explanation: z.string().optional(),
  theme: z.string().optional(),
  difficulty: z.string().optional(),
  suggested_grade: z.string().optional(),
})
const importSchema = z.array(questionSchema)

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const { toast } = useToast()
  const [session, setSession] = useState<RecordModel | null>(null)
  const [players, setPlayers] = useState<RecordModel[]>([])
  const [loading, setLoading] = useState(true)

  const [importJson, setImportJson] = useState('')
  const [isImporting, setIsImporting] = useState(false)
  const [importModalOpen, setImportModalOpen] = useState(false)
  const [playerToDelete, setPlayerToDelete] = useState<any>(null)
  const [deleteAccountToo, setDeleteAccountToo] = useState(false)

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

  useRealtime(
    'users',
    (e) => {
      setPlayers((prev) =>
        prev.map((p) => {
          if (p.user_id === e.record.id) {
            return {
              ...p,
              expand: {
                ...p.expand,
                user_id: e.record,
              },
            }
          }
          return p
        }),
      )
    },
    !!session,
  )

  const handleImport = async () => {
    try {
      setIsImporting(true)
      const data = JSON.parse(importJson)
      const parsed = importSchema.parse(data)

      let count = 0
      for (const q of parsed) {
        await pb.collection('questions').create(q)
        count++
      }
      toast({ title: 'Sucesso!', description: `${count} questões importadas.` })
      setImportModalOpen(false)
      setImportJson('')
    } catch (e: any) {
      toast({
        title: 'Erro na importação',
        description: e.errors ? 'JSON inválido (verifique os campos).' : e.message,
        variant: 'destructive',
      })
    } finally {
      setIsImporting(false)
    }
  }

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

  const resetSession = async () => {
    if (!session) return
    try {
      await pb.collection('game_sessions').update(session.id, { status: 'lobby' })
      const promises = players.map((p) =>
        pb.collection('player_progress').update(p.id, {
          position_x: 0,
          score: 0,
          wrong_answers: 0,
          current_question_index: 0,
          status: 'idle',
        }),
      )
      await Promise.all(promises)
      toast({ title: 'Sessão reiniciada!', description: 'Todos os alunos voltaram ao início.' })
    } catch (e: any) {
      toast({ title: 'Erro ao reiniciar', description: e.message, variant: 'destructive' })
    }
  }

  const handleDeletePlayer = async () => {
    if (!playerToDelete) return
    try {
      await pb.collection('player_progress').delete(playerToDelete.id)
      if (deleteAccountToo) {
        await pb.collection('users').delete(playerToDelete.user_id)
      }
      toast({ title: 'Aluno removido com sucesso!' })
    } catch (e: any) {
      toast({ title: 'Erro ao remover aluno', description: e.message, variant: 'destructive' })
    } finally {
      setPlayerToDelete(null)
      setDeleteAccountToo(false)
    }
  }

  const formattedPlayers = players.map((p) => {
    const user = p.expand?.user_id
    return {
      id: p.id,
      user_id: p.user_id,
      name: user?.name || 'Unknown',
      grade: user?.grade || '',
      carColor: p.car_color || 'hsl(188, 100%, 50%)',
      avatarUrl: user?.avatar ? pb.files.getURL(user, user.avatar) : p.avatar_url || '',
      progress: p.position_x || 0,
      score: p.score || 0,
      wrong_answers: p.wrong_answers || 0,
      status: (p.status || 'idle') as 'idle' | 'boost' | 'penalty',
    }
  })

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
            <Button
              onClick={resetSession}
              variant="outline"
              size="sm"
              className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-blue-500/50"
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Resetar
            </Button>

            <Dialog open={importModalOpen} onOpenChange={setImportModalOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border-purple-500/50"
                >
                  <Upload className="w-4 h-4 mr-2" /> Importar Questões
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-panel border-white/10 text-white sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="font-racing text-xl text-primary">
                    Importar Questões (JSON)
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Textarea
                    placeholder='[{"statement": "...", "option_a": "...", "correct_option": "A"}]'
                    className="min-h-[300px] bg-black/50 border-white/20 font-mono text-xs text-white"
                    value={importJson}
                    onChange={(e) => setImportJson(e.target.value)}
                  />
                  <Button
                    onClick={handleImport}
                    disabled={isImporting || !importJson.trim()}
                    className="w-full bg-primary hover:bg-primary/80 text-black font-bold font-racing"
                  >
                    {isImporting ? 'Importando...' : 'Confirmar Importação'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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
              <div className="text-right flex items-center gap-3">
                <div className="font-racing text-sm text-primary">
                  {Math.round((player.progress / TOTAL_QUESTIONS) * 100)}%
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  onClick={() => setPlayerToDelete(player)}
                  title="Remover Aluno"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
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

      <AlertDialog
        open={!!playerToDelete}
        onOpenChange={(open) => !open && setPlayerToDelete(null)}
      >
        <AlertDialogContent className="glass-panel border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-racing text-xl text-primary">
              Remover Aluno
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Tem certeza que deseja remover <strong>{playerToDelete?.name}</strong> da corrida
              atual?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex items-center space-x-2 py-4">
            <Checkbox
              id="delete-account"
              checked={deleteAccountToo}
              onCheckedChange={(c) => setDeleteAccountToo(!!c)}
              className="border-white/50 data-[state=checked]:bg-destructive data-[state=checked]:border-destructive"
            />
            <Label htmlFor="delete-account" className="text-sm cursor-pointer">
              Também excluir a conta deste aluno permanentemente
            </Label>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/20 hover:bg-white/10 text-white">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePlayer}
              className="bg-destructive hover:bg-destructive/80 text-white"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
export default Dashboard
