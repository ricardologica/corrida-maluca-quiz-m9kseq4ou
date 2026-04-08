migrate(
  (app) => {
    // Cleanup logic: Delete all records in the questions collection except those for the 7th grade
    app
      .db()
      .newQuery(
        "DELETE FROM questions WHERE suggested_grade != '7º ano' OR suggested_grade IS NULL",
      )
      .execute()

    const questionsCollection = app.findCollectionByNameOrId('questions')

    const data = [
      {
        id: 121,
        tema: 'Sistema Solar',
        pergunta:
          'O Sistema Solar é composto por uma estrela central e diversos corpos celestes que orbitam ao seu redor. Qual é a principal força responsável por manter os planetas em órbita ao redor do Sol?',
        alternativas: [
          'Força Magnética.',
          'Força Eletromagnética.',
          'Força Gravitacional.',
          'Força Nuclear Forte.',
        ],
        resposta_correta: 'Força Gravitacional.',
        explicacao:
          'A força gravitacional, descrita por Isaac Newton, é a atração mútua entre corpos com massa, sendo responsável por manter os planetas em órbita ao redor do Sol.',
        nivel: 'Fácil',
      },
      {
        id: 122,
        tema: 'Movimentos da Terra',
        pergunta:
          'A Terra realiza dois movimentos principais: rotação e translação. Qual é a principal consequência do movimento de rotação da Terra?',
        alternativas: [
          'A sucessão das estações do ano.',
          'A ocorrência de eclipses solares e lunares.',
          'A sucessão dos dias e das noites.',
          'A variação das fases da Lua.',
        ],
        resposta_correta: 'A sucessão dos dias e das noites.',
        explicacao:
          'O movimento de rotação, que a Terra realiza em torno de seu próprio eixo, dura cerca de 24 horas e causa a alternância entre o dia e a noite.',
        nivel: 'Fácil',
      },
      {
        id: 123,
        tema: 'Movimentos da Terra',
        pergunta:
          'O movimento de translação da Terra, combinado com a inclinação do seu eixo de rotação, é responsável por qual fenômeno natural?',
        alternativas: [
          'A sucessão dos dias e das noites.',
          'A ocorrência das estações do ano.',
          'A formação das marés nos oceanos.',
          'A ocorrência de terremotos e vulcões.',
        ],
        resposta_correta: 'A ocorrência das estações do ano.',
        explicacao:
          'A translação (movimento ao redor do Sol) combinada com a inclinação do eixo terrestre faz com que a luz solar incida de forma diferente nos hemisférios ao longo do ano, gerando as estações.',
        nivel: 'Médio',
      },
      {
        id: 124,
        tema: 'Fases da Lua',
        pergunta:
          'A Lua é o único satélite natural da Terra e apresenta quatro fases principais. Qual fase da Lua ocorre quando a face voltada para a Terra está totalmente iluminada pelo Sol?',
        alternativas: ['Lua Nova.', 'Quarto Crescente.', 'Lua Cheia.', 'Quarto Minguante.'],
        resposta_correta: 'Lua Cheia.',
        explicacao:
          'Na fase de Lua Cheia, a Terra está posicionada entre o Sol e a Lua, permitindo que vejamos a face lunar totalmente iluminada.',
        nivel: 'Fácil',
      },
      {
        id: 125,
        tema: 'Eclipses',
        pergunta:
          'Um eclipse solar ocorre quando a Lua se posiciona entre a Terra e o Sol, bloqueando a luz solar. Em qual fase da Lua é possível ocorrer um eclipse solar?',
        alternativas: ['Lua Cheia.', 'Lua Nova.', 'Quarto Crescente.', 'Quarto Minguante.'],
        resposta_correta: 'Lua Nova.',
        explicacao:
          'O eclipse solar só pode ocorrer durante a Lua Nova, quando a Lua se encontra entre a Terra e o Sol, bloqueando a luz solar.',
        nivel: 'Médio',
      },
      {
        id: 126,
        tema: 'Atmosfera',
        pergunta:
          'A atmosfera terrestre é composta por uma mistura de gases essenciais para a vida. Qual é o gás mais abundante na atmosfera da Terra?',
        alternativas: ['Gás Oxigênio.', 'Gás Carbônico.', 'Gás Nitrogênio.', 'Gás Hidrogênio.'],
        resposta_correta: 'Gás Nitrogênio.',
        explicacao:
          'A atmosfera terrestre é composta por aproximadamente 78% de gás nitrogênio, sendo o gás mais abundante.',
        nivel: 'Médio',
      },
      {
        id: 127,
        tema: 'Atmosfera',
        pergunta:
          'A camada de ozônio, localizada na estratosfera, desempenha um papel crucial na proteção da vida na Terra. Qual é a principal função da camada de ozônio?',
        alternativas: [
          'Reter o calor do Sol, causando o efeito estufa.',
          'Filtrar a radiação ultravioleta (UV) nociva emitida pelo Sol.',
          'Produzir oxigênio para a respiração dos seres vivos.',
          'Proteger a Terra do impacto de meteoritos.',
        ],
        resposta_correta: 'Filtrar a radiação ultravioleta (UV) nociva emitida pelo Sol.',
        explicacao:
          'A camada de ozônio atua como um filtro natural, absorvendo grande parte da radiação ultravioleta (UV) prejudicial emitida pelo Sol.',
        nivel: 'Fácil',
      },
      {
        id: 128,
        tema: 'Ciclo da Água',
        pergunta:
          'A hidrosfera compreende toda a água presente no planeta Terra. Qual é a principal fonte de energia que impulsiona o ciclo da água na natureza?',
        alternativas: [
          'A energia geotérmica do interior da Terra.',
          'A energia gravitacional da Lua.',
          'A energia térmica proveniente do Sol.',
          'A energia eólica dos ventos.',
        ],
        resposta_correta: 'A energia térmica proveniente do Sol.',
        explicacao:
          'A energia térmica do Sol aquece a água dos oceanos, rios e lagos, promovendo a evaporação e impulsionando o ciclo da água.',
        nivel: 'Fácil',
      },
      {
        id: 129,
        tema: 'Ciclo da Água',
        pergunta:
          'O ciclo da água envolve diversas etapas, como evaporação, condensação e precipitação. O que ocorre durante a etapa de condensação?',
        alternativas: [
          'A água líquida dos oceanos se transforma em vapor de água.',
          'O vapor de água na atmosfera esfria e se transforma em água líquida, formando as nuvens.',
          'A água cai das nuvens em forma de chuva, neve ou granizo.',
          'A água se infiltra no solo, abastecendo os lençóis freáticos.',
        ],
        resposta_correta:
          'O vapor de água na atmosfera esfria e se transforma em água líquida, formando as nuvens.',
        explicacao:
          'A condensação ocorre quando o vapor de água esfria ao subir na atmosfera, transformando-se em gotículas de água líquida que formam as nuvens.',
        nivel: 'Médio',
      },
      {
        id: 130,
        tema: 'Esferas da Terra',
        pergunta:
          'A biosfera é a camada da Terra onde existe vida. Ela é formada pela interação de quais outras três camadas principais do planeta?',
        alternativas: [
          'Litosfera, Atmosfera e Hidrosfera.',
          'Núcleo, Manto e Crosta.',
          'Troposfera, Estratosfera e Mesosfera.',
          'Biosfera, Hidrosfera e Litosfera.',
        ],
        resposta_correta: 'Litosfera, Atmosfera e Hidrosfera.',
        explicacao:
          'A biosfera é a esfera da vida, que existe e interage nas regiões da litosfera (solo), atmosfera (ar) e hidrosfera (água).',
        nivel: 'Médio',
      },
      {
        id: 131,
        tema: 'Tempo Geológico',
        pergunta:
          'O tempo geológico é utilizado para medir a história da Terra, desde a sua formação até os dias atuais. Qual é a unidade de medida mais comum utilizada no tempo geológico?',
        alternativas: [
          'Dias e semanas.',
          'Anos e décadas.',
          'Séculos e milênios.',
          'Milhões e bilhões de anos.',
        ],
        resposta_correta: 'Milhões e bilhões de anos.',
        explicacao:
          'Devido à vasta idade da Terra (cerca de 4,6 bilhões de anos), o tempo geológico é medido em milhões e bilhões de anos.',
        nivel: 'Fácil',
      },
      {
        id: 132,
        tema: 'Fósseis',
        pergunta:
          'Os fósseis são restos ou vestígios de seres vivos que viveram no passado e foram preservados em rochas. Qual é a principal importância do estudo dos fósseis para a ciência?',
        alternativas: [
          'Eles fornecem evidências sobre a evolução da vida e as mudanças ambientais ao longo do tempo geológico.',
          'Eles são utilizados como fonte de energia renovável.',
          'Eles ajudam a prever o clima e o tempo meteorológico do futuro.',
          'Eles comprovam que a Terra é o centro do Universo.',
        ],
        resposta_correta:
          'Eles fornecem evidências sobre a evolução da vida e as mudanças ambientais ao longo do tempo geológico.',
        explicacao:
          'Os fósseis são registros históricos que permitem aos cientistas entender a evolução das espécies e as condições ambientais do passado da Terra.',
        nivel: 'Médio',
      },
      {
        id: 133,
        tema: 'Origem do Universo',
        pergunta:
          'A teoria do Big Bang é a explicação científica mais aceita para a origem do Universo. O que essa teoria propõe?',
        alternativas: [
          'Que o Universo sempre existiu da forma como o conhecemos hoje.',
          'Que o Universo surgiu a partir da expansão de um ponto extremamente denso e quente.',
          'Que o Universo foi criado a partir da colisão de duas galáxias gigantes.',
          'Que o Universo é uma simulação de computador.',
        ],
        resposta_correta:
          'Que o Universo surgiu a partir da expansão de um ponto extremamente denso e quente.',
        explicacao:
          'A teoria do Big Bang sugere que o Universo começou a partir de uma singularidade extremamente quente e densa que se expandiu e continua se expandindo.',
        nivel: 'Médio',
      },
      {
        id: 134,
        tema: 'Origem do Sistema Solar',
        pergunta:
          'O Sistema Solar se formou a partir de uma nuvem de gás e poeira cósmica chamada nebulosa solar. Como são chamados os pequenos corpos rochosos que colidiram e se uniram para formar os planetas?',
        alternativas: ['Cometas.', 'Meteoritos.', 'Planetesimais.', 'Asteroides.'],
        resposta_correta: 'Planetesimais.',
        explicacao:
          'Planetesimais são pequenos corpos rochosos formados na nebulosa solar que, ao colidirem e se aglutinarem, deram origem aos planetas.',
        nivel: 'Difícil',
      },
      {
        id: 135,
        tema: 'Formato da Terra',
        pergunta:
          'O planeta Terra não é uma esfera perfeita, apresentando um leve achatamento nos polos e um alargamento na região equatorial. Qual é o nome científico dado a esse formato irregular da Terra?',
        alternativas: ['Esfera perfeita.', 'Elipse.', 'Geoide.', 'Cilindro.'],
        resposta_correta: 'Geoide.',
        explicacao:
          'O formato irregular da Terra, com achatamento polar e alargamento equatorial, é cientificamente denominado geoide.',
        nivel: 'Médio',
      },
      {
        id: 136,
        tema: 'Orientação',
        pergunta:
          'A bússola é um instrumento de orientação que utiliza uma agulha magnetizada. Para qual direção a agulha da bússola sempre aponta?',
        alternativas: [
          'Norte Geográfico.',
          'Sul Magnético.',
          'Leste Geográfico.',
          'Norte Magnético.',
        ],
        resposta_correta: 'Norte Magnético.',
        explicacao:
          'A agulha magnetizada da bússola alinha-se com o campo magnético da Terra, apontando para o polo norte magnético.',
        nivel: 'Fácil',
      },
    ]

    for (const item of data) {
      try {
        app.findFirstRecordByData('questions', 'external_id', item.id)
        // Already exists, skip to maintain idempotency
      } catch (_) {
        const record = new Record(questionsCollection)
        record.set('external_id', item.id)
        record.set('theme', item.tema)
        record.set('statement', item.pergunta)
        record.set('option_a', item.alternativas[0])
        record.set('option_b', item.alternativas[1])
        record.set('option_c', item.alternativas[2])
        record.set('option_d', item.alternativas[3])

        let correctOption = 'A'
        const answerIndex = item.alternativas.indexOf(item.resposta_correta)
        if (answerIndex === 1) correctOption = 'B'
        else if (answerIndex === 2) correctOption = 'C'
        else if (answerIndex === 3) correctOption = 'D'

        record.set('correct_option', correctOption)
        record.set('explanation', item.explicacao)
        record.set('difficulty', item.nivel)
        record.set('suggested_grade', '6º ano')

        app.save(record)
      }
    }
  },
  (app) => {
    app.db().newQuery("DELETE FROM questions WHERE suggested_grade = '6º ano'").execute()
  },
)
