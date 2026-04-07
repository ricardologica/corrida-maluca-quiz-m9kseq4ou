import { useSyncExternalStore } from 'react'

type GameState = {
  currentSessionId: string | null
  currentProgressId: string | null
  raceCode: string | null
}

let state: GameState = {
  currentSessionId: null,
  currentProgressId: null,
  raceCode: null,
}

const listeners = new Set<() => void>()
const notify = () => listeners.forEach((l) => l())

export const gameStore = {
  subscribe: (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  getSnapshot: () => state,
  setSession: (sessionId: string, code: string) => {
    state = { ...state, currentSessionId: sessionId, raceCode: code }
    notify()
  },
  setProgress: (progressId: string) => {
    state = { ...state, currentProgressId: progressId }
    notify()
  },
}

export function useGameStore() {
  return useSyncExternalStore(gameStore.subscribe, gameStore.getSnapshot)
}
