import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'
import pb from '@/lib/pocketbase/client'
import { useToast } from '@/hooks/use-toast'
import { LogOut, LayoutDashboard } from 'lucide-react'

const Index = () => {
  const { user, loading: authLoading, signOut } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const [code, setCode] = useState('')
  const [joining, setJoining] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login')
    }
  }, [user, authLoading, navigate])

  const handleJoinRace = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return

    setJoining(true)
    try {
      const sessions = await pb.collection('game_sessions').getList(1, 1, {
        filter: `code="${code.toUpperCase()}" && status!="finished"`,
      })

      if (sessions.items.length === 0) {
        throw new Error('Código de corrida inválido ou corrida já encerrada.')
      }

      const session = sessions.items[0]

      if (
        session.status === 'lobby' ||
        session.status === 'paused' ||
        session.status === 'active'
      ) {
        let playerProgress
        try {
          playerProgress = await pb
            .collection('player_progress')
            .getFirstListItem(`user_id="${user?.id}" && session_id="${session.id}"`)
        } catch (_) {
          // not joined yet
        }

        if (!playerProgress) {
          playerProgress = await pb.collection('player_progress').create({
            user_id: user?.id,
            session_id: session.id,
            score: 0,
            wrong_answers: 0,
            current_question_index: 0,
            position_x: 0,
            status: 'idle',
            car_color: 'hsl(0, 100%, 50%)', // default
          })
        }

        toast({
          title: 'Sucesso!',
          description: 'Você entrou na corrida.',
        })

        navigate('/garage')
      } else {
        throw new Error('Corrida indisponível.')
      }
    } catch (err: any) {
      toast({
        title: 'Erro ao entrar na corrida',
        description: err.message || 'Verifique o código e tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setJoining(false)
    }
  }

  const handleLogout = () => {
    signOut()
    navigate('/login')
  }

  if (authLoading || !user) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 font-racing">Carregando...</div>
    )
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4 flex gap-2">
        {user.role === 'teacher' && (
          <Button
            variant="secondary"
            onClick={() => navigate('/dashboard')}
            className="font-racing"
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Painel do Professor
          </Button>
        )}
        <Button
          variant="outline"
          onClick={handleLogout}
          className="border-white/20 bg-black/50 text-white font-racing hover:bg-white/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>

      <div className="w-full max-w-md glass-panel p-8 rounded-2xl animate-fade-in-up text-center space-y-8 mt-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-racing text-primary mb-2">CORRIDA MALUCA</h1>
          <p className="text-muted-foreground">Bem-vindo(a), {user.name}!</p>
          {user.role === 'student' && user.grade && (
            <p className="text-sm text-accent font-bold mt-1">Piloto - {user.grade}</p>
          )}
        </div>

        {user.role === 'student' ? (
          <form onSubmit={handleJoinRace} className="space-y-4">
            <div className="space-y-2 text-left">
              <label className="text-sm font-bold text-white ml-1">CÓDIGO DA CORRIDA</label>
              <Input
                type="text"
                placeholder="Ex: ABCD12"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                required
                maxLength={8}
                className="bg-black/50 border-white/20 h-14 text-center text-2xl tracking-widest uppercase font-mono"
              />
            </div>
            <Button
              type="submit"
              disabled={joining || !code}
              className="w-full h-14 font-racing text-xl bg-primary text-black hover:bg-primary/80 transition-all"
            >
              {joining ? 'Entrando na Pista...' : 'Entrar na Corrida'}
            </Button>
          </form>
        ) : (
          <div className="space-y-4 pt-4 border-t border-white/10">
            <p className="text-muted-foreground">Você está logado como Professor.</p>
            <Button
              onClick={() => navigate('/dashboard')}
              className="w-full h-14 font-racing text-xl bg-primary text-black hover:bg-primary/80 transition-all"
            >
              Acessar Painel
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Index
