import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore, gameStore } from '@/stores/main'
import { questions } from '@/data/questions'
import { Button } from '@/components/ui/button'
import { CarIcon } from '@/components/CarIcon'
import { Progress } from '@/components/ui/progress'

const TOTAL_QUESTIONS = 30

const Quiz = () => {
  const navigate = useNavigate()
  const { currentUser } = useGameStore()
  const [currentIdx, setCurrentIdx] = useState(0)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [penaltyTime, setPenaltyTime] = useState(0)

  useEffect(() => {
    if (!currentUser) navigate('/')
  }, [currentUser, navigate])

  const q = questions[currentIdx % questions.length]

  const options = useMemo(() => {
    const opts = [q.a, ...q.w]
    return opts.sort(() => Math.random() - 0.5)
  }, [currentIdx, q])

  const handleAnswer = (answer: string) => {
    if (feedback || penaltyTime > 0) return

    const isCorrect = answer === q.a
    setFeedback(isCorrect ? 'correct' : 'wrong')

    if (currentUser) {
      gameStore.updatePlayerStatus(currentUser.id, isCorrect)
    }

    if (isCorrect) {
      setTimeout(() => {
        setFeedback(null)
        if (currentIdx + 1 >= TOTAL_QUESTIONS) {
          navigate('/dashboard')
        } else {
          setCurrentIdx((prev) => prev + 1)
        }
      }, 1500)
    } else {
      setPenaltyTime(5)
    }
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (penaltyTime > 0) {
      timer = setInterval(() => {
        setPenaltyTime((prev) => {
          if (prev <= 1) {
            setFeedback(null)
            setCurrentIdx((curr) => (curr + 1 >= TOTAL_QUESTIONS ? curr : curr + 1))
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [penaltyTime])

  if (!currentUser) return null

  const progressPercent = (currentUser.progress / TOTAL_QUESTIONS) * 100

  return (
    <div className="flex-1 flex flex-col relative px-4 pb-8">
      {/* Dynamic Background during penalty */}
      {penaltyTime > 0 && (
        <div className="absolute inset-0 bg-destructive/20 animate-pulse pointer-events-none z-0" />
      )}
      {feedback === 'correct' && (
        <div className="absolute inset-0 bg-accent/20 animate-pulse pointer-events-none z-0" />
      )}

      {/* Header Progress */}
      <div className="z-10 w-full max-w-2xl mx-auto mb-6 flex flex-col items-center">
        <div className="w-full flex justify-between text-sm font-racing text-muted-foreground mb-2">
          <span>PROGRESSO</span>
          <span>
            {currentUser.progress} / {TOTAL_QUESTIONS}
          </span>
        </div>
        <Progress
          value={progressPercent}
          className="h-4 bg-black/50 [&>div]:bg-primary shadow-[0_0_10px_var(--primary)]"
        />
      </div>

      {/* Question Card */}
      <div className="z-10 w-full max-w-2xl mx-auto flex-1 flex flex-col">
        <div
          className={`glass-panel rounded-2xl p-6 md:p-10 text-center mb-6 transition-colors duration-300 ${feedback === 'correct' ? 'border-accent shadow-[0_0_30px_rgba(0,255,136,0.3)]' : feedback === 'wrong' ? 'border-destructive shadow-[0_0_30px_rgba(255,0,110,0.3)]' : ''}`}
        >
          <h2 className="text-xl md:text-2xl font-medium mb-2">{q.q}</h2>
        </div>

        {/* Answers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((opt, i) => (
            <Button
              key={i}
              onClick={() => handleAnswer(opt)}
              disabled={feedback !== null || penaltyTime > 0}
              variant="outline"
              className={`h-20 text-lg md:text-xl font-medium whitespace-normal break-words bg-black/40 border-white/10 hover:bg-white/10 hover:border-white/30 transition-all ${
                feedback === 'wrong' && opt === q.a ? 'bg-accent/20 border-accent text-accent' : ''
              } ${feedback === 'wrong' && opt !== q.a ? 'opacity-50' : ''}`}
            >
              {opt}
            </Button>
          ))}
        </div>

        {/* Penalty Overlay */}
        {penaltyTime > 0 && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="text-6xl font-racing text-destructive mb-4 animate-bounce">
              PNEU FURADO!
            </div>
            <div className="text-3xl text-white">Aguarde: {penaltyTime}s</div>
            <div className="mt-8 text-xl text-accent">
              A resposta correta era: <span className="font-bold">{q.a}</span>
            </div>
          </div>
        )}
      </div>

      {/* Animated Car at Bottom */}
      <div className="w-full h-32 relative mt-auto border-b-4 border-dashed border-white/20 animate-track overflow-hidden flex items-end justify-center pb-2">
        <CarIcon
          color={currentUser.carColor}
          avatarUrl={currentUser.avatarUrl}
          status={currentUser.status}
          className="scale-150 transform transition-transform"
        />
      </div>
    </div>
  )
}

export default Quiz
