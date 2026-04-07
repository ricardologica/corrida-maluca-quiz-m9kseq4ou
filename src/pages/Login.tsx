import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import pb from '@/lib/pocketbase/client'
import { useToast } from '@/hooks/use-toast'
import { Info } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [grade, setGrade] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
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
        description: 'Credenciais inválidas. Tente novamente.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
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
        toast({
          title: 'Erro',
          description: 'Selecione a sua série.',
          variant: 'destructive',
        })
        setLoading(false)
        return
      }
      await pb.collection('users').create({
        email,
        password,
        passwordConfirm: password,
        name,
        grade,
        role: 'student',
      })
      await pb.collection('users').authWithPassword(email, password)
      // Send verification email
      await pb.collection('users').requestVerification(email)

      toast({
        title: 'Conta criada!',
        description: 'Verifique seu e-mail para confirmar a conta.',
      })
      navigate('/')
    } catch (err: any) {
      toast({
        title: 'Erro no cadastro',
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
        <h2 className="text-3xl font-racing mb-6 text-center text-primary">Acesso ao Quiz</h2>

        <Alert className="mb-6 bg-blue-500/10 border-blue-500/30 text-blue-200">
          <Info className="h-4 w-4 text-blue-400" />
          <AlertDescription className="ml-2 font-medium">
            Ao entrar e confirmar seu e-mail, todos os seus resultados serão guardados no seu
            perfil.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/40">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-primary data-[state=active]:text-black font-racing"
            >
              Entrar
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="data-[state=active]:bg-primary data-[state=active]:text-black font-racing"
            >
              Cadastrar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="E-mail"
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
                className="w-full h-12 font-racing bg-primary text-black hover:bg-primary/80 transition-all"
              >
                {loading ? 'Entrando...' : 'Acessar Pista'}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                type="text"
                placeholder="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-black/50 border-white/20 h-12"
              />
              <Input
                type="email"
                placeholder="E-mail do Aluno"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="flex h-12 w-full items-center justify-between rounded-md border bg-black/50 border-white/20 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white"
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
                className="w-full h-12 font-racing bg-primary text-black hover:bg-primary/80 transition-all"
              >
                {loading ? 'Criando...' : 'Criar Piloto'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
export default Login
