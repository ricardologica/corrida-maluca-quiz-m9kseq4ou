import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import pb from '@/lib/pocketbase/client'
import { useToast } from '@/hooks/use-toast'
import useGameStore from '@/stores/main'

const Login = () => {
  const [userType, setUserType] = useState<'student' | 'teacher'>('student')

  // Shared state
  const [loading, setLoading] = useState(false)

  // Teacher state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Student state
  const [name, setName] = useState('')
  const [sessionCode, setSessionCode] = useState('')

  const navigate = useNavigate()
  const { toast } = useToast()
  const { setSession } = useGameStore()

  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await pb.collection('users').authWithPassword(email, password)
      const user = pb.authStore.record
      if (user?.role === 'teacher') {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    } catch (err: any) {
      toast({
        title: 'Erro',
        description: 'E-mail ou senha inválidos. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleJoinRace = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!name || !sessionCode) {
        toast({
          title: 'Erro',
          description: 'Preencha seu nome e o código.',
          variant: 'destructive',
        })
        setLoading(false)
        return
      }

      const sessions = await pb.collection('game_sessions').getList(1, 1, {
        filter: `code="${sessionCode.toUpperCase()}" && status!="finished"`,
      })

      if (sessions.items.length === 0) {
        toast({
          title: 'Erro',
          description: 'Código inválido ou corrida encerrada.',
          variant: 'destructive',
        })
        setLoading(false)
        return
      }

      const session = sessions.items[0]
      let currentUser = pb.authStore.record

      if (!currentUser || currentUser.role !== 'student') {
        const guestUsername = `guest_${Math.random().toString(36).substring(2, 10)}`
        const guestPassword = 'Skip@Pass123'

        await pb.collection('users').create({
          username: guestUsername,
          password: guestPassword,
          passwordConfirm: guestPassword,
          name: name,
          role: 'student',
          grade: session.grade,
        })
        await pb.collection('users').authWithPassword(guestUsername, guestPassword)
        currentUser = pb.authStore.record
      } else {
        if (name && currentUser.name !== name) {
          await pb.collection('users').update(currentUser.id, { name })
          currentUser.name = name
        }
      }

      let progress
      try {
        progress = await pb
          .collection('player_progress')
          .getFirstListItem(`user_id="${currentUser?.id}" && session_id="${session.id}"`)
      } catch (err) {
        const colors = [
          '#FF0000',
          '#00FF00',
          '#0000FF',
          '#FFFF00',
          '#FF00FF',
          '#00FFFF',
          '#FFA500',
          '#FF4500',
        ]
        const carColor = colors[Math.floor(Math.random() * colors.length)]

        progress = await pb.collection('player_progress').create({
          user_id: currentUser?.id,
          session_id: session.id,
          score: 0,
          wrong_answers: 0,
          current_question_index: 0,
          position_x: 0,
          car_color: carColor,
          status: 'idle',
        })
      }

      setSession(session.id, progress.id)
      navigate('/quiz')
    } catch (err: any) {
      toast({
        title: 'Erro ao entrar na corrida',
        description: err.message || 'Verifique os dados informados.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel p-6 sm:p-8 rounded-2xl animate-fade-in-up">
        <h2 className="text-3xl font-racing mb-6 text-center text-primary">Acesso à Pista</h2>

        <Tabs
          value={userType}
          onValueChange={(v: any) => {
            setUserType(v)
            setPassword('')
          }}
          className="w-full mb-6"
        >
          <TabsList className="grid w-full grid-cols-2 bg-black/40 mb-6">
            <TabsTrigger
              value="student"
              className="data-[state=active]:bg-primary data-[state=active]:text-black font-racing"
            >
              Sou Piloto
            </TabsTrigger>
            <TabsTrigger
              value="teacher"
              className="data-[state=active]:bg-primary data-[state=active]:text-black font-racing"
            >
              Sou Professor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <form onSubmit={handleJoinRace} className="space-y-4">
              <Input
                type="text"
                placeholder="Seu Nome ou Apelido"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-black/50 border-white/20 h-12"
              />
              <Input
                type="text"
                placeholder="Código da Corrida"
                value={sessionCode}
                onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
                required
                maxLength={6}
                className="bg-black/50 border-white/20 h-12 text-center uppercase tracking-widest text-lg font-bold"
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 font-racing bg-primary text-black hover:bg-primary/80 transition-all text-lg mt-2"
              >
                {loading ? 'Acelerando...' : 'Entrar na Corrida'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="teacher">
            <form onSubmit={handleTeacherLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="E-mail do Professor"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black/50 border-white/20 h-12"
              />
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-black/50 border-white/20 h-12"
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 font-racing bg-primary text-black hover:bg-primary/80 transition-all text-lg mt-2"
              >
                {loading ? 'Entrando...' : 'Acessar Painel'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Login
