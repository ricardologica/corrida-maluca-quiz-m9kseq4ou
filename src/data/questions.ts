import { Question } from '@/types/game'

export const questions: Question[] = []

// Matemática 1-30
for (let i = 1; i <= 30; i++) {
  const left = 2 * i
  const right = 5 + i
  const sum = left + right
  questions.push({
    q: `Qual o valor numérico da expressão ${left} + ${right}?`,
    a: sum.toString(),
    w: [(sum - 1).toString(), (sum + 1).toString(), (sum + 2).toString()],
  })
}

// Ciências 31-60
const planets = [
  { name: 'Mercúrio', pos: '1º' },
  { name: 'Vênus', pos: '2º' },
  { name: 'Terra', pos: '3º' },
  { name: 'Marte', pos: '4º' },
  { name: 'Júpiter', pos: '5º' },
  { name: 'Saturno', pos: '6º' },
  { name: 'Urano', pos: '7º' },
  { name: 'Netuno', pos: '8º' },
]
const allPos = ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º']
for (let i = 1; i <= 30; i++) {
  const planet = planets[(i - 1) % 8]
  questions.push({
    q: `Qual é a posição de ${planet.name} no Sistema Solar a partir do Sol?`,
    a: planet.pos,
    w: allPos.filter((p) => p !== planet.pos).slice(0, 3),
  })
}

// Geografia 61-90
const countries = [
  { c: 'Brasil', cap: 'Brasília' },
  { c: 'Argentina', cap: 'Buenos Aires' },
  { c: 'França', cap: 'Paris' },
  { c: 'Japão', cap: 'Tóquio' },
  { c: 'Itália', cap: 'Roma' },
  { c: 'Espanha', cap: 'Madri' },
  { c: 'Canadá', cap: 'Ottawa' },
  { c: 'México', cap: 'Cidade do México' },
  { c: 'Austrália', cap: 'Camberra' },
  { c: 'Egito', cap: 'Cairo' },
]
for (let i = 1; i <= 30; i++) {
  const country = countries[(i - 1) % 10]
  questions.push({
    q: `Qual é a capital do seguinte país: ${country.c}? (Q${i})`,
    a: country.cap,
    w: countries
      .filter((c) => c.cap !== country.cap)
      .slice(0, 3)
      .map((c) => c.cap),
  })
}

// História 91-120
for (let i = 1; i <= 30; i++) {
  const year = 1500 + i
  questions.push({
    q: `O ano de ${year} pertence a qual século?`,
    a: 'XVI',
    w: ['XIV', 'XV', 'XVII'],
  })
}

// Português 121-150
const words = [
  { w: 'casa', s: '2' },
  { w: 'carro', s: '2' },
  { w: 'árvore', s: '3' },
  { w: 'computador', s: '4' },
  { w: 'telefone', s: '4' },
  { w: 'janela', s: '3' },
  { w: 'porta', s: '2' },
  { w: 'cadeira', s: '3' },
  { w: 'mesa', s: '2' },
  { w: 'livro', s: '2' },
]
for (let i = 1; i <= 30; i++) {
  const word = words[(i - 1) % 10]
  questions.push({
    q: `Quantas sílabas tem a palavra '${word.w}'?`,
    a: word.s,
    w: ['1', '2', '3', '4', '5'].filter((s) => s !== word.s).slice(0, 3),
  })
}
