import { useState, useEffect } from 'react'

let currentSessionId: string | null = localStorage.getItem('currentSessionId')
let currentProgressId: string | null = localStorage.getItem('currentProgressId')

const listeners = new Set<() => void>()

const notify = () => listeners.forEach((l) => l())

export const useGameStore = () => {
  const [, setTick] = useState(0)

  useEffect(() => {
    const listener = () => setTick((t) => t + 1)
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }, [])

  return {
    currentSessionId,
    currentProgressId,
    setSession: (sessionId: string, progressId: string) => {
      currentSessionId = sessionId
      currentProgressId = progressId
      localStorage.setItem('currentSessionId', sessionId)
      localStorage.setItem('currentProgressId', progressId)
      notify()
    },
    clearSession: () => {
      currentSessionId = null
      currentProgressId = null
      localStorage.removeItem('currentSessionId')
      localStorage.removeItem('currentProgressId')
      notify()
    },
  }
}

export default useGameStore
