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
  const [session, setSession] = useState<RecordModel | null>(null)
  const [players, setPlayers] = useState<RecordModel[]>([])
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

  useEffect(() => {
    if (!user || user.role !== 'teacher') {
      navigate('/login')
      return
    }
    loadSession()
    loadQuestions()
  }, [user, navigate])

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
      // Update session players
      setPlayers((prev) =>
        prev.map((p) => {
          if (p.user_id === e.record.id) {
            return { ...p, expand: { ...p.expand, user_id: e.record } }
          }
          return p
        }),
      )
      // Update global students list
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
      await pb.collection('users').delete(studentToDelete.id)
      toast({ title: 'Sucesso', description: 'Aluno excluído permanentemente.' })
    } catch (e: any) {
      toast({ title: 'Erro ao excluir aluno', description: e.message, variant: 'destructive' })
    } finally {
      setStudentToDelete(null)
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
    const u = p.expand?.user_id
    return {
      id: p.id,
      user_id: p.user_id,
      name: u?.nickname || u?.name || 'Unknown',
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
      {!session ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4">
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
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40 flex-wrap gap-4">
              <h2 className="font-racing text-xl md:text-2xl flex items-center gap-2">
                <span
                  className={`animate-pulse ${session.status === 'active' ? 'text-green-500' : session.status === 'paused' ? 'text-yellow-500' : 'text-blue-500'}`}
                >
                  ●
                </span>
                {session.status.toUpperCase()}
              </h2>
              <div className="flex flex-wrap gap-2">
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

                <Button
                  onClick={() => {
                    setStudentsModalOpen(true)
                    loadStudents()
                  }}
                  variant="outline"
                  size="sm"
                  className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 border-cyan-500/50"
                >
                  <Users className="w-4 h-4 mr-2" /> Alunos
                </Button>

                <Button
                  onClick={() => setManageModalOpen(true)}
                  variant="outline"
                  size="sm"
                  className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border-orange-500/50"
                >
                  <FileEdit className="w-4 h-4 mr-2" /> Gerenciar
                </Button>

                <Button
                  onClick={() => setImportModalOpen(true)}
                  variant="outline"
                  size="sm"
                  className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border-purple-500/50"
                >
                  <Upload className="w-4 h-4 mr-2" /> Importar
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
        </div>
      )}

      {/* -- Dialogs -- */}

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
              <div className="text-center py-8 text-muted-foreground">Carregando alunos...</div>
            ) : students.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum aluno encontrado no sistema.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-primary font-racing">Nome</TableHead>
                    <TableHead className="text-primary font-racing">Apelido</TableHead>
                    <TableHead className="text-primary font-racing">Celular</TableHead>
                    <TableHead className="text-primary font-racing">Série/Ano</TableHead>
                    <TableHead className="text-right text-primary font-racing">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow
                      key={student.id}
                      className="border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <TableCell className="font-medium">{student.name || 'Sem Nome'}</TableCell>
                      <TableCell>{student.nickname || '-'}</TableCell>
                      <TableCell>{student.phone || '-'}</TableCell>
                      <TableCell>{student.grade || '-'}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                          onClick={() => setStudentToDelete(student)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir
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
              Tem certeza que deseja excluir este jogador? Esta ação removerá permanentemente o
              aluno e todo o seu histórico de progresso.
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

      {/* Manage Questions Dialog */}
      <Dialog open={manageModalOpen} onOpenChange={setManageModalOpen}>
        <DialogContent className="glass-panel border-white/10 text-white sm:max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="font-racing text-xl text-primary flex items-center justify-between">
              <span>Gerenciar Questões ({questions.length})</span>
            </DialogTitle>
          </DialogHeader>

          <div className="flex gap-2 items-end shrink-0 mt-2">
            <div className="flex-1">
              <Label>Excluir Questão por ID</Label>
              <Input
                placeholder="Ex: 15"
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
            {loadingQuestions ? (
              <div className="p-8 text-center text-muted-foreground font-racing">
                Carregando questões...
              </div>
            ) : questions.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground font-racing">
                Nenhuma questão encontrada.
              </div>
            ) : (
              <Table>
                <TableHeader className="sticky top-0 bg-black/80 backdrop-blur z-10 border-b border-white/10">
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="w-16 font-racing text-primary">ID</TableHead>
                    <TableHead className="w-32 font-racing text-primary">Série</TableHead>
                    <TableHead className="w-32 font-racing text-primary">Tema</TableHead>
                    <TableHead className="font-racing text-primary">Pergunta</TableHead>
                    <TableHead className="w-24 font-racing text-primary">Nível</TableHead>
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
                      <TableCell className="text-xs">{q.suggested_grade}</TableCell>
                      <TableCell className="text-xs">{q.theme}</TableCell>
                      <TableCell className="max-w-[200px] truncate text-xs" title={q.statement}>
                        {q.statement}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-[10px] font-bold ${
                            q.difficulty === 'Fácil'
                              ? 'bg-green-500/20 text-green-400'
                              : q.difficulty === 'Médio'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {q.difficulty}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
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
                <Copy className="w-3 h-3 mr-2" /> Gerar Prompt p/ IA
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder='[{"id": 1, "tema": "Matemática", "pergunta": "...", "alternativas": ["1","2","3","4"], "resposta_correta": "2"}]'
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
    </>
  )
}

export default Dashboard
