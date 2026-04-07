import { Outlet, useLocation } from 'react-router-dom'
import { Volume2, VolumeX } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'

export default function Layout() {
  const [soundOn, setSoundOn] = useState(true)
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard'

  return (
    <main className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-b from-background via-background to-background/90" />

      {/* Global Header / Controls */}
      <header className="absolute top-0 w-full p-4 flex justify-between items-start z-50 pointer-events-auto">
        {!isDashboard && (
          <div className="font-racing text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Corrida Maluca
          </div>
        )}
        {isDashboard && <div />} {/* Spacer */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm"
          onClick={() => setSoundOn(!soundOn)}
        >
          {soundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </Button>
      </header>

      {/* Content Area */}
      <div className="flex-1 flex flex-col z-10 pt-16 sm:pt-20">
        <Outlet />
      </div>
    </main>
  )
}
