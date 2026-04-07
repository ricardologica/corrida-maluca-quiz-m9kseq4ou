migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    // Seed Teacher
    let teacherId = ''
    try {
      const t = app.findAuthRecordByEmail('_pb_users_auth_', 'ricardo.matematico@gmail.com')
      teacherId = t.id
    } catch (_) {
      const record = new Record(users)
      record.setEmail('ricardo.matematico@gmail.com')
      record.setPassword('Skip@Pass')
      record.setVerified(true)
      record.set('name', 'Ricardo_Professor')
      record.set('role', 'teacher')
      app.save(record)
      teacherId = record.id
    }

    // Seed Game Session
    const gameSessions = app.findCollectionByNameOrId('game_sessions')
    let sessionId = ''
    try {
      const s = app.findFirstRecordByData('game_sessions', 'code', 'CORRIDA123')
      sessionId = s.id
    } catch (_) {
      const session = new Record(gameSessions)
      session.set('code', 'CORRIDA123')
      session.set('status', 'active')
      session.set('created_by', teacherId)
      app.save(session)
      sessionId = session.id
    }

    // Seed Questions
    const questions = app.findCollectionByNameOrId('questions')
    const qData = [
      {
        statement: 'Qual planeta é conhecido como Planeta Vermelho?',
        option_a: 'Marte',
        option_b: 'Vênus',
        option_c: 'Júpiter',
        option_d: 'Saturno',
        correct_option: 'A',
        explanation:
          'Marte tem uma aparência avermelhada devido ao óxido de ferro em sua superfície.',
        theme: 'Sistema Solar',
        difficulty: 'Fácil',
        suggested_grade: '6º Ano',
      },
      {
        statement: 'Qual movimento da Terra é responsável pelas estações do ano?',
        option_a: 'Rotação',
        option_b: 'Translação',
        option_c: 'Nutação',
        option_d: 'Precessão',
        correct_option: 'B',
        explanation:
          'A translação, junto com a inclinação do eixo da Terra, causa as estações do ano.',
        theme: 'Rotação e Translação',
        difficulty: 'Médio',
        suggested_grade: '6º Ano',
      },
      {
        statement: 'Qual é a camada mais interna da Terra?',
        option_a: 'Crosta',
        option_b: 'Manto',
        option_c: 'Núcleo Externo',
        option_d: 'Núcleo Interno',
        correct_option: 'D',
        explanation:
          'O núcleo interno é a camada mais profunda e é sólido, composto principalmente de ferro e níquel.',
        theme: 'Camadas da Terra',
        difficulty: 'Fácil',
        suggested_grade: '6º Ano',
      },
      {
        statement: 'Qual é o maior planeta do Sistema Solar?',
        option_a: 'Terra',
        option_b: 'Saturno',
        option_c: 'Júpiter',
        option_d: 'Urano',
        correct_option: 'C',
        explanation: 'Júpiter é um gigante gasoso e o maior planeta do nosso sistema solar.',
        theme: 'Sistema Solar',
        difficulty: 'Fácil',
        suggested_grade: '6º Ano',
      },
      {
        statement:
          'Quanto tempo a Terra leva para completar uma rotação em torno de seu próprio eixo?',
        option_a: '24 horas',
        option_b: '365 dias',
        option_c: '12 horas',
        option_d: '30 dias',
        correct_option: 'A',
        explanation:
          'A rotação da Terra leva aproximadamente 24 horas, definindo o ciclo do dia e da noite.',
        theme: 'Rotação e Translação',
        difficulty: 'Fácil',
        suggested_grade: '6º Ano',
      },
    ]

    // We need exactly 30 questions for a session
    for (let i = 0; i < 30; i++) {
      const template = qData[i % qData.length]
      const qStatement = template.statement + (i >= qData.length ? ` (Q${i + 1})` : '')
      try {
        app.findFirstRecordByData('questions', 'statement', qStatement)
      } catch (_) {
        const q = new Record(questions)
        q.set('statement', qStatement)
        q.set('option_a', template.option_a)
        q.set('option_b', template.option_b)
        q.set('option_c', template.option_c)
        q.set('option_d', template.option_d)
        q.set('correct_option', template.correct_option)
        q.set('explanation', template.explanation)
        q.set('theme', template.theme)
        q.set('difficulty', template.difficulty)
        q.set('suggested_grade', template.suggested_grade)
        app.save(q)
      }
    }
  },
  (app) => {
    // down
  },
)
