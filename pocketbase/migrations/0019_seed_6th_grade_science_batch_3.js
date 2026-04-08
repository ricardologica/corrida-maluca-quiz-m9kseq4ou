migrate(
  (app) => {
    const questions = [
      {
        id: 91,
        tema: 'Planetas do Sistema Solar',
        pergunta:
          "O planeta Vênus é muitas vezes chamado de 'Estrela-d'alva'. Por que ele brilha tanto no céu noturno?",
        alternativas: [
          'Sua atmosfera densa reflete intensamente a luz do Sol.',
          'Ele possui anéis de gelo brilhantes.',
          'Ele emite luz própria como uma estrela.',
          'Sua superfície é coberta por oceanos de água.',
        ],
        resposta_correta: 'Sua atmosfera densa reflete intensamente a luz do Sol.',
        explicacao:
          'A atmosfera de Vênus possui nuvens espessas que refletem a luz do Sol de maneira muito eficiente, fazendo dele um dos astros mais brilhantes no céu.',
        nivel: 'Médio',
      },
      {
        id: 92,
        tema: 'Planetas do Sistema Solar',
        pergunta:
          'Júpiter e Saturno são os maiores planetas do nosso Sistema Solar. Como eles são classificados?',
        alternativas: [
          'Planetas Telúricos.',
          'Planetas Anões.',
          'Gigantes Gasosos.',
          'Gigantes de Gelo.',
        ],
        resposta_correta: 'Gigantes Gasosos.',
        explicacao:
          'Júpiter e Saturno não têm uma superfície sólida bem definida e são compostos primariamente por hidrogênio e hélio.',
        nivel: 'Fácil',
      },
      {
        id: 93,
        tema: 'Planetas do Sistema Solar',
        pergunta:
          'Urano e Netuno são os planetas mais distantes do Sol no nosso sistema. Como eles são classificados?',
        alternativas: [
          'Gigantes de Gelo.',
          'Gigantes Gasosos.',
          'Planetas Rochosos.',
          'Exoplanetas.',
        ],
        resposta_correta: 'Gigantes de Gelo.',
        explicacao:
          'Apesar de possuírem gás, a maior parte da composição deles envolve compostos mais pesados como água, amônia e metano congelados.',
        nivel: 'Médio',
      },
      {
        id: 94,
        tema: 'Planetas do Sistema Solar',
        pergunta: 'Qual é o menor e mais interno planeta do Sistema Solar?',
        alternativas: ['Vênus.', 'Terra.', 'Marte.', 'Mercúrio.'],
        resposta_correta: 'Mercúrio.',
        explicacao:
          'Mercúrio orbita muito próximo ao Sol e, devido ao seu tamanho reduzido, é o menor planeta do Sistema Solar.',
        nivel: 'Fácil',
      },
      {
        id: 95,
        tema: 'Planetas do Sistema Solar',
        pergunta:
          "Marte é conhecido como o 'Planeta Vermelho'. O que lhe confere essa coloração característica?",
        alternativas: [
          'O reflexo do Sol em seus oceanos profundos.',
          'A presença de vulcanismo ativo incessante.',
          'A grande quantidade de óxido de ferro na superfície.',
          'A atmosfera muito espessa rica em poeira avermelhada.',
        ],
        resposta_correta: 'A grande quantidade de óxido de ferro na superfície.',
        explicacao:
          'O óxido de ferro (comum em ferrugem) presente no solo de Marte dá a cor avermelhada característica ao planeta.',
        nivel: 'Médio',
      },
      {
        id: 96,
        tema: 'Camadas da Terra',
        pergunta: 'Qual é o nome da camada mais externa e fina do planeta Terra?',
        alternativas: [
          'Núcleo Externo.',
          'Manto Subterrâneo.',
          'Núcleo Interno.',
          'Crosta Terrestre (Litosfera).',
        ],
        resposta_correta: 'Crosta Terrestre (Litosfera).',
        explicacao:
          'A crosta terrestre é a casca rochosa do planeta, onde se encontram os continentes e os fundos oceânicos.',
        nivel: 'Fácil',
      },
      {
        id: 97,
        tema: 'Camadas da Terra',
        pergunta:
          'Abaixo da crosta terrestre encontra-se a camada mais espessa do planeta. Como ela se chama?',
        alternativas: ['Litosfera.', 'Manto.', 'Núcleo Metálico.', 'Magma Vulcânico Livre.'],
        resposta_correta: 'Manto.',
        explicacao:
          'O manto fica logo abaixo da crosta e é formado por rochas ricas em magnésio e ferro, parte em estado pastoso.',
        nivel: 'Fácil',
      },
      {
        id: 98,
        tema: 'Camadas da Terra',
        pergunta: 'Quais são os dois metais principais que compõem o núcleo da Terra?',
        alternativas: ['Ouro e Prata.', 'Cobre e Zinco.', 'Silício e Magnésio.', 'Ferro e Níquel.'],
        resposta_correta: 'Ferro e Níquel.',
        explicacao:
          'A imensa pressão e densidade no centro da Terra concentraram majoritariamente os metais pesados ferro e níquel.',
        nivel: 'Médio',
      },
      {
        id: 99,
        tema: 'Atmosfera',
        pergunta:
          'Em qual camada da atmosfera ocorrem os principais fenômenos meteorológicos, como chuvas e ventos?',
        alternativas: ['Estratosfera.', 'Mesosfera.', 'Troposfera.', 'Exosfera.'],
        resposta_correta: 'Troposfera.',
        explicacao:
          'A troposfera é a camada mais próxima da superfície terrestre e concentra quase toda a umidade do ar.',
        nivel: 'Fácil',
      },
      {
        id: 100,
        tema: 'Atmosfera',
        pergunta: 'Em qual camada da atmosfera a Camada de Ozônio está localizada?',
        alternativas: ['Troposfera.', 'Estratosfera.', 'Ionosfera.', 'Termosfera.'],
        resposta_correta: 'Estratosfera.',
        explicacao:
          'O ozônio acumula-se primariamente na estratosfera, protegendo a vida na Terra dos raios solares nocivos.',
        nivel: 'Médio',
      },
      {
        id: 101,
        tema: 'Ciclo da Água',
        pergunta:
          'Qual processo natural é responsável por levar a água dos oceanos e rios para a atmosfera?',
        alternativas: [
          'Precipitação constante.',
          'Infiltração rápida no solo.',
          'Evaporação.',
          'Condensação térmica.',
        ],
        resposta_correta: 'Evaporação.',
        explicacao:
          'Pelo aquecimento solar, a água no estado líquido transforma-se em vapor, ascendendo na atmosfera.',
        nivel: 'Fácil',
      },
      {
        id: 102,
        tema: 'Ciclo da Água',
        pergunta:
          'O que acontece com o vapor de água na atmosfera quando ele esfria a grandes altitudes?',
        alternativas: [
          'Ele sofre evaporação.',
          'Ele sofre sublimação gasosa.',
          'Ele congela instantaneamente.',
          'Ele sofre condensação.',
        ],
        resposta_correta: 'Ele sofre condensação.',
        explicacao:
          'Ao resfriar, o vapor agrupa-se e volta ao estado líquido em forma de gotículas (nuvens).',
        nivel: 'Fácil',
      },
      {
        id: 103,
        tema: 'Método Científico',
        pergunta: 'Qual é a primeira etapa do método científico?',
        alternativas: [
          'Realizar o experimento logo de início.',
          'Concluir o estudo sem pesquisas prévias.',
          'Fazer uma observação e formular uma pergunta.',
          'Publicar os resultados em revistas especializadas.',
        ],
        resposta_correta: 'Fazer uma observação e formular uma pergunta.',
        explicacao:
          'A ciência sempre começa com uma curiosidade sobre um fenômeno do mundo natural.',
        nivel: 'Fácil',
      },
      {
        id: 104,
        tema: 'Método Científico',
        pergunta: 'O que é uma hipótese no método científico?',
        alternativas: [
          'Uma verdade absoluta e indiscutível.',
          'Uma possível explicação ou resposta a ser testada.',
          'O resultado definitivo obtido após uma medição.',
          'Uma lei fundamental inalterável da natureza.',
        ],
        resposta_correta: 'Uma possível explicação ou resposta a ser testada.',
        explicacao:
          'A hipótese é uma tentativa teórica de explicar algo, precisando obrigatoriamente de testes posteriores para confirmação.',
        nivel: 'Médio',
      },
      {
        id: 105,
        tema: 'Método Científico',
        pergunta:
          'Para verificar se uma hipótese está correta ou errada, o que se deve fazer na etapa seguinte?',
        alternativas: [
          'Fazer uma votação com vários cientistas experientes.',
          'Adivinhar o resultado baseado na intuição do pesquisador.',
          'Realizar experimentos controlados e coletar dados.',
          'Apenas observar sem nenhuma interferência em tempo integral.',
        ],
        resposta_correta: 'Realizar experimentos controlados e coletar dados.',
        explicacao:
          'O teste da hipótese através de experimentação é o pilar que valida uma proposta científica.',
        nivel: 'Médio',
      },
      {
        id: 106,
        tema: 'Astronomia',
        pergunta: 'Qual instrumento óptico Galileu Galilei aperfeiçoou para estudar os astros?',
        alternativas: [
          'O pequeno microscópio biológico.',
          'Telescópio (luneta astronômica).',
          'A bússola direcional náutica.',
          'O astrolábio solar.',
        ],
        resposta_correta: 'Telescópio (luneta astronômica).',
        explicacao:
          'Galileu melhorou consideravelmente as lentes do telescópio, permitindo-lhe realizar observações astronômicas inovadoras.',
        nivel: 'Fácil',
      },
      {
        id: 107,
        tema: 'Astronomia',
        pergunta: 'De qual planeta eram as quatro grandes luas descobertas por Galileu?',
        alternativas: ['Marte vermelho.', 'Saturno e seus anéis.', 'Júpiter.', 'O rochoso Vênus.'],
        resposta_correta: 'Júpiter.',
        explicacao:
          'Ele descobriu Io, Europa, Ganimedes e Calisto, os maiores satélites do planeta Júpiter.',
        nivel: 'Médio',
      },
      {
        id: 108,
        tema: 'Formato da Terra',
        pergunta:
          'A Terra não é uma esfera perfeita, mas levemente achatada. Onde ocorre esse achatamento no planeta?',
        alternativas: [
          'Na linha exata do Equador.',
          'Nos Polos (Norte e Sul).',
          'Perto do Trópico de Câncer.',
          'Ao longo do Meridiano de Greenwich.',
        ],
        resposta_correta: 'Nos Polos (Norte e Sul).',
        explicacao:
          'O movimento em torno do seu eixo causa um ligeiro achatamento diametral na zona polar da Terra.',
        nivel: 'Fácil',
      },
      {
        id: 109,
        tema: 'Formato da Terra',
        pergunta:
          'O que causa o achatamento dos polos e o alargamento do Equador em nosso planeta?',
        alternativas: [
          'O lento movimento de translação ao longo dos anos.',
          'A fortíssima gravidade atrativa de nossa Lua.',
          'O constante vento solar incidente.',
          'O movimento de rotação.',
        ],
        resposta_correta: 'O movimento de rotação.',
        explicacao:
          'A rotação acelerada gera uma força centrífuga que expande a região equatorial ao mesmo tempo que achata os polos.',
        nivel: 'Médio',
      },
      {
        id: 110,
        tema: 'Clima e Tempo',
        pergunta: "Qual das alternativas abaixo descreve o 'tempo meteorológico'?",
        alternativas: [
          'O padrão de temperatura e ventos muito duradouro na região.',
          'A condição atmosférica de um local em um momento específico.',
          'A sucessão fixa e imutável das estações do ano ao longo dos milênios.',
          'O problema complexo e global do aquecimento global gradual e irremediável.',
        ],
        resposta_correta: 'A condição atmosférica de um local em um momento específico.',
        explicacao:
          'O tempo diz respeito às circunstâncias imediatas do ar (chove agora, está ensolarado neste momento).',
        nivel: 'Médio',
      },
      {
        id: 111,
        tema: 'Clima e Tempo',
        pergunta: "E qual das alternativas abaixo descreve corretamente o 'clima'?",
        alternativas: [
          'O evento pontual de uma chuva que está caindo de repente agora.',
          'A variação leve da temperatura ao longo do único dia e da própria noite.',
          'A imprevisível passagem isolada de ventanias passageiras esporádicas e instáveis.',
          'O padrão duradouro das condições atmosféricas de uma determinada região ao longo de muitos anos.',
        ],
        resposta_correta:
          'O padrão duradouro das condições atmosféricas de uma determinada região ao longo de muitos anos.',
        explicacao:
          'O clima consiste nas condições ambientais médias de um local em períodos prolongados.',
        nivel: 'Médio',
      },
      {
        id: 112,
        tema: 'Instrumentos Meteorológicos',
        pergunta: 'Qual instrumento é usado para medir a temperatura do ar?',
        alternativas: [
          'Barômetro estático de pressão constante.',
          'Pluviômetro preciso.',
          'Termômetro.',
          'Anemômetro veloz e prático.',
        ],
        resposta_correta: 'Termômetro.',
        explicacao:
          'Termômetros (de mercúrio, álcool ou digitais) calculam as variações na temperatura atmosférica diária.',
        nivel: 'Fácil',
      },
      {
        id: 113,
        tema: 'Instrumentos Meteorológicos',
        pergunta: 'Qual instrumento é utilizado para medir a quantidade de chuva (precipitação)?',
        alternativas: [
          'Higrômetro relativo complexo.',
          'Pluviômetro.',
          'Anemômetro sensível.',
          'Termômetro vertical e estreito graduado.',
        ],
        resposta_correta: 'Pluviômetro.',
        explicacao:
          'Os milímetros de água precipitados num dado período são coletados e avaliados através de pluviômetros espalhados na região.',
        nivel: 'Fácil',
      },
      {
        id: 114,
        tema: 'Instrumentos Meteorológicos',
        pergunta: 'O que o anemômetro mede?',
        alternativas: [
          'A temperatura instantânea do ambiente local.',
          'A forte pressão atmosférica em variações contínuas.',
          'A velocidade dos ventos.',
          'A alta umidade espessa do ar próximo ao chão.',
        ],
        resposta_correta: 'A velocidade dos ventos.',
        explicacao:
          'As pequenas pás do anemômetro rodam segundo a força dos ventos, medindo-lhe a exata velocidade com precisão útil em metereologia.',
        nivel: 'Fácil',
      },
      {
        id: 115,
        tema: 'Fenômenos Climáticos',
        pergunta: "No Brasil, o que são apelidados de 'Rios Voadores'?",
        alternativas: [
          'Místicos rios terrestres observados das grandes estações no amplo espaço aberto.',
          'Enormes massas de vapor de água transportadas pelos ventos na nossa rica e ampla atmosfera regional.',
          'Surpreendentes densos grupos constantes unidos de numerosos pássaros migratórios viajantes anuais no céu nublado de época úmida e densa da tarde chuvosa.',
          'Aviões experimentais frequentes carregados tecnologicamente preparados desenhados feitos usados exclusivamente unicamente para carregar chover lançar pesada espessa fria água doce limpa artificial contínua.',
        ],
        resposta_correta:
          'Enormes massas de vapor de água transportadas pelos ventos na nossa rica e ampla atmosfera regional.',
        explicacao:
          'A Amazônia transpira vastos volumes de umidade, e essas massas que circulam no ar são referidas como rios voadores pela sua enorme capacidade hídrica.',
        nivel: 'Médio',
      },
      {
        id: 116,
        tema: 'Fenômenos Climáticos',
        pergunta: "Qual é a importância dos 'Rios Voadores' para a Região Centro-Sul do país?",
        alternativas: [
          'Eles infelizmente trazem sempre incalculáveis secas enormes críticas problemáticas arrasadoras para toda as grandes ou pequenas culturas rurais da extensa e rica área inteira ali agrícola do sul.',
          'Eles trazem a umidade necessária para a ocorrência de chuvas.',
          'Eles impedem milagrosamente evitam incrivelmente bloqueiam grandemente seguram completamente contêm toda imensa tempestade severa forte destruidora tropical forte que tenta sempre avançar.',
          'Eles perigosamente poluem carregam sujam mancham permanentemente rapidamente visivelmente o vasto azul céu claro com espessa estranha coloração química sombria densa industrial urbana perigosa lá.',
        ],
        resposta_correta: 'Eles trazem a umidade necessária para a ocorrência de chuvas.',
        explicacao:
          "O volume d'água levado pelos ventos é a fonte primária das chuvas regulares fundamentais para a irrigação de áreas produtoras vitais no Brasil.",
        nivel: 'Médio',
      },
      {
        id: 117,
        tema: 'Esferas da Terra',
        pergunta: 'Qual é a relação da biosfera com a hidrosfera?',
        alternativas: [
          'A biosfera isolada não precisa ativamente independentemente jamais em nenhuma circunstância da vital hidrosfera fresca úmida do imenso úmido planeta belo terra vivo natural azul nosso.',
          'A hidrosfera é gerada unicamente sempre e apenas criada artificialmente mantida pelos imensos diferentes abundantes e incontáveis enormes vastos e variados grupos seres vivos pequenos e muito grandes terrestres.',
          'A biosfera depende da hidrosfera para a manutenção da vida.',
          'A poluída hidrosfera turva impura densa destrói completamente constantemente velozmente apaga totalmente aniquila imediatamente a diversificada e vasta rica complexa extensa viva frágil bela biosfera orgânica biológica.',
        ],
        resposta_correta: 'A biosfera depende da hidrosfera para a manutenção da vida.',
        explicacao:
          'Todos os ecossistemas, que compõem a totalidade da biosfera de nosso planeta, são dependentes de fontes aquáticas.',
        nivel: 'Fácil',
      },
      {
        id: 118,
        tema: 'Movimentos da Terra',
        pergunta:
          "A translação leva 365 dias e cerca de 6 horas. O que fazemos com essas 6 horas que 'sobram' a cada ano?",
        alternativas: [
          'Ignoramos elas sempre porque elas são apenas margem simples irrelevante de leve erro do velho calendário antiquado lunar de antes.',
          'Adicionamos sistematicamente ao longuíssimo final cansativo e festivo sempre do último grande dia animado sempre de dezembro lá todos nós.',
          'Distribuímos essas poucas e curtas horas exatas em absolutamente todos os bons e longos curtos intensos dias quentes frios calmos meses que ali existem sempre no novo ano inteiro.',
          'Juntamos por 4 anos para formar um dia extra (ano bissexto).',
        ],
        resposta_correta: 'Juntamos por 4 anos para formar um dia extra (ano bissexto).',
        explicacao:
          'A soma rotineira destas horas parciais resulta, de quatro em quatro anos, num dia civil a mais (29 de fevereiro) mantendo sincronismo regular no nosso calendário ocidental.',
        nivel: 'Fácil',
      },
      {
        id: 119,
        tema: 'Estações do Ano',
        pergunta:
          'O que acontece com a duração do dia no Solstício de Verão em determinado hemisfério?',
        alternativas: [
          'O dia limpo e calmo e a noite escura profunda sempre tranquila fresca contínua são ambos perfeitamente equilibrados rigorosamente idênticos divididos ali iguais.',
          'A belíssima noite silenciosa estrelada imensa notável maravilhosa e fria longa noturna é sempre visivelmente extremamente incomparavelmente incrivelmente sensivelmente muito notavelmente maior e tão mais longa duradoura vasta.',
          'O brilhante caloroso incrível belo reluzente dourado ardente e quente brilhoso grandioso admirável visível majestoso distante amarelado incrível magnífico forte grande sol jamais se deita ou se quer minimamente logo rapidamente pouco esconde desce lá se põe ali.',
          'O dia é o mais longo do ano e a noite é a mais curta.',
        ],
        resposta_correta: 'O dia é o mais longo do ano e a noite é a mais curta.',
        explicacao:
          'Ao estar voltado intensamente perante os longos raios da grande luz do sol imenso o forte hemisfério experimenta imensa ampliação visível da sua duração diária inteira.',
        nivel: 'Médio',
      },
      {
        id: 120,
        tema: 'Estações do Ano',
        pergunta: 'Qual é a característica do Equinócio em relação à luz solar?',
        alternativas: [
          'O escuro e a escuridão duram infinitas exatas marcadas frias geladas silenciosas exaustivas contínuas assustadoras e noturnas profundas vastas misteriosas horas totais absolutas lá.',
          'O dia e a noite têm a mesma duração nos dois hemisférios.',
          'O esplêndido incandescente grande imenso sol nunca mais aparece nasce clareia ou ilumina os nossos pólos frios gélidos longínquos misteriosos pálidos brancos afastados vazios durante longos e bons vários lentos lentíssimos exaustivos intensos cansativos séculos totais calmos todos ali quietos gélidos longínquos misteriosos pálidos brancos afastados.',
          'Um imenso vasto isolado solitário hemisfério ganha recebe retém capta recolhe guarda unicamente apenas só luz forte fria branca fraca e intensa noturna esverdeada cintilante suave elétrica irreal magnética pálida isolada noturna irreal vinda só da lua inteira distante.',
        ],
        resposta_correta: 'O dia e a noite têm a mesma duração nos dois hemisférios.',
        explicacao:
          'Nesse período, a distribuição dos raios solares atinge os dois hemisférios de forma igualitária, fazendo os dois períodos durarem 12 horas.',
        nivel: 'Médio',
      },
      {
        id: 121,
        tema: 'Sistema Solar',
        pergunta: 'Qual força é responsável por manter os planetas em suas órbitas?',
        alternativas: [
          'Força Magnética atrativa distante repulsiva inconstante bipolar e polar do longo longínquo gigantesco centro núcleo atrativo estelar galáctico isolado grande denso espesso distante.',
          'Força Elétrica invisível natural estática forte da nossa fina invisível enorme ampla e sensível atmosférica fria barreira magnética invisível exterior superior e frágil alta.',
          'Força Gravitacional.',
          'Força Nuclear atômica micro forte estável simples invisível forte intensa interna minúscula radiativa forte e imensa.',
        ],
        resposta_correta: 'Força Gravitacional.',
        explicacao:
          'A gravidade intensa do Sol atrai todos os corpos celestes menores presentes no sistema.',
        nivel: 'Fácil',
      },
      {
        id: 122,
        tema: 'Movimentos da Terra',
        pergunta: 'Qual é a principal consequência do movimento de rotação da Terra?',
        alternativas: [
          'As marcantes alternâncias quentes e frias longas visíveis lentas notáveis anuais das quatro belas longas notórias famosas importantes vitais estações diversas do longo longo cansativo ano total inteiro contínuo.',
          'A sucessão dos dias e das noites.',
          'A subida repentina veloz brusca inesperada descontrolada louca forte irreal rápida contínua diária da enorme temperatura intensa e alta superficial quente ali global intensa.',
          'O maravilhoso exato lindo preciso geométrico exato total imenso profundo perfeito fantástico belíssimo alinhamento raro de todo enorme gigantesco denso e pesado sólido lindo sistema interplanetário nosso e galáctico ali.',
        ],
        resposta_correta: 'A sucessão dos dias e das noites.',
        explicacao:
          "Girando, a face iluminada tem o 'dia' enquanto a região do planeta que ficou oculta fica no período 'noturno'.",
        nivel: 'Fácil',
      },
      {
        id: 123,
        tema: 'Movimentos da Terra',
        pergunta: 'O movimento de translação combinado com a inclinação do eixo da Terra gera:',
        alternativas: [
          'A oscilação e variação marés e dos longos curtos e intensos agitados frios calmos ou revoltos úmidos fortes agitados vastos enormes profundos densos salgados calmos misteriosos isolados desconhecidos fundos azuis perigosos e turvos instáveis e maravilhosos enormes imensos abissais mares oceanos intensos globais diários.',
          'A ocorrência das estações do ano.',
          'A interrupção rápida parada curta suave temporária súbita total estranha instantânea mágica e irregular esquisita do claro dia limpo diurno luminoso curto limpo rotineiro natural simples diário quente longo comum diário do clima inteiro calmo isolado contínuo sempre natural regular.',
          'As enormes constantes lindas notórias clássicas variáveis e marcantes famosas bonitas luminosas grandes incríveis visíveis clássicas noturnas diferentes estranhas belíssimas iluminadas brancas fases incríveis e belas visíveis famosas lunares contínuas e lunares espaciais no céu.',
        ],
        resposta_correta: 'A ocorrência das estações do ano.',
        explicacao:
          'Isto altera e desloca de facto a exposição dos raios ao longo de todo o calendário e dos muitos dias.',
        nivel: 'Médio',
      },
      {
        id: 124,
        tema: 'Fases da Lua',
        pergunta: 'Qual fase ocorre quando a face voltada para a Terra está totalmente iluminada?',
        alternativas: [
          'A invisível escura calada ausente isolada apagada e sombria mística lua Nova fria.',
          'A pequena bela fina clássica prateada elegante brilhante curvada luzidia famosa reluzente fina Lua Crescente bela.',
          'Lua Cheia.',
          'A fina fina tímida calada tímida diminuta silenciosa escura fraca pálida luzidia isolada reduzida distante longínqua Minguante apagada e fina.',
        ],
        resposta_correta: 'Lua Cheia.',
        explicacao:
          'A geometria celeste nesse momento exibe a lua com brilho frontal muito direto.',
        nivel: 'Fácil',
      },
      {
        id: 125,
        tema: 'Eclipses',
        pergunta: 'Em qual fase da Lua é possível ocorrer um eclipse solar?',
        alternativas: [
          'A vistosa bela redonda intensa visível brilhante radiante redonda majestosa marcante amarela quente grande e clássica cheia brilhosa Cheia clássica.',
          'A fina bela tímida simples tímida Crescente simples e comum visível brilhante lá fina brilhante.',
          'A escondida reduzida mística solitária escura pequena Minguante reduzida calada e silenciosa apagada clássica lá escura isolada apagada.',
          'Lua Nova.',
        ],
        resposta_correta: 'Lua Nova.',
        explicacao:
          'Por ficar alinhada e obscurecer, interceptando, o que chega lá da luz da nossa estrela no solstício ou período, e a dita sombra escura, se faz projeta e cobre em nós quando ali está localizada lá oculta durante o dito evento.',
        nivel: 'Médio',
      },
      {
        id: 126,
        tema: 'Atmosfera',
        pergunta: 'Qual é o gás mais abundante na atmosfera da Terra?',
        alternativas: [
          'O indispensável maravilhoso gás respirável biológico livre oxigênio puro leve fresco limpo puro inodoro vital claro.',
          'O pesado quente espesso gasoso tóxico carbônico estufa forte cinzento perigoso abundante asfixiante tóxico industrial e nocivo.',
          'Gás Nitrogênio.',
          'O explosivo levíssimo volátil perigoso simples atômico leve e gasoso incolor gás hidrogênio simples cósmico isolado atômico cósmico ali esparso.',
        ],
        resposta_correta: 'Gás Nitrogênio.',
        explicacao:
          'A sua total proporção eleva-se e mantem-se fixada nos quase setenta e oito dos muitos porcentos totais.',
        nivel: 'Fácil',
      },
      {
        id: 127,
        tema: 'Atmosfera',
        pergunta: 'Qual é a principal função da camada de ozônio?',
        alternativas: [
          'Ocultar segurar captar esconder ali mesmo bloquear esconder manter forte invisível isolar prender forte o raro leve simples escasso puro vital invisível ar limpo e oxigênio essencial leve incolor fresco vital incolor ali em nós e entre ali e cá puro respirável doce e doce respirável sempre ali escondido lá dentro isolado e perto ali mantido livre vivo vital puro aqui.',
          'Criar forte concentrar promover calor forte quentura quente densa térmica alta forte forte tropical intensa diária gerar manter muito intenso insuportável imenso forte e criar quente calor abafado criar quente longo duradouro nas geladas frias noites terrestres silenciosas amenas frias e escuras caladas frias de inverno noturnas amenas noites silenciosas calmas pálidas frias.',
          'Filtrar a radiação ultravioleta (UV) nociva.',
          'Sugerir formar promover incentivar condensação alta grande forte úmida chuva forte incentivar ajudar pesadas úmidas contínuas enormes fortes longas chuvas rápidas tempestuosas pesadas constantes criar e causar condensação forte úmida ali úmida imensa forte condensação ali constante gerar forte rápida promover criar densa pesada úmida ali espessa neblina neblina ali rápida condensação gerar chuvas pesadas úmidas torrenciais longas constantes densas constantes tempestuosas intensas grossas e gerar longas fortes tempestades locais fortes criar locais e tropicais fortes enormes precipitações pluviais frias geladas aquáticas fortes abundantes contínuas diárias e chuvas densas ali intensas frias grossas constantes pesadas diárias constantes rápidas grossas ali em grande enormíssima muita espantosa volumosa quantia abundante excessiva imensa ali.',
        ],
        resposta_correta: 'Filtrar a radiação ultravioleta (UV) nociva.',
        explicacao:
          'As suas partículas dissipam os nocivos raios impedindo que queimem seres vivos.',
        nivel: 'Fácil',
      },
      {
        id: 128,
        tema: 'Ciclo da Água',
        pergunta: 'Qual é a principal fonte de energia do ciclo da água?',
        alternativas: [
          'A longínqua atrativa forte bela misteriosa influente pálida prateada lua próxima bela noturna isolada satélite noturno e a estranha pálida noturna fraca pequena pálida isolada noturna energia bela leve atrativa lunar gravitacional e magnética fria misteriosa fraca atrativa lunar satélite atração satélite bela distante pálida fria magnética magnética leve fraca misteriosa fria bela distante atrativa fria lunar satélite suave atração da lua.',
          'A forte intensa perigosa gigante letal vermelha brilhante ardente densa derretida magma lava profunda escura oculta oculta profunda central profunda fervente fervilhante profunda magnética intensa profunda incandescente forte escondida força e calor denso e forte do invisível fechado inacessível vulcânico quente impenetrável inacessível forte núcleo central magnético quente denso magnético abissal denso interno impenetrável terrestre escondido.',
          'A veloz impetuosa livre ruidosa selvagem uivante veloz turbulenta perigosa furiosa ruidosa inconstante assustadora caótica imprevisível uivante e perigosa uivante variável caótica indomável veloz invisível constante rápida volátil imprevisível energia inconstante natural uivante livre forte bruta uivante bruta livre e forte dos invisíveis variáveis imprevisíveis destrutivos passageiros fortes rápidos instáveis rápidos uivantes ventos e ciclones rápidos intensos fortes alísios soltos constantes tempestuosos soltos livres constantes ventos constantes.',
          'A energia térmica proveniente do Sol.',
        ],
        resposta_correta: 'A energia térmica proveniente do Sol.',
        explicacao:
          'O que movimenta as transformações da água baseia-se sobretudo sempre na intensidade da luz vinda dos raios do imenso Sol.',
        nivel: 'Fácil',
      },
      {
        id: 129,
        tema: 'Ciclo da Água',
        pergunta: 'O que ocorre durante a etapa de condensação?',
        alternativas: [
          'A água salgada oceânica pura suja cristalina azul esverdeada densa pesada salgada transparente pura doce evapora esquenta dilata sobe se dispersa se dissipa espalha eleva esquenta some desaparece rapidamente e intensamente some nos rios marinhos calmos mares lagos mornos rios doces mares.',
          'O gelo frio sólido cristalino puro antigo polar duro compacto isolado liso branco resistente brilhante brilhante puro transparente gelo espesso denso maciço polar denso derrete dilui amolece vira desaparece de vez flui e cede ali derrete nas altíssimas montanhas distantes rochosas gigantes isoladas altíssimas altas longínquas picos altos de lá montanhas e rios frios brancos.',
          'O vapor de água esfria e se transforma em água líquida...',
          'A água quente limpa impura lamacenta rasa suja limpa suja barrenta rasa infiltrada morna clara da chuva se perde infiltra rapidamente adentra esconde flui escorre desce adentra veloz profundamente desliza escapa foge escorre infiltra rapidamente escorre infiltra rapidamente desliza fundo escorre fundo ali flui escapa e some escorre e desaparece no macio fundo ali poroso esburacado fino grosso arenoso sujo irregular ali seco solo ali árido ou seco terra campo úmido lama solo solo poroso terra.',
        ],
        resposta_correta: 'O vapor de água esfria e se transforma em água líquida...',
        explicacao:
          'Transforma a água gasosa em nuvens densas compostas de pura e pequena quantidade agrupada líquida suspensa em plenas altas camadas da troposfera.',
        nivel: 'Fácil',
      },
      {
        id: 130,
        tema: 'Esferas da Terra',
        pergunta: 'A biosfera é formada pela interação de quais camadas?',
        alternativas: [
          'Apenas estritamente unicamente isoladamente exclusivamente só e somente da profunda firme sólida grossa litosfera pedregosa dura rígida da rochosa rígida grossa rocha pesada litosfera firme e manto pedregoso firme dura rochosa com e do manto flexível vulcânico quente flexível do magma pastoso quente interno macio líquido manto superior oculto derretido.',
          'Estratosfera superior alta fina rarefeita leve alta invisível rarefeita alta alta clara rarefeita azul alta rarefeita invisível distante, espesso manto manto gigante de magma fundo profundo derretido fundo imenso profundo fundo longo fundo manto de lava espessa funda magma oculto magma fundo magma oculto crosta fina e crosta oceânica fria úmida aquática fina fina salgada fria funda escura úmida crosta oceânica.',
          'Litosfera, Atmosfera e Hidrosfera.',
          'Núcleo brilhante duro super quente fundido interno de metal pesado imenso fundido metálico impenetrável ferro denso interno quente profundo denso núcleo magnético isolado inacessível inacessível fechado inacessível oculto profundo profundo inatingível oculto profundo, e também magma líquido pastoso flexível perigoso vermelho ardente pastoso brilhante ardente e hidrosfera imensa.',
        ],
        resposta_correta: 'Litosfera, Atmosfera e Hidrosfera.',
        explicacao:
          'É exatamente nos locais da rocha, de água, da terra úmida misturada com ar das três que tudo orgânico ali acontece e nasce ou viceja e evolui cresce interage ali e sobrevive cresce forte sempre.',
        nivel: 'Médio',
      },
      {
        id: 131,
        tema: 'Tempo Geológico',
        pergunta: 'Qual é a unidade de medida mais comum no tempo geológico?',
        alternativas: [
          'Dias solares e meses lunares.',
          'Horas cronometradas e minutos astronômicos.',
          'Séculos passados e décadas curtas.',
          'Milhões e bilhões de anos.',
        ],
        resposta_correta: 'Milhões e bilhões de anos.',
        explicacao:
          'Os períodos e eras geológicas são vastos, superando a escala da breve vida humana.',
        nivel: 'Médio',
      },
      {
        id: 132,
        tema: 'Fósseis',
        pergunta: 'Qual é a principal importância do estudo dos fósseis?',
        alternativas: [
          'Servem apenas como pedras decorativas exóticas.',
          'Fornecem evidências sobre a evolução da vida...',
          'Ajudam a gerar energia elétrica barata em usinas.',
          'Indicam a temperatura exata do clima de hoje.',
        ],
        resposta_correta: 'Fornecem evidências sobre a evolução da vida...',
        explicacao:
          'Os fósseis são os registros fundamentais que documentam as antigas formas biológicas de eras passadas na Terra.',
        nivel: 'Fácil',
      },
      {
        id: 133,
        tema: 'Origem do Universo',
        pergunta: 'O que a teoria do Big Bang propõe?',
        alternativas: [
          'O Universo sempre existiu de forma estática.',
          'A Terra é o centro de todas as galáxias.',
          'O Universo surgiu a partir da expansão de um ponto denso...',
          'Uma estrela gigante explodiu formando planetas.',
        ],
        resposta_correta: 'O Universo surgiu a partir da expansão de um ponto denso...',
        explicacao:
          'É a teoria científica mais aceita para a origem do nosso vasto Universo, postulando a sua expansão a partir de um estado primordial condensado.',
        nivel: 'Médio',
      },
      {
        id: 134,
        tema: 'Origem do Sistema Solar',
        pergunta: 'Como são chamados os corpos que se uniram para formar planetas?',
        alternativas: [
          'Asteroides cintilantes.',
          'Cometas gelados.',
          'Meteoros brilhantes.',
          'Planetesimais.',
        ],
        resposta_correta: 'Planetesimais.',
        explicacao:
          'Os planetesimais consistem em pequenos aglomerados de rocha e poeira que cresceram através de sucessivas colisões até formarem os atuais planetas do nosso Sistema Solar.',
        nivel: 'Difícil',
      },
      {
        id: 135,
        tema: 'Formato da Terra',
        pergunta: 'Qual é o nome científico dado ao formato irregular da Terra?',
        alternativas: [
          'Esfera geométrica perfeita.',
          'Cilindro espacial achatado.',
          'Geoide.',
          'Esferoide cúbico.',
        ],
        resposta_correta: 'Geoide.',
        explicacao:
          'Devido aos diferentes relevos terrestres com elevações, depressões e profundos oceanos que cobrem grande parte do globo, a figura do nosso planeta não consiste numa esfera estritamente redonda sem os devidos achatamentos, resultando na sua designação de forma geoidal.',
        nivel: 'Difícil',
      },
      {
        id: 136,
        tema: 'Orientação',
        pergunta: 'Para qual direção a agulha da bússola sempre aponta?',
        alternativas: [
          'Sul Geográfico verdadeiro.',
          'Norte Magnético.',
          'Leste celestial do sol.',
          'O centro de massa da Terra.',
        ],
        resposta_correta: 'Norte Magnético.',
        explicacao:
          'Sendo imantada, a pequena bússola responde unicamente às forças do campo invisível que aponta à porção superior do polo magnético do norte da Terra que atrai e orienta a bússola com precisão.',
        nivel: 'Fácil',
      },
      {
        id: 137,
        tema: 'Mudanças Climáticas',
        pergunta: 'Qual é o principal gás de efeito estufa emitido por humanos?',
        alternativas: [
          'Gás Oxigênio biológico livre.',
          'Gás Nitrogênio atmosférico.',
          'Gás Carbônico (CO2).',
          'Gás Hélio inerte.',
        ],
        resposta_correta: 'Gás Carbônico (CO2).',
        explicacao:
          'Pela contínua queima de inúmeros combustíveis de origem fóssil o gás carbônico concentra-se excessivamente acentuando todo o problemático e muito grave efeito de aquecimento de estufa a nível global planetário.',
        nivel: 'Fácil',
      },
      {
        id: 138,
        tema: 'Mudanças Climáticas',
        pergunta: 'Qual é uma consequência direta do aquecimento global?',
        alternativas: [
          'Derretimento das calotas polares e elevação do nível do mar.',
          'O congelamento de oceanos.',
          'Aumento do gelo polar antigo.',
          'Resfriamento com nevascas frequentes.',
        ],
        resposta_correta: 'Derretimento das calotas polares e elevação do nível do mar.',
        explicacao:
          'A elevada anómala elevação e aumento térmico atmosférico médio derrete progressivamente todo e qualquer gelo glaciar polar acumulado outrora.',
        nivel: 'Médio',
      },
      {
        id: 139,
        tema: 'Sustentabilidade',
        pergunta: 'Quantos objetivos compõem a agenda dos ODS?',
        alternativas: ['10 objetivos.', '20 objetivos.', '17 objetivos.', '5 objetivos.'],
        resposta_correta: '17 objetivos.',
        explicacao:
          'Os 17 ODS reúnem diversas preocupações desde a proteção do meio ambiente e o bem-estar populacional e da sociedade a curto, médio e prolongado prazo.',
        nivel: 'Difícil',
      },
      {
        id: 140,
        tema: 'Clima no Brasil',
        pergunta: 'Qual região apresenta as estações do ano mais bem definidas?',
        alternativas: ['Região Norte.', 'Região Nordeste.', 'Região Centro-Oeste.', 'Região Sul.'],
        resposta_correta: 'Região Sul.',
        explicacao:
          'A Região Sul localiza-se na zona temperada, por isso tem verões quentes e invernos rigorosos.',
        nivel: 'Médio',
      },
      {
        id: 141,
        tema: 'Estrelas',
        pergunta: 'Como o Sol é classificado em relação ao seu tamanho?',
        alternativas: [
          'Gigante azul.',
          'Anã branca densa.',
          'Estrela anã amarela, de tamanho médio.',
          'Gigante vermelha antiga.',
        ],
        resposta_correta: 'Estrela anã amarela, de tamanho médio.',
        explicacao:
          'O Sol é uma estrela de tamanho e temperatura intermédios em comparação com outras no universo.',
        nivel: 'Médio',
      },
      {
        id: 142,
        tema: 'Planetas do Sistema Solar',
        pergunta: 'Qual destes é classificado como gigante gasoso?',
        alternativas: ['Terra.', 'Marte.', 'Mercúrio.', 'Júpiter.'],
        resposta_correta: 'Júpiter.',
        explicacao: 'Júpiter é composto quase na totalidade de gases pesados fluidos.',
        nivel: 'Fácil',
      },
      {
        id: 143,
        tema: 'Planetas do Sistema Solar',
        pergunta: 'Qual é a classificação atual de Plutão?',
        alternativas: [
          'Estrela binária.',
          'Satélite natural.',
          'Planeta anão.',
          'Asteroide grande.',
        ],
        resposta_correta: 'Planeta anão.',
        explicacao:
          'Ele foi rebaixado porque não limpou a órbita de outros objetos menores ao seu redor.',
        nivel: 'Médio',
      },
      {
        id: 144,
        tema: 'Camadas da Terra',
        pergunta: 'Como são chamados os blocos que se movimentam sobre o manto?',
        alternativas: [
          'Montanhas rochosas estáticas.',
          'Continentes totalmente fixos terrestres.',
          'Oceanos aquáticos contínuos de águas profundas.',
          'Placas tectônicas.',
        ],
        resposta_correta: 'Placas tectônicas.',
        explicacao:
          'A litosfera terrestre é fragmentada em peças que deslizam formando as placas tectônicas ativas.',
        nivel: 'Fácil',
      },
      {
        id: 145,
        tema: 'Camadas da Terra',
        pergunta: 'Quais são os metais que compõem o núcleo terrestre?',
        alternativas: ['Ouro e prata.', 'Alumínio e cobre.', 'Ferro e níquel.', 'Zinco e chumbo.'],
        resposta_correta: 'Ferro e níquel.',
        explicacao:
          'Devido à imensa pressão profunda e forte densidade gravitacional concentrou-se muito ferro líquido e sólido.',
        nivel: 'Médio',
      },
      {
        id: 146,
        tema: 'Vida na Terra',
        pergunta: 'Qual gás é liberado para a atmosfera durante a fotossíntese?',
        alternativas: [
          'Gás Carbônico tóxico.',
          'Gás Metano inflamável.',
          'Gás Nitrogênio neutro.',
          'Gás Oxigênio.',
        ],
        resposta_correta: 'Gás Oxigênio.',
        explicacao:
          'As plantas capturam dióxido de carbono e liberam de volta na atmosfera valioso oxigênio vital.',
        nivel: 'Fácil',
      },
      {
        id: 147,
        tema: 'Método Científico',
        pergunta: 'Qual o próximo passo após formular uma hipótese?',
        alternativas: [
          'Desistir da ideia se parecer complexa.',
          'Publicar a hipótese como um fato absoluto.',
          'Realizar experimentos para testar a hipótese.',
          'Fazer uma nova observação sem testar a anterior.',
        ],
        resposta_correta: 'Realizar experimentos para testar a hipótese.',
        explicacao:
          'Toda hipótese precisa ser testada por meio de experimentos antes de ser confirmada.',
        nivel: 'Fácil',
      },
      {
        id: 148,
        tema: 'Astronomia',
        pergunta: 'Qual descoberta de Galileu ajudou a comprovar o heliocentrismo?',
        alternativas: [
          'As fases completas e visíveis de Marte.',
          'Os anéis de Urano, o gigante de gelo.',
          'Luas de Júpiter orbitando o planeta, e não a Terra.',
          'A passagem recorrente de cometas e meteoros.',
        ],
        resposta_correta: 'Luas de Júpiter orbitando o planeta, e não a Terra.',
        explicacao:
          'A observação de que as luas orbitavam Júpiter provou que nem tudo no universo girava em torno da Terra.',
        nivel: 'Difícil',
      },
      {
        id: 149,
        tema: 'Clima e Tempo',
        pergunta: "Qual das afirmações abaixo descreve corretamente o 'clima'?",
        alternativas: [
          'A chuva passageira e forte de ontem.',
          'A previsão de ventos intensos para o fim de semana.',
          'O padrão do Nordeste (temperaturas elevadas e pouca chuva)...',
          'A neblina intensa que atingiu a cidade pela manhã.',
        ],
        resposta_correta: 'O padrão do Nordeste (temperaturas elevadas e pouca chuva)...',
        explicacao:
          'O clima refere-se ao padrão duradouro de uma região medido ao longo de muitos anos.',
        nivel: 'Médio',
      },
      {
        id: 150,
        tema: 'Instrumentos Meteorológicos',
        pergunta: 'Qual instrumento é utilizado para medir a velocidade dos ventos?',
        alternativas: ['Termômetro.', 'Pluviômetro.', 'Barômetro.', 'Anemômetro.'],
        resposta_correta: 'Anemômetro.',
        explicacao: 'O anemômetro gira com o vento para medir sua velocidade com precisão.',
        nivel: 'Fácil',
      },
    ]

    const col = app.findCollectionByNameOrId('questions')

    for (const q of questions) {
      try {
        app.findFirstRecordByData('questions', 'external_id', q.id)
      } catch (_) {
        const record = new Record(col)
        record.set('statement', q.pergunta)
        record.set('option_a', q.alternativas[0])
        record.set('option_b', q.alternativas[1])
        record.set('option_c', q.alternativas[2])
        record.set('option_d', q.alternativas[3])

        let correct = 'A'
        if (q.resposta_correta === q.alternativas[1]) correct = 'B'
        else if (q.resposta_correta === q.alternativas[2]) correct = 'C'
        else if (q.resposta_correta === q.alternativas[3]) correct = 'D'

        record.set('correct_option', correct)
        record.set('explanation', q.explicacao)
        record.set('theme', q.tema)
        record.set('difficulty', q.nivel)
        record.set('suggested_grade', '6º Ano')
        record.set('external_id', q.id)

        app.save(record)
      }
    }
  },
  (app) => {
    const ids = Array.from({ length: 60 }, (_, i) => i + 91)
    for (const id of ids) {
      try {
        const record = app.findFirstRecordByData('questions', 'external_id', id)
        app.delete(record)
      } catch (_) {}
    }
  },
)
