import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import pb from '@/lib/pocketbase/client'
import { useAuth } from '@/hooks/use-auth'
import { useRealtime } from '@/hooks/use-realtime'
import { TrackLane } from '@/components/TrackLane'
import { Button } from '@/components/ui/button'
import type { RecordModel } from 'pocketbase'
import {
  Play,
  Pause,
  Square,
  Plus,
  RotateCcw,
  Upload,
  Trash2,
  Copy,
  FileEdit,
  Users,
  Gift,
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const TOTAL_QUESTIONS = 30

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState('6º Ano')
  const [sessions, setSessions] = useState<RecordModel[]>([])
  const [players, setPlayers] = useState<RecordModel[]>([])

  const currentSession = sessions.find((s) => s.grade === activeTab)
  const [loading, setLoading] = useState(true)

  const [importJson, setImportJson] = useState('')
  const [isImporting, setIsImporting] = useState(false)
  const [importModalOpen, setImportModalOpen] = useState(false)
  const [manageModalOpen, setManageModalOpen] = useState(false)
  const [questionIdToDelete, setQuestionIdToDelete] = useState('')
  const [playerToDelete, setPlayerToDelete] = useState<any>(null)
  const [deleteAccountToo, setDeleteAccountToo] = useState(false)

  // Questions Management State
  const [questions, setQuestions] = useState<RecordModel[]>([])
  const [loadingQuestions, setLoadingQuestions] = useState(false)

  // Student Management State
  const [students, setStudents] = useState<RecordModel[]>([])
  const [loadingStudents, setLoadingStudents] = useState(false)
  const [studentsModalOpen, setStudentsModalOpen] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState<RecordModel | null>(null)

  // Prizes Management State
  const [prizesModalOpen, setPrizesModalOpen] = useState(false)
  const [prizes, setPrizes] = useState<RecordModel[]>([])
  const [newPrize, setNewPrize] = useState({
    name: '',
    global_threshold: 0,
    min_correct: 0,
    image_url: '',
    search: '',
  })

  useEffect(() => {
    if (!user || user.role !== 'teacher') {
      navigate('/login')
      return
    }
    loadSessions()
    loadQuestions()
  }, [user, navigate])

  useEffect(() => {
    if (currentSession) {
      loadPlayers(currentSession.id)
      loadPrizes(currentSession.id)
    } else {
      setPlayers([])
      setPrizes([])
    }
  }, [currentSession?.id])

  const loadQuestions = async () => {
    setLoadingQuestions(true)
    try {
      const records = await pb.collection('questions').getFullList({
        sort: 'external_id',
      })
      setQuestions(records)
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingQuestions(false)
    }
  }

  const loadSessions = async () => {
    try {
      const records = await pb.collection('game_sessions').getFullList({
        filter: `created_by="${user?.id}" && status!="finished"`,
        sort: '-created',
      })
      setSessions(records)
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

  const loadStudents = async () => {
    setLoadingStudents(true)
    try {
      const records = await pb.collection('users').getFullList({
        filter: 'role="student"',
        sort: '-created',
      })
      setStudents(records)
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingStudents(false)
    }
  }

  const loadPrizes = async (sessionId: string) => {
    try {
      const records = await pb.collection('session_prizes').getFullList({
        filter: `session_id="${sessionId}"`,
        expand: 'winner_id',
        sort: 'created',
      })
      setPrizes(records)
    } catch (e) {
      console.error(e)
    }
  }

  useRealtime(
    'player_progress',
    (e) => {
      if (currentSession && e.record.session_id === currentSession.id) {
        loadPlayers(currentSession.id)
      }
    },
    !!currentSession,
  )

  useRealtime(
    'session_prizes',
    (e) => {
      if (currentSession && e.record.session_id === currentSession.id) {
        loadPrizes(currentSession.id)
      }
    },
    !!currentSession,
  )

  useRealtime(
    'game_sessions',
    (e) => {
      if (e.record.created_by === user?.id) {
        setSessions((prev) => {
          if (e.action === 'delete' || e.record.status === 'finished') {
            return prev.filter((s) => s.id !== e.record.id)
          }
          const exists = prev.find((s) => s.id === e.record.id)
          if (exists) {
            return prev.map((s) => (s.id === e.record.id ? e.record : s))
          }
          return [...prev, e.record]
        })
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
            return { ...p, expand: { ...p.expand, user_id: e.record } }
          }
          return p
        }),
      )
      if (e.action === 'create' && e.record.role === 'student') {
        setStudents((prev) => [e.record, ...prev])
      } else if (e.action === 'update') {
        setStudents((prev) => prev.map((s) => (s.id === e.record.id ? e.record : s)))
      } else if (e.action === 'delete') {
        setStudents((prev) => prev.filter((s) => s.id !== e.record.id))
      }
    },
    !!user,
  )

  useRealtime(
    'questions',
    (e) => {
      if (e.action === 'create') {
        setQuestions((prev) =>
          [...prev, e.record].sort((a, b) => (a.external_id || 0) - (b.external_id || 0)),
        )
      } else if (e.action === 'update') {
        setQuestions((prev) => prev.map((q) => (q.id === e.record.id ? e.record : q)))
      } else if (e.action === 'delete') {
        setQuestions((prev) => prev.filter((q) => q.id !== e.record.id))
      }
    },
    !!user,
  )

  const handleImport = async () => {
    try {
      setIsImporting(true)
      const data = JSON.parse(importJson)

      let count = 0
      for (const item of data) {
        if (!item.pergunta || !item.alternativas || !item.resposta_correta) {
          throw new Error('O formato JSON não corresponde ao esperado.')
        }

        const correctIdx = item.alternativas.indexOf(item.resposta_correta)
        const correctLetter = ['A', 'B', 'C', 'D'][correctIdx] || 'A'

        await pb.collection('questions').create({
          external_id: item.id || null,
          theme: item.tema || '',
          statement: item.pergunta,
          option_a: item.alternativas[0] || '',
          option_b: item.alternativas[1] || '',
          option_c: item.alternativas[2] || '',
          option_d: item.alternativas[3] || '',
          correct_option: correctLetter,
          explanation: item.explicacao || '',
          difficulty: item.nivel || 'Médio',
        })
        count++
      }
      toast({ title: 'Sucesso!', description: `${count} questões importadas.` })
      setImportModalOpen(false)
      setImportJson('')
    } catch (e: any) {
      toast({
        title: 'Erro na importação',
        description: e.message || 'JSON inválido.',
        variant: 'destructive',
      })
    } finally {
      setIsImporting(false)
    }
  }

  const generatePrompt = () => {
    const prompt = `Gere um array JSON de questões de múltipla escolha para o quiz 'Corrida Maluca' seguindo exatamente este modelo:
[
  {
    "id": [proximo_numero],
    "tema": "Título do Tema",
    "pergunta": "Texto da pergunta?",
    "alternativas": ["Opção A", "Opção B", "Opção C", "Opção D"],
    "resposta_correta": "Texto exato da opção correta",
    "explicacao": "Explicação pedagógica da resposta",
    "nivel": "Fácil/Médio/Difícil"
  }
]
Regras: 
1. O campo 'id' deve ser sequencial.
2. O campo 'alternativas' deve ter exatamente 4 itens.
3. A 'resposta_correta' deve ser idêntica a uma das alternativas.`

    navigator.clipboard.writeText(prompt)
    toast({
      title: 'Prompt Copiado!',
      description: 'Cole o prompt no ChatGPT ou similar para gerar novas questões.',
    })
  }

  const handleDeleteQuestion = async () => {
    if (!questionIdToDelete) return
    try {
      const records = await pb.collection('questions').getList(1, 1, {
        filter: `external_id=${questionIdToDelete}`,
      })
      if (records.items.length === 0) throw new Error('Questão não encontrada com este ID.')

      await pb.collection('questions').delete(records.items[0].id)
      toast({ title: 'Sucesso', description: `Questão ID ${questionIdToDelete} foi excluída.` })
      setQuestionIdToDelete('')
    } catch (e: any) {
      toast({ title: 'Erro', description: e.message, variant: 'destructive' })
    }
  }

  const handleDeleteStudent = async () => {
    if (!studentToDelete) return
    try {
      const progresses = await pb.collection('player_progress').getFullList({
        filter: `user_id="${studentToDelete.id}"`,
      })
      for (const p of progresses) {
        await pb.collection('player_progress').delete(p.id)
      }

      await pb.collection('users').delete(studentToDelete.id)
      toast({ title: 'Aluno removido com sucesso' })
    } catch (e: any) {
      toast({ title: 'Falha ao deletar.', variant: 'destructive' })
    } finally {
      setStudentToDelete(null)
    }
  }

  const createSession = async () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    try {
      await pb.collection('game_sessions').create({
        code,
        status: 'lobby',
        created_by: user?.id,
        grade: activeTab,
      })
    } catch (e) {
      console.error(e)
    }
  }

  const updateSessionStatus = async (status: string) => {
    if (!currentSession) return
    try {
      await pb.collection('game_sessions').update(currentSession.id, { status })
    } catch (e) {
      console.error(e)
    }
  }

  const resetSession = async () => {
    if (!currentSession) return
    try {
      await pb.collection('game_sessions').update(currentSession.id, { status: 'lobby' })
      const promises = players.map((p) =>
        pb.collection('player_progress').update(p.id, {
          position_x: 0,
          score: 0,
          wrong_answers: 0,
          current_question_index: 0,
          status: 'idle',
        }),
      )
      // reset prizes
      for (const p of prizes) {
        if (p.claimed) {
          await pb.collection('session_prizes').update(p.id, { claimed: false, winner_id: null })
        }
      }
      await Promise.all(promises)
      toast({ title: 'Sessão reiniciada!', description: 'Todos voltaram ao início.' })
    } catch (e: any) {
      toast({ title: 'Erro', description: e.message, variant: 'destructive' })
    }
  }

  const handleDeletePlayer = async () => {
    if (!playerToDelete) return
    try {
      await pb.collection('player_progress').delete(playerToDelete.id)
      if (deleteAccountToo) {
        await pb.collection('users').delete(playerToDelete.user_id)
      }
      toast({ title: 'Aluno removido!' })
    } catch (e: any) {
      toast({ title: 'Erro', description: e.message, variant: 'destructive' })
    } finally {
      setPlayerToDelete(null)
      setDeleteAccountToo(false)
    }
  }

  const handleAddPrize = async () => {
    if (!newPrize.name || !newPrize.global_threshold || !currentSession) return
    try {
      const img =
        newPrize.image_url ||
        (newPrize.search
          ? `https://img.usecurling.com/p/200/200?q=${encodeURIComponent(newPrize.search)}&color=gradient`
          : '')
      await pb.collection('session_prizes').create({
        session_id: currentSession.id,
        name: newPrize.name,
        global_threshold: newPrize.global_threshold,
        min_correct: newPrize.min_correct,
        image_url: img,
        claimed: false,
      })
      setNewPrize({ name: '', global_threshold: 0, min_correct: 0, image_url: '', search: '' })
      toast({ title: 'Prêmio adicionado com sucesso!' })
    } catch (e: any) {
      toast({ title: 'Erro ao adicionar prêmio', description: e.message, variant: 'destructive' })
    }
  }

  const formattedPlayers = players.map((p) => {
    const u = p.expand?.user_id
    return {
      id: p.id,
      user_id: p.user_id,
      name: u?.nickname || u?.name || 'Piloto',
      grade: u?.grade || '',
      carColor: p.car_color || 'hsl(188, 100%, 50%)',
      avatarUrl: u?.avatar ? pb.files.getURL(u, u.avatar) : p.avatar_url || '',
      progress: p.position_x || 0,
      score: p.score || 0,
      wrong_answers: p.wrong_answers || 0,
      status: (p.status || 'idle') as 'idle' | 'boost' | 'penalty',
    }
  })

  const sortedPlayers = [...formattedPlayers].sort((a, b) => b.progress - a.progress)

  if (loading) return <div className="p-8 text-center font-racing">Carregando Painel...</div>

  return (
    <>
      <div className="w-full max-w-5xl mx-auto px-4 mt-4">
        <div className="flex gap-2 p-1 bg-black/20 rounded-xl overflow-x-auto">
          {['6º Ano', '7º Ano', '8º Ano', '9º Ano'].map((g) => (
            <button
              key={g}
              onClick={() => setActiveTab(g)}
              className={`flex-1 py-3 px-6 rounded-lg font-racing text-lg transition-all whitespace-nowrap ${
                activeTab === g
                  ? 'bg-primary text-black shadow-[0_0_15px_rgba(255,215,0,0.4)]'
                  : 'text-muted-foreground hover:bg-white/10 hover:text-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {!currentSession ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4">
          <div className="glass-panel p-8 text-center space-y-6 rounded-2xl max-w-md w-full animate-fade-in-up">
            <h2 className="font-racing text-3xl text-primary">Corrida: {activeTab}</h2>
            <p className="text-muted-foreground">Nenhuma corrida ativa para o {activeTab}.</p>
            <Button
              onClick={createSession}
              className="w-full bg-primary text-black font-racing text-lg h-14 hover:bg-primary/80 transition-all"
            >
              <Plus className="mr-2" /> Iniciar Corrida
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up delay-100 mt-4 max-w-2xl w-full">
            <Button
              onClick={() => {
                setStudentsModalOpen(true)
                loadStudents()
              }}
              variant="outline"
              className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20 flex-1 min-w-[160px]"
            >
              <Users className="w-4 h-4 mr-2" /> Gerenciar Alunos
            </Button>
            <Button
              onClick={() => setManageModalOpen(true)}
              variant="outline"
              className="bg-orange-500/10 text-orange-400 border-orange-500/30 hover:bg-orange-500/20 flex-1 min-w-[160px]"
            >
              <FileEdit className="w-4 h-4 mr-2" /> Gerenciar Questões
            </Button>
            <Button
              onClick={() => setImportModalOpen(true)}
              variant="outline"
              className="bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20 flex-1 min-w-[160px]"
            >
              <Upload className="w-4 h-4 mr-2" /> Importar Questões
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-hidden h-full">
          <div className="flex-1 glass-panel rounded-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20 flex-wrap gap-4">
              <h2 className="font-racing text-xl md:text-2xl flex items-center gap-2">
                <span
                  className={`animate-pulse ${currentSession.status === 'active' ? 'text-green-500' : currentSession.status === 'paused' ? 'text-yellow-500' : 'text-blue-500'}`}
                >
                  ●
                </span>
                {currentSession.status.toUpperCase()}
              </h2>
              <div className="flex flex-wrap gap-2">
                {currentSession.status === 'lobby' || currentSession.status === 'paused' ? (
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

                <Button
                  onClick={() => setPrizesModalOpen(true)}
                  variant="outline"
                  size="sm"
                  className="bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 border-pink-500/50"
                >
                  <Gift className="w-4 h-4 mr-2" /> Prêmios
                </Button>

                <Button
                  onClick={() => {
                    setStudentsModalOpen(true)
                    loadStudents()
                  }}
                  variant="outline"
                  size="sm"
                  className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border-cyan-500/50 hidden md:flex"
                >
                  <Users className="w-4 h-4 mr-2" /> Alunos
                </Button>

                <Button
                  onClick={() => setManageModalOpen(true)}
                  variant="outline"
                  size="sm"
                  className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border-orange-500/50 hidden lg:flex"
                >
                  <FileEdit className="w-4 h-4 mr-2" /> Questões
                </Button>
              </div>
              <div className="font-racing text-sm text-muted-foreground">
                CÓDIGO:{' '}
                <span className="text-white text-2xl tracking-widest bg-black/40 px-3 py-1 rounded border border-white/20 ml-2">
                  {currentSession.code}
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-hide py-4 bg-black/10">
              <div className="transform scale-[0.70] origin-top-left w-[142.8%]">
                {formattedPlayers.map((player) => (
                  <TrackLane key={player.id} player={player} totalQuestions={TOTAL_QUESTIONS} />
                ))}
                {formattedPlayers.length === 0 && (
                  <div className="flex flex-col items-center justify-center text-muted-foreground font-racing p-10 text-center space-y-4">
                    <div className="text-5xl animate-bounce">🏎️</div>
                    <div className="text-xl">Aguardando pilotos entrarem com o código...</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:w-80 glass-panel rounded-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-black/20 text-center">
              <h2 className="font-racing text-lg text-warning tracking-widest">🏆 CLASSIFICAÇÃO</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {sortedPlayers.map((player, idx) => (
                <div
                  key={player.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${idx === 0 && player.progress > 0 ? 'bg-warning/20 border-warning shadow-[0_0_10px_rgba(255,165,0,0.4)]' : 'bg-black/30 border-white/10'}`}
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
                    <div className="font-bold truncate text-sm font-racing tracking-wide">
                      {player.name}
                    </div>
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
                      className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/20"
                      onClick={() => setPlayerToDelete(player)}
                      title="Remover Aluno"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Prizes Modal */}
      <Dialog open={prizesModalOpen} onOpenChange={setPrizesModalOpen}>
        <DialogContent className="glass-panel border-white/10 text-white sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-racing text-xl text-primary flex items-center gap-2">
              <Gift className="w-5 h-5" /> Configurar Prêmios (Metas Dinâmicas)
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="bg-black/30 p-4 rounded-xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label>Nome do Prêmio</Label>
                <Input
                  className="bg-black/50 border-white/20"
                  value={newPrize.name}
                  onChange={(e) => setNewPrize({ ...newPrize, name: e.target.value })}
                  placeholder="Ex: Caixa de Bis"
                />
              </div>
              <div>
                <Label>Meta Global (Soma de todos os passos)</Label>
                <Input
                  type="number"
                  className="bg-black/50 border-white/20"
                  value={newPrize.global_threshold}
                  onChange={(e) =>
                    setNewPrize({ ...newPrize, global_threshold: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div>
                <Label>Acertos Individuais Mínimos (Para ganhar)</Label>
                <Input
                  type="number"
                  className="bg-black/50 border-white/20"
                  value={newPrize.min_correct}
                  onChange={(e) =>
                    setNewPrize({ ...newPrize, min_correct: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <Label>Imagem do Prêmio (Busca de Fotos)</Label>
                <div className="flex gap-2">
                  <Input
                    className="bg-black/50 border-white/20"
                    value={newPrize.search}
                    onChange={(e) => setNewPrize({ ...newPrize, search: e.target.value })}
                    placeholder="Ex: chocolate"
                  />
                  <Button
                    variant="outline"
                    className="text-black bg-white"
                    onClick={() =>
                      setNewPrize({
                        ...newPrize,
                        image_url: `https://img.usecurling.com/p/200/200?q=${encodeURIComponent(newPrize.search)}&color=gradient`,
                      })
                    }
                  >
                    Buscar
                  </Button>
                </div>
              </div>
              {newPrize.image_url && (
                <div className="md:col-span-2 flex justify-center p-2 bg-white/5 rounded-lg">
                  <img
                    src={newPrize.image_url}
                    alt="Preview"
                    className="h-24 w-24 object-contain rounded-lg shadow-lg"
                  />
                </div>
              )}
              <Button
                onClick={handleAddPrize}
                className="md:col-span-2 bg-primary text-black font-bold h-12 text-lg hover:bg-primary/80"
              >
                Adicionar Prêmio à Corrida
              </Button>
            </div>

            <div className="max-h-64 overflow-y-auto mt-4 rounded-xl border border-white/10">
              <Table>
                <TableHeader className="bg-black/50 sticky top-0">
                  <TableRow className="border-b border-white/10 hover:bg-transparent">
                    <TableHead className="font-racing text-primary">Prêmio</TableHead>
                    <TableHead className="font-racing text-primary">Meta</TableHead>
                    <TableHead className="font-racing text-primary">Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prizes.map((p) => (
                    <TableRow key={p.id} className="border-b border-white/10 hover:bg-white/5">
                      <TableCell className="font-bold flex items-center gap-2">
                        {p.image_url && <img src={p.image_url} className="w-8 h-8 rounded-md" />}
                        {p.name}
                      </TableCell>
                      <TableCell className="text-xs">
                        Global: {p.global_threshold} | Ind: {p.min_correct}
                      </TableCell>
                      <TableCell>
                        {p.claimed ? (
                          <span className="text-green-400 font-bold text-xs bg-green-500/20 px-2 py-1 rounded">
                            Resgatado:{' '}
                            {p.expand?.winner_id?.name || p.expand?.winner_id?.nickname || 'Aluno'}
                          </span>
                        ) : (
                          <span className="text-yellow-400 font-bold text-xs">Na Pista</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => pb.collection('session_prizes').delete(p.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {prizes.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        Nenhum prêmio configurado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manage Students Dialog */}
      <Dialog open={studentsModalOpen} onOpenChange={setStudentsModalOpen}>
        <DialogContent className="glass-panel border-white/10 text-white sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-racing text-xl text-primary flex items-center gap-2">
              <Users className="w-5 h-5" /> Gerenciar Alunos
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[60vh] py-4 pr-2">
            {loadingStudents ? (
              <div className="text-center py-8 text-muted-foreground">Carregando...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-primary font-racing">Nome</TableHead>
                    <TableHead className="text-primary font-racing">Apelido</TableHead>
                    <TableHead className="text-primary font-racing">Série/Ano</TableHead>
                    <TableHead className="text-right text-primary font-racing">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-medium">{student.name || 'Sem Nome'}</TableCell>
                      <TableCell>{student.nickname || '-'}</TableCell>
                      <TableCell>{student.grade || '-'}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                          onClick={() => setStudentToDelete(student)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Student Confirmation */}
      <AlertDialog
        open={!!studentToDelete}
        onOpenChange={(open) => !open && setStudentToDelete(null)}
      >
        <AlertDialogContent className="glass-panel border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-racing text-xl text-primary">
              Remover Aluno
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Isso apagará permanentemente o aluno e seu progresso.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/20 hover:bg-white/10 text-white">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteStudent}
              className="bg-destructive hover:bg-destructive/80 text-white"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Remove Player from Session Dialog */}
      <AlertDialog
        open={!!playerToDelete}
        onOpenChange={(open) => !open && setPlayerToDelete(null)}
      >
        <AlertDialogContent className="glass-panel border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-racing text-xl text-primary">
              Remover Aluno da Corrida
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Deseja remover <strong>{playerToDelete?.name}</strong> desta corrida?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center space-x-2 py-4">
            <Checkbox
              id="delete-account"
              checked={deleteAccountToo}
              onCheckedChange={(c) => setDeleteAccountToo(!!c)}
              className="border-white/50"
            />
            <Label htmlFor="delete-account" className="text-sm cursor-pointer">
              Também excluir conta permanentemente
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

      {/* Manage Questions Dialog */}
      <Dialog open={manageModalOpen} onOpenChange={setManageModalOpen}>
        <DialogContent className="glass-panel border-white/10 text-white sm:max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="font-racing text-xl text-primary">
              Gerenciar Questões ({questions.length})
            </DialogTitle>
          </DialogHeader>
          <div className="flex gap-2 items-end shrink-0 mt-2">
            <div className="flex-1">
              <Label>Excluir Questão por ID</Label>
              <Input
                type="number"
                className="bg-black/50 border-white/20 mt-1"
                value={questionIdToDelete}
                onChange={(e) => setQuestionIdToDelete(e.target.value)}
              />
            </div>
            <Button
              variant="destructive"
              onClick={handleDeleteQuestion}
              disabled={!questionIdToDelete}
            >
              Excluir
            </Button>
          </div>
          <div className="flex-1 overflow-auto mt-4 border border-white/10 rounded-md">
            <Table>
              <TableHeader className="sticky top-0 bg-black/80 backdrop-blur z-10 border-b border-white/10">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="w-16 font-racing text-primary">ID</TableHead>
                  <TableHead className="font-racing text-primary">Pergunta</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {questions.map((q) => (
                  <TableRow
                    key={q.id}
                    className="border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <TableCell className="font-mono text-muted-foreground text-xs">
                      {q.external_id}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-xs" title={q.statement}>
                      {q.statement}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Import Questions Dialog */}
      <Dialog open={importModalOpen} onOpenChange={setImportModalOpen}>
        <DialogContent className="glass-panel border-white/10 text-white sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-racing text-xl text-primary flex justify-between items-center mr-6">
              Importar Questões (JSON)
              <Button
                size="sm"
                variant="secondary"
                onClick={generatePrompt}
                className="text-xs font-sans font-bold"
              >
                <Copy className="w-3 h-3 mr-2" /> Prompt IA
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder='[{"id": 1, "tema": "Matemática", "pergunta": "..."}]'
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
    </>
  )
}

export default Dashboard
