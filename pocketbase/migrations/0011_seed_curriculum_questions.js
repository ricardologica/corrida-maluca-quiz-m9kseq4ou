migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('questions')
    app.truncateCollection(col)

    const saveQuestion = (id, grade, theme, statement, difficulty, ans, w) => {
      const rec = new Record(col)
      rec.set('external_id', id)
      rec.set('suggested_grade', grade)
      rec.set('theme', theme)
      rec.set('statement', statement)
      rec.set('difficulty', difficulty)

      const opts = [ans, ...w]
      const cIdx = id % 4
      const tmp = opts[cIdx]
      opts[cIdx] = opts[0]
      opts[0] = tmp

      rec.set('option_a', opts[0])
      rec.set('option_b', opts[1])
      rec.set('option_c', opts[2])
      rec.set('option_d', opts[3])
      rec.set('correct_option', ['A', 'B', 'C', 'D'][cIdx])

      app.save(rec)
    }

    // Math 1-30
    for (let i = 1; i <= 30; i++) {
      const left = 2 * i
      const right = 5 + i
      const sum = left + right
      const level = i <= 10 ? 'Fácil' : i <= 20 ? 'Médio' : 'Difícil'
      saveQuestion(
        i,
        '6º Ano',
        'Matemática',
        `Qual o valor numérico da expressão ${left} + ${right}?`,
        level,
        sum.toString(),
        [(sum - 1).toString(), (sum + 1).toString(), (sum + 2).toString()],
      )
    }

    // Science 31-60
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
      const level = i <= 15 ? 'Fácil' : 'Médio'
      saveQuestion(
        30 + i,
        '7º Ano',
        'Ciências',
        `Qual é a posição de ${planet.name} no Sistema Solar a partir do Sol?`,
        level,
        planet.pos,
        allPos.filter((p) => p !== planet.pos).slice(0, 3),
      )
    }

    // Geography 61-90
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
      saveQuestion(
        60 + i,
        '8º Ano',
        'Geografia',
        `Qual é a capital do seguinte país: ${country.c}? (Q${i})`,
        'Fácil',
        country.cap,
        countries
          .filter((c) => c.cap !== country.cap)
          .slice(0, 3)
          .map((c) => c.cap),
      )
    }

    // History 91-120
    for (let i = 1; i <= 30; i++) {
      const year = 1500 + i
      const level = i <= 10 ? 'Fácil' : i <= 20 ? 'Médio' : 'Difícil'
      saveQuestion(
        90 + i,
        '9º Ano',
        'História',
        `O ano de ${year} pertence a qual século?`,
        level,
        'XVI',
        ['XIV', 'XV', 'XVII'],
      )
    }

    // Portuguese 121-150
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
      const level = i <= 10 ? 'Fácil' : i <= 20 ? 'Médio' : 'Difícil'
      saveQuestion(
        120 + i,
        '9º Ano',
        'Português',
        `Quantas sílabas tem a palavra '${word.w}'?`,
        level,
        word.s,
        ['1', '2', '3', '4', '5'].filter((s) => s !== word.s).slice(0, 3),
      )
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('questions')
    app.truncateCollection(col)
  },
)
