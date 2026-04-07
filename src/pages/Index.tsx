import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { CarIcon } from '@/components/CarIcon'
import { useToast } from '@/hooks/use-toast'
import pb from '@/lib/pocketbase/client'
import { gameStore } from '@/stores/main'

const Index = () => {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code) return
    setLoading(true)

    try {
      const session = await pb
        .collection('game_sessions')
        .getFirstListItem(`code="${code.toUpperCase()}" && status!="finished"`)
      gameStore.setSession(session.id, session.code)
      navigate('/garage')
    } catch (err) {
      toast({
        title: 'Código Inválido',
        description: 'Nenhuma corrida ativa encontrada com este código.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel rounded-2xl p-8 space-y-8 animate-fade-in-up">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-8 animate-float">
            <CarIcon color="hsl(188, 100%, 50%)" />
          </div>
          <h1 className="text-3xl font-racing text-white mb-2 uppercase tracking-wider">
            Preparar, <span className="text-primary">Apontar...</span>
          </h1>
          <p className="text-muted-foreground">Insira o código da corrida para entrar na pista!</p>
        </div>

        <form onSubmit={handleJoin} className="space-y-4">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="CÓDIGO DA CORRIDA"
            className="text-center text-xl font-racing tracking-widest h-14 bg-black/50 border-white/20 uppercase"
            maxLength={10}
            required
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 text-lg font-bold font-racing bg-primary hover:bg-primary/80 text-black shadow-[0_0_15px_rgba(0,242,255,0.4)] transition-all hover:scale-[1.02]"
          >
            {loading ? 'Procurando...' : 'Ligar Motores!'}
          </Button>
        </form>

        <div className="pt-6 border-t border-white/10 text-center">
          <Link to="/login">
            <Button variant="link" className="text-muted-foreground hover:text-white">
              Acesso do Professor (Painel)
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Index
