import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGameStore, gameStore } from '@/stores/main'
import { CarIcon } from '@/components/CarIcon'
import { Camera, LogOut } from 'lucide-react'
import pb from '@/lib/pocketbase/client'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/use-auth'
import { extractFieldErrors } from '@/lib/pocketbase/errors'

const CAR_COLORS = [
  'hsl(188, 100%, 50%)', // Blue
  'hsl(334, 100%, 50%)', // Pink
  'hsl(152, 100%, 50%)', // Green
  'hsl(52, 100%, 50%)', // Yellow
  'hsl(280, 100%, 50%)', // Purple
]

const Garage = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { currentSessionId } = useGameStore()
  const { user, signOut, loading: authLoading } = useAuth()

  // Profile Form States
  const [name, setName] = useState(user?.name || '')
  const [grade, setGrade] = useState(user?.grade || '')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  // Auth Form States
  const [logEmail, setLogEmail] = useState('')
  const [logPassword, setLogPassword] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')

  // Game State
  const [color, setColor] = useState(CAR_COLORS[0])

  // Loading States
  const [loading, setLoading] = useState(false)
  const [logLoading, setLogLoading] = useState(false)
  const [regLoading, setRegLoading] = useState(false)

  // Sync user data when user changes (like after login)
  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setGrade(user.grade || '')
      setPreviewUrl('')
      setAvatarFile(null)
    }
  }, [user])

  useEffect(() => {
    if (!currentSessionId) {
      navigate('/')
    }
  }, [currentSessionId, navigate])

  const seed = name.length > 0 ? name.length : Math.floor(Math.random() * 10)
  const existingAvatar = user?.avatar ? pb.files.getURL(user, user.avatar) : null
  const avatarUrl =
    previewUrl || existingAvatar || `https://img.usecurling.com/ppl/medium?gender=male&seed=${seed}`

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Formato inválido',
          description: 'Por favor, selecione uma imagem.',
          variant: 'destructive',
        })
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'Arquivo muito grande',
          description: 'A imagem deve ter no máximo 5MB.',
          variant: 'destructive',
        })
        return
      }

      setAvatarFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLogLoading(true)
    try {
      await pb.collection('users').authWithPassword(logEmail, logPassword)
      toast({ title: 'Bem-vindo de volta!' })
    } catch (err: any) {
      toast({
        title: 'Erro no Login',
        description: 'E-mail ou senha inválidos.',
        variant: 'destructive',
      })
    } finally {
      setLogLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !grade || !regEmail || !regPassword) return
    setRegLoading(true)
    try {
      const fd = new FormData()
      fd.append('email', regEmail)
      fd.append('password', regPassword)
      fd.append('passwordConfirm', regPassword)
      fd.append('name', name)
      fd.append('grade', grade)
      fd.append('role', 'student')
      if (avatarFile) fd.append('avatar', avatarFile)

      await pb.collection('users').create(fd)
      await pb.collection('users').authWithPassword(regEmail, regPassword)
      toast({ title: 'Conta criada com sucesso!' })
    } catch (err: any) {
      const errors = extractFieldErrors(err)
      const errorMsg = Object.values(errors).join(' ') || err.message || 'Erro ao criar conta.'
      toast({ title: 'Erro no Cadastro', description: errorMsg, variant: 'destructive' })
    } finally {
      setRegLoading(false)
    }
  }

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentSessionId || !user) return
    setLoading(true)

    try {
      let needsUpdate = false
      const fd = new FormData()
      if (name !== user.name) {
        fd.append('name', name)
        needsUpdate = true
      }
      if (grade !== user.grade) {
        fd.append('grade', grade)
        needsUpdate = true
      }
      if (avatarFile) {
        fd.append('avatar', avatarFile)
        needsUpdate = true
      }

      let finalAvatarUrl = avatarUrl
      if (needsUpdate) {
        const updatedUser = await pb.collection('users').update(user.id, fd)
        if (updatedUser.avatar) finalAvatarUrl = pb.files.getURL(updatedUser, updatedUser.avatar)
      }

      let progress
      try {
        progress = await pb
          .collection('player_progress')
          .getFirstListItem(`user_id="${user.id}" && session_id="${currentSessionId}"`)
        progress = await pb.collection('player_progress').update(progress.id, {
          car_color: color,
          avatar_url: finalAvatarUrl,
        })
      } catch {
        progress = await pb.collection('player_progress').create({
          user_id: user.id,
          session_id: currentSessionId,
          score: 0,
          wrong_answers: 0,
          current_question_index: 0,
          position_x: 0,
          car_color: color,
          avatar_url: finalAvatarUrl,
          status: 'idle',
        })
      }

      if (gameStore && 'setProgress' in gameStore && typeof gameStore.setProgress === 'function') {
        gameStore.setProgress(progress.id)
      } else if (
        gameStore &&
        'setSession' in gameStore &&
        typeof gameStore.setSession === 'function'
      ) {
        gameStore.setSession(currentSessionId, progress.id)
      }
      navigate('/quiz')
    } catch (err: any) {
      toast({
        title: 'Erro na Garagem',
        description: err.message || 'Não foi possível entrar na corrida.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 h-full">
        <div className="animate-pulse font-racing text-2xl text-primary flex items-center gap-3">
          <span className="text-4xl animate-spin">⚙️</span> Ajustando Motores...
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md glass-panel rounded-2xl p-6 md:p-8 space-y-6 animate-slide-up">
          <h2 className="text-2xl font-racing text-center mb-2 text-white">Identificação</h2>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Entre ou cadastre-se para salvar seu progresso!
          </p>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/50 border border-white/10">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-primary data-[state=active]:text-black font-racing"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:bg-primary data-[state=active]:text-black font-racing"
              >
                Novo Piloto
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Seu E-mail"
                  value={logEmail}
                  onChange={(e) => setLogEmail(e.target.value)}
                  className="bg-black/50 border-white/20 h-12"
                  required
                />
                <Input
                  type="password"
                  placeholder="Sua Senha"
                  value={logPassword}
                  onChange={(e) => setLogPassword(e.target.value)}
                  className="bg-black/50 border-white/20 h-12"
                  required
                />
                <Button
                  type="submit"
                  disabled={logLoading}
                  className="w-full h-12 text-lg font-bold font-racing mt-2 bg-primary text-black hover:bg-primary/80 transition-all"
                >
                  {logLoading ? 'Acessando...' : 'Entrar na Garagem'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-black/50 border-white/20 h-12"
                    required
                  />
                  <Select value={grade} onValueChange={setGrade} required>
                    <SelectTrigger className="bg-black/50 border-white/20 h-12">
                      <SelectValue placeholder="Série/Ano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5º Ano">5º Ano</SelectItem>
                      <SelectItem value="6º Ano">6º Ano</SelectItem>
                      <SelectItem value="7º Ano">7º Ano</SelectItem>
                      <SelectItem value="8º Ano">8º Ano</SelectItem>
                      <SelectItem value="9º Ano">9º Ano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Input
                  type="email"
                  placeholder="E-mail"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="bg-black/50 border-white/20 h-12"
                  required
                />
                <Input
                  type="password"
                  placeholder="Senha (Mínimo 8 caracteres)"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="bg-black/50 border-white/20 h-12"
                  minLength={8}
                  required
                />

                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 border-dashed border-white/30 text-muted-foreground hover:text-white hover:bg-white/10"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    {avatarFile ? 'Foto Carregada!' : 'Tirar Foto / Enviar'}
                  </Button>
                </div>

                <Button
                  type="submit"
                  disabled={regLoading || !name || !grade || !regEmail || !regPassword}
                  className="w-full h-12 text-lg font-bold font-racing mt-2 bg-primary text-black hover:bg-primary/80 transition-all"
                >
                  {regLoading ? 'Criando...' : 'Criar Conta'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Dica: Adicione este site à tela inicial do seu celular para jogar em tela cheia!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg glass-panel rounded-2xl p-6 md:p-8 space-y-6 animate-slide-up relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={signOut}
          className="absolute top-4 right-4 text-muted-foreground hover:text-white"
          title="Sair"
        >
          <LogOut className="w-5 h-5" />
        </Button>

        <h2 className="text-2xl font-racing text-center mb-6 text-white">Sua Garagem</h2>

        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative mb-8">
            <CarIcon color={color} avatarUrl={avatarUrl} className="scale-125" />
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 font-racing text-sm bg-black/80 px-3 py-1 rounded-full whitespace-nowrap border border-white/20">
              {name && grade ? `${name}_${grade.replace(/[^0-9]/g, '')}ano` : 'Piloto_Desconhecido'}
            </div>
          </div>

          <div className="flex gap-3 mb-2">
            {CAR_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? 'border-white scale-110 shadow-[0_0_10px_currentColor]' : 'border-transparent opacity-50'}`}
                style={{ backgroundColor: c, color: c }}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleStart} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Seu Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-black/50 border-white/20 h-12"
              required
            />
            <Select value={grade} onValueChange={setGrade} required>
              <SelectTrigger className="bg-black/50 border-white/20 h-12">
                <SelectValue placeholder="Série/Ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5º Ano">5º Ano</SelectItem>
                <SelectItem value="6º Ano">6º Ano</SelectItem>
                <SelectItem value="7º Ano">7º Ano</SelectItem>
                <SelectItem value="8º Ano">8º Ano</SelectItem>
                <SelectItem value="9º Ano">9º Ano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            />
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-dashed border-white/30 text-muted-foreground hover:text-white hover:bg-white/10"
            >
              <Camera className="w-5 h-5 mr-2" />{' '}
              {avatarFile ? 'Nova Foto Pronta!' : 'Atualizar Foto'}
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full h-14 text-lg font-bold font-racing mt-4 transition-all hover:scale-[1.02]"
            style={{ backgroundColor: color, color: '#000', boxShadow: `0 0 15px ${color}80` }}
            disabled={!name || !grade || loading}
          >
            {loading ? 'Ajustando Motores...' : 'Ir para a Pista!'}
          </Button>
        </form>
      </div>
    </div>
  )
}
export default Garage
