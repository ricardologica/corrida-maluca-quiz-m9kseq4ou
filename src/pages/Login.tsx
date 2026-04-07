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
      await pb.collection('users').create({
        email,
        password,
        passwordConfirm: password,
        name,
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
            Ao entrar e confirmar o seu e-mail, todos os seus resultados serão guardados!
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
                placeholder="Crie uma Senha"
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
