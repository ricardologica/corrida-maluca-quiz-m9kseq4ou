import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '@/stores/main'
import pb from '@/lib/pocketbase/client'
import { Button } from '@/components/ui/button'
import { CarIcon } from '@/components/CarIcon'
import { Progress } from '@/components/ui/progress'
import type { RecordModel } from 'pocketbase'
import { useRealtime } from '@/hooks/use-realtime'

const TOTAL_QUESTIONS = 30

const Quiz = () => {
  const navigate = useNavigate()
  const { currentSessionId, currentProgressId } = useGameStore()

  const [questions, setQuestions] = useState<RecordModel[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [penaltyTime, setPenaltyTime] = useState(0)
  const [progressData, setProgressData] = useState<RecordModel | null>(null)
  const [sessionStatus, setSessionStatus] = useState('active')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentSessionId || !currentProgressId) {
      navigate('/')
      return
    }

    const loadGame = async () => {
      try {
        const sData = await pb.collection('game_sessions').getOne(currentSessionId)
        const gradeFilter = sData.grade ? `suggested_grade="${sData.grade}"` : ''

        const [qData, pData] = await Promise.all([
          pb.collection('questions').getFullList({
            filter: gradeFilter,
            sort: '@random',
            requestKey: null,
          }),
          pb.collection('player_progress').getOne(currentProgressId),
        ])

        // Ensure exactly 30 questions
        let finalQs = qData
        if (finalQs.length === 0) {
          finalQs = await pb
            .collection('questions')
            .getFullList({ sort: '@random', requestKey: null })
        }
        while (finalQs.length > 0 && finalQs.length < TOTAL_QUESTIONS) {
          finalQs = [...finalQs, ...qData]
        }
        setQuestions(finalQs.slice(0, TOTAL_QUESTIONS))
        setProgressData(pData)
        setCurrentIdx(pData.current_question_index || 0)
        setSessionStatus(sData.status)
      } catch (e) {
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
    loadGame()
  }, [currentSessionId, currentProgressId, navigate])

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
      await pb.collection('player_progress').update(currentProgressId!, {
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
            .update(currentProgressId!, { status: 'idle', current_question_index: currentIdx + 1 })
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
            pb.collection('player_progress')
              .update(currentProgressId!, {
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
  }, [penaltyTime, currentIdx, currentProgressId, navigate])

  if (loading || !q || !progressData)
    return <div className="p-8 text-center font-racing">Carregando Pista...</div>

  const progressPercent = (progressData.position_x / TOTAL_QUESTIONS) * 100

  return (
    <div className="flex-1 flex flex-col relative px-4 pb-8">
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

      <div className="z-10 w-full max-w-2xl mx-auto mb-6 flex flex-col items-center">
        <div className="w-full flex justify-between text-sm font-racing text-muted-foreground mb-2">
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

      <div className="z-10 w-full max-w-2xl mx-auto flex-1 flex flex-col">
        <div
          className={`glass-panel rounded-2xl p-6 md:p-10 text-center mb-6 transition-colors duration-300 ${feedback === 'correct' ? 'border-accent shadow-[0_0_30px_rgba(0,255,136,0.3)]' : feedback === 'wrong' ? 'border-destructive shadow-[0_0_30px_rgba(255,0,110,0.3)]' : ''}`}
        >
          <div className="text-xs font-racing text-primary mb-4 uppercase">{q.theme}</div>
          <h2 className="text-xl md:text-2xl font-medium mb-2">{q.statement}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((opt) => (
            <Button
              key={opt.id}
              onClick={() => handleAnswer(opt.id)}
              disabled={feedback !== null || penaltyTime > 0 || sessionStatus !== 'active'}
              variant="outline"
              className={`h-20 text-lg md:text-xl font-medium whitespace-normal break-words bg-black/40 border-white/10 hover:bg-white/10 hover:border-white/30 transition-all ${
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
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in px-4 text-center">
            <div className="text-5xl md:text-6xl font-racing text-destructive mb-4 animate-bounce">
              PNEU FURADO!
            </div>
            <div className="text-xl text-white mb-8">
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

      <div className="w-full h-32 relative mt-auto border-b-4 border-dashed border-white/20 animate-track overflow-hidden flex items-end justify-center pb-2">
        <CarIcon
          color={progressData.car_color}
          avatarUrl={progressData.avatar_url}
          status={progressData.status as any}
          className="scale-150 transform transition-transform"
        />
      </div>
    </div>
  )
}
export default Quiz
