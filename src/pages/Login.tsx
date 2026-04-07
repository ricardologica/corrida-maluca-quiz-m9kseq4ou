import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import pb from '@/lib/pocketbase/client'
import { useToast } from '@/hooks/use-toast'
import { Info } from 'lucide-react'
import { extractFieldErrors } from '@/lib/pocketbase/errors'

const Login = () => {
  const [userType, setUserType] = useState<'student' | 'teacher'>('student')

  // Shared state
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // Teacher state
  const [email, setEmail] = useState('')

  // Student state
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [grade, setGrade] = useState('')

  const navigate = useNavigate()
  const { toast } = useToast()

  const handlePhoneChange = (val: string) => {
    let v = val.replace(/\D/g, '')
    if (v.length > 11) v = v.slice(0, 11)
    let formatted = v
    if (v.length > 2) formatted = `(${v.slice(0, 2)}) ${v.slice(2)}`
    if (v.length > 7) formatted = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`
    setPhone(formatted)
  }

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

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const cleanPhone = phone.replace(/\D/g, '')
      if (cleanPhone.length < 10) {
        toast({ title: 'Erro', description: 'Digite um celular válido.', variant: 'destructive' })
        setLoading(false)
        return
      }

      await pb.collection('users').authWithPassword(cleanPhone, password)
      navigate('/')
    } catch (err: any) {
      toast({
        title: 'Erro',
        description: 'Celular ou senha inválidos.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStudentRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const cleanPhone = phone.replace(/\D/g, '')
      if (cleanPhone.length < 10) {
        toast({ title: 'Erro', description: 'Digite um celular válido.', variant: 'destructive' })
        setLoading(false)
        return
      }
      if (password.length < 8) {
        toast({
          title: 'Erro',
          description: 'A senha deve ter pelo menos 8 caracteres.',
          variant: 'destructive',
        })
        setLoading(false)
        return
      }
      if (!grade) {
        toast({ title: 'Erro', description: 'Selecione a sua série.', variant: 'destructive' })
        setLoading(false)
        return
      }

      await pb.collection('users').create({
        username: cleanPhone, // Using phone as username to allow phone-based auth
        phone: cleanPhone,
        password,
        passwordConfirm: password,
        name,
        nickname,
        grade,
        role: 'student',
      })

      // Authenticate right after creation
      await pb.collection('users').authWithPassword(cleanPhone, password)

      toast({
        title: 'Conta criada!',
        description: 'Seu perfil de piloto foi criado com sucesso.',
      })
      navigate('/')
    } catch (err: any) {
      const fieldErrors = extractFieldErrors(err)
      const errorMsg =
        fieldErrors.phone || fieldErrors.username || err.message || 'Verifique os dados informados.'
      toast({
        title: 'Erro no cadastro',
        description: errorMsg,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel p-6 sm:p-8 rounded-2xl animate-fade-in-up">
        <h2 className="text-3xl font-racing mb-6 text-center text-primary">Acesso ao Quiz</h2>

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
              Sou Aluno
            </TabsTrigger>
            <TabsTrigger
              value="teacher"
              className="data-[state=active]:bg-primary data-[state=active]:text-black font-racing"
            >
              Sou Professor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <Alert className="mb-6 bg-blue-500/10 border-blue-500/30 text-blue-200">
              <Info className="h-4 w-4 text-blue-400" />
              <AlertDescription className="ml-2 font-medium">
                Ao entrar, todos os seus resultados serão guardados no seu perfil de piloto!
              </AlertDescription>
            </Alert>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/40">
                <TabsTrigger value="login" className="data-[state=active]:bg-white/10 font-bold">
                  Entrar
                </TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-white/10 font-bold">
                  Cadastrar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleStudentLogin} className="space-y-4">
                  <Input
                    type="tel"
                    placeholder="Celular"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
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
                    className="w-full h-12 font-racing bg-primary text-black hover:bg-primary/80 transition-all text-lg"
                  >
                    {loading ? 'Acelerando...' : 'Acessar Pista'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleStudentRegister} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Nome Completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-black/50 border-white/20 h-12"
                  />
                  <Input
                    type="text"
                    placeholder="Apelido (Piloto)"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                    className="bg-black/50 border-white/20 h-12"
                  />
                  <Input
                    type="tel"
                    placeholder="Celular (Apenas números)"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    required
                    className="bg-black/50 border-white/20 h-12"
                  />
                  <Input
                    type="password"
                    placeholder="Crie uma Senha (mín. 8 caracteres)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="bg-black/50 border-white/20 h-12"
                  />
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    required
                    className="flex h-12 w-full items-center justify-between rounded-md border bg-black/50 border-white/20 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                  >
                    <option value="" disabled>
                      Selecione sua série
                    </option>
                    <option value="6º Ano">6º Ano</option>
                    <option value="7º Ano">7º Ano</option>
                    <option value="8º Ano">8º Ano</option>
                    <option value="9º Ano">9º Ano</option>
                  </select>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 font-racing bg-primary text-black hover:bg-primary/80 transition-all text-lg"
                  >
                    {loading ? 'Criando...' : 'Criar Piloto'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="teacher">
            <form onSubmit={handleTeacherLogin} className="space-y-4 mt-4">
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
                className="w-full h-12 font-racing bg-primary text-black hover:bg-primary/80 transition-all text-lg"
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
