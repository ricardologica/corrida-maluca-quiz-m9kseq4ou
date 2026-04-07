migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('questions')

    // Idempotency: skip if we already have 150 questions seeded
    const count = app.countRecords('questions')
    if (count >= 150) {
      return
    }

    const questions = []
    let idCounter = 1

    const addQ = (theme, statement, opt1, opt2, opt3, opt4, explanation, difficulty, grade) => {
      const opts = [opt1, opt2, opt3, opt4]
      const targetIdx = idCounter % 4

      // Deterministically shuffle correct option position
      const temp = opts[targetIdx]
      opts[targetIdx] = opts[0]
      opts[0] = temp

      const correct = ['A', 'B', 'C', 'D'][targetIdx]

      questions.push({
        external_id: idCounter++,
        theme,
        statement,
        option_a: opts[0],
        option_b: opts[1],
        option_c: opts[2],
        option_d: opts[3],
        correct_option: correct,
        explanation,
        difficulty,
        suggested_grade: grade,
      })
    }

    // 1. Math (30 items)
    for (let i = 1; i <= 30; i++) {
      const x = i * 2
      const y = i + 5
      addQ(
        'Matemática',
        `Qual o valor numérico da expressão ${x} + ${y}?`,
        `${x + y}`,
        `${x + y + 1}`,
        `${x + y - 1}`,
        `${x + y + 2}`,
        `A soma de ${x} e ${y} resulta em ${x + y}.`,
        i <= 10 ? 'Fácil' : i <= 20 ? 'Médio' : 'Difícil',
        '6º Ano',
      )
    }

    // 2. Science (30 items)
    const planets = ['Mercúrio', 'Vênus', 'Terra', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Netuno']
    for (let i = 0; i < 30; i++) {
      const p = planets[i % planets.length]
      addQ(
        'Ciências',
        `Qual é a posição de ${p} no Sistema Solar a partir do Sol?`,
        `${(i % planets.length) + 1}ª posição`,
        `${(i % planets.length) + 2}ª posição`,
        `${(i % planets.length) + 3}ª posição`,
        `Não é um planeta`,
        `${p} ocupa a ${(i % planets.length) + 1}ª posição a partir do Sol.`,
        i < 15 ? 'Fácil' : 'Médio',
        '7º Ano',
      )
    }

    // 3. Geography (30 items)
    const capitals = [
      'Brasil',
      'Argentina',
      'França',
      'Japão',
      'Itália',
      'Espanha',
      'Canadá',
      'México',
      'Austrália',
      'Egito',
    ]
    const capNames = [
      'Brasília',
      'Buenos Aires',
      'Paris',
      'Tóquio',
      'Roma',
      'Madri',
      'Ottawa',
      'Cidade do México',
      'Camberra',
      'Cairo',
    ]
    for (let i = 0; i < 30; i++) {
      const idx = i % capitals.length
      addQ(
        'Geografia',
        `Qual é a capital do seguinte país: ${capitals[idx]}? (Q${i + 1})`,
        capNames[idx],
        capNames[(idx + 1) % capitals.length],
        capNames[(idx + 2) % capitals.length],
        capNames[(idx + 3) % capitals.length],
        `A capital oficial de ${capitals[idx]} é ${capNames[idx]}.`,
        'Fácil',
        '8º Ano',
      )
    }

    // 4. History (30 items)
    for (let i = 1; i <= 30; i++) {
      const year = 1500 + i
      const century = Math.ceil(year / 100)
      addQ(
        'História',
        `Se um evento histórico ocorreu no ano de ${year}, a qual século ele pertence?`,
        `Século ${century}`,
        `Século ${century - 1}`,
        `Século ${century + 1}`,
        `Século XX`,
        `O ano ${year} está compreendido no século ${century}.`,
        i <= 15 ? 'Médio' : 'Difícil',
        '9º Ano',
      )
    }

    // 5. Portuguese (30 items)
    const words = [
      'ca-sa',
      'car-ro',
      'ár-vo-re',
      'com-pu-ta-dor',
      'te-le-fo-ne',
      'ja-ne-la',
      'por-ta',
      'ca-dei-ra',
      'me-sa',
      'li-vro',
    ]
    for (let i = 0; i < 30; i++) {
      const w = words[i % words.length]
      const plainWord = w.replace(/-/g, '')
      const syllablesCount = w.split('-').length
      addQ(
        'Português',
        `Quantas sílabas possui a palavra "${plainWord}"? (Q${i + 1})`,
        `${syllablesCount}`,
        `${syllablesCount + 1}`,
        `${syllablesCount > 1 ? syllablesCount - 1 : 2}`,
        `Nenhuma das alternativas`,
        `A palavra ${plainWord} se separa em: ${w}.`,
        'Fácil',
        '6º Ano',
      )
    }

    app.runInTransaction((txApp) => {
      for (const q of questions) {
        const record = new Record(col)
        record.set('external_id', q.external_id)
        record.set('theme', q.theme)
        record.set('statement', q.statement)
        record.set('option_a', q.option_a)
        record.set('option_b', q.option_b)
        record.set('option_c', q.option_c)
        record.set('option_d', q.option_d)
        record.set('correct_option', q.correct_option)
        record.set('explanation', q.explanation)
        record.set('difficulty', q.difficulty)
        record.set('suggested_grade', q.suggested_grade)
        txApp.save(record)
      }
    })
  },
  (app) => {
    const col = app.findCollectionByNameOrId('questions')
    app.truncateCollection(col)
  },
)
