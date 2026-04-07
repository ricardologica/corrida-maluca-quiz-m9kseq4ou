import { useState } from 'react'
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
import { gameStore } from '@/stores/main'
import { CarIcon } from '@/components/CarIcon'
import { Camera } from 'lucide-react'

const CAR_COLORS = [
  'hsl(188, 100%, 50%)', // Blue
  'hsl(334, 100%, 50%)', // Pink
  'hsl(152, 100%, 50%)', // Green
  'hsl(52, 100%, 50%)', // Yellow
  'hsl(280, 100%, 50%)', // Purple
]

const Garage = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [grade, setGrade] = useState('')
  const [color, setColor] = useState(CAR_COLORS[0])

  // Fake avatar generation based on name length or random
  const seed = name.length > 0 ? name.length : Math.floor(Math.random() * 10)
  const avatarUrl = `https://img.usecurling.com/ppl/medium?gender=male&seed=${seed}`

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !grade) return

    gameStore.setCurrentUser({
      id: `player_${Date.now()}`,
      name,
      grade,
      carColor: color,
      avatarUrl,
      progress: 0,
      isFinished: false,
      status: 'idle',
      speed: 0,
    })

    navigate('/quiz')
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg glass-panel rounded-2xl p-6 md:p-8 space-y-6 animate-slide-up">
        <h2 className="text-2xl font-racing text-center mb-6 text-white">Sua Garagem</h2>

        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative mb-8">
            <CarIcon color={color} avatarUrl={avatarUrl} className="scale-125" />
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 font-racing text-sm bg-black/80 px-3 py-1 rounded-full whitespace-nowrap border border-white/20">
              {name ? `${name}_${grade.replace('º Ano', 'ano')}` : 'Piloto_Desconhecido'}
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
              onChange={(e) => setName(e.target.value.replace(/\s+/g, '_'))}
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

          <Button
            type="button"
            variant="outline"
            className="w-full h-12 border-dashed border-white/30 text-muted-foreground hover:text-white hover:bg-white/10"
          >
            <Camera className="w-5 h-5 mr-2" /> Tirar Foto (Simulado)
          </Button>

          <Button
            type="submit"
            className="w-full h-14 text-lg font-bold font-racing mt-4 transition-all hover:scale-[1.02]"
            style={{ backgroundColor: color, color: '#000', boxShadow: `0 0 15px ${color}80` }}
            disabled={!name || !grade}
          >
            Ir para a Pista!
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Garage
