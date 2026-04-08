migrate(
  (app) => {
    const data = [
      {
        id: 1,
        tema: 'Corpos Celestes',
        pergunta: 'O que é uma estrela?',
        alternativas: [
          'Um planeta gigante feito de gás.',
          'Um satélite natural da Terra.',
          'Um corpo celeste que emite luz própria.',
          'Um pedaço de rocha que viaja pelo espaço.',
        ],
        resposta_correta: 'Um corpo celeste que emite luz própria.',
        explicacao:
          'Estrelas, como o nosso Sol, são esferas de gás incandescente que produzem e emitem luz e calor.',
        nivel: 'Fácil',
      },
      {
        id: 2,
        tema: 'Gravidade',
        pergunta:
          'O que nos mantém presos à superfície da Terra e impede que flutuemos para o espaço?',
        alternativas: [
          'O magnetismo.',
          'A força da gravidade.',
          'A pressão atmosférica.',
          'A força centrípeta.',
        ],
        resposta_correta: 'A força da gravidade.',
        explicacao:
          'A gravidade é a força de atração que a Terra exerce sobre todos os corpos em sua superfície e ao seu redor.',
        nivel: 'Fácil',
      },
      {
        id: 3,
        tema: 'Vida na Terra',
        pergunta:
          'Qual é o gás encontrado na atmosfera terrestre essencial para a respiração da maioria dos seres vivos?',
        alternativas: ['Gás carbônico.', 'Nitrogênio.', 'Oxigênio.', 'Hidrogênio.'],
        resposta_correta: 'Oxigênio.',
        explicacao:
          'O oxigênio (O2) é fundamental para a respiração celular da maioria dos seres vivos na Terra.',
        nivel: 'Fácil',
      },
      {
        id: 4,
        tema: 'Movimentos da Terra',
        pergunta: 'Qual movimento da Terra é responsável pela alternância entre dia e noite?',
        alternativas: ['Translação.', 'Rotação.', 'Nutação.', 'Precessão.'],
        resposta_correta: 'Rotação.',
        explicacao:
          'A rotação é o movimento que a Terra faz em torno do seu próprio eixo, durando cerca de 24 horas e causando os dias e noites.',
        nivel: 'Fácil',
      },
      {
        id: 5,
        tema: 'Estações do Ano',
        pergunta:
          'O movimento de translação da Terra, junto com a inclinação do seu eixo, causa qual fenômeno?',
        alternativas: ['As fases da Lua.', 'As marés.', 'Os dias e noites.', 'As estações do ano.'],
        resposta_correta: 'As estações do ano.',
        explicacao:
          'As estações do ano ocorrem devido à inclinação do eixo da Terra e sua órbita em torno do Sol (translação).',
        nivel: 'Média',
      },
      {
        id: 6,
        tema: 'Estações do Ano',
        pergunta: 'Quando é verão no Hemisfério Sul, qual é a estação no Hemisfério Norte?',
        alternativas: ['Verão.', 'Primavera.', 'Inverno.', 'Outono.'],
        resposta_correta: 'Inverno.',
        explicacao:
          'Devido à inclinação do eixo terrestre, os hemisférios recebem quantidades diferentes de luz solar, resultando em estações opostas.',
        nivel: 'Fácil',
      },
      {
        id: 7,
        tema: 'Tempo Geológico',
        pergunta: 'Qual é a era geológica famosa pelo domínio dos dinossauros na Terra?',
        alternativas: ['Era Paleozoica.', 'Era Mesozoica.', 'Era Cenozoica.', 'Era Arqueozoica.'],
        resposta_correta: 'Era Mesozoica.',
        explicacao:
          "A Era Mesozoica é conhecida como a 'era dos dinossauros', dividida nos períodos Triássico, Jurássico e Cretáceo.",
        nivel: 'Média',
      },
      {
        id: 8,
        tema: 'Gravidade',
        pergunta:
          'Qual astro exerce a maior influência direta sobre as marés dos oceanos da Terra?',
        alternativas: ['O Sol.', 'Marte.', 'A Lua.', 'Júpiter.'],
        resposta_correta: 'A Lua.',
        explicacao:
          'Embora o Sol também influencie, a atração gravitacional da Lua é a principal responsável pela formação das marés devido à sua proximidade com a Terra.',
        nivel: 'Média',
      },
      {
        id: 9,
        tema: 'Método Científico',
        pergunta: 'Qual é normalmente considerado o primeiro passo do método científico?',
        alternativas: [
          'Realizar um experimento.',
          'Fazer uma observação e formular uma pergunta.',
          'Analisar os dados.',
          'Publicar os resultados.',
        ],
        resposta_correta: 'Fazer uma observação e formular uma pergunta.',
        explicacao:
          'O método científico começa com a observação de um fenômeno, que leva à formulação de uma pergunta e posteriormente de uma hipótese.',
        nivel: 'Média',
      },
      {
        id: 10,
        tema: 'Terra Primitiva',
        pergunta: 'Como era a atmosfera da Terra primitiva em comparação com a atual?',
        alternativas: [
          'Igual à atual, rica em oxigênio.',
          'Sem gases, era um vácuo.',
          'Rica em gases como metano e amônia, e sem oxigênio livre.',
          "Composta apenas de vapor d'água.",
        ],
        resposta_correta: 'Rica em gases como metano e amônia, e sem oxigênio livre.',
        explicacao:
          'A atmosfera primitiva era muito diferente, composta principalmente de vapor de água, metano, amônia e hidrogênio, sem oxigênio livre.',
        nivel: 'Média',
      },
      {
        id: 11,
        tema: 'Esfericidade da Terra',
        pergunta: 'Qual observação antiga ajudou a comprovar que a Terra não é plana?',
        alternativas: [
          'O fato de que os rios fluem para o mar.',
          'O desaparecimento de navios no horizonte de baixo para cima.',
          'As estrelas são todas do mesmo tamanho.',
          'A Lua tem fases.',
        ],
        resposta_correta: 'O desaparecimento de navios no horizonte de baixo para cima.',
        explicacao:
          'Ao observar um navio se afastando, o casco desaparece primeiro e depois o mastro, evidenciando a curvatura da Terra.',
        nivel: 'Média',
      },
      {
        id: 12,
        tema: 'Movimentos da Terra',
        pergunta:
          'Aproximadamente quanto tempo a Terra leva para completar uma translação ao redor do Sol?',
        alternativas: ['24 horas.', '30 dias.', '365 dias e 6 horas.', '10 anos.'],
        resposta_correta: '365 dias e 6 horas.',
        explicacao:
          'O movimento de translação dura cerca de 365 dias e 6 horas, o que define a duração do nosso ano.',
        nivel: 'Fácil',
      },
      {
        id: 13,
        tema: 'Movimentos da Terra',
        pergunta:
          'O que compensa as 6 horas restantes do movimento de translação a cada quatro anos?',
        alternativas: [
          'O horário de verão.',
          'Um mês a mais no ano.',
          'O ano bissexto, com um dia a mais em fevereiro.',
          'Um eclipse solar total.',
        ],
        resposta_correta: 'O ano bissexto, com um dia a mais em fevereiro.',
        explicacao:
          'As cerca de 6 horas excedentes por ano somam 24 horas em 4 anos, criando o dia 29 de fevereiro nos anos bissextos.',
        nivel: 'Fácil',
      },
      {
        id: 14,
        tema: 'Eclipses',
        pergunta: 'O que ocorre durante um eclipse solar?',
        alternativas: [
          'A Terra fica entre o Sol e a Lua.',
          'O Sol fica entre a Terra e a Lua.',
          'A Lua fica entre o Sol e a Terra, bloqueando a luz solar.',
          'A Lua desaparece atrás de outro planeta.',
        ],
        resposta_correta: 'A Lua fica entre o Sol e a Terra, bloqueando a luz solar.',
        explicacao:
          'No eclipse solar, a Lua projeta sua sombra na Terra, ocultando o Sol total ou parcialmente.',
        nivel: 'Média',
      },
      {
        id: 15,
        tema: 'Eclipses',
        pergunta: 'O que ocorre durante um eclipse lunar?',
        alternativas: [
          'A Lua bloqueia a luz do Sol.',
          'A Terra projeta sua sombra sobre a Lua, que está na fase cheia.',
          'O Sol apaga temporariamente.',
          'A Lua fica entre a Terra e o Sol.',
        ],
        resposta_correta: 'A Terra projeta sua sombra sobre a Lua, que está na fase cheia.',
        explicacao:
          'O eclipse lunar acontece quando a Terra se posiciona exatamente entre o Sol e a Lua, escurecendo a Lua Cheia.',
        nivel: 'Média',
      },
      {
        id: 16,
        tema: 'Sistema Terra-Sol-Lua',
        pergunta: 'Qual é o alinhamento correto dos astros durante um eclipse solar?',
        alternativas: [
          'Terra - Lua - Sol',
          'Sol - Lua - Terra',
          'Lua - Sol - Terra',
          'Terra - Sol - Lua',
        ],
        resposta_correta: 'Sol - Lua - Terra',
        explicacao:
          'Para que ocorra um eclipse solar, a Lua deve se interpor exatamente entre o Sol e a Terra.',
        nivel: 'Difícil',
      },
      {
        id: 17,
        tema: 'Eclipses',
        pergunta: 'Por que não ocorrem eclipses em todos os meses?',
        alternativas: [
          'Porque o Sol se move muito rápido.',
          'Porque a Terra é muito grande.',
          'Porque a órbita da Lua é inclinada em relação à órbita da Terra.',
          'Porque a Lua não brilha o suficiente.',
        ],
        resposta_correta: 'Porque a órbita da Lua é inclinada em relação à órbita da Terra.',
        explicacao:
          'O plano orbital da Lua tem uma inclinação de cerca de 5 graus em relação ao da Terra, então o alinhamento perfeito é raro.',
        nivel: 'Difícil',
      },
      {
        id: 18,
        tema: 'Origem da Terra',
        pergunta:
          'Qual é a teoria científica mais aceita para a formação inicial do nosso Sistema Solar e da Terra?',
        alternativas: [
          'Teoria do Universo Estacionário.',
          'Teoria da Geração Espontânea.',
          'Teoria da Nebulosa Solar.',
          'Teoria do Geocentrismo.',
        ],
        resposta_correta: 'Teoria da Nebulosa Solar.',
        explicacao:
          'A teoria nebular propõe que o Sistema Solar se formou a partir do colapso de uma nuvem gigante de gás e poeira.',
        nivel: 'Difícil',
      },
      {
        id: 19,
        tema: 'Estações do Ano',
        pergunta: 'O que marca um equinócio?',
        alternativas: [
          'O dia mais longo do ano.',
          'O momento em que o dia e a noite têm a mesma duração.',
          'A noite mais longa do ano.',
          'Um dia sem sol.',
        ],
        resposta_correta: 'O momento em que o dia e a noite têm a mesma duração.',
        explicacao:
          'No equinócio, os raios solares incidem perpendicularmente à Linha do Equador, igualando a duração do dia e da noite.',
        nivel: 'Média',
      },
      {
        id: 20,
        tema: 'Formato da Terra',
        pergunta: 'A Terra não é uma esfera perfeita. Qual é a melhor descrição da sua forma?',
        alternativas: [
          'Um cubo arredondado.',
          'Um cilindro plano.',
          'Uma esfera perfeita.',
          'Um geoide, levemente achatada nos polos.',
        ],
        resposta_correta: 'Um geoide, levemente achatada nos polos.',
        explicacao:
          'Devido ao movimento de rotação, a Terra possui um leve achatamento nos polos e um abaulamento no equador, sendo chamada de geoide.',
        nivel: 'Média',
      },
      {
        id: 21,
        tema: 'Fases da Lua',
        pergunta: 'Quais são as quatro fases principais da Lua?',
        alternativas: [
          'Nova, Alta, Baixa e Cheia.',
          'Nova, Crescente, Cheia e Minguante.',
          'Clara, Escura, Meia e Inteira.',
          'Crescente, Decrescente, Alta e Baixa.',
        ],
        resposta_correta: 'Nova, Crescente, Cheia e Minguante.',
        explicacao:
          'Estas são as quatro aparências principais da Lua no céu durante seu ciclo de 29,5 dias.',
        nivel: 'Fácil',
      },
      {
        id: 22,
        tema: 'Fases da Lua',
        pergunta:
          'Em qual fase a face iluminada da Lua está voltada para o Sol e a face escura voltada para a Terra, tornando-a invisível à noite?',
        alternativas: ['Lua Minguante.', 'Lua Cheia.', 'Lua Nova.', 'Lua Crescente.'],
        resposta_correta: 'Lua Nova.',
        explicacao:
          'Na Lua Nova, a Lua está entre a Terra e o Sol, então a parte iluminada não pode ser vista da Terra.',
        nivel: 'Média',
      },
      {
        id: 23,
        tema: 'Eclipses',
        pergunta: 'Um eclipse lunar só pode ocorrer durante qual fase da Lua?',
        alternativas: ['Lua Crescente.', 'Lua Minguante.', 'Lua Nova.', 'Lua Cheia.'],
        resposta_correta: 'Lua Cheia.',
        explicacao:
          'O eclipse lunar acontece quando a Terra sombreia a Lua, o que só é possível quando a Lua está em oposição ao Sol, na fase Cheia.',
        nivel: 'Difícil',
      },
      {
        id: 24,
        tema: 'Eclipses',
        pergunta: 'Um eclipse solar só pode ocorrer durante qual fase da Lua?',
        alternativas: ['Lua Minguante.', 'Lua Nova.', 'Lua Cheia.', 'Lua Crescente.'],
        resposta_correta: 'Lua Nova.',
        explicacao:
          'Para que a Lua bloqueie a luz do Sol, ela deve estar entre a Terra e o Sol, o que ocorre apenas na fase de Lua Nova.',
        nivel: 'Difícil',
      },
      {
        id: 25,
        tema: 'Ciclo da Água',
        pergunta: 'No ciclo da água, o que é a evaporação?',
        alternativas: [
          'A passagem da água do estado gasoso para o líquido.',
          'A queda de água das nuvens como chuva.',
          'O congelamento da água dos rios.',
          'A passagem da água do estado líquido para o gasoso devido ao calor.',
        ],
        resposta_correta: 'A passagem da água do estado líquido para o gasoso devido ao calor.',
        explicacao:
          'A evaporação é o processo em que a água líquida se transforma em vapor de água sob a ação do calor solar.',
        nivel: 'Fácil',
      },
      {
        id: 26,
        tema: 'Vida na Terra',
        pergunta:
          'Qual característica planetária da Terra é fundamental para a manutenção da água no estado líquido?',
        alternativas: [
          'A presença de muitos vulcões.',
          'O seu núcleo de ferro.',
          'Sua distância exata do Sol (Zona Habitável).',
          'Sua rotação muito rápida.',
        ],
        resposta_correta: 'Sua distância exata do Sol (Zona Habitável).',
        explicacao:
          'A Terra está na chamada Zona Habitável do Sistema Solar, onde as temperaturas permitem a existência de água líquida.',
        nivel: 'Média',
      },
      {
        id: 27,
        tema: 'Mudanças Climáticas',
        pergunta: 'O que é o efeito estufa natural?',
        alternativas: [
          'O resfriamento extremo da Terra.',
          'A destruição da camada de ozônio.',
          'A poluição causada pelos carros.',
          'Um fenômeno natural que retém parte do calor do Sol, mantendo a Terra aquecida.',
        ],
        resposta_correta:
          'Um fenômeno natural que retém parte do calor do Sol, mantendo a Terra aquecida.',
        explicacao:
          'O efeito estufa é um processo natural e vital, pois os gases da atmosfera retêm calor, sem o qual a Terra seria muito fria.',
        nivel: 'Média',
      },
      {
        id: 28,
        tema: 'Sustentabilidade',
        pergunta: 'O que o conceito de desenvolvimento sustentável propõe?',
        alternativas: [
          'Parar todo tipo de produção e consumo humano.',
          'Explorar os recursos até que se esgotem.',
          'Aumentar a poluição para gerar mais riqueza.',
          'Atender às necessidades do presente sem comprometer as gerações futuras.',
        ],
        resposta_correta:
          'Atender às necessidades do presente sem comprometer as gerações futuras.',
        explicacao:
          'Desenvolvimento sustentável busca o equilíbrio entre crescimento econômico, preservação ambiental e bem-estar social.',
        nivel: 'Média',
      },
      {
        id: 29,
        tema: 'Clima no Brasil',
        pergunta:
          'Qual bioma brasileiro é caracterizado por clima semiárido, longos períodos de seca e vegetação adaptada à falta de água?',
        alternativas: ['Amazônia.', 'Caatinga.', 'Pampa.', 'Mata Atlântica.'],
        resposta_correta: 'Caatinga.',
        explicacao:
          'A Caatinga é um bioma exclusivamente brasileiro, adaptado às condições de baixa umidade do clima semiárido.',
        nivel: 'Fácil',
      },
      {
        id: 30,
        tema: 'Clima no Brasil',
        pergunta: 'Qual é a principal característica climática da Floresta Amazônica?',
        alternativas: [
          'Clima frio e seco.',
          'Clima temperado com estações bem definidas.',
          'Clima quente e muito úmido durante todo o ano.',
          'Clima desértico.',
        ],
        resposta_correta: 'Clima quente e muito úmido durante todo o ano.',
        explicacao:
          'A Amazônia possui um clima equatorial, com altas temperaturas e chuvas abundantes praticamente o ano todo.',
        nivel: 'Fácil',
      },
    ]

    const col = app.findCollectionByNameOrId('questions')

    for (const item of data) {
      let exists = false

      try {
        app.findFirstRecordByData('questions', 'statement', item.pergunta)
        exists = true
      } catch (_) {}

      if (!exists && item.id != null) {
        try {
          app.findFirstRecordByData('questions', 'external_id', item.id)
          exists = true
        } catch (_) {}
      }

      if (!exists) {
        const idx = item.alternativas.indexOf(item.resposta_correta)
        const letter = ['A', 'B', 'C', 'D'][idx] || 'A'

        const record = new Record(col)
        record.set('external_id', item.id)
        record.set('theme', item.tema)
        record.set('statement', item.pergunta)
        record.set('option_a', item.alternativas[0])
        record.set('option_b', item.alternativas[1])
        record.set('option_c', item.alternativas[2])
        record.set('option_d', item.alternativas[3])
        record.set('correct_option', letter)
        record.set('explanation', item.explicacao)
        record.set('difficulty', item.nivel)
        record.set('suggested_grade', '6º Ano')

        app.save(record)
      }
    }
  },
  (app) => {
    const statements = [
      'O que é uma estrela?',
      'O que nos mantém presos à superfície da Terra e impede que flutuemos para o espaço?',
      'Qual é o gás encontrado na atmosfera terrestre essencial para a respiração da maioria dos seres vivos?',
      'Qual movimento da Terra é responsável pela alternância entre dia e noite?',
      'O movimento de translação da Terra, junto com a inclinação do seu eixo, causa qual fenômeno?',
      'Quando é verão no Hemisfério Sul, qual é a estação no Hemisfério Norte?',
      'Qual é a era geológica famosa pelo domínio dos dinossauros na Terra?',
      'Qual astro exerce a maior influência direta sobre as marés dos oceanos da Terra?',
      'Qual é normalmente considerado o primeiro passo do método científico?',
      'Como era a atmosfera da Terra primitiva em comparação com a atual?',
      'Qual observação antiga ajudou a comprovar que a Terra não é plana?',
      'Aproximadamente quanto tempo a Terra leva para completar uma translação ao redor do Sol?',
      'O que compensa as 6 horas restantes do movimento de translação a cada quatro anos?',
      'O que ocorre durante um eclipse solar?',
      'O que ocorre durante um eclipse lunar?',
      'Qual é o alinhamento correto dos astros durante um eclipse solar?',
      'Por que não ocorrem eclipses em todos os meses?',
      'Qual é a teoria científica mais aceita para a formação inicial do nosso Sistema Solar e da Terra?',
      'O que marca um equinócio?',
      'A Terra não é uma esfera perfeita. Qual é a melhor descrição da sua forma?',
      'Quais são as quatro fases principais da Lua?',
      'Em qual fase a face iluminada da Lua está voltada para o Sol e a face escura voltada para a Terra, tornando-a invisível à noite?',
      'Um eclipse lunar só pode ocorrer durante qual fase da Lua?',
      'Um eclipse solar só pode ocorrer durante qual fase da Lua?',
      'No ciclo da água, o que é a evaporação?',
      'Qual característica planetária da Terra é fundamental para a manutenção da água no estado líquido?',
      'O que é o efeito estufa natural?',
      'O que o conceito de desenvolvimento sustentável propõe?',
      'Qual bioma brasileiro é caracterizado por clima semiárido, longos períodos de seca e vegetação adaptada à falta de água?',
      'Qual é a principal característica climática da Floresta Amazônica?',
    ]

    for (const statement of statements) {
      try {
        const record = app.findFirstRecordByData('questions', 'statement', statement)
        app.delete(record)
      } catch (_) {}
    }
  },
)
