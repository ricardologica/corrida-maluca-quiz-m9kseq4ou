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

  // Prizes State
  const [allProgress, setAllProgress] = useState<RecordModel[]>([])
  const [prizes, setPrizes] = useState<RecordModel[]>([])
  const [wonPrize, setWonPrize] = useState<RecordModel | null>(null)

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

        // Load prizes and progress
        const pr = await pb
          .collection('session_prizes')
          .getFullList({ filter: `session_id="${currentSessionId}"` })
        setPrizes(pr)

        const ap = await pb
          .collection('player_progress')
          .getFullList({ filter: `session_id="${currentSessionId}"` })
        setAllProgress(ap)

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

  useRealtime('player_progress', (e) => {
    if (e.record.session_id === currentSessionId) {
      setAllProgress((prev) => {
        const exists = prev.find((p) => p.id === e.record.id)
        if (e.action === 'delete') return prev.filter((p) => p.id !== e.record.id)
        if (exists) return prev.map((p) => (p.id === e.record.id ? e.record : p))
        return [...prev, e.record]
      })
    }
  })

  useRealtime('session_prizes', (e) => {
    if (e.record.session_id === currentSessionId) {
      setPrizes((prev) => {
        const exists = prev.find((p) => p.id === e.record.id)
        if (e.action === 'delete') return prev.filter((p) => p.id !== e.record.id)
        if (exists) return prev.map((p) => (p.id === e.record.id ? e.record : p))
        return [...prev, e.record]
      })
    }
  })

  // Evaluate Prizes
  useEffect(() => {
    if (!progressData || !allProgress.length || !prizes.length || wonPrize) return

    const globalTotal = allProgress.reduce((sum, p) => sum + (p.current_question_index || 0), 0)
    const available = prizes.filter((p) => !p.claimed && !p.winner_id)

    for (const prize of available) {
      if (globalTotal >= prize.global_threshold && progressData.score >= prize.min_correct) {
        // Try to claim atomicly (or close enough)
        pb.collection('session_prizes')
          .update(prize.id, {
            claimed: true,
            winner_id: pb.authStore.record?.id,
          })
          .then((updated) => {
            setWonPrize(updated)
          })
          .catch((err) => {
            console.log('Alguém já resgatou o prêmio no mesmo instante', err)
          })
        break // Process one prize at a time
      }
    }
  }, [allProgress, progressData, prizes, wonPrize])

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
    if (feedback || penaltyTime > 0 || !progressData || sessionStatus !== 'active' || wonPrize)
      return

    const isCorrect = answerId === q.correct_option
    setFeedback(isCorrect ? 'correct' : 'wrong')

    const newScore = isCorrect ? progressData.score + 1 : progressData.score
    const newWrong = !isCorrect ? progressData.wrong_answers + 1 : progressData.wrong_answers
    const newPos = isCorrect ? progressData.position_x + 1 : progressData.position_x

    try {
      const updated = await pb.collection('player_progress').update(progressData.id, {
        score: newScore,
        wrong_answers: newWrong,
        position_x: newPos,
        status: isCorrect ? 'boost' : 'penalty',
      })
      setProgressData(updated)
    } catch (e) {
      console.error(e)
    }

    if (isCorrect) {
      setTimeout(async () => {
        setFeedback(null)
        try {
          const updated = await pb
            .collection('player_progress')
            .update(progressData.id, { status: 'idle', current_question_index: currentIdx + 1 })
          setProgressData(updated)
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
                .update(progressData.id, { status: 'idle', current_question_index: currentIdx + 1 })
                .then((updated) => setProgressData(updated))
                .catch((e) => console.error(e))
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

      {wonPrize && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md px-4 text-center animate-fade-in">
          <div className="text-5xl md:text-7xl font-racing text-primary mb-4 animate-bounce text-shadow-lg tracking-wider">
            🏆 VOCÊ GANHOU! 🏆
          </div>
          <div className="text-2xl md:text-4xl text-white mb-8 font-racing bg-accent/30 px-8 py-3 rounded-2xl border-4 border-accent shadow-[0_0_30px_rgba(255,0,128,0.5)]">
            {wonPrize.name}
          </div>
          {wonPrize.image ? (
            <img
              src={pb.files.getURL(wonPrize, wonPrize.image)}
              alt={wonPrize.name}
              className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.6)] mb-10 animate-pulse bg-white/5 rounded-3xl p-4"
            />
          ) : wonPrize.image_url ? (
            <img
              src={wonPrize.image_url}
              alt={wonPrize.name}
              className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.6)] mb-10 animate-pulse bg-white/5 rounded-3xl p-4"
            />
          ) : (
            <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center bg-white/10 rounded-3xl mb-10 border-4 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <span className="text-8xl">🎁</span>
            </div>
          )}
          <Button
            onClick={() => setWonPrize(null)}
            className="text-xl md:text-2xl h-16 md:h-20 px-8 bg-green-500 hover:bg-green-400 text-black font-racing rounded-2xl shadow-[0_0_20px_rgba(34,197,94,0.6)] border-b-4 border-green-700 active:border-b-0 active:mt-1 transition-all"
          >
            OK, já printei para continuar 📸
          </Button>
        </div>
      )}

      {sessionStatus === 'lobby' && !wonPrize && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm px-4 text-center animate-fade-in">
          <div className="text-4xl md:text-6xl font-racing text-primary animate-pulse mb-6">
            AQUECENDO OS MOTORES...
          </div>
          <div className="text-xl text-white max-w-md font-bold">
            Aguardando o professor iniciar a corrida. Prepare-se!
          </div>
        </div>
      )}

      {sessionStatus === 'paused' && !wonPrize && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm px-4 text-center animate-fade-in">
          <div className="text-4xl md:text-6xl font-racing text-warning animate-pulse mb-6">
            CORRIDA PAUSADA
          </div>
          <div className="text-xl text-white max-w-md font-bold">
            O professor pausou a corrida temporariamente. Mantenha os motores ligados!
          </div>
        </div>
      )}

      {sessionStatus === 'finished' && !wonPrize && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm px-4 text-center animate-fade-in">
          <div className="text-4xl md:text-6xl font-racing text-primary mb-6">
            CORRIDA ENCERRADA
          </div>
          <Button
            onClick={() => navigate('/')}
            className="h-14 px-8 text-xl bg-primary hover:bg-primary/80 text-black font-racing"
          >
            Voltar ao Início
          </Button>
        </div>
      )}

      {penaltyTime > 0 && !wonPrize && (
        <div className="absolute inset-0 bg-destructive/20 animate-pulse pointer-events-none z-0" />
      )}
      {feedback === 'correct' && !wonPrize && (
        <div className="absolute inset-0 bg-accent/20 animate-pulse pointer-events-none z-0" />
      )}

      <div className="z-10 w-full max-w-2xl mx-auto mb-6 mt-6 flex flex-col items-center px-4">
        <div className="w-full flex justify-between text-sm font-racing text-white font-bold mb-2">
          <span>PROGRESSO</span>
          <span className="bg-black/50 px-2 py-0.5 rounded">
            {progressData.position_x} / {TOTAL_QUESTIONS}
          </span>
        </div>
        <Progress
          value={progressPercent}
          className="h-6 bg-black/50 [&>div]:bg-primary shadow-[0_0_10px_var(--primary)] border-2 border-white/10"
        />
      </div>

      <div className="z-10 w-full max-w-2xl mx-auto flex-1 flex flex-col px-4">
        <div
          className={`glass-panel rounded-3xl p-6 md:p-10 text-center mb-6 transition-colors duration-300 border-b-4 bg-card ${feedback === 'correct' ? 'border-accent shadow-[0_0_30px_rgba(0,255,136,0.3)]' : feedback === 'wrong' ? 'border-destructive shadow-[0_0_30px_rgba(255,0,110,0.3)]' : 'border-white/10'}`}
        >
          <div className="text-sm font-racing text-primary mb-3 bg-primary/10 inline-block px-3 py-1 rounded-full uppercase tracking-wider">
            {q.theme}
          </div>
          <h2 className="text-xl md:text-3xl font-bold mb-2 leading-snug">{q.statement}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {options.map((opt) => (
            <Button
              key={opt.id}
              onClick={() => handleAnswer(opt.id)}
              disabled={
                feedback !== null || penaltyTime > 0 || sessionStatus !== 'active' || !!wonPrize
              }
              variant="outline"
              className={`min-h-[5rem] h-auto py-4 px-6 text-lg md:text-xl font-bold whitespace-normal break-words leading-tight bg-black/40 border-white/10 hover:bg-white/10 hover:border-white/30 border-b-4 active:border-b-0 active:translate-y-1 transition-all ${
                feedback === 'wrong' && opt.id === q.correct_option
                  ? 'bg-accent/20 border-accent text-accent'
                  : ''
              } ${feedback === 'wrong' && opt.id !== q.correct_option ? 'opacity-50 grayscale' : ''}`}
            >
              {opt.text}
            </Button>
          ))}
        </div>

        {penaltyTime > 0 && !wonPrize && (
          <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in px-4 text-center">
            <div className="text-5xl md:text-7xl font-racing text-destructive mb-4 animate-bounce drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]">
              TROPEÇOU!
            </div>
            <div className="text-2xl text-white mb-6 font-bold">
              Aguarde:{' '}
              <span className="text-5xl font-bold font-racing ml-2 text-destructive">
                {penaltyTime}s
              </span>
            </div>
            <div className="max-w-md w-full p-8 glass-panel rounded-3xl border-destructive/50 shadow-[0_0_40px_rgba(255,0,110,0.3)] bg-card">
              <div className="text-xl text-white mb-3">A resposta correta era:</div>
              <div className="text-2xl text-accent font-bold bg-accent/10 py-3 rounded-xl border border-accent/30">
                {options.find((o) => o.id === q.correct_option)?.text}
              </div>
              {q.explanation && (
                <div className="text-base text-muted-foreground mt-6 italic">"{q.explanation}"</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Quiz
