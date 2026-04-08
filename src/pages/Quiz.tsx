import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '@/stores/main'
import pb from '@/lib/pocketbase/client'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RaceViewport } from '@/components/RaceViewport'
import type { RecordModel } from 'pocketbase'
import { useRealtime } from '@/hooks/use-realtime'
import { Loader2 } from 'lucide-react'

const TOTAL_QUESTIONS = 30

const Quiz = () => {
  const navigate = useNavigate()
  const { currentSessionId, currentProgressId, setSession } = useGameStore()

  const [questions, setQuestions] = useState<RecordModel[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [penaltyTime, setPenaltyTime] = useState(0)
  const [progressData, setProgressData] = useState<RecordModel | null>(null)
  const [sessionStatus, setSessionStatus] = useState('active')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeoutReached, setTimeoutReached] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!currentSessionId) {
      navigate('/')
      return
    }

    let isMounted = true
    let timeoutId: NodeJS.Timeout

    const init = async () => {
      try {
        setLoading(true)
        setError(null)
        setTimeoutReached(false)

        timeoutId = setTimeout(() => {
          if (isMounted) setTimeoutReached(true)
        }, 10000)

        const sData = await pb.collection('game_sessions').getOne(currentSessionId)

        const qData = await pb.collection('questions').getFullList({
          filter: sData.grade ? `suggested_grade="${sData.grade}"` : '',
          sort: '@random',
          requestKey: null,
        })

        if (!isMounted) return

        if (qData.length === 0) {
          setError('Nenhuma pergunta disponível para esta série. Por favor, contate seu professor.')
          return
        }

        let finalQs = [...qData]
        while (finalQs.length > 0 && finalQs.length < TOTAL_QUESTIONS) {
          finalQs = [...finalQs, ...qData]
        }
        setQuestions(finalQs.slice(0, TOTAL_QUESTIONS))

        let pData: RecordModel | null = null
        const userId = pb.authStore.record?.id

        try {
          if (currentProgressId) {
            pData = await pb.collection('player_progress').getOne(currentProgressId)
          } else {
            throw new Error('No progress ID')
          }
        } catch (e) {
          if (userId) {
            try {
              pData = await pb
                .collection('player_progress')
                .getFirstListItem(`session_id="${currentSessionId}" && user_id="${userId}"`)
              setSession(currentSessionId, pData.id)
            } catch (err) {
              pData = await pb.collection('player_progress').create({
                user_id: userId,
                session_id: currentSessionId,
                score: 0,
                wrong_answers: 0,
                current_question_index: 0,
                position_x: 0,
                status: 'idle',
                car_color: '#ff0000',
                avatar_url: pb.authStore.record?.avatar || '',
              })
              setSession(currentSessionId, pData.id)
            }
          }
        }

        if (!isMounted) return

        if (!pData) {
          setError('Não foi possível carregar o progresso do jogador.')
          return
        }

        setProgressData(pData)
        setCurrentIdx(pData.current_question_index || 0)
        setSessionStatus(sData.status)
      } catch (e) {
        if (!isMounted) return
        console.error(e)
        setError('Erro ao carregar os dados da pista. Tente novamente.')
      } finally {
        if (isMounted) {
          setLoading(false)
          clearTimeout(timeoutId)
        }
      }
    }

    init()

    return () => {
      isMounted = false
      clearTimeout(timeoutId)
    }
  }, [currentSessionId, navigate, setSession, reloadKey])

  useRealtime('game_sessions', (e) => {
    if (e.record.id === currentSessionId) {
      setSessionStatus(e.record.status)
    }
  })

  const q = questions[currentIdx]

  const options = useMemo(() => {
    if (!q) return []
    const opts = [
      { id: 'A', text: q.option_a },
      { id: 'B', text: q.option_b },
      { id: 'C', text: q.option_c },
      { id: 'D', text: q.option_d },
    ]
    return opts.sort(() => Math.random() - 0.5)
  }, [q])

  const handleAnswer = async (answerId: string) => {
    if (feedback || penaltyTime > 0 || !progressData || sessionStatus !== 'active') return

    const isCorrect = answerId === q.correct_option
    setFeedback(isCorrect ? 'correct' : 'wrong')

    const newScore = isCorrect ? progressData.score + 1 : progressData.score
    const newWrong = !isCorrect ? progressData.wrong_answers + 1 : progressData.wrong_answers
    const newPos = isCorrect ? progressData.position_x + 1 : progressData.position_x

    try {
      await pb.collection('player_progress').update(progressData.id, {
        score: newScore,
        wrong_answers: newWrong,
        position_x: newPos,
        status: isCorrect ? 'boost' : 'penalty',
      })
      setProgressData((prev) =>
        prev
          ? {
              ...prev,
              score: newScore,
              wrong_answers: newWrong,
              position_x: newPos,
              status: isCorrect ? 'boost' : 'penalty',
            }
          : null,
      )
    } catch (e) {
      console.error(e)
    }

    if (isCorrect) {
      setTimeout(async () => {
        setFeedback(null)
        try {
          await pb
            .collection('player_progress')
            .update(progressData.id, { status: 'idle', current_question_index: currentIdx + 1 })
          setProgressData((prev) =>
            prev ? { ...prev, status: 'idle', current_question_index: currentIdx + 1 } : null,
          )
        } catch (e) {
          console.error(e)
        }

        if (currentIdx + 1 >= TOTAL_QUESTIONS) {
          navigate('/')
        } else {
          setCurrentIdx((prev) => prev + 1)
        }
      }, 1500)
    } else {
      setPenaltyTime(10)
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (penaltyTime > 0) {
      timer = setInterval(() => {
        setPenaltyTime((prev) => {
          if (prev <= 1) {
            setFeedback(null)
            if (progressData) {
              pb.collection('player_progress')
                .update(progressData.id, {
                  status: 'idle',
                  current_question_index: currentIdx + 1,
                })
                .then(() => {
                  setProgressData((d) =>
                    d ? { ...d, status: 'idle', current_question_index: currentIdx + 1 } : null,
                  )
                })
                .catch((e) => {
                  console.error(e)
                })
            }

            if (currentIdx + 1 >= TOTAL_QUESTIONS) {
              navigate('/')
            } else {
              setCurrentIdx((c) => c + 1)
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [penaltyTime, currentIdx, progressData, navigate])

  if (loading) {
    if (timeoutReached) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in relative z-50">
          <div className="text-2xl font-racing text-destructive mb-4">
            Demorando mais que o esperado...
          </div>
          <Button onClick={() => setReloadKey((k) => k + 1)} className="font-racing">
            Recarregar
          </Button>
        </div>
      )
    }
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center relative z-50">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <div className="text-2xl font-racing text-primary">Carregando Pista...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in relative z-50">
        <div className="text-2xl font-racing text-destructive mb-6 max-w-md">{error}</div>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/')} variant="outline" className="font-racing">
            Voltar
          </Button>
          <Button onClick={() => setReloadKey((k) => k + 1)} className="font-racing">
            Tentar Novamente
          </Button>
        </div>
      </div>
    )
  }

  if (!q || !progressData) return null

  const progressPercent = (progressData.position_x / TOTAL_QUESTIONS) * 100

  return (
    <div className="flex-1 flex flex-col relative pb-4">
      <RaceViewport sessionId={currentSessionId} currentUserId={pb.authStore.record?.id || ''} />

      {sessionStatus === 'lobby' && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm px-4 text-center animate-fade-in">
          <div className="text-4xl md:text-6xl font-racing text-primary animate-pulse mb-6">
            AQUECENDO OS MOTORES...
          </div>
          <div className="text-xl text-white max-w-md">
            Aguardando o professor iniciar a corrida. Prepare-se!
          </div>
        </div>
      )}

      {sessionStatus === 'paused' && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm px-4 text-center animate-fade-in">
          <div className="text-4xl md:text-6xl font-racing text-warning animate-pulse mb-6">
            CORRIDA PAUSADA
          </div>
          <div className="text-xl text-white max-w-md">
            O professor pausou a corrida temporariamente. Mantenha os motores ligados, logo
            voltaremos!
          </div>
        </div>
      )}

      {sessionStatus === 'finished' && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm px-4 text-center animate-fade-in">
          <div className="text-4xl md:text-6xl font-racing text-primary mb-6">
            CORRIDA ENCERRADA
          </div>
          <Button onClick={() => navigate('/')} className="h-12 bg-primary text-black font-racing">
            Voltar ao Início
          </Button>
        </div>
      )}

      {penaltyTime > 0 && (
        <div className="absolute inset-0 bg-destructive/20 animate-pulse pointer-events-none z-0" />
      )}
      {feedback === 'correct' && (
        <div className="absolute inset-0 bg-accent/20 animate-pulse pointer-events-none z-0" />
      )}

      <div className="z-10 w-full max-w-2xl mx-auto mb-6 mt-6 flex flex-col items-center px-4">
        <div className="w-full flex justify-between text-xs md:text-sm font-racing text-muted-foreground mb-2">
          <span>PROGRESSO</span>
          <span>
            {progressData.position_x} / {TOTAL_QUESTIONS}
          </span>
        </div>
        <Progress
          value={progressPercent}
          className="h-4 bg-black/50 [&>div]:bg-primary shadow-[0_0_10px_var(--primary)]"
        />
      </div>

      <div className="z-10 w-full max-w-2xl mx-auto flex-1 flex flex-col px-4">
        <div
          className={`glass-panel rounded-2xl p-4 md:p-8 text-center mb-6 transition-colors duration-300 ${feedback === 'correct' ? 'border-accent shadow-[0_0_30px_rgba(0,255,136,0.3)]' : feedback === 'wrong' ? 'border-destructive shadow-[0_0_30px_rgba(255,0,110,0.3)]' : ''}`}
        >
          <div className="text-xs font-racing text-primary mb-2 uppercase">{q.theme}</div>
          <h2 className="text-lg md:text-2xl font-medium mb-2 leading-snug">{q.statement}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {options.map((opt) => (
            <Button
              key={opt.id}
              onClick={() => handleAnswer(opt.id)}
              disabled={feedback !== null || penaltyTime > 0 || sessionStatus !== 'active'}
              variant="outline"
              className={`min-h-[5rem] h-auto py-3 px-4 text-base md:text-lg font-medium whitespace-normal break-words leading-tight bg-black/40 border-white/10 hover:bg-white/10 hover:border-white/30 transition-all ${
                feedback === 'wrong' && opt.id === q.correct_option
                  ? 'bg-accent/20 border-accent text-accent'
                  : ''
              } ${feedback === 'wrong' && opt.id !== q.correct_option ? 'opacity-50' : ''}`}
            >
              {opt.text}
            </Button>
          ))}
        </div>

        {penaltyTime > 0 && (
          <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in px-4 text-center">
            <div className="text-5xl md:text-6xl font-racing text-destructive mb-4 animate-bounce">
              TROPEÇOU!
            </div>
            <div className="text-xl text-white mb-6">
              Aguarde:{' '}
              <span className="text-4xl font-bold font-racing ml-2 text-destructive">
                {penaltyTime}s
              </span>
            </div>
            <div className="max-w-md w-full p-6 glass-panel rounded-xl border-destructive/50 shadow-[0_0_30px_rgba(255,0,110,0.2)]">
              <div className="text-lg text-accent mb-2">
                A resposta correta era:{' '}
                <span className="font-bold">
                  {options.find((o) => o.id === q.correct_option)?.text}
                </span>
              </div>
              {q.explanation && (
                <div className="text-sm text-muted-foreground mt-4 italic">"{q.explanation}"</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Quiz
