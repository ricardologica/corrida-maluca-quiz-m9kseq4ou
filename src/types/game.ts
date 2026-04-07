export type Player = {
  id: string
  name: string
  grade: string
  carColor: string
  avatarUrl: string
  progress: number
  score: number
  wrong_answers: number
  status: 'idle' | 'boost' | 'penalty'
}

export type Question = {
  q: string
  a: string
  w: string[]
}
