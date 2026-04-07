export type Player = {
  id: string
  name: string
  grade: string
  carColor: string
  avatarUrl: string
  progress: number
  isFinished: boolean
  status: 'idle' | 'boost' | 'penalty'
  speed: number
}

export type Question = {
  q: string
  a: string
  w: string[]
}
