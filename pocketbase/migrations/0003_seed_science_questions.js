const questions = [
  {
    id: 1,
    tema: 'Corpos Celestes',
    pergunta:
      'Uma importante característica que diferencia os corpos celestes é a emissão de luz. Qual é a principal diferença entre uma estrela, como o Sol, e um planeta, como a Terra?',
    alternativas: [
      'Planetas emitem luz própria, enquanto estrelas apenas refletem a luz de outros astros.',
      'Estrelas emitem luz própria, enquanto planetas são corpos iluminados que não possuem luz própria.',
      'Ambos emitem luz própria, mas a luz dos planetas é mais fraca.',
      'Estrelas são formadas apenas de rochas, enquanto planetas são formados de gases luminosos.',
    ],
    resposta_correta:
      'Estrelas emitem luz própria, enquanto planetas são corpos iluminados que não possuem luz própria.',
    explicacao:
      'Corpos celestes luminosos (estrelas) emitem luz própria. Corpos celestes iluminados (planetas) não possuem luz própria e apenas refletem a luz das estrelas.',
    nivel: 'Fácil',
  },
  {
    id: 2,
    tema: 'Gravidade',
    pergunta:
      'A força gravitacional é a força que atrai um objeto para outro. Segundo a Lei da Gravitação Universal, o que faz com que a força gravitacional de um corpo seja maior?',
    alternativas: [
      'Quanto menor a sua massa, maior a sua força gravitacional.',
      'Quanto maior a sua velocidade no espaço, maior a sua força gravitacional.',
      'Quanto maior a sua massa, maior a força gravitacional em direção a ele.',
      'A força gravitacional depende apenas da temperatura do corpo celeste.',
    ],
    resposta_correta: 'Quanto maior a sua massa, maior a força gravitacional em direção a ele.',
    explicacao:
      'A Lei da Gravitação Universal estabelece que quanto maior a massa de um corpo, mais intensa é a sua força gravitacional de atração.',
    nivel: 'Médio',
  },
  {
    id: 3,
    tema: 'Vida na Terra',
    pergunta:
      'O planeta Terra é o terceiro do Sistema Solar. Qual é a principal consequência dessa localização para a existência de vida como a conhecemos?',
    alternativas: [
      'Permite que a Terra seja o único planeta com vulcões ativos.',
      'Propicia a quantidade ideal de raios solares, permitindo a existência de água em estado líquido.',
      'Faz com que a Terra não sofra a ação da força gravitacional do Sol.',
      'Impede que asteroides e cometas atinjam a superfície do planeta.',
    ],
    resposta_correta:
      'Propicia a quantidade ideal de raios solares, permitindo a existência de água em estado líquido.',
    explicacao:
      'A posição da Terra garante uma distância ideal do Sol, evitando que a água congele totalmente ou evapore, mantendo-a em estado líquido, essencial para a vida.',
    nivel: 'Fácil',
  },
  {
    id: 4,
    tema: 'Movimentos da Terra',
    pergunta:
      'O movimento de translação da Terra é responsável por diversos fenômenos que percebemos no nosso cotidiano. O que esse movimento representa?',
    alternativas: [
      'O giro que a Terra faz em torno do seu próprio eixo.',
      'O movimento que a Lua faz ao redor da Terra.',
      'A viagem que o Sistema Solar faz ao redor da galáxia.',
      'O movimento que a Terra realiza em torno do Sol.',
    ],
    resposta_correta: 'O movimento que a Terra realiza em torno do Sol.',
    explicacao:
      'O movimento de translação é a órbita elíptica que a Terra realiza ao redor do Sol, durando aproximadamente 365 dias e 6 horas.',
    nivel: 'Fácil',
  },
  {
    id: 5,
    tema: 'Estações do Ano',
    pergunta:
      'As estações do ano (primavera, verão, outono e inverno) ocorrem devido a uma combinação de dois fatores principais. Quais são eles?',
    alternativas: [
      'O movimento de rotação da Terra e a distância da Lua.',
      'O movimento de translação e a inclinação do eixo da Terra.',
      'A aproximação e o afastamento do Sol em relação à Via Láctea.',
      'O aquecimento global e a força gravitacional de Júpiter.',
    ],
    resposta_correta: 'O movimento de translação e a inclinação do eixo da Terra.',
    explicacao:
      'As estações ocorrem porque o eixo da Terra é inclinado. Conforme a Terra orbita o Sol (translação), diferentes hemisférios recebem luz solar de forma mais ou menos direta ao longo do ano.',
    nivel: 'Médio',
  },
  {
    id: 6,
    tema: 'Estações do Ano',
    pergunta:
      'No Hemisfério Sul, onde o Brasil está localizado, os dias costumam ser mais longos que as noites em qual estação do ano?',
    alternativas: [
      'No verão, devido à maior incidência de luz solar nesse hemisfério.',
      'No inverno, devido à menor incidência de luz solar.',
      'No outono, quando a Terra está mais longe do Sol.',
      'Na primavera, por causa do alinhamento com a Lua.',
    ],
    resposta_correta: 'No verão, devido à maior incidência de luz solar nesse hemisfério.',
    explicacao:
      'No verão, o hemisfério em questão está inclinado em direção ao Sol, recebendo luz solar de forma mais direta e por mais tempo, resultando em dias mais longos que as noites.',
    nivel: 'Médio',
  },
  {
    id: 7,
    tema: 'Tempo Geológico',
    pergunta:
      'O tempo geológico é usado para contar a história da Terra, desde a sua formação até os dias de hoje. Como esse tempo costuma ser contabilizado pelos cientistas?',
    alternativas: [
      'Em dias, semanas e meses.',
      'Em décadas e séculos.',
      'Em milhões e bilhões de anos.',
      'Apenas em anos bissextos.',
    ],
    resposta_correta: 'Em milhões e bilhões de anos.',
    explicacao:
      'O tempo geológico abrange a história da formação do planeta Terra e suas transformações, ocorrendo em uma escala muito vasta, medida em milhões ou bilhões de anos.',
    nivel: 'Fácil',
  },
  {
    id: 8,
    tema: 'Gravidade',
    pergunta:
      'O que acontece com a força gravitacional entre dois objetos quando a distância entre eles aumenta?',
    alternativas: [
      'A força gravitacional se torna mais forte.',
      'A força gravitacional diminui.',
      'A força gravitacional permanece a mesma.',
      'A força gravitacional se transforma em energia luminosa.',
    ],
    resposta_correta: 'A força gravitacional diminui.',
    explicacao:
      'A força gravitacional é inversamente proporcional ao quadrado da distância. Ou seja, quanto mais distantes dois objetos estão um do outro, menor é a atração gravitacional entre eles.',
    nivel: 'Médio',
  },
  {
    id: 9,
    tema: 'Método Científico',
    pergunta:
      "Na ciência, existe uma diferença importante entre 'hipótese' e 'teoria'. Qual das alternativas abaixo define corretamente uma teoria científica?",
    alternativas: [
      'É um palpite sem qualquer tipo de comprovação ou teste.',
      'É uma ideia provisória que ainda não foi testada em laboratório.',
      'É uma explicação baseada em crenças populares e senso comum.',
      'É uma explicação com amplo respaldo em experimentações, observações e evidências científicas.',
    ],
    resposta_correta:
      'É uma explicação com amplo respaldo em experimentações, observações e evidências científicas.',
    explicacao:
      "Uma teoria científica não é um simples 'palpite'. Ela é uma explicação robusta e consolidada para um fenômeno natural, baseada em um grande conjunto de evidências e testes rigorosos.",
    nivel: 'Difícil',
  },
  {
    id: 10,
    tema: 'Terra Primitiva',
    pergunta:
      'Durante a formação da Terra primitiva, o resfriamento do planeta permitiu um evento fundamental para o surgimento da vida. Que evento foi esse?',
    alternativas: [
      'A formação dos anéis de Saturno.',
      "A condensação do vapor d'água e a formação dos oceanos.",
      'O surgimento imediato dos dinossauros.',
      'A explosão do Big Bang.',
    ],
    resposta_correta: "A condensação do vapor d'água e a formação dos oceanos.",
    explicacao:
      'Com o resfriamento da crosta terrestre, o vapor de água presente na atmosfera primitiva condensou-se, causando chuvas intensas que formaram os primeiros oceanos, berço da vida na Terra.',
    nivel: 'Médio',
  },
  {
    id: 11,
    tema: 'Esfericidade da Terra',
    pergunta:
      'O formato da Terra já era estudado desde a Grécia Antiga por pensadores como Pitágoras e Aristóteles. Qual das alternativas abaixo apresenta uma evidência científica observável que comprova a esfericidade da Terra?',
    alternativas: [
      'O fato de a água dos oceanos não cair no espaço sideral.',
      'A sombra curva da Terra projetada na Lua durante um eclipse lunar.',
      'A existência de montanhas e vales na superfície terrestre.',
      'O movimento das nuvens no céu durante uma tempestade.',
    ],
    resposta_correta: 'A sombra curva da Terra projetada na Lua durante um eclipse lunar.',
    explicacao:
      'Durante um eclipse lunar, a sombra que a Terra projeta na superfície da Lua é sempre curva, indicando seu formato esférico.',
    nivel: 'Médio',
  },
  {
    id: 12,
    tema: 'Movimentos da Terra',
    pergunta:
      'A Terra realiza o movimento de rotação girando em torno de seu próprio eixo imaginário. Qual é a principal consequência desse movimento para quem vive no planeta?',
    alternativas: [
      'A sucessão das quatro estações do ano.',
      'A ocorrência dos eclipses solares e lunares.',
      'A sucessão dos dias e das noites.',
      'O aumento da força gravitacional no equador.',
    ],
    resposta_correta: 'A sucessão dos dias e das noites.',
    explicacao:
      'O movimento de rotação dura aproximadamente 24 horas e faz com que parte do planeta fique iluminada (dia) e a face oposta no escuro (noite).',
    nivel: 'Fácil',
  },
  {
    id: 13,
    tema: 'Movimentos da Terra',
    pergunta:
      'O eixo imaginário de rotação da Terra não é totalmente reto em relação à sua órbita. Ele possui uma inclinação de aproximadamente 23,5 graus. O que essa inclinação, combinada com o movimento de translação, provoca?',
    alternativas: [
      'Variações na duração dos dias e das noites ao longo do ano e as estações do ano.',
      'O fenômeno das marés altas e baixas nos oceanos.',
      'A formação de vulcões e terremotos.',
      'O surgimento de anos bissextos a cada quatro anos.',
    ],
    resposta_correta:
      'Variações na duração dos dias e das noites ao longo do ano e as estações do ano.',
    explicacao:
      'A inclinação do eixo faz com que a luz solar atinja os hemisférios de forma desigual ao longo do ano, gerando as estações e alterando a duração dos dias.',
    nivel: 'Médio',
  },
  {
    id: 14,
    tema: 'Eclipses',
    pergunta:
      'Os eclipses são fenômenos astronômicos que ocorrem devido ao alinhamento entre o Sol, a Terra e a Lua. Em qual fase da Lua ocorre o eclipse solar?',
    alternativas: [
      'Apenas na fase de Lua Cheia.',
      'Apenas na fase de Lua Nova.',
      'Nas fases Quarto Crescente e Quarto Minguante.',
      'Em qualquer fase, dependendo apenas da distância da Terra.',
    ],
    resposta_correta: 'Apenas na fase de Lua Nova.',
    explicacao:
      'O eclipse solar acontece quando a Lua se posiciona entre a Terra e o Sol, o que só é possível durante a fase de Lua Nova.',
    nivel: 'Fácil',
  },
  {
    id: 15,
    tema: 'Eclipses',
    pergunta:
      'Durante um eclipse lunar, a Terra se posiciona entre o Sol e a Lua, projetando sua sombra no satélite. Como é chamada a região de sombra onde a luz do Sol é totalmente bloqueada?',
    alternativas: ['Penumbra.', 'Órbita.', 'Umbra.', 'Litosfera.'],
    resposta_correta: 'Umbra.',
    explicacao:
      'A umbra é a região central e mais escura da sombra, onde a fonte de luz é totalmente bloqueada. A penumbra é a região de bloqueio parcial.',
    nivel: 'Difícil',
  },
  {
    id: 16,
    tema: 'Sistema Terra-Sol-Lua',
    pergunta:
      'A Lua realiza o movimento de revolução ao girar ao redor da Terra. Como o tempo desse movimento é sincronizado com o tempo de rotação da própria Lua (cerca de 28 dias), o que percebemos daqui da Terra?',
    alternativas: [
      'A Lua muda de cor a cada semana.',
      'A Lua sempre mostra a mesma face voltada para a Terra.',
      'A Lua desaparece completamente do céu por 15 dias.',
      'A Lua parece girar de cabeça para baixo todas as noites.',
    ],
    resposta_correta: 'A Lua sempre mostra a mesma face voltada para a Terra.',
    explicacao:
      'Devido à sincronização dos movimentos de rotação e revolução, ocorre o travamento de maré, fazendo com que vejamos sempre a mesma face lunar.',
    nivel: 'Médio',
  },
  {
    id: 17,
    tema: 'Eclipses',
    pergunta:
      "O eclipse solar anular é um fenômeno belíssimo, conhecido por formar um 'anel de fogo' no céu. Por que a Lua não cobre completamente o Sol durante esse tipo de eclipse?",
    alternativas: [
      'A Lua está mais distante da Terra na sua órbita.',
      'A Terra está mais próxima do Sol.',
      'O Sol aumenta de tamanho durante o verão.',
      'A Lua está em sua fase cheia.',
    ],
    resposta_correta: 'A Lua está mais distante da Terra na sua órbita.',
    explicacao:
      'No eclipse anular, a Lua está mais distante da Terra (apogeu) e seu tamanho aparente não é suficiente para cobrir todo o disco solar, deixando uma borda visível que parece um anel de fogo.',
    nivel: 'Difícil',
  },
  {
    id: 18,
    tema: 'Sistema Solar',
    pergunta: 'Qual é o maior planeta do Sistema Solar?',
    alternativas: ['Terra.', 'Marte.', 'Júpiter.', 'Saturno.'],
    resposta_correta: 'Júpiter.',
    explicacao:
      'Júpiter é o maior planeta do Sistema Solar, sendo um gigante gasoso com uma massa mais de 300 vezes maior do que a da Terra.',
    nivel: 'Fácil',
  },
  {
    id: 19,
    tema: 'Corpos Celestes',
    pergunta: "O que são as chamadas 'estrelas cadentes' que às vezes observamos no céu noturno?",
    alternativas: [
      'Estrelas que estão morrendo e caindo em direção à Terra.',
      'Meteoros que entram na atmosfera terrestre e queimam.',
      'Cometas que passam muito perto da Lua.',
      'Satélites artificiais que perdem a comunicação.',
    ],
    resposta_correta: 'Meteoros que entram na atmosfera terrestre e queimam.',
    explicacao:
      'Estrelas cadentes são, na verdade, pequenos detritos espaciais (meteoros) que, ao entrarem em alta velocidade na atmosfera, sofrem atrito e queimam, produzindo um rastro de luz.',
    nivel: 'Médio',
  },
  {
    id: 20,
    tema: 'Terra Primitiva',
    pergunta: 'Como era a atmosfera da Terra logo após a sua formação, há bilhões de anos?',
    alternativas: [
      'Era muito semelhante à atual, cheia de oxigênio e rica para a vida.',
      'Era formada apenas por água em estado líquido e gelo.',
      'Era muito quente, com gases vulcânicos tóxicos e sem oxigênio livre.',
      'Era composta inteiramente por oxigênio puro e nitrogênio.',
    ],
    resposta_correta: 'Era muito quente, com gases vulcânicos tóxicos e sem oxigênio livre.',
    explicacao:
      "A atmosfera primitiva era hostil, formada por gases liberados pela intensa atividade vulcânica (como metano, amônia e vapor d'água), e não continha oxigênio livre.",
    nivel: 'Médio',
  },
  {
    id: 21,
    tema: 'Tempo Geológico',
    pergunta:
      'Os dinossauros dominaram a Terra por muito tempo. Em qual das opções abaixo eles viveram?',
    alternativas: [
      'Na Era Paleozoica, também conhecida como Era Primária.',
      'Na Era Mesozoica.',
      'Na Era Cenozoica, junto com os primeiros seres humanos.',
      'No período Pré-Cambriano.',
    ],
    resposta_correta: 'Na Era Mesozoica.',
    explicacao:
      'Os dinossauros existiram durante a Era Mesozoica, que compreende os períodos Triássico, Jurássico e Cretáceo.',
    nivel: 'Médio',
  },
  {
    id: 22,
    tema: 'Método Científico',
    pergunta:
      'Qual é, geralmente, a primeira etapa do método científico para investigar um problema da natureza?',
    alternativas: [
      'A publicação dos resultados em uma revista científica.',
      'A realização de experimentos complexos no laboratório.',
      'A observação de um fenômeno e a formulação de uma pergunta.',
      'A elaboração de uma teoria matemática definitiva.',
    ],
    resposta_correta: 'A observação de um fenômeno e a formulação de uma pergunta.',
    explicacao:
      'O método científico se inicia com a observação atenta da natureza e o questionamento sobre como ou por que algo acontece.',
    nivel: 'Fácil',
  },
  {
    id: 23,
    tema: 'Sistema Terra-Sol-Lua',
    pergunta:
      'O que causa principalmente o fenômeno das marés altas e baixas nos oceanos da Terra?',
    alternativas: [
      'O vento forte que empurra a água para a praia.',
      'A atração gravitacional exercida principalmente pela Lua e também pelo Sol.',
      'O movimento de rotação do núcleo da Terra.',
      'A atividade dos vulcões submarinos.',
    ],
    resposta_correta: 'A atração gravitacional exercida principalmente pela Lua e também pelo Sol.',
    explicacao:
      'As marés são causadas pelas forças gravitacionais que a Lua e o Sol exercem sobre a Terra, que atraem as massas de água dos oceanos.',
    nivel: 'Médio',
  },
  {
    id: 24,
    tema: 'Gravidade',
    pergunta: 'Qual famoso cientista propôs a Lei da Gravitação Universal no século XVII?',
    alternativas: ['Galileu Galilei.', 'Albert Einstein.', 'Isaac Newton.', 'Johannes Kepler.'],
    resposta_correta: 'Isaac Newton.',
    explicacao:
      'Isaac Newton foi o cientista que formulou a Lei da Gravitação Universal, explicando que a força que faz a maçã cair é a mesma que mantém a Lua em órbita.',
    nivel: 'Fácil',
  },
  {
    id: 25,
    tema: 'Movimentos da Terra',
    pergunta: 'Quanto tempo a Terra demora para dar uma volta completa ao redor do Sol?',
    alternativas: [
      '24 horas.',
      'Aproximadamente 365 dias e 6 horas.',
      'Exatos 30 dias.',
      'Cerca de 10 anos.',
    ],
    resposta_correta: 'Aproximadamente 365 dias e 6 horas.',
    explicacao:
      'O movimento de translação da Terra leva 365 dias, 5 horas, 48 minutos e 46 segundos. As horas extras são compensadas no ano bissexto a cada 4 anos.',
    nivel: 'Fácil',
  },
  {
    id: 26,
    tema: 'Estações do Ano',
    pergunta:
      'Quando é inverno no Hemisfério Sul, qual é a estação que ocorre simultaneamente no Hemisfério Norte?',
    alternativas: ['Primavera.', 'Outono.', 'Verão.', 'Inverno também.'],
    resposta_correta: 'Verão.',
    explicacao:
      'Devido à inclinação do eixo da Terra, as estações são opostas nos dois hemisférios. Quando o Sul recebe menos luz direta (inverno), o Norte recebe mais (verão).',
    nivel: 'Fácil',
  },
  {
    id: 27,
    tema: 'Eclipses',
    pergunta:
      'Com que frequência ocorrem eclipses solares totalmente visíveis num mesmo local da Terra?',
    alternativas: [
      'Todos os meses, durante a Lua Nova.',
      'Uma vez a cada seis meses.',
      'Eles são eventos raros de se observar exatamente no mesmo local.',
      'Ocorrem diariamente, mas não percebemos por causa das nuvens.',
    ],
    resposta_correta: 'Eles são eventos raros de se observar exatamente no mesmo local.',
    explicacao:
      'Embora ocorram eclipses solares a cada ano, a sombra da Lua (umbra) projetada na Terra é muito pequena, tornando a visualização em um ponto específico bastante rara.',
    nivel: 'Difícil',
  },
  {
    id: 28,
    tema: 'Vida na Terra',
    pergunta:
      'Qual é o gás essencial para a respiração da maioria dos seres vivos e que compõe cerca de 21% da atmosfera terrestre?',
    alternativas: ['Gás carbônico.', 'Nitrogênio.', 'Oxigênio.', 'Hidrogênio.'],
    resposta_correta: 'Oxigênio.',
    explicacao:
      'O oxigênio (O2) é o gás utilizado pelos seres vivos aeróbicos no processo de respiração celular, vital para a produção de energia, e forma cerca de 21% do ar.',
    nivel: 'Fácil',
  },
  {
    id: 29,
    tema: 'Esfericidade da Terra',
    pergunta:
      'Qual famosa expedição marítima no século XVI comprovou de forma prática que a Terra é redonda ao realizar a primeira circum-navegação?',
    alternativas: [
      'A expedição de Cristóvão Colombo.',
      'A viagem de Pedro Álvares Cabral.',
      'A expedição iniciada por Fernão de Magalhães.',
      'A jornada de Vasco da Gama.',
    ],
    resposta_correta: 'A expedição iniciada por Fernão de Magalhães.',
    explicacao:
      'A expedição de Fernão de Magalhães (e concluída por Juan Sebastián Elcano) foi a primeira a dar a volta ao mundo, confirmando na prática a esfericidade do planeta.',
    nivel: 'Médio',
  },
  {
    id: 30,
    tema: 'Corpos Celestes',
    pergunta:
      'O Sistema Solar, onde a Terra está localizada, faz parte de um sistema muito maior de estrelas, gás e poeira. Qual é o nome desse sistema?',
    alternativas: ['Andrômeda.', 'Via Láctea.', 'Constelação de Órion.', 'Nuvem de Magalhães.'],
    resposta_correta: 'Via Láctea.',
    explicacao:
      'A Via Láctea é a galáxia em espiral que abriga o nosso Sistema Solar, juntamente com bilhões de outras estrelas.',
    nivel: 'Fácil',
  },
]

migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('questions')

    questions.forEach((q) => {
      try {
        app.findFirstRecordByData('questions', 'statement', q.pergunta)
      } catch (_) {
        const record = new Record(col)
        record.set('statement', q.pergunta)
        record.set('theme', q.tema)
        record.set('difficulty', q.nivel)
        record.set('explanation', q.explicacao)
        record.set('option_a', q.alternativas[0])
        record.set('option_b', q.alternativas[1])
        record.set('option_c', q.alternativas[2])
        record.set('option_d', q.alternativas[3])

        let correct = 'A'
        if (q.alternativas[1] === q.resposta_correta) correct = 'B'
        if (q.alternativas[2] === q.resposta_correta) correct = 'C'
        if (q.alternativas[3] === q.resposta_correta) correct = 'D'

        record.set('correct_option', correct)

        app.save(record)
      }
    })
  },
  (app) => {
    questions.forEach((q) => {
      try {
        const record = app.findFirstRecordByData('questions', 'statement', q.pergunta)
        app.delete(record)
      } catch (_) {}
    })
  },
)
