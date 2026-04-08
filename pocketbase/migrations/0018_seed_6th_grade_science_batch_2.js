migrate(
  (app) => {
    const questionsCollection = app.findCollectionByNameOrId('questions')

    const rawQuestions = [
      {
        id: 31,
        tema: 'Modelos do Universo',
        pergunta:
          'Na Grécia Antiga, a observação do céu levou Aristóteles a formular uma hipótese sobre o Universo. Qual era a ideia central do modelo do Geocentrismo?',
        alternativas: [
          'O Sol é o centro do Universo.',
          'A Terra é o centro do Universo.',
          'O Universo não tem centro.',
          'Júpiter é o centro do Universo.',
        ],
        resposta_correta: 'B',
        explicacao: 'O modelo geocêntrico propunha que a Terra era o centro de tudo.',
        nivel: 'fácil',
      },
      {
        id: 32,
        tema: 'Modelos do Universo',
        pergunta:
          'Nicolau Copérnico e, mais tarde, Galileu Galilei, defenderam um modelo diferente para o Sistema Solar...',
        alternativas: ['Geocentrismo.', 'Heliocentrismo.', 'Modelo Plano.', 'Teoria do Big Bang.'],
        resposta_correta: 'B',
        explicacao: 'O heliocentrismo propõe que o Sol está no centro do Sistema Solar.',
        nivel: 'fácil',
      },
      {
        id: 33,
        tema: 'Sistema Solar',
        pergunta:
          "Os planetas do Sistema Solar são divididos em dois grupos principais. Quais são os quatro planetas classificados como 'rochosos'?",
        alternativas: [
          'Júpiter, Saturno, Urano, Netuno.',
          'Terra, Marte, Júpiter, Saturno.',
          'Mercúrio, Vênus, Terra, Marte.',
          'Vênus, Terra, Marte, Plutão.',
        ],
        resposta_correta: 'C',
        explicacao: 'Os 4 primeiros planetas a partir do Sol são rochosos.',
        nivel: 'fácil',
      },
      {
        id: 34,
        tema: 'Sistema Solar',
        pergunta:
          'Os planetas gasosos (ou externos) são formados principalmente por gases... Quais são eles?',
        alternativas: [
          'Júpiter, Saturno, Terra, Marte.',
          'Júpiter, Saturno, Urano, Netuno.',
          'Urano, Netuno, Plutão, Éris.',
          'Mercúrio, Vênus, Júpiter, Saturno.',
        ],
        resposta_correta: 'B',
        explicacao: 'Os 4 últimos planetas do Sistema Solar são gasosos gigantes.',
        nivel: 'fácil',
      },
      {
        id: 35,
        tema: 'Sistema Solar',
        pergunta:
          'Até o ano de 2006, Plutão era considerado o nono planeta... Como Plutão é classificado atualmente?',
        alternativas: ['Satélite natural.', 'Cometa.', 'Estrela.', 'Planeta anão.'],
        resposta_correta: 'D',
        explicacao: 'Plutão foi rebaixado para planeta anão por não ter limpado sua órbita.',
        nivel: 'fácil',
      },
      {
        id: 36,
        tema: 'Gravidade e Órbitas',
        pergunta:
          'Qual é a forma geométrica que representa o caminho (órbita) que os planetas fazem ao redor do Sol?',
        alternativas: ['Círculo perfeito.', 'Triângulo.', 'Elipse.', 'Espiral.'],
        resposta_correta: 'C',
        explicacao: 'As órbitas planetárias são elípticas, conforme a 1ª Lei de Kepler.',
        nivel: 'médio',
      },
      {
        id: 37,
        tema: 'Formato da Terra',
        pergunta: 'Qual é o nome científico dado a essa forma da Terra (irregular)?',
        alternativas: ['Esfera perfeita.', 'Geoide.', 'Plana.', 'Cilíndrica.'],
        resposta_correta: 'B',
        explicacao:
          'A Terra tem formato irregular, ligeiramente achatada nos polos, chamada geoide.',
        nivel: 'médio',
      },
      {
        id: 38,
        tema: 'Terra Primitiva',
        pergunta: 'O que aconteceu quando a Terra começou a se resfriar?',
        alternativas: [
          'Formação da crosta terrestre e oceanos.',
          'Explosão de vulcões gigantes.',
          'Colisão com a Lua.',
          'Vaporização de toda a água.',
        ],
        resposta_correta: 'A',
        explicacao:
          'O resfriamento permitiu a solidificação da crosta e a condensação da água, formando oceanos.',
        nivel: 'médio',
      },
      {
        id: 39,
        tema: 'Terra Primitiva',
        pergunta:
          'Qual processo biológico foi fundamental para transformar essa atmosfera, liberando o gás oxigênio?',
        alternativas: ['Respiração celular.', 'Fotossíntese.', 'Transpiração.', 'Decomposição.'],
        resposta_correta: 'B',
        explicacao: 'Os organismos primitivos realizaram fotossíntese, liberando O2.',
        nivel: 'médio',
      },
      {
        id: 40,
        tema: 'Movimentos da Lua',
        pergunta: 'O que é o movimento de revolução da Lua?',
        alternativas: [
          'Movimento em torno do próprio eixo.',
          'Movimento da Terra em torno do Sol.',
          'Movimento da Lua ao redor da Terra.',
          'Movimento do Sol na galáxia.',
        ],
        resposta_correta: 'C',
        explicacao: 'A revolução é a órbita que a Lua faz ao redor da Terra.',
        nivel: 'médio',
      },
      {
        id: 41,
        tema: 'Movimentos da Lua',
        pergunta: 'Qual é o resultado visível para nós na Terra (sincronia de rotação/revolução)?',
        alternativas: [
          'Vemos várias luas.',
          'Vemos sempre a mesma face da Lua.',
          'A Lua desaparece no céu.',
          'A Lua fica vermelha todos os dias.',
        ],
        resposta_correta: 'B',
        explicacao: 'Devido à rotação síncrona, a Lua sempre mostra a mesma face para a Terra.',
        nivel: 'médio',
      },
      {
        id: 42,
        tema: 'Eclipses',
        pergunta: 'Em qual fase da Lua o eclipse solar pode acontecer?',
        alternativas: ['Cheia.', 'Nova.', 'Minguante.', 'Crescente.'],
        resposta_correta: 'B',
        explicacao:
          'O eclipse solar ocorre apenas na Lua Nova, quando ela está entre a Terra e o Sol.',
        nivel: 'médio',
      },
      {
        id: 43,
        tema: 'Eclipses',
        pergunta:
          'Por que a Lua não consegue cobrir completamente o Sol durante um eclipse anular?',
        alternativas: [
          'Porque a Lua está muito perto da Terra.',
          'Porque o Sol aumenta de tamanho.',
          'Porque a Lua está no ponto mais distante de sua órbita (apogeu) e parece menor.',
          'Porque a Terra entra na frente da Lua.',
        ],
        resposta_correta: 'C',
        explicacao:
          'No apogeu, o diâmetro aparente da Lua é menor que o do Sol, gerando um anel de luz.',
        nivel: 'difícil',
      },
      {
        id: 44,
        tema: 'Eclipses',
        pergunta: 'Em qual fase da Lua ocorre o eclipse lunar?',
        alternativas: ['Nova.', 'Crescente.', 'Minguante.', 'Cheia.'],
        resposta_correta: 'D',
        explicacao: 'O eclipse lunar acontece na fase da Lua Cheia.',
        nivel: 'médio',
      },
      {
        id: 45,
        tema: 'Eclipses',
        pergunta: 'Como é chamada a região mais escura, onde a luz do Sol é totalmente bloqueada?',
        alternativas: ['Penumbra.', 'Umbra.', 'Coroa solar.', 'Eclíptica.'],
        resposta_correta: 'B',
        explicacao: 'A umbra é a sombra central mais escura durante um eclipse.',
        nivel: 'médio',
      },
      {
        id: 46,
        tema: 'Eclipses',
        pergunta: "O que caracteriza um eclipse lunar do tipo 'penumbral'?",
        alternativas: [
          'A Lua fica totalmente escura.',
          'A Lua desaparece do céu.',
          'A Lua passa apenas pela penumbra da Terra, sofrendo uma leve diminuição de brilho.',
          'O Sol bloqueia a Lua.',
        ],
        resposta_correta: 'C',
        explicacao: 'No eclipse penumbral, a Lua não entra na umbra, apenas na penumbra.',
        nivel: 'difícil',
      },
      {
        id: 47,
        tema: 'Estações do Ano',
        pergunta: "O que caracteriza o fenômeno chamado 'Solstício'?",
        alternativas: [
          'Dias e noites com a mesma duração.',
          'O Sol atinge a maior inclinação, marcando o início do verão ou inverno (dias mais longos ou curtos).',
          'A Lua cobre o Sol.',
          'Alinhamento de todos os planetas.',
        ],
        resposta_correta: 'B',
        explicacao: 'O solstício marca o máximo de desigualdade entre o dia e a noite.',
        nivel: 'médio',
      },
      {
        id: 48,
        tema: 'Estações do Ano',
        pergunta: "O que caracteriza o fenômeno chamado 'Equinócio'?",
        alternativas: [
          'O Sol não aparece no céu.',
          'Os dias são muito mais longos que as noites.',
          'O Sol incide diretamente no equador, fazendo com que o dia e a noite tenham a mesma duração.',
          'Ocorre um eclipse total.',
        ],
        resposta_correta: 'C',
        explicacao: 'No equinócio, os raios solares incidem perpendicularmente ao Equador.',
        nivel: 'médio',
      },
      {
        id: 49,
        tema: 'Estações do Ano',
        pergunta: 'Como é chamado o fenômeno em que o Sol não nasce durante o inverno polar?',
        alternativas: [
          'Sol da Meia-Noite.',
          'Aurora Boreal.',
          'Noite Polar.',
          'Equinócio de Inverno.',
        ],
        resposta_correta: 'C',
        explicacao:
          'A noite polar é o período em que o Sol permanece abaixo do horizonte por mais de 24h.',
        nivel: 'médio',
      },
      {
        id: 50,
        tema: 'Movimentos da Terra',
        pergunta: 'Qual movimento real da Terra causa a impressão do movimento aparente do Sol?',
        alternativas: [
          'Revolução da Lua.',
          'Rotação da Terra.',
          'Translação da Terra.',
          'Precessão.',
        ],
        resposta_correta: 'B',
        explicacao: 'A rotação da Terra faz parecer que o Sol cruza o céu diariamente.',
        nivel: 'fácil',
      },
      {
        id: 51,
        tema: 'Gravidade',
        pergunta: 'Qual é a segunda regra da Lei da Gravitação Universal?',
        alternativas: [
          'Corpos leves caem mais rápido.',
          'A força gravitacional diminui à medida que a distância entre os corpos aumenta.',
          'A gravidade atrai apenas metais.',
          'Planetas não têm gravidade.',
        ],
        resposta_correta: 'B',
        explicacao: 'A gravidade é inversamente proporcional ao quadrado da distância.',
        nivel: 'difícil',
      },
      {
        id: 52,
        tema: 'Método Científico',
        pergunta: "Qual é a diferença principal entre uma 'hipótese' e uma 'teoria'?",
        alternativas: [
          'Hipótese é certeza e teoria é dúvida.',
          'Hipótese é uma tentativa de explicação que precisa ser testada; teoria é uma explicação amplamente testada e confirmada.',
          'São palavras sinônimas.',
          'Teoria é criada antes da hipótese.',
        ],
        resposta_correta: 'B',
        explicacao:
          'Hipótese é uma ideia não comprovada, enquanto teoria já foi exaustivamente validada.',
        nivel: 'médio',
      },
      {
        id: 53,
        tema: 'Origem do Sistema Solar',
        pergunta:
          'Qual é a hipótese mais aceita pela ciência para explicar a origem do Sistema Solar?',
        alternativas: [
          'Teoria da Relatividade.',
          'Hipótese Nebular (nuvem de gás e poeira).',
          'Criacionismo Científico.',
          'Teoria das Cordas.',
        ],
        resposta_correta: 'B',
        explicacao:
          'A Hipótese Nebular diz que o sistema se formou de uma nuvem gigante de gás e poeira.',
        nivel: 'médio',
      },
      {
        id: 54,
        tema: 'Origem do Universo',
        pergunta:
          'Qual é a principal teoria científica que explica a origem do Universo a partir de um ponto denso?',
        alternativas: [
          'Teoria do Estado Estacionário.',
          'Teoria da Panspermia.',
          'Teoria do Big Bang.',
          'Teoria Nebular.',
        ],
        resposta_correta: 'C',
        explicacao:
          'O Big Bang propõe uma grande expansão a partir de um ponto incrivelmente denso e quente.',
        nivel: 'fácil',
      },
      {
        id: 55,
        tema: 'Corpos Celestes',
        pergunta: 'O que é um satélite artificial?',
        alternativas: [
          'Um pedaço de rocha que cai na Terra.',
          'Uma lua que orbita um planeta.',
          'Um equipamento construído por humanos colocado em órbita para comunicação, pesquisa, etc.',
          'Uma estrela cadente.',
        ],
        resposta_correta: 'C',
        explicacao:
          'Satélites artificiais são criados pelo homem para orbitar planetas ou outros corpos.',
        nivel: 'fácil',
      },
      {
        id: 56,
        tema: 'Corpos Celestes',
        pergunta: 'Do que os cometas são formados principalmente?',
        alternativas: [
          'Ferro e níquel.',
          'Gelo, poeira e pequenos fragmentos rochosos.',
          'Apenas gases quentes.',
          'Fogo e plasma.',
        ],
        resposta_correta: 'B',
        explicacao: "Cometas são como 'bolas de neve sujas' espaciais.",
        nivel: 'médio',
      },
      {
        id: 57,
        tema: 'Corpos Celestes',
        pergunta: 'Por que conseguimos ver os cometas brilhando?',
        alternativas: [
          'Têm luz própria como as estrelas.',
          'Porque o Sol os aquece, fazendo-os liberar gases e poeira que refletem a luz solar.',
          'Pegam fogo ao entrar no espaço.',
          'Refletem a luz da Lua.',
        ],
        resposta_correta: 'B',
        explicacao: 'O brilho é a reflexão da luz do Sol pela cauda de gás e poeira.',
        nivel: 'médio',
      },
      {
        id: 58,
        tema: 'Sistema Solar',
        pergunta: "Por que o apelido 'Estrela-d'alva' para Vênus é cientificamente incorreto?",
        alternativas: [
          'Porque Vênus é um planeta e não tem luz própria, apenas reflete a luz do Sol.',
          'Porque Vênus é um cometa.',
          'Porque é uma estrela distante.',
          'Porque Vênus emite luz azulada.',
        ],
        resposta_correta: 'A',
        explicacao: 'Sendo um planeta, Vênus apenas reflete a luz da estrela (Sol).',
        nivel: 'médio',
      },
      {
        id: 59,
        tema: 'Estrelas',
        pergunta: 'Como o Sol é classificado em termos de tamanho?',
        alternativas: [
          'Supergigante.',
          'Gigante vermelha.',
          'Estrela anã (tamanho médio/pequeno).',
          'Anã branca.',
        ],
        resposta_correta: 'C',
        explicacao:
          'O Sol é uma anã amarela, uma estrela de porte médio/pequeno em escala cósmica.',
        nivel: 'médio',
      },
      {
        id: 60,
        tema: 'Clima no Brasil',
        pergunta: 'Por que as regiões Sul e Sudeste apresentam estações mais demarcadas?',
        alternativas: [
          'Ficam na Linha do Equador.',
          'Estão localizadas fora da zona tropical, em latitudes onde a variação de insolação ao longo do ano é maior.',
          'Têm muitas montanhas altas.',
          'O oceano esfria a região.',
        ],
        resposta_correta: 'B',
        explicacao:
          'Quanto mais distante do Equador, maior a variação de luminosidade solar ao longo do ano.',
        nivel: 'difícil',
      },
      {
        id: 61,
        tema: 'Escalas de Tempo',
        pergunta:
          'O tempo contado em horas, dias, meses e anos pelo relógio e calendário é chamado de:',
        alternativas: [
          'Tempo Geológico.',
          'Tempo Histórico.',
          'Tempo Cronológico.',
          'Tempo Espacial.',
        ],
        resposta_correta: 'C',
        explicacao: 'O tempo cronológico segue uma ordem matemática e regular do calendário.',
        nivel: 'fácil',
      },
      {
        id: 62,
        tema: 'Escalas de Tempo',
        pergunta:
          'O estudo de como as pessoas viviam no passado... Como chamamos essa escala de tempo?',
        alternativas: [
          'Tempo Geológico.',
          'Tempo Histórico.',
          'Tempo Cronológico.',
          'Tempo Físico.',
        ],
        resposta_correta: 'B',
        explicacao: 'O tempo histórico marca os períodos e eventos vivenciados pela humanidade.',
        nivel: 'médio',
      },
      {
        id: 63,
        tema: 'Escalas de Tempo',
        pergunta: 'A história da formação do planeta Terra medida em bilhões de anos é o:',
        alternativas: [
          'Tempo Geológico.',
          'Tempo Histórico.',
          'Tempo Biológico.',
          'Tempo Meteorológico.',
        ],
        resposta_correta: 'A',
        explicacao: 'A escala que abrange toda a história da Terra chama-se tempo geológico.',
        nivel: 'fácil',
      },
      {
        id: 64,
        tema: 'Tempo Geológico',
        pergunta: 'Qual é a maior subdivisão do tempo geológico?',
        alternativas: ['Período.', 'Época.', 'Era.', 'Éon.'],
        resposta_correta: 'D',
        explicacao: 'O Éon é a maior unidade de tempo na escala geológica (bilhões de anos).',
        nivel: 'difícil',
      },
      {
        id: 65,
        tema: 'Eras Geológicas',
        pergunta: 'Durante qual Éon ocorreu a formação da Terra (material derretido)?',
        alternativas: ['Éon Fanerozoico.', 'Éon Arqueano.', 'Éon Proterozoico.', 'Éon Hadeano.'],
        resposta_correta: 'D',
        explicacao: 'O Hadeano abrange a fase inicial de formação incandescente da Terra.',
        nivel: 'difícil',
      },
      {
        id: 66,
        tema: 'Eras Geológicas',
        pergunta: 'Em qual Era ocorreu o surgimento e a extinção dos dinossauros?',
        alternativas: ['Era Paleozoica.', 'Era Mesozoica.', 'Era Cenozoica.', 'Era Pré-Cambriana.'],
        resposta_correta: 'B',
        explicacao: "A Mesozoica é conhecida como a 'era dos dinossauros'.",
        nivel: 'médio',
      },
      {
        id: 67,
        tema: 'Tempo Geológico',
        pergunta: 'Por que humanos convivendo com dinossauros está incorreto?',
        alternativas: [
          'Os dinossauros ainda estão vivos.',
          'Porque os dinossauros foram extintos milhões de anos antes do surgimento dos primeiros humanos.',
          'Os humanos moravam em outro planeta.',
          'Dinossauros viviam apenas no mar.',
        ],
        resposta_correta: 'B',
        explicacao:
          'Existe uma lacuna de cerca de 65 milhões de anos entre os últimos dinossauros e os primeiros humanos.',
        nivel: 'fácil',
      },
      {
        id: 68,
        tema: 'Fósseis',
        pergunta: 'O processo de fossilização ocorre em qual escala de tempo?',
        alternativas: [
          'Tempo Cronológico (dias).',
          'Tempo Histórico (séculos).',
          'Tempo Geológico (milhões de anos).',
          'Tempo Meteorológico (horas).',
        ],
        resposta_correta: 'C',
        explicacao:
          'Formar um fóssil geralmente requer milhares a milhões de anos (Tempo Geológico).',
        nivel: 'médio',
      },
      {
        id: 69,
        tema: 'Orientação e Pontos Cardeais',
        pergunta: 'Braço direito para o Leste (nascente), para onde o rosto aponta?',
        alternativas: ['Sul.', 'Leste.', 'Norte.', 'Oeste.'],
        resposta_correta: 'C',
        explicacao:
          'O rosto aponta para o Norte, o braço esquerdo para o Oeste e as costas para o Sul.',
        nivel: 'médio',
      },
      {
        id: 70,
        tema: 'Orientação e Pontos Cardeais',
        pergunta: 'Quais são os pontos colaterais?',
        alternativas: [
          'Norte, Sul, Leste, Oeste.',
          'Nordeste, Noroeste, Sudeste, Sudoeste.',
          'Zênite e Nadir.',
          'Equador e Trópicos.',
        ],
        resposta_correta: 'B',
        explicacao: 'Os pontos colaterais ficam entre os pontos cardeais na rosa dos ventos.',
        nivel: 'médio',
      },
      {
        id: 71,
        tema: 'Orientação e Pontos Cardeais',
        pergunta: 'Como a bússola consegue indicar as direções?',
        alternativas: [
          'Seguindo a luz do Sol.',
          'Apontando para a estrela mais brilhante.',
          'Através de uma agulha imantada que se alinha ao campo magnético da Terra.',
          'Usando sinais de satélite.',
        ],
        resposta_correta: 'C',
        explicacao:
          'A Terra funciona como um imã gigante, atraindo o ponteiro magnetizado da bússola.',
        nivel: 'médio',
      },
      {
        id: 72,
        tema: 'Mudanças Climáticas',
        pergunta: 'Fenômeno natural que retém parte do calor do Sol na atmosfera:',
        alternativas: [
          'Efeito Estufa.',
          'Aquecimento Global.',
          'Inversão Térmica.',
          'Buraco na Camada de Ozônio.',
        ],
        resposta_correta: 'A',
        explicacao: 'O efeito estufa é um processo natural e vital para manter a Terra aquecida.',
        nivel: 'fácil',
      },
      {
        id: 73,
        tema: 'Mudanças Climáticas',
        pergunta: 'Qual é a principal causa da intensificação do efeito estufa?',
        alternativas: [
          'O reflorestamento contínuo.',
          'A diminuição das chuvas.',
          'A emissão excessiva de gases como o gás carbônico pela atividade humana.',
          'O uso de energia solar e eólica.',
        ],
        resposta_correta: 'C',
        explicacao:
          'A queima de combustíveis fósseis e o desmatamento aumentam os gases estufa artificialmente.',
        nivel: 'médio',
      },
      {
        id: 74,
        tema: 'Mudanças Climáticas',
        pergunta: 'Qual das alternativas NÃO é uma consequência das mudanças climáticas?',
        alternativas: [
          'Derretimento das calotas polares.',
          'Aumento do nível do mar.',
          'Aumento do número de terremotos e tsunamis.',
          'Alterações nos padrões de chuva.',
        ],
        resposta_correta: 'C',
        explicacao:
          'Terremotos e tsunamis são causados pela movimentação das placas tectônicas, não pelo clima.',
        nivel: 'difícil',
      },
      {
        id: 75,
        tema: 'Sustentabilidade',
        pergunta: 'Como são chamados os 17 objetivos da ONU lançados em 2015?',
        alternativas: [
          'Metas de Kyoto.',
          'Objetivos de Desenvolvimento Sustentável (ODS).',
          'Acordo de Paris.',
          'Protocolo de Montreal.',
        ],
        resposta_correta: 'B',
        explicacao: 'Os ODS visam um futuro mais sustentável para todo o planeta até 2030.',
        nivel: 'médio',
      },
      {
        id: 76,
        tema: 'Ciclo da Água',
        pergunta: 'Por que o ciclo da água é tão importante para a vida na Terra?',
        alternativas: [
          'Porque evita tempestades.',
          'Porque renova e distribui a água doce necessária para a sobrevivência dos seres vivos.',
          'Porque aumenta a salinidade dos oceanos.',
          'Porque cria novas nuvens de poeira.',
        ],
        resposta_correta: 'B',
        explicacao:
          'Ele garante que a água limpa chegue aos ecossistemas terrestres continuamente.',
        nivel: 'fácil',
      },
      {
        id: 77,
        tema: 'Vida na Terra',
        pergunta: 'Qual gás vital é liberado na atmosfera durante a fotossíntese?',
        alternativas: ['Gás Carbônico.', 'Nitrogênio.', 'Gás Oxigênio.', 'Metano.'],
        resposta_correta: 'C',
        explicacao: 'As plantas e algas absorvem CO2 e liberam O2 (gás oxigênio).',
        nivel: 'fácil',
      },
      {
        id: 78,
        tema: 'Terra Primitiva',
        pergunta: 'Como o gás oxigênio começou a se acumular no planeta?',
        alternativas: [
          'Caiu de meteoritos.',
          'Escapou do núcleo terrestre.',
          'Graças à fotossíntese realizada por organismos primitivos (cianobactérias).',
          'Foi trazido pelos alienígenas.',
        ],
        resposta_correta: 'C',
        explicacao:
          'As cianobactérias foram os primeiros seres a liberar oxigênio em larga escala.',
        nivel: 'difícil',
      },
      {
        id: 79,
        tema: 'Camadas da Terra',
        pergunta: 'Camada rochosa mais externa da Terra:',
        alternativas: [
          'Manto.',
          'Núcleo Interno.',
          'Crosta Terrestre (Litosfera).',
          'Núcleo Externo.',
        ],
        resposta_correta: 'C',
        explicacao: 'A crosta é a camada superficial e sólida onde vivemos.',
        nivel: 'fácil',
      },
      {
        id: 80,
        tema: 'Camadas da Terra',
        pergunta: 'Onde se encontra a maior parte da água da hidrosfera?',
        alternativas: ['Nas geleiras.', 'Nos rios e lagos.', 'Nos oceanos e mares.', 'Nas nuvens.'],
        resposta_correta: 'C',
        explicacao: 'Cerca de 97% de toda a água do planeta está nos oceanos (água salgada).',
        nivel: 'fácil',
      },
      {
        id: 81,
        tema: 'Camadas da Terra',
        pergunta: 'O que compõe a biosfera?',
        alternativas: [
          'Apenas o ar que respiramos.',
          'O conjunto de todos os ecossistemas da Terra, onde existe vida.',
          'Apenas os animais terrestres.',
          'O núcleo quente do planeta.',
        ],
        resposta_correta: 'B',
        explicacao: 'Biosfera é a esfera da vida, englobando todas as regiões habitadas do globo.',
        nivel: 'fácil',
      },
      {
        id: 82,
        tema: 'Camadas da Terra',
        pergunta: 'Qual é o gás mais abundante na atmosfera terrestre atual?',
        alternativas: ['Gás Oxigênio.', 'Gás Carbônico.', 'Gás Nitrogênio.', 'Hidrogênio.'],
        resposta_correta: 'C',
        explicacao: 'A atmosfera atual é composta por cerca de 78% de Nitrogênio.',
        nivel: 'médio',
      },
      {
        id: 83,
        tema: 'Estações do Ano',
        pergunta: 'Em qual região as quatro estações costumam ser mais bem definidas?',
        alternativas: [
          'Região Equatorial.',
          'Regiões Temperadas.',
          'Regiões Polares.',
          'Desertos.',
        ],
        resposta_correta: 'B',
        explicacao:
          'Nas zonas temperadas a inclinação do eixo terrestre causa as quatro estações nitidamente.',
        nivel: 'médio',
      },
      {
        id: 84,
        tema: 'Clima no Brasil',
        pergunta: 'Por que no Norte e Nordeste do Brasil faz calor praticamente o ano todo?',
        alternativas: [
          'Porque estão próximas à Linha do Equador, recebendo luz solar direta o ano todo.',
          'Porque ficam longe do oceano.',
          'Porque há muitas indústrias.',
          'Porque o núcleo da Terra é mais quente lá.',
        ],
        resposta_correta: 'A',
        explicacao: 'A proximidade com o Equador garante alta insolação constante.',
        nivel: 'médio',
      },
      {
        id: 85,
        tema: 'Clima no Brasil',
        pergunta: 'O que o clima subtropical da Região Sul significa em relação às estações?',
        alternativas: [
          'Faz frio o ano todo.',
          'Apresenta maior variação de temperatura entre o verão (mais quente) e o inverno (mais frio).',
          'Só tem verão e inverno.',
          'Neva todos os meses.',
        ],
        resposta_correta: 'B',
        explicacao:
          'A Região Sul fica abaixo do Trópico de Capricórnio, gerando estações mais marcadas.',
        nivel: 'médio',
      },
      {
        id: 86,
        tema: 'Estações do Ano',
        pergunta: 'Se a Terra não tivesse nenhuma inclinação, o que aconteceria com as estações?',
        alternativas: [
          'Haveria um eclipse eterno.',
          'Não existiriam as estações do ano, o clima seria sempre o mesmo em cada região.',
          'Os dias teriam 48 horas.',
          'A Terra pararia de girar.',
        ],
        resposta_correta: 'B',
        explicacao:
          'A inclinação do eixo terrestre é a causa principal da variação climática sazonal.',
        nivel: 'médio',
      },
      {
        id: 87,
        tema: 'Eras Geológicas',
        pergunta: 'Qual grupo de animais se tornou dominante durante a Era Cenozoica?',
        alternativas: ['Peixes.', 'Dinossauros.', 'Mamíferos e Aves.', 'Insetos gigantes.'],
        resposta_correta: 'C',
        explicacao:
          'Após a extinção dos dinossauros, mamíferos e aves prosperaram e dominaram a Cenozoica.',
        nivel: 'médio',
      },
      {
        id: 88,
        tema: 'Eras Geológicas',
        pergunta: 'Períodos em que a temperatura caiu drasticamente cobrindo continentes com gelo:',
        alternativas: [
          'Aquecimentos Globais.',
          'Glaciações (Eras do Gelo).',
          'Secas Extremas.',
          'Tempestades Solares.',
        ],
        resposta_correta: 'B',
        explicacao: 'Glaciações são eras de resfriamento global intenso.',
        nivel: 'fácil',
      },
      {
        id: 89,
        tema: 'Orientação e Pontos Cardeais',
        pergunta: 'De frente para o Norte, qual ponto cardeal estará às suas costas?',
        alternativas: ['Leste.', 'Oeste.', 'Sul.', 'Norte.'],
        resposta_correta: 'C',
        explicacao: 'Sempre que estivermos de frente para o Norte, as costas apontam para o Sul.',
        nivel: 'fácil',
      },
      {
        id: 90,
        tema: 'Sistema Solar',
        pergunta: 'Qual é o nome da nossa galáxia?',
        alternativas: ['Andrômeda.', 'Via Láctea.', 'Sombrero.', 'Centaurus A.'],
        resposta_correta: 'B',
        explicacao:
          'O Sistema Solar está localizado em um dos braços espirais da galáxia Via Láctea.',
        nivel: 'fácil',
      },
    ]

    for (const q of rawQuestions) {
      // Idempotency check 1: external_id
      try {
        app.findFirstRecordByData('questions', 'external_id', q.id)
        continue // Skip if already exists
      } catch (_) {}

      // Idempotency check 2: statement
      try {
        app.findFirstRecordByData('questions', 'statement', q.pergunta)
        continue // Skip if already exists
      } catch (_) {}

      const record = new Record(questionsCollection)

      record.set('external_id', q.id)
      record.set('statement', q.pergunta)
      record.set('option_a', q.alternativas[0])
      record.set('option_b', q.alternativas[1])
      record.set('option_c', q.alternativas[2])
      record.set('option_d', q.alternativas[3])
      record.set('correct_option', q.resposta_correta)
      record.set('explanation', q.explicacao || '')
      record.set('theme', q.tema || '')
      record.set('difficulty', q.nivel || 'médio')
      record.set('suggested_grade', '6º ano') // Hardcoded grade mapping

      app.save(record)
    }
  },
  (app) => {
    const externalIds = []
    for (let i = 31; i <= 90; i++) {
      externalIds.push(i)
    }

    for (const id of externalIds) {
      try {
        const record = app.findFirstRecordByData('questions', 'external_id', id)
        app.delete(record)
      } catch (_) {}
    }
  },
)
