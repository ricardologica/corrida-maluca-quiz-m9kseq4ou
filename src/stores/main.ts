import { useSyncExternalStore } from 'react'
import { Player } from '@/types/game'

type GameState = {
  players: Player[]
  currentUser: Player | null
  raceCode: string
}

let state: GameState = {
  players: [
    {
      id: 'bot1',
      name: 'Ana_8ano',
      grade: '8º Ano',
      carColor: 'hsl(334, 100%, 50%)',
      avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
      progress: 0,
      isFinished: false,
      status: 'idle',
      speed: 0,
    },
    {
      id: 'bot2',
      name: 'Lucas_7ano',
      grade: '7º Ano',
      carColor: 'hsl(188, 100%, 50%)',
      avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=2',
      progress: 0,
      isFinished: false,
      status: 'idle',
      speed: 0,
    },
    {
      id: 'bot3',
      name: 'Bia_6ano',
      grade: '6º Ano',
      carColor: 'hsl(52, 100%, 50%)',
      avatarUrl: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=3',
      progress: 0,
      isFinished: false,
      status: 'idle',
      speed: 0,
    },
  ],
  currentUser: null,
  raceCode: 'CORRIDA123',
}

const listeners = new Set<() => void>()

const notify = () => {
  listeners.forEach((listener) => listener())
}

export const gameStore = {
  subscribe: (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot: () => state,

  setCurrentUser: (player: Player) => {
    state = { ...state, currentUser: player, players: [...state.players, player] }
    notify()
  },

  updatePlayerStatus: (id: string, correct: boolean) => {
    state = {
      ...state,
      players: state.players.map((p) => {
        if (p.id !== id) return p

        const newProgress = correct ? Math.min(p.progress + 1, 30) : p.progress
        const newSpeed = correct ? 120 + Math.random() * 40 : p.speed > 20 ? p.speed - 20 : 0

        return {
          ...p,
          progress: newProgress,
          status: correct ? 'boost' : 'penalty',
          speed: newSpeed,
          isFinished: newProgress >= 30,
        }
      }),
    }
    notify()

    // Reset status to idle after animation
    setTimeout(() => {
      state = {
        ...state,
        players: state.players.map((p) => (p.id === id ? { ...p, status: 'idle' } : p)),
      }
      notify()
    }, 1000)
  },
}

export function useGameStore() {
  return useSyncExternalStore(gameStore.subscribe, gameStore.getSnapshot)
}
