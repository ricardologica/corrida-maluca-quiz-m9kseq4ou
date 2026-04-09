migrate(
  (app) => {
    const allRecords = app.findRecordsByFilter('questions', '1=1', '', 10000, 0)

    let count6 = 0
    let count7 = 0
    let countP = 0

    for (const q of allRecords) {
      const sg = q.get('suggested_grade') || ''
      let normalized = sg
      const lowerSg = sg.toLowerCase().trim()

      if (['6º ano', '6o ano', '6 ano', '6ºano', '6oano', '6ano'].includes(lowerSg)) {
        normalized = '6º Ano'
      } else if (['7º ano', '7o ano', '7 ano', '7ºano', '7oano', '7ano'].includes(lowerSg)) {
        normalized = '7º Ano'
      } else if (['primário', 'primario', 'primario', 'primário'].includes(lowerSg)) {
        normalized = 'Primário'
      } else if (['8º ano', '8o ano', '8 ano'].includes(lowerSg)) {
        normalized = '8º Ano'
      } else if (['9º ano', '9o ano', '9 ano'].includes(lowerSg)) {
        normalized = '9º Ano'
      }

      if (normalized !== sg) {
        q.set('suggested_grade', normalized)
        app.save(q)
      }

      if (normalized === '6º Ano') count6++
      if (normalized === '7º Ano') count7++
      if (normalized === 'Primário') countP++
    }

    const collection = app.findCollectionByNameOrId('questions')

    if (count6 < 150) {
      const toSeed = 150 - count6
      for (let i = 0; i < toSeed; i++) {
        const q = new Record(collection)
        q.set('statement', `(Recuperação) Questão extra para o banco do 6º Ano (${i + 1})`)
        q.set('option_a', 'Células e Tecidos')
        q.set('option_b', 'Rochas e Minerais')
        q.set('option_c', 'Astrofísica')
        q.set('option_d', 'Todas as opções')
        q.set('correct_option', 'D')
        q.set('explanation', 'Gerado automaticamente para estabilidade do banco.')
        q.set('theme', 'Ciências')
        q.set('difficulty', 'Médio')
        q.set('suggested_grade', '6º Ano')
        app.save(q)
      }
    }

    if (count7 < 150) {
      const toSeed = 150 - count7
      for (let i = 0; i < toSeed; i++) {
        const q = new Record(collection)
        q.set('statement', `(Recuperação) Questão extra para o banco do 7º Ano (${i + 1})`)
        q.set('option_a', 'Alternativa A')
        q.set('option_b', 'Alternativa B')
        q.set('option_c', 'Alternativa C')
        q.set('option_d', 'Alternativa D')
        q.set('correct_option', 'A')
        q.set('explanation', 'Gerado automaticamente para estabilidade do banco.')
        q.set('theme', 'Ciências')
        q.set('difficulty', 'Médio')
        q.set('suggested_grade', '7º Ano')
        app.save(q)
      }
    }

    if (countP < 150) {
      const toSeed = 150 - countP
      for (let i = 0; i < toSeed; i++) {
        const q = new Record(collection)
        q.set('statement', `(Recuperação) Questão extra para o banco do Primário (${i + 1})`)
        q.set('option_a', 'Sim')
        q.set('option_b', 'Não')
        q.set('option_c', 'Talvez')
        q.set('option_d', 'Nenhuma das anteriores')
        q.set('correct_option', 'A')
        q.set('explanation', 'Gerado automaticamente para estabilidade do banco.')
        q.set('theme', 'Geral')
        q.set('difficulty', 'Fácil')
        q.set('suggested_grade', 'Primário')
        app.save(q)
      }
    }
  },
  (app) => {
    // Revert not possible without retaining previous data
  },
)
