import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import pb from '@/lib/pocketbase/client'
import { useToast } from '@/hooks/use-toast'
import useGameStore from '@/stores/main'
import { CameraCapture } from '@/components/CameraCapture'

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
  const [grade, setGrade] = useState('6º Ano')
  const [photo, setPhoto] = useState<File | null>(null)

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
      if (!name || !sessionCode || !grade) {
        toast({
          title: 'Erro',
          description: 'Preencha seu nome, série e o código.',
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
      let updatedUser

      const formData = new FormData()
      formData.append('name', name)
      formData.append('grade', grade)
      if (photo) {
        formData.append('avatar', photo)
      }

      if (!currentUser || currentUser.role !== 'student') {
        const guestUsername = `guest_${Math.random().toString(36).substring(2, 10)}`
        const guestPassword = 'Skip@Pass123'

        formData.append('username', guestUsername)
        formData.append('password', guestPassword)
        formData.append('passwordConfirm', guestPassword)
        formData.append('role', 'student')

        await pb.collection('users').create(formData)
        const authData = await pb.collection('users').authWithPassword(guestUsername, guestPassword)
        updatedUser = authData.record
      } else {
        updatedUser = await pb.collection('users').update(currentUser.id, formData)
        pb.authStore.save(pb.authStore.token, updatedUser)
      }

      if (!updatedUser) throw new Error('Falha ao autenticar usuário.')

      let progress
      try {
        progress = await pb
          .collection('player_progress')
          .getFirstListItem(`user_id="${updatedUser.id}" && session_id="${session.id}"`)
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

        const avatarUrl = updatedUser.avatar ? pb.files.getUrl(updatedUser, updatedUser.avatar) : ''

        progress = await pb.collection('player_progress').create({
          user_id: updatedUser.id,
          session_id: session.id,
          score: 0,
          wrong_answers: 0,
          current_question_index: 0,
          position_x: 0,
          car_color: carColor,
          avatar_url: avatarUrl,
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
    <div className="flex-1 flex items-center justify-center p-4 min-h-[calc(100vh-80px)]">
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
              <CameraCapture onCapture={setPhoto} />

              <Input
                type="text"
                placeholder="Seu Nome ou Apelido"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-black/50 border-white/20 h-12 text-white placeholder:text-gray-400"
              />

              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger className="bg-black/50 border-white/20 h-12 text-white">
                  <SelectValue placeholder="Selecione sua série" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6º Ano">6º Ano</SelectItem>
                  <SelectItem value="7º Ano">7º Ano</SelectItem>
                  <SelectItem value="8º Ano">8º Ano</SelectItem>
                  <SelectItem value="9º Ano">9º Ano</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="text"
                placeholder="Código da Corrida"
                value={sessionCode}
                onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
                required
                maxLength={6}
                className="bg-black/50 border-white/20 h-12 text-center uppercase tracking-widest text-lg font-bold text-white placeholder:text-gray-400"
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
                className="bg-black/50 border-white/20 h-12 text-white placeholder:text-gray-400"
              />
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-black/50 border-white/20 h-12 text-white placeholder:text-gray-400"
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
